
var field;
var date;
export default class Calendar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');

        template.innerHTML = `
            <input 
                id="today" 
                type="date" 
                pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" placeholder="YYYY-MM-DD"/>
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

    
    /**
     * Function which will change the current date
     * @param  {Date} d
     */
    set date(d) {
        date = d
        this.shadowRoot.querySelector('#today').value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);
    }

    
    
    /**
     * Function which returns the current date
     * @returns The current date
     */
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

