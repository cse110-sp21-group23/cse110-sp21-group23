import { Index } from "../..";
import { DailyPage } from "./dailyPage";

export class DefaultPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        const template = document.createElement("template");
        this.attachShadow({ mode: "open" })

        template.innerHTML = (`
            <div id="defaultPageDiv">
                <h1>yeet</h1>
                <button name="toDailyPage"></button> 
                <label for="toDailyPage"> Go to daily page </label> 
            </div>
        `)

        this.shadowRoot.appendChild(template.content.cloneNode(true)); 

        //Event handler to get to daily page
        this.shadowRoot.querySelector('button').addEventListener('click', ()=>{
            window.location = "dailyPage"
        });
    }
}

customElements.define('default-page', DefaultPage);
