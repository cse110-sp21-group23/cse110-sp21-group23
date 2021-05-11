export class DefaultPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = (`<a href="MyPage.html">My page</a>`)
    }
}

customElements.define('default-page', DefaultPage);