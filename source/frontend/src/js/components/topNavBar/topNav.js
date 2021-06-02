import { getEmail } from '../../utils/localStorage'

export default class TopNav extends HTMLElement {
    constructor() {

        super();

        this.attachShadow({ mode: 'open' })

        const template = document.createElement('template');

		template.innerHTML = `
		<script src="/source/frontend/src/js/components/topNavBar/topNav.js"></script>
		
		<header class="header">
		
			<h1 class="logo"><a href="/daily">23AndMe</a></h1>

			<button class="email-button" id="email"></button>
			
		</header>
		
		<script src="/source/frontend/src/js/components/topNavBar/topNav.js"></script>
        `
        let style = document.createElement('style');

		style.textContent = `

		* {
			box-sizing: border-box;
		}

		h2,
		h3,
		a {
			color: #444C57;
			text-decoration: none;
		}

		.logo {
			margin: 0;
			font-size: 1.45em;
		}
		
		.logo a {
			padding: 10px 15px;
			text-transform: uppercase;
			text-align: center;
			display: block;
		}

		button{
			appearance: none;
			border-radius: 0.6em;
			color: #000;
			cursor: pointer;
			display: flex;
			align-self: center;
			font-size: 1rem;
			font-weight: 400;
			line-height: 1;
			margin: 0px;
			padding: 1.0em 1.0em;
			text-decoration: none;
			text-align: center;
			text-transform: uppercase;
			font-family: 'Montserrat', sans-serif;
			font-weight: 700;
		}

		.email-button{
			border-radius: 3em;
			background-color: transparent;
			border-color: transparent;
			color: #444C57;
		}
		
		.header {
			margin-left:-8px;
			margin-right:-8px;
			margin-top: -10px;
			position: relative;
			min-height: 5vh;
			min-width:100vw;
			background-color: #f0d6c7;
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