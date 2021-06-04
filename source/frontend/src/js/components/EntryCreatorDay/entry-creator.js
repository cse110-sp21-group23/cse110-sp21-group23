import {addBullet, updateSorting, getBulletsByDay} from "../../api/journal"
import {getJournal, getDate} from '../../utils/localStorage'

export default class EntryCreator extends HTMLElement{ 
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
            border-radius: 20px;
            margin-left: auto; 
            margin-right: auto; 
            display: flex; 
            flex-direction: column; 
            align-items: flex-start; 
            width: 60%; 
            background: #C0C0C0;
        }
        #textBox{
            margin-left: auto; 
            margin-right: auto; 
            margin-top: 30px; 
            width: 60%; 
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
            margin: 10px auto 20px auto; 
            padding: 10px; 
            width: 50vw; 
            box-sizing: border-box; 
            font-size: 15pt;
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
        console.log(entry.date); 
        entry.journalId = getJournal(); 

        //Append the entry to the backend and internal list at the end 
        await addBullet(entry).then((value) => { 
            //Always append bullet to end 
            this.idList.push(value.id); 
            console.log(this.idList); 
            console.log(this.idList.length); 

            entry.id = value.id; 

            //Update sorting in backend only after idList has been updated
            updateSorting(getJournal(), new Date(getDate()), this.idList); 
            return value; 
        }); 
        console.log(entry.id); 


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
            console.log(value); 
            console.log(new Date(theDate)); 

            //Clear the textbox
            let textBox = this.shadowRoot.querySelector("#entryContainer");
            textBox.innerHTML = ""; 

            //Clear the internal list of bullets 
            this.idList = []; 

            //No bullets for that day, return
            if (value.length == 0){ 
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
    render(){
        //Render the bullets for the first day it's instantiated in 
        this.renderBullets(); 
        //Get the form in entry-creator
        const form = this.shadowRoot.getElementById("entryCreator");

        //Attach submit event listener to ec form 
        form.addEventListener('submit', async (event)=>{
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
    swapIds(index1, index2, direction){ 
        //Remove dragged element 
        let dragged = this.idList[index1]; 
        this.idList.splice(index1, 1); 

        //Dragged element was above 
        if (direction){ 
            //Case we're dragging to last element 
            if (index2 + 1 == this.idList.length){ 
                this.idList.push(dragged); 
            }
            else{
                this.idList.splice(index2, 0, dragged);
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