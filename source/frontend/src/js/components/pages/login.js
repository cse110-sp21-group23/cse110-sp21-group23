export class LoginPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = (`<a href="MyPage.html">Login</a>`)
    }
}

customElements.define('login-page', LoginPage);