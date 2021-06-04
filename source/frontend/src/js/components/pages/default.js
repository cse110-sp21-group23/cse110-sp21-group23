import { login, register } from '../../api/user'
import { getJournals, getBulletsByDay, addBullet, deleteBullet, editBullet, updateSorting } from '../../api/journal'


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
                <button id="daily" name="toDailyPage"></button> 
                <label for="toDailyPage"> Go to daily page </label> 
                <button id="weekly" name="toWeeklyPage"></button> 
                <label for="toWeeklyPage"> Go to weekly page </label> 
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
        this.shadowRoot.getElementById('daily').addEventListener('click', () => {
            window.location = "dailyPage"
        });

        //Event handler to get to weekly page
        this.shadowRoot.getElementById('weekly').addEventListener('click', () => {
            window.location = "weeklyPage"
        });
    }
}

customElements.define('default-page', DefaultPage);
