export default class Entry extends HTMLElement{ 


    constructor() { 
        super(); 

        //Create the template and insert html 
        const template = document.createElement('template');
        template.innerHTML = `
        <li id="type" class="type-name">
            <p id="content"></p> <br>
            <img src="" alt="" class="entry-image"></img> <br>
            <audio src="" class="entry-audio"></audio>
        </li>`

        this.attachShadow({ mode: 'open'}); 

        //Add styling for bullet points 
        let style = document.createElement('style'); 
        style.textContent = `
        .task{ 
            list-style-type: "☐"; 
        }
        .event{
            list-style-type: "○";
        }
        .note{
            list-style-type: "\u2022"; 
        }
        
        p { 
            display: inline; 
        }
        img{ 
            height: 300px; 
            width: auto; 
        }`;

        //Attach the template and style to this shadow root
        this.shadowRoot.appendChild(template.content.cloneNode(true)); 
        this.shadowRoot.appendChild(style);
    }

    /**
     * 'set' function for the entry property of Entry. 
     * @param {Object} entry - An entry object containing entry content, type, and if applicable, images and audio attributes. 
     */
    set entry(entry){ 
        let shadow = this.shadowRoot; 
        let entryImage = this.shadowRoot.querySelector(".entry-image");

        //Set type and content of entry component 
        shadow.querySelector("#type").setAttribute("class", entry.type);
        shadow.querySelector("#content").innerHTML = entry.content; 
        
        //Set necesary image content if the src isn't null
        if (entry.image.src != null) { 
            entryImage.setAttribute("src", entry.image.src); 
            entryImage.setAttribute("alt", entry.image.alt); 
        }

        //Set audio if applicable
        if (entry.audio != null){ 
            let entryAudio = shadow.querySelector(".entry-audio"); 
            entryAudio.setAttribute("src", entry.audio);
            entryAudio.setAttribute("controls", true);
        }
    }
}

//Define the custom element 
customElements.define('entry-comp', Entry); 