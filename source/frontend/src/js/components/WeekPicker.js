/**
 * Creates a new Week Picker on the Weekly view page to allow users to choose which week they want
 * @class 
 * */
export default class WeekPicker extends HTMLElement {

    //Hold the current date end and date starts
    dateStart = new Date();
    dateEnd = new Date(); 
    
    constructor(){ 
        super(); 
        this.attachShadow({ mode: 'open' })
        const template = document.createElement('template'); 
        template.innerHTML = `
        <div class="full-date">
            <i class='left-arrow' id="prev"></i>
            <h1 id="date"></h1>
            <i class='right-arrow' id="next"></i>
        </div>
        `
        let style = document.createElement('style');

        style.textContent = `
            .full-date {
                display: flex;
                flex-direction: row;
                position: relative;
                top: 45px;
                left: 100px;
                align-items: center;
                justify-content: center;
                padding-top: 3.0rem;
                margin-bottom: 1.4rem;
            }
            .left-arrow {
                color: white;
                border-style: solid;
                border-width: 1px 1px 0 0;
                content: '';
                display: inline-block;
                height: 1.5em;
                width: 1.5em;
                position: sticky;
                vertical-align: top;
                margin-right: 5em;
                transform: rotate(-135deg);
            }
            .right-arrow{
                color: white;
                border-style: solid;
                border-width: 1px 1px 0 0;
                content: '';
                display: inline-block;
                height: 1.5em;
                width: 1.5em;
                position: sticky;
                vertical-align: top;
                margin-left: 5em;
                transform: rotate(45deg);
            }
            #date {
                display: flex;
                position: sticky;
                margin-left: 0.5em;
                align-items: center;
                color: white;
                font-family: 'Lato', sans-serif;
                font-weight: 300;
            }
        `
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style);    
        
        this.dateEnd.setDate(this.dateStart.getDate() + 7); 
        let startText = this.dateStart.toLocaleString('default', {month: 'long'}) + " " + this.dateStart.getDate() + ", " + this.dateStart.getFullYear(); 
        let endText = this.dateEnd.toLocaleString('default', {month: 'long'}) + " " + this.dateEnd.getDate() + ", " + this.dateEnd.getFullYear(); 

        //Set beginning text 
        this.shadowRoot.getElementById("date").innerText = startText + " — " + endText; 

        //Add event listeners for clicking on the arrows 
        this.shadowRoot.getElementById("next").addEventListener('click', () => {
            //Change week 
            this.plusWeek(); 

            //Fire event to create entry-creators 
            document.dispatchEvent(new CustomEvent("weekChange", { 
                detail: { 
                    start: this.dateStart, 
                    end: this.dateEnd
                }
            }));
        }); 

        this.shadowRoot.getElementById("prev").addEventListener('click', ()=> {
            //change week 
            this.minusWeek(); 

            //Fire event to create entry-creators
            document.dispatchEvent(new CustomEvent("weekChange", { 
                detail: { 
                    start: this.dateStart, 
                    end: this.dateEnd
                }
            }));
        }); 

        this.sendArray(); 
    }

    /**
     * Function which goes to the next week by changing internal dates and resetting text
     */
    plusWeek(){ 
        //this.dateStart = new Date(this.dateEnd.toDateString());
        this.dateStart.setDate(this.dateStart.getDate() + 7); 
        this.dateEnd.setDate(this.dateEnd.getDate() + 7); 
        let startText = this.dateStart.toLocaleString('default', {month: 'long'}) + " " + this.dateStart.getDate() + ", " + this.dateStart.getFullYear(); 
        let endText = this.dateEnd.toLocaleString('default', {month: 'long'}) + " " + this.dateEnd.getDate() + ", " + this.dateEnd.getFullYear(); 

        //Set text 
        this.shadowRoot.getElementById("date").innerText = startText + " — " + endText; 
    }

    /**
     * Function which goes to the last week by changing internal dates and resetting the text
     */
    minusWeek(){ 
        let temp = new Date(this.dateStart.toDateString()); 
        this.dateStart.setDate(this.dateStart.getDate() - 7); 
        this.dateEnd.setDate(this.dateEnd.getDate() - 7);

        let startText = this.dateStart.toLocaleString('default', {month: 'long'}) + " " + this.dateStart.getDate() + ", " + this.dateStart.getFullYear(); 
        let endText = this.dateEnd.toLocaleString('default', {month: 'long'}) + " " + this.dateEnd.getDate() + ", " + this.dateEnd.getFullYear(); 

        //Set text 
        this.shadowRoot.getElementById("date").innerText = startText + " — " + endText; 
    }
    
    /**
     * Makes and returns an array of date strings between dateStart and dateEnd 
     * @returns {Array} - Returns the array of date strings between dateStart and dateEnd 
     */
    sendArray(){ 
        let array = []; 
        let currDate = new Date(this.dateStart.toDateString());
        while (currDate.toDateString() != this.dateEnd.toDateString()){ 
            array.push(currDate.toDateString()); 
            currDate.setDate(currDate.getDate() + 1); 
        }
        array.push(this.dateEnd.toDateString()); 
        return array; 
    }
}
window.customElements.define('week-picker', WeekPicker);