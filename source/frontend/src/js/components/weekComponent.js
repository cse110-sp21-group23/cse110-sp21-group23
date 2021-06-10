/**
 * Creates a new Weekly Component that generates the days of the week
 * @class 
 * */
export default class WeeklyComponent extends HTMLElement {
    constructor() {
        super();

        // Create HTML of weeklyComponent 
        const template = document.createElement('template');
        template.innerHTML =`
        <button class="collapsible"> Monday </button>
        <div class="content">
          <ul></ul>
        </div>
        <button class="collapsible"> Tuesday </button>
        <div class="content">
          <ul></ul>
        </div>
        <button class="collapsible"> Wednesday </button>
        <div class="content">
          <ul></ul>
        </div>
        <button class="collapsible"> Thursday </button>
        <div class="content">
          <ul></ul>
        </div>
        <button class="collapsible"> Friday </button>
        <div class="content">
          <ul></ul>
        </div>
        <button class="collapsible"> Saturday </button>
        <div class="content">
          <ul></ul>
        </div>
        <button class="collapsible"> Sunday </button>
        <div class="content">
          <ul></ul>
        </div>`;

        this.attachShadow({ mode: 'open' });

        // Add styling to weeklyComponent
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
        
        // Attach template and style to this shadowRoot
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
      this.render();
    }

    render() {

      // Get the button to make collapsible
      let components = this.shadowRoot.querySelectorAll(".collapsible");
      //component.textContent = 

      components.forEach(function(component) {
        // Make button collapsible
        component.addEventListener('click', () => {
          
          // Get content (bullets) of weekly component
          let content = component.nextElementSibling;
          
          // Expand component if not expanded, and close component if already expanded
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          }
          else {
            content.style.maxHeight = content.scrollHeight + 'px';
          } 
      });
    });
  }
}
customElements.define('weekly-component', WeeklyComponent);