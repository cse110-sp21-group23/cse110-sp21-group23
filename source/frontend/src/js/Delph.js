import { loadRoute } from './actions'
import { NavigationBar } from './components/NavigationBar/NavigationBar'
import { getEmail } from './utils/localStorage'
import { getToken } from './utils/localStorage'
export class Delph {

  constructor(config) {
    this.routes = config.routes;
    this.routerOutlet = document.createElement('div')
    document.body.appendChild(this.routerOutlet)
    config.store.subscribe(this.render.bind(this));
    config.store.dispatch(loadRoute({ path: config.path }))
    this.handleBackButton(config.store)
  }

  handleBackButton = (store) => {
    window.onpopstate = (event) => {
      let content = "";
      if (event.state) {
        content = event.state.page;
        store.dispatch(loadRoute({ path: content, back: true }))
      }
    }
  }

  render(previousState, state) {
    if (previousState.route.path != state.route.path) {
      if (state.route.path != "" && getToken() == null) {
        location.href = ""
        return;
      }
      let page = state.route.path
      let back = state.route.back

      //load navBar for every page not login
      if (state.route.path != 'login') {
        let main = document.querySelector("main");
        if(main.childNodes[0] == null) {
          //Creates navigation bar and appends it to main
          let newBar;
          let custom = []
          newBar = new NavigationBar(custom);
          main.append(newBar);
        }

        //changes the upper right hand corner text to proper email
        document.getElementById("email").innerHTML = getEmail();
      }

      //used for eventually adding user setting and logout part
      document.getElementById("email").addEventListener("click", (event) => {
      });

      let route = this.routes.find((route) => route.path === page)

      while (this.routerOutlet.firstChild) {
        this.routerOutlet.removeChild(this.routerOutlet.firstChild);
      }
      if (!back) {
        history.pushState({ page }, null, `/${page}`);
      }
      const c = new route.component;
      this.routerOutlet.appendChild(new route.component)
    }
  }
}