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
}

//Define the custom element 
customElements.define('entry-comp', Entry); 