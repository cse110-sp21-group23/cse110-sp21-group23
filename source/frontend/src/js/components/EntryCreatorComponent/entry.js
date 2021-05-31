import EntryCreator from "./entry-creator"
import {updateSorting} from "../../api/journal"
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
                <p id="content"></p><br>
                <img src="" alt="" class="entry-image"></img> <br>
                <audio src="" class="entry-audio"></audio>
            </li>`

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

        //Get container 
        let ec = document.querySelector("daily-Page").shadowRoot.querySelector("entry-creator"); 

        //Get roots of element being dragged and element begin dropped on 
        let droppedRoot = dragSrcEl.getRootNode();
        let eventRoot = event.target.getRootNode(); 

        // Don't do anything if dropping the same column we're dragging.
        if (!(dragSrcEl.isSameNode(event.target))) {
            let parent; 
            let up2Down = dragSrcEl.getBoundingClientRect().top > event.target.getBoundingClientRect().top; 

            //If they have the same shadowroot
            if (droppedRoot.isSameNode(eventRoot)) { 
                parent = event.target.parentNode; 

                //Swap positions of elements in both container lists 
                ec.swapBullets({id: dragSrcEl.entry.id, priority: dragSrcEl.entry.priority}, {id: event.target.entry.id, priority: event.target.entry.priority}); 
                ec.swapIds(dragSrcEl.entry.id, event.target.entry.id);

                //Update sorting in backend 
                updateSorting(getJournal(), new Date(getDate()), ec.idOrder); 
            }
            //Don't have the same shadow root
            else { 
                parent = dragSrcEl.parentNode; 
            }

            //Dragged object was above the one it's dropped on
            if (up2Down){ 
                //Remove the entry we're dragging from textbox
                parent.removeChild(dragSrcEl);

                //Recreate the element with stored data in DataTransfer object
                let dropElement = document.createElement('entry-comp');
                let entry = JSON.parse(event.dataTransfer.getData('text/plain'));
                dropElement.entry = entry; 

                event.target.insertAdjacentElement('beforebegin', dropElement);
            }
            //Dragged object was below the one it's dropped on
            else {
                //Remove the entry we're dragging from textbox
                event.target.parentNode.removeChild(dragSrcEl);

                //Recreate the element with stored data in DataTransfer object
                let dropElement = document.createElement('entry-comp');
                let entry = JSON.parse(event.dataTransfer.getData('text/plain'));
                dropElement.entry = entry; 

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
}

//Define the custom element 
customElements.define('entry-comp', Entry); 