import EntryCreator from '../EntryCreatorComponent/entry-creator'
import Entry from '../EntryCreatorComponent/entry'

export class DailyPage extends HTMLElement{ 
    connectedCallback() {
        this.render(); 
    }

    render(){ 

        const template = document.createElement("template"); 
        this.attachShadow({mode: 'open'});

        template.innerHTML = `
        <div id="entryCreatorDiv"> 
        </div>`; 

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //Attach entry creator to template div 
        const ec = document.createElement("entry-creator");
        this.shadowRoot.querySelector("#entryCreatorDiv").append(ec); 
    }
}

customElements.define("daily-page", DailyPage);
