import EntryCreator from '../EntryCreatorComponent/entry-creator'
import Entry from '../EntryCreatorComponent/entry'
import {getBulletsByDay, getJournals} from '../../api/journal'
import {getJournal, setJournal} from '../../utils/localStorage'

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

        // getBulletsByDay(7, new Date("2021,4,26")).then(value =>{
        //     console.log(value); 
        // }); 

        //Store the journal id into local storage
        getJournals().then((value) => { 
            setJournal(value[0].id);
        })

        //Attach entry creator to template div 
        const ec = document.createElement("entry-creator");
        this.shadowRoot.querySelector("#entryCreatorDiv").append(ec); 
    }
}

customElements.define("daily-page", DailyPage);
