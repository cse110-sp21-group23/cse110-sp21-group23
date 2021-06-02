import EntryCreatorWeek from "../EntryCreatorWeek/entry-creator-week"
import WeekPicker from "../week-picker"

export default class WeeklyKanban extends HTMLElement {
    //Array of all entry-creator-day's in the component's days 
    ecArray = []; 
    //Array of the days we're rendering
    dayArray =[]; 

    constructor() {
        super();

        // Create HTML of weekly kanban 
        const template = document.createElement('template');
        template.innerHTML =`
        <div class="container flex-container">
            <div class="column-container">
                <div class="day monday">
                    <p>Monday</p>
                    <div class="column-content">
                    <button class="bullet-entry">Today I went to the park mfdjsfndjfhdjkfjkdfhdjjfhdjksfhkdjfjkhsfhjdhjfdhkjs</button>
                    <button class="bullet-entry">Today I went to the park mfdjsfndjfhdjkfjkdfhdjjfhdjksfhkdjfjkhsfhjdhjfdhkjs</button>
                    <button class="bullet-entry">Today I went to the park mfdjsfndjfhdjkfjkdfhdjjfhdjksfhkdjfjkhsfhjdhjfdhkjs</button>
                    <button class="bullet-entry">Today I went to the park mfdjsfndjfhdjkfjkdfhdjjfhdjksfhkdjfjkhsfhjdhjfdhkjs</button>
                    <button class="bullet-entry">Today I went to the park mfdjsfndjfhdjkfjkdfhdjjfhdjksfhkdjfjkhsfhjdhjfdhkjs</button>
                    <button class="bullet-entry">Today I went to the park mfdjsfndjfhdjkfjkdfhdjjfhdjksfhkdjfjkhsfhjdhjfdhkjs</button>
                    <button class="bullet-entry">Today I went to the park mfdjsfndjfhdjkfjkdfhdjjfhdjksfhkdjfjkhsfhjdhjfdhkjs</button>
                       <button class="bullet-entry">Today I went to the park mfdjsfndjfhdjkfjkdfhdjjfhdjksfhkdjfjkhsfhjdhjfdhkjs</button>
                       <button class="bullet-entry">Today I went to the park mfdjsfndjfhdjkfjkdfhdjjfhdjksfhkdjfjkhsfhjdhjfdhkjs</button>
                    </div>
                </div>
                <div class="day tuesday">
                    <p>Tuesday</p>
                    <div class="column-content"></div>
                </div>
                <div class="day wednesday">
                    <p>Wednesday</p>
                    <div class="column-content"></div>
                </div>
                <div class="day thursday">
                    <p>Thursday</p>
                    <div class="column-content"></div>
                </div>
                <div class="day friday">
                    <p>Friday</p>
                    <div class="column-content"></div>
                </div>
                <div class="day saturday">
                    <p>Saturday</p>
                    <div class="column-content"></div>
                </div>
                <div class="day sunday">
                    <p>Sunday</p>
                    <div class="column-content"></div>
                </div>
                <div class="day monday">
                    <p>Monday</p>
                    <div class="column-content"></div>
                </div>
            </div>
        </div>`;

        this.attachShadow({ mode: 'open' });

        // Add styling to weeklyComponent
        let style = document.createElement('style');
        style.textContent = `
        .flex-container {
            display: flex;
            font-size: 2rem;
            text-align: center;
            background: #6a828d;
            min-height: 30rem;
            max-height: 30rem;
            padding: 1rem;
            margin: 5rem;
        }
        
        .column-container {
            display: flex;
            flex-wrap: nowrap;
            overflow: hidden;
            overflow-x: auto;
        }
        
        .day {
            background: white;
            border: 1px solid #6a828d;
            width: 20rem;
            min-height: 4rem;
            flex-basis: 8rem;
            min-width: 300px;
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
            background-color: #f9f9f8;
            text-align: left;
            padding: 0.6em;
            margin: auto;
            width: 100%;
            height: auto;
        }
        
        .bullet-entry:hover {
            background-color: #b3d4db;
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
        console.log(this.dayArray); 

        let colContent= this.shadowRoot.querySelectorAll(".column-content"); 
        for (let index = 0; index < colContent.length; index++){ 
            //Append ecw to all days 
            let ecWeek = document.createElement('entry-creator-week');
            colContent[index].appendChild(ecWeek);  
            this.ecArray[index] = ecWeek; 

            //Render all respective bullets 
            ecWeek.renderBullets(this.dayArray[index]); 

            //Set internal date 
            ecWeek.date = this.dayArray[index]; 
        }
        //Event listener to update day array on week change event 
        document.addEventListener('weekChange', () => { 
            this.dayArray = weekP.sendArray(); 
            this.renderAllEc(); 
        })
    }

    /**
     * Will render the day for each of the boxes. 
     */
    renderAllEc(){ 
        let colContent = this.shadowRoot.querySelectorAll(".column-content"); 
        for (let index = 0; index < colContent.length; index++){ 
            this.ecArray[index].renderBullets(this.dayArray[index]); 
        }
    }
}
customElements.define('weekly-kanban', WeeklyKanban);