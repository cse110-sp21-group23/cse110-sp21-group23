export class WeeklyComponent extends HTMLElement {

  constructor() {

    super();

    this.attachShadow({mode: 'open'});

    let template = document.createElement('template');
    template.innerHTML = `
      <style>
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
        content: '\2795';
        font-size: 13px;
        color: white;
        float: right;
        margin-left: 5px;
      }
      
      .active:after {
        content: "\2796";
      }
      </style>
      <div>
        <button class="collapsible"></button>
        <div class="content">
          <ul>
          </ul>
        </div>
      </div>
    `

    this.shadowRoot.querySelector('.collapsible').addEventListener('click', this.expandComponent);

    this.shadowRoot.appendChild(template);
  }

  expandComponent(e) {
  
    var content = e.nextElementSibling;
  
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    }
    else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
}

customElements.define('weekly-component', WeeklyComponent);