import {getBulletsByDay, getJournals, addBullet} from '../../api/journal'
import {getJournal, setJournal} from '../../utils/localStorage'
import getHeader from '../../utils/header'

export class DailyPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {


        const template = document.createElement("template");
        this.attachShadow({ mode: 'open' });

        template.innerHTML = `
            <body>
                <div id="datePickerDiv"></div>
                <div id="entryCreatorDiv"> </div>
            </body>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //const topNav = document.createElement('top-Nav');
        //Attach entry creator and datepicker to template div 
        const ec = document.createElement('entry-creator');

        const datePicker = document.createElement('date-picker');

        this.shadowRoot.querySelector('#datePickerDiv').append(datePicker);
        this.shadowRoot.querySelector('#entryCreatorDiv').append(ec);

        //Store the user's journal id into local storage
        getJournals(getHeader()).then((value) => { 
            setJournal(value[0].id);
        });

        // Listen to Date changes from date picker
        document.addEventListener('dateChange', e => {
            ec.renderBullets(); 
        })

    }
}

customElements.define("daily-page", DailyPage);
