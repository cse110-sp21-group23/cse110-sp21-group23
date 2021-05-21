import { login, register } from '../../api/user'

import WeeklyComponent from '../weekComponent'
export class DefaultPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        const template = document.createElement('template');
        this.attachShadow({ mode: 'open' })

        template.innerHTML = (`
            <div id="defaultPageDiv">
                <h1>yeet</h1>
                <button name="toWeeklyPage"></button>
                <label for="toWeeklyPage"> Go to weekly page </label>
            </div>
        `
        );
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        // this.shadowRoot.querySelector('.button').addEventListener('click', e => {
        //     console.log("pressed")
        //     login('es@gmail.com', 'asd')
        // })
        // customElements.whenDefined('weekly-component').then(() => {
        //     console.log("asdsd")

        // })
        const c = document.createElement('weekly-component')
        this.shadowRoot.getElementById('defaultPageDiv').append(c)
        console.log(c)
        
        // this.shadowRoot.querySelector('button').addEventListener('click' () => {
        //     window.location = 'weeklyPage';
        // });
    }
}
customElements.define('default-page', DefaultPage);