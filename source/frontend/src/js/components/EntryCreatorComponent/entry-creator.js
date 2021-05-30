import {addBullet} from "../../api/journal"
import {getJournal, getDate} from '../../utils/localStorage'
import {getBulletsByDay} from '../../api/journal'

export default class EntryCreator extends HTMLElement{ 
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
            margin-left: auto; 
            margin-right: auto; 
            display: flex; 
            flex-direction: column; 
            align-items: flex-start; 
            width: 60%; 
        }
        #textBox{
            border: 1px solid; 
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
    createEntry() { 
        let entry ={ 
            date: null, 
            id: null, 
            priority: null, 
            mood: null, 
            type: null, 
            content: null, 
            image: { 
                src: null, 
                alt: null
            },
            audio:undefined 
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
        entry.content = text; 

        //Populate image fields with those inputted into the form 
        let inputImage = this.shadowRoot.querySelector("#image-input")
        if (inputImage.value != '') { 
            entry.image.src = URL.createObjectURL(inputImage.files[0]); 
            entry.image.alt = inputImage.value.split("\\").pop(); 
        }

        //Get audio from file input 
        let inputAudio = this.shadowRoot.querySelector("#audio-input");
        if (inputAudio.value != '') { 
            entry.audio = URL.createObjectURL(inputAudio.files[0]); 
        } 

        return entry; 
    }

    /**
     * Function which renders all bullets from the backend for the journalID and 
     * date stored in local storage
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

            //No bullets for that day, return
            if (value.length == 0){ 
                return; 
            }

            //Create entry components for each and populate entry-creator
            value.forEach((element) => { 

                //Make an entry component 
                let entryComponent = document.createElement("entry-comp");
                let entry = { 
                    id: element.id, 
                    priority: element.priority, 
                    mood: element.mood, 
                    type: element.type, 
                    content: element.body, 
                    date: element.date
                }

                //Append the component to the page 
                entryComponent.entry = entry; 
                textBox.appendChild(entryComponent); 
            });
        });
    }

    /**
     * Function which stores passed in bullet into the backend 
     * @param {Object} entry - The bullet object formatted in entry / entry-creator fashion
     * which will be reformatted to be stored in backend format 
     */
    storeBullet(entry) { 
        let bullet = { 
            journalId: entry
        };
    }
  
    connectedCallback(){ 
        this.render(); 
    }

    /**
     * Function which renders the entryComponent on the page.
     */
    render(){ 
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

            //Add bullet to backend 
            this.storeBullet(entry); 
        });    
    }
}

//Make the custom element 
customElements.define('entry-creator', EntryCreator); 