export default class WeeklyComponent extends HTMLElement {
    constructor() {
        super();

        // let component = document.createElement(‘button’);
        // component.setAttribute(‘class’, ‘collapsible’);
        // component.setAttribute(‘onclick’, ‘expandComponent(this)’)
        // let content = document.createElement(‘div’);
        // content.setAttribute(‘class’, ‘content’);
        // //let bullets = document.createElement(‘ul’);
        console.log("fuck")
        const template = document.createElement('template');
        this.attachShadow({ mode: 'open' });
        // template.innerHTML = `
        //     <style>
        //         .collapsible {
        //         background-color: #DAD4C4;
        //         color: black;
        //         cursor: pointer;
        //         padding: 18px;
        //         width: 100%;
        //         border: none;
        //         text-align: left;
        //         outline: none;
        //         font-size: 15px;
        //         }
        //         .active, .collapsible:hover {
        //         background-color: #BAAF91;
        //         }
        //         .content {
        //         padding: 0 18px;
        //         max-height: 0;
        //         overflow: hidden;
        //         transition: max-height 0.2s ease-out;
        //         background-color: #ECEEEB;
        //         }
        //         .collapsible:after {
        //         content: ‘\2795’;
        //         font-size: 13px;
        //         color: white;
        //         float: right;
        //         margin-left: 5px;
        //         }
        //         .active:after {
        //         content: “\2796”;
        //         }
        //     </style>
        //     <div>
        //     <button class=“collapsible”>Monday 5/10</button>
        //     <div class=“content”>
        //         <ul>
        //         <h1>asdasddfd</h1>
        //         </ul>
        //     </div>
        //     </div>
        // `
        template.innerHTML = `

        <div id="woing">
            <h1>asdasd</h1>
        </div>
    `
        
        //this.shadowRoot.querySelector('.collapsible').addEventListener('click', this.expandComponent);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    expandComponent(e) {
        var content = e.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        }
        else {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    }
}
customElements.define('weekly-component', WeeklyComponent);