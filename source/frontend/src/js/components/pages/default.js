export class DefaultPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = (`<a href="MyPage.html">Should Change</a>`)
    }
}

customElements.define('default-page', DefaultPage);