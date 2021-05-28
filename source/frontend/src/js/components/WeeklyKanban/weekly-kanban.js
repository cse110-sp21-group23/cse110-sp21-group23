export default class WeeklyKanban extends HTMLElement {
    constructor() {
        super();

        // Create HTML of weekly kanban 
        const template = document.createElement('template');
        template.innerHTML =`
        <div class="container flex-container">
            <div class="column-container">
                <div class="day monday">
                    <p>Monday</p>
                    <div class="column-content"></div>
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
        
        .column-content > p {
          word-wrap: break-word;
          font-size: 60%;
        }`;
        
        // Attach template and style to this shadowRoot
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
      this.render();
    }

    render() {
  }
}
customElements.define('weekly-kanban', WeeklyKanban);