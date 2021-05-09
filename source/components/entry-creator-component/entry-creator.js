class EntryCreator extends HTMLElement{ 
    constructor(){ 
        super(); 
        //Grab the template 
        const template = document.getElementById('entry-creator-temp');

        this.attachShadow({ mode: 'open'}); 

        //Add styling 
        let style = document.createElement('style'); 
        style.textContent = `
        #wrapper{ 
            border-radius: 5px; 
            border: 1px solid; 
            margin-left: auto; 
            margin-right: auto; 
            width: 60%; 
        }
        #entryCreator { 
            display: block; 
            margin-top: 10px; 
            margin-bottom: 10px; 
        }
        #image-input { 
            float:right; 
            margin-right: -70px; 
            margin-top: -20px; 
        }
        #entryBox {
            display: block; 
            margin: 0 auto 10px auto; 
            padding: 10px; 
            width: 95%; 
            box-sizing: border-box;
        }
        #addButton { 
            margin-left: 10px; 
        }`;

        //Attach the template and style to this shadow root
        this.shadowRoot.appendChild(template.content.cloneNode(true)); 
        this.shadowRoot.appendChild(style); 
    }

    /**
     * Function which will taken in the input from the form and return an entry object 
     * which will have fields: **TBD**
     * @returns {Object}: The entry object which will contain all properties of the user's 
     * entry. This can includes text, type of entry, and potentially images or audio. 
     */
    createEntry() { 

        //Entry to be returnec
        let entry ={ 
            type: '', 
            content: '', 
            image:{
                src:'',
                alt:''
            },
            audio:''
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
        return entry;
    }
}

//Make the custom element 
customElements.define('entry-creator', EntryCreator); 
