import {addBullet, updateSorting} from "../../api/journal"
import {getJournal, getDate} from '../../utils/localStorage'
import {getBulletsByDay} from '../../api/journal'

export default class EntryCreator extends HTMLElement{ 

    //Stores bullets in pairs of their id and priority
    bulletList= []; 
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
                        <label for="task">Task</label>
                        <input type="radio" name="entryType" id="event" value="event"> 
                        <label for="event">Event </label>
                        <input type="radio" name="entryType" id="note" value="note"> 
                        <label for="note">Note </label> 
                    </div>
                    </li>


                    <!--TEMPORARY REMOVAL OF IMAGE AND AUDIO-->
                    <!--Image input
                    <li>
                    <label for="image-input">Insert Image</label>
                    <input type="file" name="image" id="image-input" accept="image/*"> <br>
                    </li>
                    
                    <!--Audio input
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
        </div>
        <div id="textBox"> 
            <ul id="entryContainer">
            </ul> 
        </div>`

        this.attachShadow({ mode: "open"}); 

        //Add styling (Temporary for proof of concept)
        let style = document.createElement('style'); 
        style.textContent = `
        #wrapper{ 
            border: 1px solid;
            border-radius: 10px;
            border-color: #6a828d;
            margin-left: auto; 
            margin-right: auto; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            width: 60%; 
        }
        #textBox{
            
            margin-left: auto; 
            margin-right: auto; 
            margin-top: 30px; 
            width: 60%; 
        }
        #entryCreator {
            background-color: white;
            width:100%;
            margin: 0.5em;

        }
        #radio1 { 
            margin-bottom: 10px; 
        }
        #image-input, #audio-input { 
            margin-top: 10px; 
            margin-bottom: 10px; 
        }
        #entryBox { 
            margin: 10px auto 20px auto; 
            padding: 10px; 
            width: 100%; 
            box-sizing: border-box; 
            font-size: 15pt;
        }
        body {
            background: #2c3e50;
          }
        /* Basic styles */
        input[type="checkbox"],
        input[type="radio"] {
        position: absolute;
        opacity: 0;
        z-index: -1;
        }
        label {
        position: relative;
        display: inline-block;
        padding: 0 0 0 2em;
        height: 1.5em;
        line-height: 1.5;
        cursor: pointer;
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
        }
        input[type=radio] + label::after {
        content: " ";
        top: .25em;
        left: .25em;
        width: 1em;
        height: 1em;
        background: #fff;
        border: .2em solid #2c3e50;
        border-radius: 50%;
        }
        /* :checked */
        input[type="checkbox"]:checked + label::before,
        input[type="radio"]:checked + label::before {
        background: #fff;
        border-color: #fff;
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
        }
        
        ul { 
            list-style-type: none;
            margin: 0.5em;
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
    createEntry() { 
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
            if (choice.checked){ 
                entry.type = choice.value; 
            }
        }

        //Get the text they wrote 
        let text = this.shadowRoot.querySelector("#entryBox").value; 
        entry.body = text; 

        //Populate image fields with those inputted into the form 
        let inputImage = this.shadowRoot.querySelector("#image-input")
        if (inputImage.value != '') { 
            let img = { 
                src: URL.createObjectURL(inputImage.files[0]), 
                alt: inputImage.value.split("\\").pop()
            }; 
            entry.image = img; 
        }

        //Get audio from file input 
        let inputAudio = this.shadowRoot.querySelector("#audio-input");
        if (inputAudio.value != '') { 
            entry.audio = URL.createObjectURL(inputAudio.files[0]); 
        } 
        entry.date = formatDate(getDate()); 
        entry.journalId = getJournal(); 

        //Store the entry in the backend and internal list in sorted order
        let id = this.storeBullet(entry).then((value) => { 
            return value; 
        }); 
        entry.id = id; 

        //After adding, sort the bulletList and then send that sorted ordering to back end again **TODO**
        return entry; 
    }

    /**
     * Function which renders all bullets from the backend in the order they are stored 
     */
    renderBullets() { 
        //Grab journal id from local storage 
        let journalId = getJournal(); 
        let theDate = getDate();


        //Get bullets for that day from the backend and populate bulletArray
        getBulletsByDay(journalId,new Date(theDate)).then((value) =>{

            //Clear the textbox
            let textBox = this.shadowRoot.querySelector("#entryContainer");
            textBox.innerHTML = ""; 

            //Clear the internal list of bullets 
            this.bulletOrder = []; 

            //No bullets for that day, return
            if (value.length == 0){ 
                return; 
            };

            //Create entry components for each and populate entry-creator
            value.forEach((element) => { 
                let storage = { 
                    id: element.id, 
                    priority: element.priority 
                }

                //Create the new internal list of bullets
                this.bulletList.push(storage); 
                this.idList.push(element.id); 

                //Make an entry component 
                let entryComponent = document.createElement("entry-comp");

                //Append the component to the page 
                entryComponent.entry = element; 
                textBox.appendChild(entryComponent); 
            });
        });
    }

    /**
     * Function which stores passed in bullet into the backend. Also updates the ordering of the 
     * bullets in the backend 
     * @param {Object} entry - The bullet object formatted in entry / entry-creator fashion
     * which will be reformatted to be stored in backend format 
     * @return {int} - Will return the id of the bullet that is given by the server 
     */
    storeBullet(entry) { 
        let bulletToStore = { 
            "journalId": entry.journalId, 
            "body": entry.body, 
            "type": entry.type, 
            "priority": entry.priority, 
            "mood": entry.mood, 
            "date": entry.date
        };

        //Store 
        let id = addBullet(bulletToStore).then((value) => { 
            return value; 
        }); 

        //Update sorting -- linearly O(n) time 
        for (let index = 0; index <= this.bulletList.length; index++){ 
            //Iterated through all elements, so insert at end 
            if (index == this.bulletList.length){ 
                this.bulletList.push({id: bulletToStore.id, priority: bulletToStore.priority}); 
                this.idList.push(bulletToStore.id); 

                break; 
            }
            //If greater priortiy, insert at that index. Update both lists 
            if (this.bulletList[index].priority < bulletToStore.priority){ 
                this.bulletList.splice(index, 0, {id: bulletToStore.id, priority: bulletToStore.priority});
                this.idList.splice(index, 0, bulletToStore.id); 
                break;
            }
        }

        //Update sorting in backend 
        updateSorting(getJournal(), new Date(getDate()), this.idList); 

        return id; 
    }
  
    connectedCallback(){ 
        this.render(); 
    }

    /**
     * Function which renders the entryComponent on the page.
     */
    render(){
        //Render the bullets for the first day it's instantiated in 
        this.renderBullets(); 
        //Get the form in entry-creator
        const form = this.shadowRoot.getElementById("entryCreator");

        //Attach submit event listener to ec form 
        form.addEventListener('submit', (event)=>{
            event.preventDefault(); 

            //Obtain the text box in component
            let textBox = this.shadowRoot.querySelector("#entryContainer");

            //Make an entry component 
            let entryComponent = document.createElement("entry-comp");
            
            //Create entry object using entry-creator and use to set entry-component
            let entry = this.createEntry(); 
            entryComponent.entry = entry;

            //Add the entry component to the text box        
            textBox.appendChild(entryComponent); 
            form.reset(); 
        });    
    }

    /**
     * @param {Array} - The array of bullest to be stored as the order for the bullets in the entry container
     */
    set bulletOrder(list){
        this.bulletList = list; 
    }
    /**
     * @returns {Array} - Returns an array of the bullets in order 
     */
    get bulletOrder(){ 
        return this.bulletList; 
    }
    /**
     * Function which swaps the positions of the two bullets passed in within the 
     * bullets array 
     * @param {Object} dragged - Bullet that was dragged
     * @param {Object} droppedOn - Bullet that was dragged on top of 
     * @param {bool} direction - true if dragged object was above the dropped-on element, false if drop area
     * dropped-on element was above. 
     */
    swapBullets(dragged, droppedOn, direction){ 
        let index1 = this.bulletList.findIndex((element) => element.id == dragged.id); 
        let index2 = this.bulletList.findIndex((element) => element.id == droppedOn.id); 

        //Remove dragged element 
        this.bulletList.splice(index1, 1); 

        //Dragged element was above 
        if (direction){ 
            //Case we're dragging to last element 
            if (index2 + 1 == this.bulletList.length){ 
                this.bulletList.length.push(dragged); 
            }
            else{
                this.bulletList.splice(index2 + 1, 0, dragged);
            } 
        }
        //Dragged element was below 
        else{ 
            this.bulletList.splice(index2, 0, dragged); 
        }
    }

    /**
     * @param {Array} - The array of bullets to be stored by their id's. 
     */
    set idOrder(list){
        this.idList= list; 
    }
    /**
     * @returns {Array} - Returns an array of the bullets in order by id
     */
    get idOrder(){ 
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
    swapIds(dragged, droppedOn, direction){ 
        let index1 = this.idList.findIndex((element) => element == dragged); 
        let index2 = this.idList.findIndex((element) => element == droppedOn); 
        //Remove dragged element 
        this.idList.splice(index1, 1); 

        //Dragged element was above 
        if (direction){ 
            //Case we're dragging to last element 
            if (index2 + 1 == this.idList.length){ 
                this.idList.length.push(dragged); 
            }
            else{
                this.idList.splice(index2 + 1, 0, dragged);
            } 
        }
        //Dragged element was below 
        else{ 
            this.idList.splice(index2, 0, dragged); 
        }
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