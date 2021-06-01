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
        `
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style);    
        
        this.dateEnd.setDate(this.dateStart.getDate() + 7); 
        let startText = this.dateStart.toLocaleString('default', {month: 'long'}) + " " + this.dateStart.getDate() + ", " + this.dateStart.getFullYear(); 
        let endText = this.dateEnd.toLocaleString('default', {month: 'long'}) + " " + this.dateEnd.getDate() + ", " + this.dateEnd.getFullYear(); 

        //Set beginning text 
        this.shadowRoot.getElementById("date").innerText = startText + "———" + endText; 

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
    }

    /**
     * Function which goes to the next week by changing internal dates and resetting text
     */
    plusWeek(){ 
        this.dateStart = new Date(this.dateEnd.toDateString());
        this.dateEnd.setDate(this.dateEnd.getDate() + 7); 
        let startText = this.dateStart.toLocaleString('default', {month: 'long'}) + " " + this.dateStart.getDate() + ", " + this.dateStart.getFullYear(); 
        let endText = this.dateEnd.toLocaleString('default', {month: 'long'}) + " " + this.dateEnd.getDate() + ", " + this.dateEnd.getFullYear(); 

        //Set text 
        this.shadowRoot.getElementById("date").innerText = startText + "———" + endText; 
    }

    /**
     * Function which goes to the last week by changing internal dates and resetting the text
     */
    minusWeek(){ 
        let temp = new Date(this.dateStart.toDateString()); 
        this.dateStart.setDate(this.dateStart.getDate() -7); 
        this.dateEnd = temp; 

        let startText = this.dateStart.toLocaleString('default', {month: 'long'}) + " " + this.dateStart.getDate() + ", " + this.dateStart.getFullYear(); 
        let endText = this.dateEnd.toLocaleString('default', {month: 'long'}) + " " + this.dateEnd.getDate() + ", " + this.dateEnd.getFullYear(); 

        //Set text 
        this.shadowRoot.getElementById("date").innerText = startText + "———" + endText; 
    }
    
    /**
     * Makes and returns an array of dates between dateStart and dateEnd 
     * @returns {Array} - Returns the array of dates between dateStart and dateEnd 
     */
    sendArray(){ 
        
    }
}
window.customElements.define('week-picker', WeekPicker);