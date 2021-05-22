import { login, register } from '../../api/user'
import { getJournals, getBulletsByDay, addBullet, deleteBullet, editBullet } from '../../api/journal'

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
        editBullet({
            "id": 6,
            "journal_id": 7,
            "body": "yoooooooot",
            "type": "task",
            "is_done": false,
            "priority": 2,
            "mood": 1,
            "date": "2021-03-29T07:00:00.000Z",
            "created_at": "2021-05-21T05:26:39.492Z",
            "updated_at": "2021-05-21T05:34:08.907Z"
        }).then(data => {
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
