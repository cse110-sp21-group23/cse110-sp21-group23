import {setDate} from "../utils/localStorage"
import Calendar from './calendar'
// July 9, 2021
const dates = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 

let myDate = new Date();
let year;
let month;
let day;
let date;
let dateText;

export default class DatePicker extends HTMLElement {
    constructor() {

        year = myDate.getFullYear();
        month = myDate.getMonth();
        day = myDate.getDay();
        date = myDate.getDate();

        dateText = days[day] + ", " + months[month] + " " + dates[date] + ", " + year;

        super();

        this.attachShadow({ mode: 'open' })

        const template = document.createElement('template');

        template.innerHTML = `

            <div class="full-date">
                <i class='fas fa-angle-left fa-pull-left' id="prev"> &lt;</i>
                <div id="date"></div>
                <i class='fas fa-angle-right' id="next"> &gt; </i>
            </div>

        `
        let style = document.createElement('style');

        style.textContent = `
            .full-date {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }

            #date {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }
        `

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style);
        let calendar = document.createElement('calendar-picker');

        this.shadowRoot.getElementById("date").append(calendar)

        //Store the date into local storage 
        setDate(myDate); 

        this.shadowRoot.getElementById("next").addEventListener('click', (e) => {
            this.next();
            setDate(myDate); 
        });

        this.shadowRoot.getElementById("prev").addEventListener('click', (e) => {
            this.prev();
            setDate(myDate); 
        });

        document.addEventListener('changeDay', e => {
            myDate = e.detail
            setDate(e.detail)
        })

    }

    expandComponent(e) {
        let content = e.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    next() {
        myDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() + 1);
        year = myDate.getFullYear();
        month = myDate.getMonth();
        day = myDate.getDay();
        date = myDate.getDate();
        this.shadowRoot.querySelector('calendar-picker').date = myDate
    }

    prev() {
        myDate = new Date(myDate - 86400000);
        year = myDate.getFullYear();
        month = myDate.getMonth();
        day = myDate.getDay();
        date = myDate.getDate();
        this.shadowRoot.querySelector('calendar-picker').date = myDate
    }
    
    get date() { 
        return myDate; 
    }

}

window.customElements.define('date-picker', DatePicker);
