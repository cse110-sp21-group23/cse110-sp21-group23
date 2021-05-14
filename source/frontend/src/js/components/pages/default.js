export class DefaultPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        const template = document.createElement('template');
        this.attachShadow({ mode: 'open' })
        this.innerHTML = (`<div id="defaultPageDiv"></div>`)
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        const newDay = document.createElement('your-component')
        this.shadowRoot.getElementById('defaultPageDiv').append(newDay)
    }
}

customElements.define('default-page', DefaultPage);