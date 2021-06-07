import WeeklyKanban from '../WeeklyKanBan/WeeklyKanban'
import WeekPicker from '../WeekPicker'

export class WeeklyPage extends HTMLElement{ 
    connectedCallback() {
        this.render(); 
    }

    render(){ 

        const template = document.createElement("template"); 
        this.attachShadow({mode: 'open'});

        template.innerHTML = `
            <week-picker></week-picker>
            <div id="weekly-kanban-div"> </div>
        `; 

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Attach weekly kanban to template div 
        const ec = document.createElement("weekly-kanban");
        this.shadowRoot.querySelector("#weekly-kanban-div").append(ec); 
    }
}

customElements.define("weekly-page", WeeklyPage);