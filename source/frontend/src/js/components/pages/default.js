import { login, register } from '../../api/user'
import { getJournals, getBulletsByDay, addBullet, deleteBullet, editBullet, updateSorting } from '../../api/journal'

import WeeklyComponent from '../weekComponent'
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
        getBulletsByDay(
            7,
            new Date("2021-04-27"), 
        ).then(data => {
            console.log("Data: ", data)
        }).catch(err => {
            
        })
        //Event handler to get to daily page
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            window.location = "dailyPage"
        });
    }
}

customElements.define('default-page', DefaultPage);
