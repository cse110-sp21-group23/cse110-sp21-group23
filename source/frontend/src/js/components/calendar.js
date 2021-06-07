
var field;
var date;
export default class Calendar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');

        template.innerHTML = `
        <style>
        .datepicker-toggle {
            display: inline-block;
            position: relative;
            width: 18px;
            height: 19px;
        }
        .datepicker-toggle-button {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            background-image: url(https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png);
        }
        .datepicker-input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            box-sizing: border-box;
        }
        .datepicker-input::-webkit-calendar-picker-indicator {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            cursor: pointer;
        }
        </style>


        <span class="datepicker-toggle">
            <span class="datepicker-toggle-button"></span>
            <input 
                id="today" 
                type="date"
                class="datepicker-input" 
                pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" placeholder="YYYY-MM-DD"/>
        </span>
        `
        let style = document.createElement('style');

        style.textContent = `

        `

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Variables
        field = this.shadowRoot.getElementById('today');
        date = new Date();

        if (this.isDateSupported()) {
            // Remove attributes
            field.removeAttribute('pattern');
            field.removeAttribute('placeholder');

            // Remove the helper text
            var helperText = document.querySelector('[for="today"] .description');
            if (helperText) {
                helperText.parentNode.removeChild(helperText);
            }
        }

        this.shadowRoot.querySelector('#today').value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);
        this.shadowRoot.querySelector('#today').addEventListener('change', () => {
            document.dispatchEvent(new CustomEvent("calendarDateChanged", {
                detail: new Date(this.shadowRoot.querySelector('#today').value)
            }))
        })
    }

    set date(d) {
        date = d
        this.shadowRoot.querySelector('#today').value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);
    }

    get date() {
        return d
    }

    expandComponent(e) {
        var content = e.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
    /**
    * Test if the browser supports input[type="date"]
    * @return {Boolean} Returns true if it's supported
    */
    isDateSupported() {
        var input = document.createElement('input');
        input.setAttribute('type', 'date');
        input.setAttribute('value', 'x');
        return (input.value !== 'x');
    };
}
window.customElements.define('calendar-picker', Calendar);

