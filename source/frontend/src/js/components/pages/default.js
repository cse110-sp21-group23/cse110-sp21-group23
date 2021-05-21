import { login, register } from '../../api/user'

import WeeklyComponent from '../weekComponent'
export class DefaultPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = (`<a href="MyPage.html">GIT ACTION</a>`)
    }
}

const style = `
`
customElements.define('default-page', DefaultPage);
