import { addBullet, updateSorting, getBulletsByDay } from "../../api/journal"
import getHeader from "../../utils/header";
import { getJournal, getDate } from '../../utils/localStorage'
import EntryComponent from './entry'

export default class EntryCreator extends HTMLElement {
    //Stores bullets by id's 
    idList = []; 
    
    constructor(){ 
        super(); 
        //Create template and insert html
        //Grab the template 
        const template = document.createElement('template');
        template.innerHTML = `
        <div id="wrapper">
            <form id="entryCreator">
                <ul>
                <!--Determine type of bullet point it'll be-->
                    <li>
                    <div id="radio1">
                        <input type="radio" name="entryType" id="task" value="task" checked required>
                        <label for="task">
                            <span>task</span>
                        </label>
                        <input type="radio" name="entryType" id="event" value="event"> 
                        <label for="event">
                            <span>event</span>
                        </label>
                        <input type="radio" name="entryType" id="note" value="note"> 
                        <label for="note">
                            <span>note</span>
                        </label> 
                    </div>
                    </li>
                    
                    <!--
                    <li>
                    <label for="image-input">Insert Image</label>
                    <input type="file" name="image" id="image-input" accept="image/*"> <br>
                    </li>
                    -->
                    
                    <!--
                    <li>
                    <label for="audio-input">Insert Audio</label>
                    <input type="file" name="audio" id="audio-input" accept="audio/*"><br>
                    </li>
                    -->

                    <div class="bottom-div">
                        <!--Where they'll log their stuff-->
                        <input type="text" name="entryBox" id="entryBox" placeholder="Add a new entry..." required>

                        <!--Add button-->
                        <button type="submit" id="addButton"> Add </button> 
                    </div>
                </ul>
            </form>
        </div>
        <div id="textBox"> 
            <ul id="entryContainer">
            </ul> 
        </div>`

        this.attachShadow({ mode: "open" });

        //Add styling (Temporary for proof of concept)
        let style = document.createElement('style');
        style.textContent = `

        #addButton {
            display:none;
        }

        #wrapper{ 
            position: relative;
            top: 45px;
            left: 100px;
            border: 1px solid; 
            border-radius: 20px;
            background-color: rgba(106, 130, 141, 0.8);
            border-color: #6a828d;
            margin-left: auto; 
            margin-right: auto; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            width: 60%; 
        }

        .bottom-div {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        #textBox{
            margin-left: auto; 
            margin-right: auto; 
            margin-top: 30px; 
            width: 60%; 
        }
        #entryCreator { 
            width:100%;
            margin-top: 0.5em;
            margin-left: -1em;
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
            margin: 0px  0px auto; 
            padding: 15px; 
            width: 100%;
            box-sizing: border-box; 
            font-size: 15pt;
            font-family: 'Lato', sans-serif;
        }
        
        ul { 
            list-style-type: none;
            margin: 0.5em;
        }
        /* Basic styles */
        input[type="checkbox"],
        input[type="radio"] {
            position: absolute;
            opacity: 0;
            z-index: -1;
        }
        label {
            font-family: 'Lato', sans-serif;
            color: white;
            font-weight: 100;
            position: relative;
            display: inline-block;
            padding: 0 0 0 2em;
            height: 1.5em;
            line-height: 1.5;
            cursor: pointer;
            margin-right: 0.2em;
        }
        label::before,
        label::after {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 1.5em;
            height: 1.5em;
        }

        label::before {
            content: " ";
            border: 2px solid #bdc3c7;
            border-radius: 20%;
        }

        /* Checkbox */
        input[type="checkbox"] + label::after {
            content: "2714";
            color: #2c3e50;
            line-height: 1.5;
            text-align: center;
        }

        /* Radio */
        input[type="radio"] + label::before {
            border-radius: 50%;
            background: #4C444C;
        }

        input[type=radio] + label::after {
            content: " ";
            top: .2em;
            left: .2em;
            width: 1em;
            height: 1em;
            background: #b3d4db;
            border: .2em solid #2eb7eb;
            border-radius: 50%;
        }

        /* :checked */
        input[type="checkbox"]:checked + label::before,
        input[type="radio"]:checked + label::before {
            background: #4C444C;
            border-color: #4C444C;
        }

        input[type="checkbox"] + label::after,
        input[type=radio] + label::after {
            -webkit-transform: scale(0);
            -ms-transform: scale(0);
            -o-transform: scale(0);
            transform: scale(0);
        }

        input[type="checkbox"]:checked + label::after,
        input[type=radio]:checked + label::after {
            -webkit-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }

        /* Transition */
        label::before,
        label::after {
            -webkit-transition: .25s all ease;
            -o-transition: .25s all ease;
            transition: .25s all ease;
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
        let entry = {
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

        entry.date = formatDate(getDate());
        entry.journalId = getJournal();

        //Append the entry to the backend and internal list at the end 
        await addBullet(entry, getHeader()).then((value) => {
            //Always append bullet to end 
            this.idList.push(value.id);

            entry.id = value.id;

            //Update sorting in backend only after idList has been updated
            updateSorting(getJournal(), new Date(getDate()), this.idList);
            return value;
        });


        //After adding, sort the bulletList and then send that sorted ordering to back end again **TODO**
        return entry;
    }

    /**
     * Function which renders all bullets from the backend in the order they are stored 
     */
    renderBullets(date) {
        //Grab journal id from local storage 
        let journalId = getJournal();
        let theDate = date;

        //Get bullets for that day from the backend and populate bulletArray
        getBulletsByDay(journalId, new Date(theDate), getHeader()).then((value) => {
            //Clear the textbox
            let textBox = this.shadowRoot.querySelector("#entryContainer");
            textBox.innerHTML = "";

            //Clear the internal list of bullets 
            this.idList = [];

            //No bullets for that day, return
            if (value.length == 0) {
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

    connectedCallback() {
        this.render();
    }

    /**
     * Function which renders the entryComponent on the page.
     */
    render() {
        this.date = getDate(); 
        //Render the bullets for the first day it's instantiated in 
        this.renderBullets(getDate());
        //Get the form in entry-creator
        const form = this.shadowRoot.getElementById("entryCreator");

        //Attach submit event listener to ec form 
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            //Obtain the text box in component
            let textBox = this.shadowRoot.querySelector("#entryContainer");

            //Make an entry component 
            let entryComponent = new EntryComponent()

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
        //Remove dragged element 
        let dragged = this.idList[index1];
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
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


//Make the custom element 
customElements.define('entry-creator', EntryCreator);