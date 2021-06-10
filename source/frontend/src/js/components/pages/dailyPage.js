import { getJournals } from '../../api/journal'
import { getDate, getJournal, setJournal } from '../../utils/localStorage'
import getHeader from '../../utils/header'
import EntryCreator from '../EntryCreatorDay/EntryCreator'
import DatePicker from '../DatePicker'
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

        //Attach entry creator and datepicker to template div 
        const ec = new EntryCreator()
        const dp = new DatePicker()

        getJournals(getHeader()).then((value) => {
            setJournal(value[0].id);

            this.shadowRoot.querySelector('#datePickerDiv').append(dp);
            this.shadowRoot.querySelector('#entryCreatorDiv').append(ec);
    
            // Listen to Date changes from date picker
            document.addEventListener('dateChange', e => {
                ec.renderBullets(getDate());
            })
        });
    }
}

customElements.define("daily-page", DailyPage);
