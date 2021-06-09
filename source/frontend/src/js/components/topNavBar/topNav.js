import { getEmail } from '../../utils/localStorage'

export default class TopNav extends HTMLElement {
    constructor() {

        super();

        this.attachShadow({ mode: 'open' })

        const template = document.createElement('template');

		template.innerHTML = `
		<script src="/source/frontend/src/js/components/topNavBar/topNav.js"></script>
		
		<header class="header">
		
			<h1 class="logo"><a href="/daily"><span style="color: #6d766c">23</span><span style="color: #444c57">And</span><span style="color: #846c67">Me</span></a></h1>

			<button class="email-button" id="email"></button>
			
		</header>
		
		<script src="/source/frontend/src/js/components/topNavBar/topNav.js"></script>
        `
        let style = document.createElement('style');

		style.textContent = `
		@import url('https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap');
		* {
			box-sizing: border-box;
		}

		span{
			font-family: 'Lato', sans-serif;
			font-weight: 400;
		}

		h2,
		h3,
		a {
			color: #444C57;
			text-decoration: none;
			font-family: 'Lato', sans-serif;
		}

		.logo {
			margin: 0;
			font-size: 32px;
		}
		
		.logo a {
			padding: 25px;
			text-align: center;
			display: block;
			font-family: 'Lato', sans-serif;
			font-weight: 400;
		}

		button{
			appearance: none;
			border-radius: 0.6em;
			color: #000;
			cursor: pointer;
			display: flex;
			align-self: center;
			font-size: 20px;
			font-weight: 400;
			line-height: 1;
			margin: 0px;
			padding: 1.0em 1.0em;
			text-decoration: none;
			text-align: center;
			font-family: 'Lato', sans-serif;
		}

		.email-button{
			border-radius: 3em;
			background-color: transparent;
			border-color: transparent;
			color: #444C57;
		}
		
		.header {
			position: fixed;
			left:-8px;
			right:-8px;
			top: -5px;
			z-index: 1;
			height: 55px;
			min-width:100vw;
			background-color: #B3D4DB;
			-webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
			-moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
			box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
			-webkit-border-radius: 0px;
			-moz-border-radius: 0px;
			border-radius: 0px;
		}
			
		@media (min-width: 769px) {
			.header,
			.main-nav {
				display: flex;
			}
			.header {
				flex-direction: column;
				align-items: center;
				.header{
				width: 80%;
				margin: 0 auto;
				max-width: 1150px;
			}
			}
		
		}
		
		@media (min-width: 1025px) {
			.header {
				flex-direction: row;
				justify-content: space-between;
			}
		
		}
        `

        this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.shadowRoot.appendChild(style);
		/**
		 * Adds email information to the signout button on the right
		 * Also adds an event listener to that button with function indicated below
		 * Not yet implemented
		 * */
		let emailButton = this.shadowRoot.getElementById('email');
		if (emailButton) {
			emailButton.innerHTML = getEmail();
			emailButton.addEventListener('click', emailButtonFunction());
		}
		
    }
}

// document.getElementById('email').innerHTML = getEmail();

 /**
 * Function that triggers when Email button is clicked
 * probably log out function of some sort
 */
function emailButtonFunction() {

}

window.customElements.define('top-navbar', TopNav);
