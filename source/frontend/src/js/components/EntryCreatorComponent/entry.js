//Hold the dragged element
var dragSrcEl = null; 

export default class Entry extends HTMLElement{ 

    //Make the entry-comp element draggable when appended to DOM 
    connectedCallback(){ 
        this.setAttribute('draggable', 'true');
    }

    constructor() {  
        super(); 

        //Add the DnD related handlers 
        this.addDnDHandlers(); 

        //Create the template and insert html 
        const template = document.createElement('template');
        template.innerHTML = `
            <li id="type" draggable="true" class="type-name">
                <p id="content"></p><br>
                <img src="" alt="" class="entry-image"></img> <br>
                <audio src="" class="entry-audio"></audio>
            </li>
            <div id="myModal" class="modal">
            <div class="modal-content">
              <div class = "modal-header"> 
                <span class="close" id = "close">&times;</span>
                <h4 class = "modal-title"> Edit bullet </h4>
              </div>
              <form id="edit">
                <ul>
                  <input type="text" id="modal-words" placeholder="Your entry">
                  <div id="radioEdit">
                    <input type="radio" name="entryTypeEdit" id="task" value="task">
                    <label for="task">Task</label>
                    <input type="radio" name="entryTypeEdit" id="event" value="event"> 
                    <label for="event">Event </label>
                    <input type="radio" name="entryTypeEdit" id="note" value="note"> 
                    <label for="note">Note </label> 
                  </div>
                  <button id="editButton"> Confirm Edit </button>
                  <button id="doneButton"> Finish Bullet </button>
                </ul>
              </form>
            </div> 
          </div>
              
          </ul>
        </div>`

        //Add styling for bullet points 
        let style = document.createElement('style'); 
        style.textContent = 
        `
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
        }
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
        
        /* Modal Content/Box */
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto; /* 15% from the top and centered */
            padding: 30px;
            border: 5px solid #888;
            width: 90%; /* Could be more or less, depending on screen size */
            height: 25%;
        }
        #modal-words {
            padding: 10px; 
            width: 50vw; 
            box-sizing: border-box; 
            font-size: 15pt;
        }
        [contenteditable] {
            outline: 2px solid;
        }
        /* The Close Button */
        .close {
            color: #aaa;
            float: right;
            font-size: 50px;
            font-weight: bold;
        }
        
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        
        #editButton {
            margin-top:20px;
            padding: 10px;
        }
        #doneButton {
            margin-top:20px;
            padding: 10px;
        }
        .modal-title {
            text-align: center;
        }`;

        //Attach shadow 
        this.attachShadow({ mode: 'open'}); 
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
        
        if (entry.image == undefined) { 
            return; 
        }
        //Set necesary image content if the src isn't null
        if (entry.image.src != null) { 
            entryImage.setAttribute("src", entry.image.src); 
            entryImage.setAttribute("alt", entry.image.alt); 
        }
        //Set audio if applicable
        if (entry.audio != undefined){ 
            let entryAudio = shadow.querySelector(".entry-audio"); 
            entryAudio.setAttribute("src", entry.audio);
            entryAudio.setAttribute("controls", true);
        }
    }

    //DnD stuff 
    handleDragStart(event) {

        // Keep track of element we're dragging
        dragSrcEl = event.target; 

        event.dataTransfer.effectAllowed = 'move';

        //Setting the data of the dataTransfer object to the entire entry-comp DOM object 
        event.dataTransfer.setData('text/html', this.shadowRoot.innerHTML);

        event.target.classList.add('dragElem'); 
    }

    handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault(); // Necessary. Allows us to drop.
        }
        event.target.classList.add('over');
      
        event.dataTransfer.dropEffect = 'move';  
      
        return false;
    }

    handleDragEnter(e) {
        // this / e.target is the current hover target.
    }

    handleDragLeave(event) {
        event.target.classList.remove('over');  // this / e.target is previous target element.
    }

    handleDrop(event) {
        //event.target is the node that is being dropped on
        if (event.stopPropagation) {
            event.stopPropagation(); // Stops some browsers from redirecting.
        }

        //Get nodes' shadowRoots
        console.log(dragSrcEl.getRootNode()); 
        console.log(event.target.getRootNode());

        let droppedRoot = dragSrcEl.getRootNode();
        let eventRoot = event.target.getRootNode(); 

        // Don't do anything if dropping the same column we're dragging.
        if (!(dragSrcEl.isSameNode(event.target))) {
            let parent; 
            //If they have the same shadowroot
            if (droppedRoot.isSameNode(eventRoot)) { 
                parent = event.target.parentNode; 
            }

            else { 
                parent = dragSrcEl.parentNode; 
            }
            //Dragged object was above the one it's dropped on
            if (dragSrcEl.getBoundingClientRect().top > event.target.getBoundingClientRect().top){ 
                console.log('down-up');
                //Remove the entry we're dragging from textbox
                parent.removeChild(dragSrcEl);

                //Recreate the element with stored data in DataTransfer object
                let dropElement = document.createElement('entry-comp');
                let entryInnerHTML = event.dataTransfer.getData('text/html');
                dropElement.shadowRoot.innerHTML = entryInnerHTML; 

                event.target.insertAdjacentElement('beforebegin', dropElement);
            }
            //Dragged object was below the one it's dropped on
            else {
                //Remove the entry we're dragging from textbox
                event.target.parentNode.removeChild(dragSrcEl);

                //Recreate the element with stored data in DataTransfer object
                let dropElement = document.createElement('entry-comp');
                let entryInnerHTML = event.dataTransfer.getData('text/html');
                dropElement.shadowRoot.innerHTML = entryInnerHTML; 

                event.target.insertAdjacentElement('afterend', dropElement);
            }
        }
        event.target.classList.remove('over');
        return false;
    }

    //Element who is being dragged over fires this when dragging element leaves its "zone"
    handleDragEnd(event) {
        // this/e.target is the source node.
        event.target.classList.remove('over');
    }

    /**
     * A function which adds necessary drag and drop event handlers to the entry component 
     * @param {*Object} entry - This is the li object in the Entry component
     */
    addDnDHandlers() { 
        this.addEventListener('dragstart', this.handleDragStart.bind(this)); 
        this.addEventListener('dragenter', this.handleDragEnter);
        this.addEventListener('dragover', this.handleDragOver);
        this.addEventListener('dragleave', this.handleDragLeave);
        this.addEventListener('drop', this.handleDrop);
        this.addEventListener('dragend', this.handleDragEnd);
    }

    connectedCallback(){ 
        this.render(); 
    }
    
    render(){ 

        const shadow = this.shadowRoot;

        //Sets up modal
        var modal = shadow.getElementById("myModal");
        var span = shadow.getElementById("close");

        //Entry part
        let entry = this.shadowRoot.querySelector("#type");
        var content = entry.children;

        //Strikethrough button
        var strike = shadow.getElementById("doneButton");

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        } 

        //on doubleclick on entry for edit cause single click is drag&drop
        entry.addEventListener("dblclick", () => {
            //shows modal
            modal.style.display = "block";

            //changes modal textbox to match entry's content
            shadow.getElementById("modal-words").value = content[0].textContent;
            
            //edit button from modal
            var edit = shadow.getElementById("editButton");
            
            //Can't use addEventListener, it gets upset
            edit.onclick = function(event) {
                event.preventDefault();

                //changes entry's content and bullet type
                content[0].textContent = shadow.getElementById("modal-words").value;
                let choices = shadow.getElementById("radioEdit").querySelectorAll("input[name='entryTypeEdit']"); 
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