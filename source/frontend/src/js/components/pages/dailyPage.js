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

        //Attach entry creator and datepicker to template div 
        const ec = document.createElement('entry-creator');

        const datePicker = document.createElement('date-picker');

        this.shadowRoot.querySelector('#datePickerDiv').append(datePicker);
        this.shadowRoot.querySelector('#entryCreatorDiv').append(ec);

        //Store the user's journal id into local storage
        getJournals().then((value) => { 
            setJournal(value[0].id);
        });

        getBulletsByDay(getJournal(), new Date('2021 04 26')).then((value) => { 
            console.log(value); 
        });

        //On click of arrows on date picker, render the entries from that date 
        this.shadowRoot.querySelector('date-picker').shadowRoot.querySelector('#next').addEventListener('click', ()=>{
            ec.renderBullets(); 
            console.log(ec.bulletOrder); 
        });

        //On click of arrows on date picker, render the entries from that data 
        this.shadowRoot.querySelector('date-picker').shadowRoot.querySelector('#prev').addEventListener('click', ()=>{
            ec.renderBullets(); 
        });
    }
}

customElements.define("daily-page", DailyPage);
