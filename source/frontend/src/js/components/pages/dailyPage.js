import EntryCreator from '../EntryCreatorComponent/entry-creator'
import Entry from '../EntryCreatorComponent/entry'

export class DailyPage extends HTMLElement{ 
    connectedCallback() {
        this.render(); 
    }

    render(){ 

        const template = document.createElement('template'); 
        this.attachShadow({mode: 'open'});

        template.innerHTML = `
        <div id="entryCreatorDiv"> </div>
        <div id="textBox"> 
            <ul id="entryContainer">
            </ul> 
        </div>`; 

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //Attach entry creator to template div 
        const ec = document.createElement('entry-creator');
        this.shadowRoot.querySelector('#entryCreatorDiv').append(ec);

        //Get the form in entry-creator
        const form = ec.shadowRoot.getElementById("entryCreator");

        //Attach submit event listener to ec form 
        form.addEventListener('submit', (event)=>{
            event.preventDefault(); 

            //Obtain the text box in index.html
            let textBox = this.shadowRoot.querySelector("#entryContainer");

            //Make an entry component 
            let entryComponent = document.createElement('entry-comp');
            
            //Create entry object using entry-creator and use to set entry-component
            let entry = ec.createEntry(); 
            entryComponent.entry = entry; 
    
            //Add the entry component to the text box        
            textBox.appendChild(entryComponent); 
            form.reset(); 
        });    
    }
}

customElements.define('daily-page', DailyPage);