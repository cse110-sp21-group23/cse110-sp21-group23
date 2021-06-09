import { getBulletsByDay, addBullet, updateSorting, deleteBullet } from '../../api/journal'
import getHeader from '../../utils/header';
import { getJournal } from "../../utils/localStorage"

export default class EntryCreatorWeek extends HTMLElement{
    //Stores bullets by id's 
    idList = [];
    //Date of this particular entry creator 
    currDate;

    constructor() {
        super();
        //Create template and insert html
        //Grab the template 
        const template = document.createElement('template');
        template.innerHTML = `
            <div id="wrapper">
                <div id="textBox"> 
                    <form id="entryCreator">
                        <div class="entry-input">
                            <input type="text" name="entryBox" id="entryBox" placeholder="Add a new entry..." required>
                            <button type="submit" id="addButton"> Add </button> 
                        </div>
                    </form>
                    <ul id="entryContainer">
                    </ul> 
                </div>
            </div>
        `

        this.attachShadow({ mode: "open" });

        //Add styling (Temporary for proof of concept)
        let style = document.createElement('style');
        style.textContent = `
        #wrapper{ 
            display: flex; 
            flex-direction: column; 
            align-items: flex-start; 
        }

        #addButton {
            display:none;
        }

        .entry-input {
            display: flex;
            flex-direction: row;
        }

        #textBox{
            width: 100%; 
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        #entryCreator { 
            margin-top: 10px; 
            margin-bottom: 10px; 
            margin-left: -10px; 
        }
        #radio1 { 
            margin-bottom: 10px; 
        }
        #image-input, #audio-input { 
            margin-top: 10px; 
            margin-bottom: 10px; 
        }
        #entryBox {
            border: 1px solid;
            border-radius: 10px;
            border-color: #6a828d;
            margin: 0px auto 0px auto; 
            padding: 10px; 
            width: 85%; 
            box-sizing: border-box; 
            font-size: 12pt;
            font-family: 'Lato', sans-serif;
        }
        
        ul {
            list-style-type: none; 
        }`;

        //Attach the template and style to this shadow root
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style);
    }

    /**
     * Function which will taken in the input from the form and return an entry object 
     * @returns {Object} - The entry object which will contain all properties of the user's 
     * entry. This can includes text, type of entry, and potentially images or audio. This 
     * will presumably be used to create an Entry web component. 
     */
    async createEntry() { 
        let entry ={ 
            journalId: null,
            body: null,
            type: null,
            priority: 1,
            mood: 1,
            date: null,
        };

        //Get the type of bullet it'll be 
        let choices = this.shadowRoot.querySelectorAll("input[name='entryType']");
        for (const choice of choices) {
            if (choice.checked) {
                entry.type = choice.value;
            }
        }

        //Get the text they wrote 
        let text = this.shadowRoot.querySelector("#entryBox").value;
        entry.body = text;
        
        entry.date = formatDate(this.currDate);
        entry.journalId = getJournal();

        //Append the entry in the backend and to the internal list
        await addBullet(entry).then((value) => { 
            //Append bullet to internal list 
            this.idList.push(value.id); 

            entry.id = value.id; 
            
            //Update sorting in backend only after idList has been updated 
            updateSorting(getJournal(), new Date(this.currDate), this.idList); 
            return value; 
        });
        return entry; 
    }

    /**
     * Function which renders all bullets from the backend in the order they are stored for the passed in date
     * @param {Date} date - The date in which you want to render bullets from 
     */
    renderBullets(date) {
        //Grab journal id from local storage 
        let journalId = getJournal();

        //Get bullets for that day from the backend and populate bulletArray
        getBulletsByDay(journalId, new Date(date), getHeader()).then((value) => {

            //Clear the textbox 
            let textBox = this.shadowRoot.querySelector("#entryContainer");
            textBox.innerHTML = "";

            //Clear the internal list of bullets 
            this.idList = [];

            //No bullets for that day, return
            if (value.length == 0) {
                //Attach empty entry if no entries 
                let entryComponent = document.createElement('entry-comp'); 
                entryComponent.entry = { 
                    journal_id: null,
                    body: null,
                    type: null,
                    priority: 1,
                    mood: 1,
                    date: null,
                };
                //Make it invisible 
                entryComponent.shadowRoot.querySelector('li').className = "empty";
                textBox.appendChild(entryComponent); 

                return;
            };

            //Create entry components for each and populate entry-creator
            value.forEach((element) => {
                this.idList.push(element.id);

                //Make an entry component 
                let entryComponent = document.createElement("entry-comp");

                //Append the component to the page 
                entryComponent.entry = element;
                textBox.appendChild(entryComponent);
            });
        });
    }

    connectedCallback(){ 
        this.render(); 
    }

    /**
     * Function which renders the entryComponent on the page.
     */
    render() {
        //Get the form in entry-creator
        const form = this.shadowRoot.getElementById("entryCreator");

        //Attach submit event listener to ec form 
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            //Obtain the text box in component
            let textBox = this.shadowRoot.querySelector("#entryContainer");

            //Make an entry component 
            let entryComponent = document.createElement("entry-comp");

            //Create entry object using entry-creator and use to set entry-component
            let entry = await this.createEntry(); 
            entryComponent.entry = entry;

            //Add the entry component to the text box        
            textBox.appendChild(entryComponent);
            form.reset();
        });
    }

    /**
     * @param {Array} - The array of bullets to be stored by their id's. 
     */
    set idOrder(list) {
        this.idList = list;
    }

    /**
     * @returns {Array} - Returns an array of the bullets in order by id
     */
    get idOrder() {
        return this.idList;
    }

    /**
     * Helper function which swaps the positions of the two ids passed in within 
     * the id array 
     * @param {Object} dragged - First bullet to be swapped
     * @param {Object} droppedOn - Second bullet to be swapped
     * @param {bool} direction - true if dragged object was above the dropped-on element, false if drop area
     * dropped-on element was above. 
     */
    swapIds(index1, index2, direction) {
        let dragged = this.idList[index1];
        //Remove dragged element 
        this.idList.splice(index1, 1);

        //Dragged element was above 
        if (direction) {
            //Case we're dragging to last element 
            if (index2 + 1 == this.idList.length) {
                this.idList.push(dragged);
            }
            else {
                this.idList.splice(index2, 0, dragged);
            }
        }
        //Dragged element was below 
        else {
            this.idList.splice(index2, 0, dragged);
        }
    }

    /**
     * Function inserts the dragged bullet into this container's idList
     * @param {int} index2 - Index of the bullet in this container that the 
     * dragged bullet was dropped on
     * @param {Object} dBullet - the dragged bullet 
     */
    diffListIns(index2, dBullet) {
        //Case drag is dragged on last element in this list 
        if (index2 + 1 >= this.idList.length) {
            this.idList.push(dBullet.id);
        }
        //Insert normally
        else {
            this.idList.splice(index2, 0, dBullet.id);
        }
    }

    /**
     * @param {String} date - The date of this ec creator as a string 
     */
    set date(date) {
        this.currDate = date;
    }

    /**
     * @return {String} - Returns a string of this entry creator's internal date
     */
    get date() {
        return this.currDate;
    }
}

/**
 * Helper function to format the dates correctly 
 * @param {Date} date 
 * @returns a string with the date formatted correctly 
 */
function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

//Make custom element 
customElements.define('entry-creator-week', EntryCreatorWeek);

{/* <form id="entryCreator">
<ul>
<!--Determine type of bullet point it'll be-->
    <li>
    <div id="radio1">
        <input type="radio" name="entryType" id="task" value="task" required>
        <label for="task">Task</label>
        <input type="radio" name="entryType" id="event" value="event"> 
        <label for="event">Event </label>
        <input type="radio" name="entryType" id="note" value="note"> 
        <label for="note">Note </label> 
    </div>
    </li>
    <!--Image input-->
    <li>
    <label for="image-input">Insert Image</label>
    <input type="file" name="image" id="image-input" accept="image/*"> <br>
    </li>
    
    <!--Audio input-->
    <li>
    <label for="audio-input">Insert Audio</label>
    <input type="file" name="audio" id="audio-input" accept="audio/*"><br>
    </li>
    
    <!--Where they'll log their stuff-->
    <li>
    <input type="text" name="entryBox" id="entryBox" placeholder="Your entry" required>
    </li>
    

    <!--Add button-->
    <li>
    <button type="submit" id="addButton"> Add </button> 
    </li>
</ul>
</form>
</div> */}