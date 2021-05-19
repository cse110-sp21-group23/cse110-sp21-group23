export default class WeeklyComponent extends HTMLElement {
    constructor() {
        super();

        //Create HTML of weeklyComponent 
        const template = document.createElement('template');
        template.innerHTML =`
        <button class="collapsible"> Monday </button>
        <div class="content">
          <ul></ul>
        </div>`;

        this.attachShadow({ mode: 'open' });

        //Add styling to weeklyComponent
        let style = document.createElement('style');
        style.textContent = `
        .collapsible {
          background-color: #dad4c4;
          color: black;
          cursor: pointer;
          padding: 18px;
          width: 100%;
          border: none;
          text-align: left;
          outline: none;
          font-size: 15px;
        }
        
        .active, .collapsible:hover {
          background-color: #baaf91;
        }
        
        .content {
          padding: 0 18px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.2s ease-out;
          background-color: #eceeeb;
        }
        
        .collapsible:after {
          content: '+';
          font-size: 13px;
          color: black;
          float: right;
          margin-left: 5px;
        }
        
        .active:after {
          content: '-';
        }`;
        
        //Attach template and style to this shadowRoot
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style);
    }
}
customElements.define('weekly-component', WeeklyComponent);