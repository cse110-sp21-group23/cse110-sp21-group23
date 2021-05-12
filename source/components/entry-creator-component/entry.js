class Entry extends HTMLElement{ 

    /**
     * Constructor of Entry component 
     * @param {Object} entry - Use an entry object returned from entry-creator to create 
     * an Entry component 
     */
    constructor(entry) { 
        super(); 
        //These fields are required to be filled  
        this.type = entry.type 
        this.content = entry.content 

        //Optional fields 
        if (entry.image) { 
            this.imgSrc = entry.image.src; 
            this.imgAlt = entry.image.alt; 
        }
        
        if (entry.audio) { 
            this.audio = entry.audio; 
        }
    }
}
//Define the custom element 
customElements.define('entry-comp', Entry); 