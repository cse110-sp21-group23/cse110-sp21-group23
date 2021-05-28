import EntryCreator from '../EntryCreatorComponent/entry-creator'
import Entry from '../EntryCreatorComponent/entry'
import {getBulletsByDay, getJournals} from '../../api/journal'
import {getJournal, setJournal} from '../../utils/localStorage'
import DatePicker from '../date-picker'

export class DailyPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {

        const template = document.createElement("template");
        this.attachShadow({ mode: 'open' });

        template.innerHTML = `
            <div id="datePickerDiv"></div>
            <div id="entryCreatorDiv"> </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //Store the journal id into local storage
        getJournals().then((value) => { 
            setJournal(value[0].id);
        })

        //Attach entry creator and datepicker to template div 
        const ec = document.createElement('entry-creator');
        const datePicker = document.createElement('date-picker');

        this.shadowRoot.querySelector('#datePickerDiv').append(datePicker);
        this.shadowRoot.querySelector('#entryCreatorDiv').append(ec);

    }
}

customElements.define("daily-page", DailyPage);
