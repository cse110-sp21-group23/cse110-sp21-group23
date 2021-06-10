
import {updateSorting, deleteBullet, addBullet, editBullet, getBulletsByDay} from "../../api/journal"
import getHeader from "../../utils/header";
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
                    <div class="content-container">
                        <div class="text-wrap">
                            <p id="symbol"></p>
                            <p id="content"></p><br>
                        </div> 
                        <img src="" alt="" class="entry-image"></img> <br>
                        <audio src="" class="entry-audio"></audio>
                    </div> 
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
                  <button id="deleteButton">Delete Bullet </button> 
                </ul>
              </form>
            </div> 
          </div>
              
          </ul>
        </div>`

        let style = document.createElement('style');
        
         /**
         * This will render the style sheet for daily bullets
         */
       
            //Add styling for bullet points 
            style.textContent = 
            `
            .bullet-container {
                border: none;
                background-color: rgba(255,255,255,0.3);
                border-radius: 1rem;
                color: white;
                text-align: left;
                padding: 1em;
                margin: 0.25em;
            }
            
            .content-container { 
                display: flex;  
                align-items: center; 
                justify-content: space-between; 
            }
            li {
                align-item: left;
                position: relative;
                list-style-type: none;
                border-style: solid;
                border-width: 1pt;
                border-color: #6a828d;
                border-radius: 10px;
                box-shadow: 1px 1px 3px #6a828d;
                left: 80px;
                margin: 0.7em;
                margin-bottom: -0.25em;
                margin-left: -0.5em;
                position: relative;
                background: #transparent;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 1px 1px 3px #6a828d;
                transition: 0.5s;
            }

            li:hover {
                background-color: rgba(255,255,255, 0.25);
                transform: scale(1.05);
                opacity: 1;
            }

            li button:hover {
                background-color: #f9f9f8;
            }        
            
            p { 
                display: inline; 
                font-size: 20px;
                font-family: 'Lato', sans-serif;
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
                border-radius: 40px;
                background-color: #B3D4DB;
                margin: 15% auto; /* 15% from the top and centered */
                padding: 30px;
                border: 5px solid #888;
                width: 75%; /* Could be more or less, depending on screen size */
                height: 33%;
            }
            #modal-words {
                padding: 10px; 
                width: 50vw; 
                box-sizing: border-box; 
                font-size: 16pt;
                border-radius: 10px;
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
            input[type='radio'] {
                transform: scale(1.4);
                margin-top: 18px;
            }
            
            #editButton {
                border-radius: 10px;
                margin-top:20px;
                padding: 10px;
                width: 90px;
                height: 90px;
                font-size: 18px;
            }
            #doneButton {
                border-radius: 10px;
                margin-top:20px;
                padding: 10px;
                width: 90px;
                height: 90px;
                font-size: 18px;
            }
            
            #deleteButton { 
                border-radius: 10px;
                margin-top:20px;
                padding: 10px;
                width: 90px;
                height: 90px;
                font-size: 18px;
                float: right
            }

            label {
                font-size: 20px;
            }

            .empty { 
                opacity: .01;
                height:100%; 
                width: 500px;
                padding-left: -30px; 
            }

            .modal-title {
                text-align: center;
                font-size: 25px;
                text-decoration: underline;
                position: relative;
                height: 10px;
                margin-top: 5px
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
        const symbol = entry.type == "task" ? "📌" : entry.type == "event" ? "🥳" : "📝"
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

    
    /**
     * Function which will return the entry property of Entry
     * @returns The entry property of Entry
     */
    get entry(){ 
        return this.internalEntry; 
    }

    //DnD stuff 
    handleDragStart(event) {
        // Keep track of element we're dragging
        dragSrcEl = event.target;
        //Make sure you can't drag empty entries 
        if (event.target.entry.journal_id == null){ 
            return; 
        }

        event.target.classList.add('dragElem'); 
    }

    handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault(); // Necessary. Allows us to drop.
        }
        event.target.classList.add('over');
      
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
            let dOnIndex; 

            //Case of dragging on empty 

            console.log(event.target.entry.journalId); 
            console.log(event.target.entry.journal_id); 
            if (event.target.entry.journal_id == null){ 
                dOnIndex = 0; 
            }
            //Case of dragging on non empty entry 
            else{ 
                dOnIndex = draggedOnEc.idOrder.findIndex((element) => element == event.target.entry.id);
            }

            //Set direction
            console.log("DonIndex: " + dOnIndex); 
            let up2Down = dragIndex < dOnIndex;   

            //If they have the same shadowroot
            if (dragEc.isSameNode(draggedOnEc)) { 
                parent = event.target.parentNode;

                console.log(dragEc.idOrder); 
                //Swap positions of elements in id lists
                dragEc.swapIds(dragIndex, dOnIndex, up2Down);

                //Update sorting in backend 
                updateSorting(getJournal(), new Date(getDate()), dragEc.idOrder, getHeader());

                //Remove the entry we're dragging from textbox UI
                parent.removeChild(dragSrcEl);

                //Recreate the element with stored data in DataTransfer object in UI
                let dropElement = new Entry(); 
                let entry = dragSrcEl.entry; 

                dropElement.entry = entry; 

                //Dragged object was above the one it's dropped on
                if (up2Down){ 
                    event.target.insertAdjacentElement('afterend', dropElement);
                }
                //Always insert on top
                else {
                    event.target.insertAdjacentElement('beforebegin', dropElement);
                }
            }
            //Don't have the same shadow root
            else { 
                parent = dragSrcEl.parentNode;

                //Set date on dragSrcEl to date it was dragged to in server
                let movedBullet = dragSrcEl.entry; 
                movedBullet.date = draggedOnEc.date;  

                //Update bullet date in server
                editBullet(movedBullet, getHeader()).then(
                );

                //Remove draggedB from its ec id list
                dragEc.idOrder.splice(dragIndex, 1)

                //Insert draggedB into draggedOn's ec id list 
                draggedOnEc.diffListIns(dOnIndex, dragSrcEl.entry); 
                
                //Update sorting in backend 
                updateSorting(getJournal(), new Date(dragEc.date), dragEc.idOrder, getHeader());
                updateSorting(getJournal(), new Date(draggedOnEc.date), draggedOnEc.idOrder, getHeader());

                //UI visuals   
                parent.removeChild(dragSrcEl);            
                //Recreate the element with stored data in DataTransfer object
                let dropElement = new Entry(); 
                let entry = dragSrcEl.entry; 
                dropElement.entry = entry; 
    
                //If dragged to bottom, insert at bottom 
                if (dOnIndex + 1 == draggedOnEc.idOrder.length - 1){ 
                    event.target.insertAdjacentElement('afterend', dropElement); 
                }
                else{ 
                    event.target.insertAdjacentElement('beforebegin', dropElement); 
                }
                //Empty cases
                if (event.target.entry.journal_id == null){ 
                    let otherParent = event.target.parentNode; 
                    otherParent.removeChild(event.target); 
                }
                //Moving the bulle made the moved from ec empty
                if (parent.children.length == 0){ 
                    //Attach empty entry if no entries 
                    let entryComponent = new Entry(); 
                    entryComponent.entry = { 
                        journal_id: null,
                        body: null,
                        type: null,
                        priority: 1,
                        mood: 1,
                        date: null,
                    };
                    //Make it invisible 
                    let textBox =  dragEc.shadowRoot.querySelector("#entryContainer");
                    entryComponent.shadowRoot.querySelector('li').className = "empty";
                    textBox.appendChild(entryComponent); 
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

    /**
     * Renders the edit modal popup, allowing users to edit, finish, and delete bullets
     */
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
        entry.addEventListener("dblclick", async () => {

            //changes modal textbox to match entry's content
            shadow.getElementById("modal-words").value = shadow.getElementById("content").textContent;
            
            //bullet to change
            let bulletChange;

            //used in getBulletsByDay
            let journalId = getJournal(); 
            let theDate = this.getRootNode().host.date; 

            //Get bullets for that day from the backend to find the one to edit
            await getBulletsByDay(journalId,new Date(theDate), getHeader()).then((value) =>{
                for(let i = 0; i < value.length; i++) {

                    //found the bullet
                    if(value[i].body == shadow.getElementById("content").textContent ||
                      value[i].body == shadow.getElementById("content").innerHTML    &&
                      value[i].type == this.shadowRoot.querySelector("#type").className) {
                        bulletChange = value[i];
                    }
                }
            });

            //makes sure that the bullet has an is_done value
            if(bulletChange.is_done == null) {
                bulletChange.is_done = false;
            }

            //Makes sure finish bullet button says the right text
            if(bulletChange.is_done == true) {
                strike.firstChild.nodeValue = "Unfinish Bullet";
            }
            else {
                strike.firstChild.nodeValue = "Finish Bullet";
            }

            //shows modal
            modal.style.display = "block";

            //edit button from modal
            var edit = shadow.getElementById("editButton");
            edit.onclick = async (event) => {
                event.preventDefault();

                //changes entry's content and bullet type
                shadow.getElementById("content").textContent = shadow.getElementById("modal-words").value;
                bulletChange.body = shadow.getElementById("modal-words").value;
                let choices = shadow.getElementById("radioEdit").querySelectorAll("input[name='entryTypeEdit']"); 

                //looks for the bullet type
                for (const choice of choices) { 
                    if (choice.checked){ 
                        entry.className = choice.value;
                        choice.checked = false;
                        bulletChange.type = choice.value;
                    }
                }
                //used to change onscreen bullet type since the above only changes backend
                let symbol = "";
                if(symbol == "") {
                    symbol = entry.className == "task" ? "📌" : entry.className == "event" ? "🥳" : "📝"
                }
                shadow.getElementById("symbol").textContent = symbol;
                
                //edits bullet in the backend and closes modal
                await editBullet(bulletChange, getHeader());
                modal.style.display = "none";
            }; //end edit bullet method
            
            //adds strikethrough through entry
            strike.onclick = async (event) => {
                event.preventDefault();

                //holds strikethrough text
                var strikeT;

                //makes sure bulletChange has a value
                if(bulletChange.is_done == null) {
                    bulletChange.is_done = false;
                }

                //removes strikethrough and changes strike button txt
                if(bulletChange.is_done == true) {

                    //remove strikethrough text
                    strikeT = shadow.getElementById("content").innerHTML.replace("<strike>",'');
                    strikeT = strikeT.replace("</strike>",'');

                    //updates button txt
                    strike.firstChild.nodeValue = "Finish Bullet";

                    //updates relevant bullet parts
                    bulletChange.isDone = false;
                    bulletChange.body = strikeT;

                    //updates onscreen text
                    shadow.getElementById("content").innerHTML = strikeT;
                }
                //add strikethrough and changes strike button text
                else {
                    //adds strikethrough text
                    strikeT = "<strike>" + shadow.getElementById("content").innerHTML + "</strike>";

                    //updates button txt
                    strike.firstChild.nodeValue = "Unfinish Bullet";

                    //updates relevant bullet parts
                    bulletChange.body = strikeT;
                    bulletChange.isDone = true;

                    //updates onscreen text
                    shadow.getElementById("content").innerHTML = strikeT;
                }

                //closes modal and updates bullet
                modal.style.display = "none";
                await editBullet(bulletChange, getHeader());
            };    //end strikethrough function

            //Delete listener 
            let delButton = this.shadowRoot.querySelector("#deleteButton"); 
            delButton.addEventListener('click', (event)=> { 
                event.preventDefault();

                //Delete the bullet in the server 
                deleteBullet(this.internalEntry.id, getHeader()).then(()=> { 
                    let ec = this.getRootNode().host; 
                    //Update ec id list 
                    let index = ec.idOrder.findIndex((element) => element == this.internalEntry.id);
                    ec.idOrder.splice(index,1);  
                    
                    let date; 
                    //daily 
                    if (ec.currDate == undefined){ 
                        date = getDate(); 
                    }
                    //weekly
                    else { 
                        date = ec.currDate; 
                    }
                    //Update list in backend
                    updateSorting(getJournal(), new Date(date), ec.idOrder, getHeader()); 
                    this.remove(); 

                    //Empty funcionality 
                    if (ec.shadowRoot.querySelector("#entryContainer").children.length == 0){ 
                        //Attach empty entry if no entries 
                        let entryComponent = new Entry(); 
                        entryComponent.entry = { 
                            journal_id: null,
                            body: null,
                            type: null,
                            priority: 1,
                            mood: 1,
                            date: null,
                        };
                        //Make it invisible 
                        let textBox =  ec.shadowRoot.querySelector("#entryContainer");
                        entryComponent.shadowRoot.querySelector('li').className = "empty";
                        textBox.appendChild(entryComponent); 
                    }
                }); 
            });

        }); //end edit bullet event listener 

    } //end render

} //end class

//Define the custom element 
customElements.define('entry-comp', Entry); 