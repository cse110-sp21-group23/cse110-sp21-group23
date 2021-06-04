import { loadRoute } from './actions'
import { NavigationBar } from './components/NavigationBar/NavigationBar'
import { getEmail } from './utils/localStorage'
import { getToken } from './utils/localStorage'
import TopNav from './components/topNavBar/topNav'
export class Delph {

  constructor(config) {
    this.routes = config.routes;
    this.routerOutlet = document.createElement('div')
    document.body.appendChild(this.routerOutlet)
    config.store.subscribe(this.render.bind(this));
    config.store.dispatch(loadRoute({ path: config.path }))
    this.handleBackButton(config.store)
  }

  
  /**
   * Function which will handle the implementation of the back button
   * @param  {Object} store
   */
  handleBackButton = (store) => {
    window.onpopstate = (event) => {
      let content = "";
      if (event.state) {
        content = event.state.page;
        store.dispatch(loadRoute({ path: content, back: true }))
      }
    }
  }

  
  /**
   * Function which will render the new page
   * @param  {Object} previousState
   * @param  {Object} state
   */
  render(previousState, state) {
    if (previousState.route.path != state.route.path) {
      if (state.route.path != "" && getToken() == null) {
        location.href = ""
        return;
      }
      let page = state.route.path
      let back = state.route.back

      //load navBar for every page not login
      if (state.route.path != 'login' || state.route.path != '') {
        //creates side navBar and top navBar
        let main = document.querySelector("main");
        let topNavBar = document.querySelector("topNavBar")
        //attaches topNavBar to topNavBar element
        if (topNavBar.childNodes[0] == null) {
          let topNav = new TopNav();
          topNavBar.append(topNav);
        }
        if(main.childNodes[0] == null) {
          //Creates navigation bar and appends it to main
          let custom = []
          let navBar = new NavigationBar(custom);
          main.append(navBar);
        }

      }

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