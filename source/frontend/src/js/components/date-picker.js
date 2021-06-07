import {setDate} from "../utils/localStorage"
import Calendar from './calendar'
// July 9, 2021
const dates = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 

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

        dateText = months[month] + " " + dates[date] + " " + year;

        super();

        this.attachShadow({ mode: 'open' })

        const template = document.createElement('template');

        template.innerHTML = `

            <div class="full-date">
                <i class='left-arrow' id="prev"></i>
                <div id="date">
                    <h2 id="month-text"></h2>
                    <h1 id="date-text">test</h1>
                </div>
                <i class='right-arrow' id="next"></i>
            </div>

        `
        let style = document.createElement('style');

        style.textContent = `
            #date-text{
                color: black;
                font-family: 'Lato', sans-serif;
                font-weight: 300;
            }
            #month-text{
                color: black;
                font-family: 'Lato', sans-serif;
                font-weight: lighter;
                margin-bottom: 1.5em;
                padding-right: 0.25em;
            }
            .full-date {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-top: 2.0rem;
                margin-bottom: 1.4rem;
            }
            .left-arrow {
                border-style: solid;
                border-width: 1px 1px 0 0;
                content: '';
                display: inline-block;
                height: 1.25em;
                width: 1.25em;
                position: fixed;
                vertical-align: top;
                margin-right: 30em;
                transform: rotate(-135deg);
            }
            .right-arrow{
                border-style: solid;
                border-width: 1px 1px 0 0;
                content: '';
                display: inline-block;
                height: 1.25em;
                width: 1.25em;
                position: fixed;
                vertical-align: top;
                margin-left: 30em;
                transform: rotate(45deg);
            }

            #date {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                padding-left: 3rem;
                padding-right: 3rem;
                border-radius: 5em;
                color: transparent;
            }
        `

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style);
        let calendar = document.createElement('calendar-picker');

        this.shadowRoot.getElementById("date").append(calendar)

        this.shadowRoot.getElementById("month-text").innerHTML = days[day];
        this.shadowRoot.getElementById("date-text").innerHTML = dateText;

        //Store the date into local storage 
        setDate(myDate); 

        this.shadowRoot.getElementById("next").addEventListener('click', (e) => {
            this.next();
            setDate(myDate); 
            document.dispatchEvent(new CustomEvent("dateChange", {
                detail: myDate
            }))
        });

        this.shadowRoot.getElementById("prev").addEventListener('click', (e) => {
            this.prev();
            setDate(myDate); 
            document.dispatchEvent(new CustomEvent("dateChange", {
                detail: myDate
            }))
        });

        document.addEventListener('calendarDateChanged', e => {
            myDate = e.detail
            date = e.detail
            setDate(e.detail)
            document.dispatchEvent(new CustomEvent("dateChange", {
                detail: e.detail
            }))
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

        //This portion re-renders the current date string and appends it to the h1 tag
        dateText = months[month] + " " + dates[date] + " " + year;
        this.shadowRoot.getElementById("date-text").innerHTML = dateText;
        this.shadowRoot.getElementById("month-text").innerHTML = days[day];
    }

    prev() {
        myDate = new Date(myDate - 86400000);
        year = myDate.getFullYear();
        month = myDate.getMonth();
        day = myDate.getDay();
        date = myDate.getDate();
        this.shadowRoot.querySelector('calendar-picker').date = myDate
        
        //This portion re-renders the current date string and appends it to the h1 tag
        dateText = months[month] + " " + dates[date] + ", " + year;
        this.shadowRoot.getElementById("date-text").innerHTML = dateText;
        this.shadowRoot.getElementById("month-text").innerHTML = days[day];
    }
    
    get date() { 
        return myDate; 
    }

}

window.customElements.define('date-picker', DatePicker);
