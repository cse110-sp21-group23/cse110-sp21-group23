import EntryCreator from "./entry-creator"
import {updateSorting, deleteBullet, addBullet, editBullet} from "../../api/journal"
import {getJournal, getDate} from '../../utils/localStorage'

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
                <div class="bullet-container">
                    <p id="symbol"></p>
                    <p id="content"></p><br>
                    <img src="" alt="" class="entry-image"></img> <br>
                    <audio src="" class="entry-audio"></audio>
                </div>
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

        .bullet-container {
            border: none;
            background-color: white;
            text-align: left;
            padding: 0.6em;
            margin: 0.5em;
        }
        
        li {
            list-style-type: none;
            border-style: solid;
            border-width: 1pt;
            border-color: #6a828d;
            border-radius: 10px;
            box-shadow: 1px 1px 3px #6a828d;
            margin: 0.5em;
        }

        li:hover {
            background-color: #f9f9f8;
        }

        li button:hover {
            background-color: #f9f9f8;
        }        
        
        p { 
            display: inline; 
            font-size: 20px;
        }
        img{ 
            height: 0px; 
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
        this.internalEntry = entry; 
        let shadow = this.shadowRoot; 
        let entryImage = this.shadowRoot.querySelector(".entry-image");


        //Set type, content and Id of entry component 
        shadow.querySelector("li").setAttribute("class", entry.type);
        const symbol = entry.type == "task" ? "☐" : entry.type == "event" ? "○" : "\u2022"
        shadow.getElementById("symbol").innerHTML = symbol;
        this.setAttribute("id", entry.id); 
        shadow.querySelector("#content").innerHTML = entry.body; 

        
        //Set necesary image content if the src isn't null
        if (entry.image != undefined) { 
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

    get entry(){ 
        return this.internalEntry; 
    }

    //DnD stuff 
    handleDragStart(event) {

        // Keep track of element we're dragging
        dragSrcEl = event.target; 

        event.dataTransfer.effectAllowed = 'move';

        //Setting the data of the dataTransfer object to the entire entry-comp DOM object 
        event.dataTransfer.setData('text/plain', JSON.stringify(this.entry));

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

        //Get containers
        let dragEc = dragSrcEl.getRootNode().host;
        let draggedOnEc = event.target.getRootNode().host; 

        // Don't do anything if dropping the same column we're dragging.
        if (!(dragSrcEl.isSameNode(event.target))) {
            let parent; 

            //Get indices of dragged and dropped on entries 
            let dragIndex = dragEc.idOrder.findIndex((element) => element == dragSrcEl.entry.id);
            let dOnIndex = draggedOnEc.idOrder.findIndex((element) => element == event.target.entry.id);
            //Set direction
            let up2Down = dragIndex < dOnIndex;  

            //If they have the same shadowroot
            if (dragEc.isSameNode(draggedOnEc)) { 
                parent = event.target.parentNode;

                //Swap positions of elements in id lists
                dragEc.swapIds(dragIndex, dOnIndex, up2Down);
    

                //Update sorting in backend 
                updateSorting(getJournal(), new Date(getDate()), dragEc.idOrder);

                //Remove the entry we're dragging from textbox UI
                parent.removeChild(dragSrcEl);

                //Recreate the element with stored data in DataTransfer object in UI
                let dropElement = document.createElement('entry-comp');
                let entry = JSON.parse(event.dataTransfer.getData('text/plain'));
                dropElement.entry = entry; 

                //Dragged object was above the one it's dropped on
                if (up2Down){ 
                    event.target.insertAdjacentElement('afterend', dropElement);
                }
                //Dragged object was below the one it's dropped on
                else {
                    event.target.insertAdjacentElement('beforebegin', dropElement);
                }
            }
            //Don't have the same shadow root
            else { 
                parent = dragSrcEl.parentNode;
                console.log(dragSrcEl.entry.id); 

                //Set date on dragSrcEl to date it was dragged to in server
                let movedBullet = dragSrcEl.entry; 
                console.log("moved" + movedBullet); 
                console.log("dragged" + dragSrcEl.entry); 
                movedBullet.date = draggedOnEc.date;  
                console.log("Date of ec dOn: " + draggedOnEc.date); 
                console.log("moved" + movedBullet); 
                console.log("dragged" + dragSrcEl.entry); 
                // editBullet(movedBullet).then(
                //     console.log("movedbullet")
                // )

                //Remove draggedB from its ec id list
                dragEc.idOrder.splice(dragIndex, 1)

                //Insert draggedB into new list 
                draggedOnEc.diffListIns(dOnIndex, dragSrcEl.entry); 

                //Update sorting in backend 
                // updateSorting(getJournal(), new Date(getDate()), dragEc.idOrder);
                // updateSorting(getJournal(), new Date(getDate()), draggedOnEc.idOrder);

                //Set UI      
                parent.removeChild(dragSrcEl);            
                //Recreate the element with stored data in DataTransfer object
                let dropElement = document.createElement('entry-comp');
                let entry = JSON.parse(event.dataTransfer.getData('text/plain'));
                dropElement.entry = entry; 
    
                //If dragged to bottom, insert at bottom 
                if (dOnIndex + 1 == draggedOnEc.bulletOrder.length - 1){ 
                    event.target.insertAdjacentElement('afterend', dropElement); 
                }
                else{ 
                    event.target.insertAdjacentElement('beforebegin', dropElement); 
                }
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