// <navigation-bar> custom web component
import { store } from '../../store';
import { loadRoute } from '../../actions'
class NavigationBar extends HTMLElement {
    constructor(custom) {
      super();
  
      // templated HTML content
      const template = document.createElement('template');
  
      template.innerHTML = `
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
            
            
            .sidebar {
              position: fixed;
              height: 100vh;
              width: 190px;
              z-index: 1;
              left: -10px;
              background-color: #1D5B72;
              -webkit-box-shadow: 0px 14px 14px 0px rgba(0,0,0,0.75);
              -moz-box-shadow: 0px 14px 14px 0px rgba(0,0,0,0.75);
              box-shadow: 0px 14px 14px 0px rgba(0,0,0,0.75);
              -webkit-border-radius: 0px;
              -moz-border-radius: 0px;
              border-radius: 0px;
            }
            
            .sidebar-entry {
                display: block;
                border: none;
                width: 190px;
                text-decoration: none;
                background-color: #B3D4DB;
                margin: 0px 0px 10px 0px;
                padding: 20px 0px 20px 40px;
                font-size: 20px;
                color: #444C57;
                font-family: 'Lato', sans-serif;
                text-align: left;
            }
            
            .sidebar-entry:hover {
                cursor: pointer;
                background-color: #C9CBB3 !important;
            }

            
            #splitline{
                border: 3px dotted #ABB696;
                margin: 30px 0px 30px 0px;
            }

            #addCustom{
                display: block;
                border: none;
                width: 190px;
                text-decoration: none;
                background-color: #C9CBB3;
                margin: 0px 0px 10px 0px;
                padding: 20px 0px 20px 20px;
                font-size: 20px;
                color: #7C8578;
                font-family: 'Lato', sans-serif;
                text-align: left;
            }

            #addCustom:hover {
                cursor: pointer;
                background-color: #C9CBB3;
            }

            #hide{
                display: block;
                border: none;
                border-radius: 10px;
                width: 25px;
                height: 25px;
                text-decoration: none;
                background-color: #d9daca;
                margin: 5px 0px 5px 160px;
                font-size: 20px;
                color: #7C8578;
                font-family: 'Lato', sans-serif;
            }

            #hide:hover {
                cursor: pointer;
                background-color: #C9CBB3;
            }

            @keyframes hidebar {
                0%   {left:-20px;}
                100% {left:-190px;}
            }

            @keyframes showbar {
                0%   {left:-190px;}
                100% {left:-20px;}
            }

          </style>

          <div class="sidebar">
                <button id="hide"><</button>
                <button class="sidebar-entry" data-page="daily">Day</button>
                <button class="sidebar-entry" data-page="weekly">Week</button>
                <hr id="splitline">
                <button class="sidebar-entry">Mood Tracker</button>
          </div>

          
          `;


      this.setAttribute('custom', custom);
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      custom.forEach(element => {
        let newLog = document.createElement('button');
        newLog.className = "sidebar-entry";
        newLog.innerHTML = element;
        this.shadowRoot.querySelector('#customLogs').append(newLog);
      });


      var elem = this.shadowRoot.querySelector(".sidebar");
      var hidebutton = this.shadowRoot.querySelector("#hide");
      var id = null;
      var hiding = false;
      this.shadowRoot.querySelector("#hide").onclick = function(){ 
        if(!hiding){
            var pos = -20;
            clearInterval(id);
            id = setInterval(frame, 3);
            function frame() {
              if (pos == -165) {
                clearInterval(id);
              } else {
                pos--;  
                elem.style.left = pos + "px"; 
              }
            }
            hiding = !hiding;
            hidebutton.innerHTML = ">";
        }else{
            var pos = -165;
            clearInterval(id);
            id = setInterval(frame, 1);
            function frame() {
              if (pos == -20) {
                clearInterval(id);
              } else {
                pos++;  
                elem.style.left = pos + "px"; 
              }
            }
            hiding = !hiding;
            hidebutton.innerHTML = "<";
        }
      };

      var entries = this.shadowRoot.querySelectorAll(".sidebar-entry");
      for(var i = 0; i < entries.length; i++){
          entries[i].onclick = function(e){
            store.dispatch(loadRoute({ path: this.dataset.page }))
            for(var j = 0; j < entries.length; j++){
                entries[j].style.backgroundColor = '#d9daca';
            }
            e.target.style.backgroundColor = "#ABB696";
          };
      }

      var addcustom = this.shadowRoot.querySelectorAll("#addCustom");
      addcustom.onclick = function(e){
        alert("Coming soon");
      };

    }
  
    get custom() {
      return this.getAttribute('custom');
    }

    set custom(custom) {
        custom.forEach(element => {
            let newLog = document.createElement('button');
            newLog.className = "sidebar-entry";
            newLog.innerHTML = element;
            this.shadowRoot.querySelector('#custonLogs').append(newLog);
        });
      this.setAttribute('custom', custom);
    }

    //Infinite loop?
    connectedCallback(){ 
      this.render();
    }

    render() {
      /*
      let newBar;
      let custom = []
      newBar = new NavigationBar(custom);
      let main = document.querySelector("main");
      main.append(newBar);
      */
    }


}
  customElements.define('navigation-bar', NavigationBar);

  
  export { NavigationBar };