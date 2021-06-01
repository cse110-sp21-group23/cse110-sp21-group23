import WeeklyKanban from '../WeeklyKanban/weekly-kanban'
import WeekPicker from '../week-picker'

export class WeeklyPage extends HTMLElement{ 
    connectedCallback() {
        this.render(); 
    }

    render(){ 

        const template = document.createElement("template"); 
        this.attachShadow({mode: 'open'});

        template.innerHTML = `
        <div id="weekly-kanban-div"> </div>
        <week-picker></week-picker>`; 

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        let date = new Date(); 
        console.log(date); 
        date.setDate(date.getDate() + 7); 
        console.log(date.toLocaleString('default', {month: 'long'})); 

        // Attach weekly kanban to template div 
        const ec = document.createElement("weekly-kanban");
        this.shadowRoot.querySelector("#weekly-kanban-div").append(ec); 
    }
}

customElements.define("weekly-page", WeeklyPage);