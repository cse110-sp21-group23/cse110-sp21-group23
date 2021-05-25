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
            font-size: 20px;
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

    
    connectedCallback(){ 
        this.render(); 
    }
    
    render(){ 

        //Sets up modal
        const modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];

        //Entry part
        let entry = this.shadowRoot.querySelector("#type");
        var content = entry.children;

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        } 
        //on doubleclick on entry cause single click is drag&drop
        entry.addEventListener("dblclick", () => {
            //shows modal
            modal.style.display = "block";

            //changes modal textbox to match entry's content
            document.getElementById("modal-words").textContent = content[0].textContent;
            
            //edit button from modal
            var edit = document.getElementById("editButton");
            
            //Can't use addEventListener, it gets upset
            edit.onclick = function(event) {
                event.preventDefault();

                //changes entry's content and bullet type
                content[0].textContent = document.getElementById("modal-words").textContent;
                let choices = document.getElementById("radioEdit").querySelectorAll("input[name='entryTypeEdit']"); 
                for (const choice of choices) { 
                    if (choice.checked){ 
                        console.log("choice = " + choice.value);
                        entry.className = choice.value;
                        choice.checked = false;
                    }
                }
                
                //closes modal and fixes finish bullet button text
                modal.style.display = "none";
                strike.firstChild.nodeValue = "Finish Bullet";

            }
            //this is the finish bullet button
            var strike = document.getElementById("doneButton");

            //Makes sure finish bullet button says the right text
            if(content[0].innerHTML.startsWith("<del>")) {
                strike.firstChild.nodeValue = "Unfinish Bullet";
            }
            else {
                strike.firstChild.nodeValue = "Finish Bullet";
            }

            //adds strikethrough through entry
            strike.onclick = function(event) {
                event.preventDefault();
                
                //holds strikethrough text
                var strikeT;
    
                //removes strikethrough and changes strike button txt
                if(content[0].innerHTML.startsWith("<del>")) {
                    strikeT = content[0].innerHTML.replace("<del>",'');
                    strikeT = strikeT.replace("</del>", '');
                    strike.firstChild.nodeValue = "Finish Bullet";
                }
                //inserts strikethrough and changes strike button txt
                else {
                    strikeT = "<del>" + content[0].innerHTML + "</del>";
                    strike.firstChild.nodeValue = "Unfinish Bullet";
                }
    
                //changes entry content and closes modal
                content[0].innerHTML = strikeT;
                modal.style.display = "none";
            }
        });      
    }
}

//Define the custom element 
customElements.define('entry-comp', Entry); 