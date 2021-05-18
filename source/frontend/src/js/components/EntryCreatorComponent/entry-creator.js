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
            type: null, 
            content: null, 
            image:{ 
                src: null,
                alt: null,
            },
            audio:null
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
}
//Make the custom element 
customElements.define('entry-creator', EntryCreator); 
