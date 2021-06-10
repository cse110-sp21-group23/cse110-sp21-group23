import EntryCreatorWeek from "../EntryCreatorWeek/EntryCreatorWeek"
import WeekPicker from "../WeekPicker"

/**
 * Creates a new Weekly Kanban View container to display days in
 * @class 
 * */
export default class WeeklyKanban extends HTMLElement {
    //Array of all entry-creator-day's in the component's days 
    ecArray = [];
    //Array of the days we're rendering
    dayArray = [];

    constructor() {
        super();

        // Create HTML of weekly kanban 
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="container flex-container">
            <div class="column-container">
                <div class='d4'>
                    <div class="day monday">
                        <p class="title">Mon</p>

                        <div class="column-content">
                        </div>
                    </div>
                    <div class="day tuesday">
                        <p class="title">Tue</p>
                        <div class="column-content"></div>
                    </div>
                    <div class="day wednesday">
                        <p class="title">Wed</p>
                        <div class="column-content"></div>
                    </div>
                    <div class="day thursday">
                        <p class="title">Thur</p>
                        <div class="column-content"></div>
                    </div>
                </div>
                <div class='d4'>
                    <div class="day friday">
                        <p class="title">Fri</p>
                        <div class="column-content"></div>
                    </div>
                    <div class="day saturday">
                        <p class="title">Sat</p>
                        <div class="column-content"></div>
                    </div>
                    <div class="day sunday">
                        <p class="title">Sun</p>
                        <div class="column-content"></div>
                    </div>
                    <div class="day monday">
                        <p class="title">Mon</p>
                        <div class="column-content"></div>
                    </div>
                </div>
            </div>
        </div>`;

        this.attachShadow({ mode: 'open' });

        // Add styling to weeklyComponent
        let style = document.createElement('style');
        style.textContent = `
        .flex-container {
            display: flex;
            position: relative;
            left: 210px;
            font-size: 2rem;
            text-align: center;
            min-height: 30rem;
            padding-top: 2rem;
            margin: 1rem;
            width:87%;
        }
        
        .d4 {
            height: 50%;
            display: flex;
            flex-wrap: nowrap;
            overflow: hidden;
            overflow-x: auto;
            flex-direction: row;
        }
        p {
            color: white;
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            font-size: 0.75em;
            padding-top: 0rem;
            padding-left: 2rem;
            text-align: left;
        }

        .column-container {
            display: flex;
            flex-wrap: nowrap;
            overflow: hidden;
            overflow-x: auto;
            flex-direction: column;
            width: 100%;
            max-height: 100vh;
            background-color: #384E5E;
        }
        
        .day {
            background: #384E5E;
            border: 1px solid #2FC4F3;
            width: 20rem;
            min-height: 4rem;
            flex-basis: 8rem;
            min-width: 300px;
            min-height: 750px;
            flex-grow: 1;
        }
        
        .column-content {
            padding: 5px;
            width: 95%;
            height: 95%;
            overflow-x: hidden;
            overflow-y: auto;
            text-align:justify;
            max-height: 75%;
        }
        
        .column-content > button {
          word-wrap: break-word;
          font-size: 50%;
        }
        .bullet-entry {
            border-style: solid;
            border-width: 1pt;
            border-color: #6a828d;
            border-radius: 10px;
            box-shadow: 1px 1px 3px #6a828d;
            background-color: #;
            text-align: left;
            padding: 0.6em;
            margin: auto;
            width: 100%;
            height: auto;
        }
        
        .bullet-entry:hover {
            background-color: #384E5E;
            border-color: pink;
        }`;

        // Attach template and style to this shadowRoot
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        //Get weekpicker on page 
        let weekP = document.querySelector("weekly-page").shadowRoot.querySelector("week-picker");
        this.dayArray = weekP.sendArray();

        let colContent = this.shadowRoot.querySelectorAll(".column-content");
        let titles = this.shadowRoot.querySelectorAll(".title"); 
        for (let index = 0; index < colContent.length; index++) {
            //Append ecw to all days 
            let ecWeek = document.createElement('entry-creator-week');
            colContent[index].appendChild(ecWeek);
            this.ecArray[index] = ecWeek;

            //Render all respective bullets 
            ecWeek.renderBullets(this.dayArray[index]);

            //Set internal date 
            ecWeek.date = this.dayArray[index];
            //Rename title HTML of all days 
            let date = new Date(this.dayArray[index]); 
            let day = this.dayArray[index].split(' '); 
            titles[index].innerHTML = day[0] + ' ' + date.toLocaleDateString ('default', {month: 'long'}) + " " + date.getDate(); 

        }
        //Event listener to update day array on week change event 
        document.addEventListener('weekChange', () => {
            this.dayArray = weekP.sendArray();
            this.renderAllEc();
        });
    }

    /**
     * Will render the day for each of the boxes. 
     */
    renderAllEc() {
        let colContent = this.shadowRoot.querySelectorAll(".column-content");

        let titles = this.shadowRoot.querySelectorAll(".title"); 
        for (let index = 0; index < colContent.length; index++) {
            this.ecArray[index].date = this.dayArray[index];  
            this.ecArray[index].renderBullets(this.dayArray[index]);

            //Rename title HTML of all days 
            let date = new Date(this.dayArray[index]); 
            let day = this.dayArray[index].split(' '); 
            titles[index].innerHTML = day[0] + ' ' + date.toLocaleDateString ('default', {month: 'long'}) + " " + date.getDate();
        }
    }
}

customElements.define('weekly-kanban', WeeklyKanban);