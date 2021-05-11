/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Delph__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes__ = __webpack_require__(4);


//import { Header } from './components/header'


class Index {

  constructor() {
    let path = window.location.pathname.substr(1);
    let config = {
      routes: __WEBPACK_IMPORTED_MODULE_2__routes__["a" /* routes */],
      store: __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */],
      path: path
      //new Header(config)
    };new __WEBPACK_IMPORTED_MODULE_1__Delph__["a" /* Delph */](config);
  }
}
/* harmony export (immutable) */ __webpack_exports__["Index"] = Index;
;
document.addEventListener('DOMContentLoaded', () => {
  new Index();
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function Store() {
    this.previousState = {};
    this.state = {
        route: { path: null },
        kendal: { counter: 0 }
    };
};

let subscribers = [];

Store.prototype.subscribe = function (fn) {
    subscribers.push(fn);
};

Store.prototype.unsubscribe = function (fn) {
    subscribers.splice(subscribers.indexOf(fn), 1);
};

Store.prototype.getState = function () {
    return this.state;
};

Store.prototype.dispatch = function (action) {
    this.previousState = _extends({}, this.state);
    this.state = {
        route: changeRoute(this.state.route, action),
        kendal: kendalCount(this.state.kendal, action)
    };
    subscribers.forEach(subscriber => subscriber(this.previousState, this.state));
};

function changeRoute(route, action) {
    switch (action.type) {
        case 'CHANGE_ROUTE':
            let newRoute = action.route;
            return newRoute;
        default:
            return route || { path: null };

    }
}

function kendalCount(kendal, action) {
    switch (action.type) {
        case 'INCREASE_KENDAL':
            let newState = { counter: kendal.counter + 1 };
            return newState;
        default:
            return kendal;

    }
}

const store = new Store();
/* harmony export (immutable) */ __webpack_exports__["a"] = store;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(3);


class Delph {

  constructor(config) {
    this.handleBackButton = store => {

      window.onpopstate = event => {
        let content = "";
        if (event.state) {
          content = event.state.page;
          store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_0__actions__["a" /* loadRoute */])({ path: content, back: true }));
        }
      };
    };

    this.routes = config.routes;
    this.routerOutlet = document.createElement('div');
    document.body.appendChild(this.routerOutlet);
    config.store.subscribe(this.render.bind(this));
    config.store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_0__actions__["a" /* loadRoute */])({ path: config.path }));
    this.handleBackButton(config.store);
  }

  render(previousState, state) {
    if (previousState.route.path != state.route.path) {
      let page = state.route.path;
      let back = state.route.back;
      let route = this.routes.find(route => route.path === page);
      while (this.routerOutlet.firstChild) {
        this.routerOutlet.removeChild(this.routerOutlet.firstChild);
      }
      if (!back) {
        history.pushState({ page }, null, `/${page}`);
      }
      const c = new route.component();
      this.routerOutlet.appendChild(new route.component());
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Delph;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadRoute;
function loadRoute(route) {
    return {
        type: 'CHANGE_ROUTE',
        route
    };
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_pages_default__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_pages_login__ = __webpack_require__(6);



const routes = [{ title: 'index', path: '', component: __WEBPACK_IMPORTED_MODULE_0__components_pages_default__["a" /* DefaultPage */] }, { title: 'login', path: 'login', component: __WEBPACK_IMPORTED_MODULE_1__components_pages_login__["a" /* LoginPage */] }];
/* harmony export (immutable) */ __webpack_exports__["a"] = routes;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DefaultPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<a href="MyPage.html">My page</a>`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefaultPage;


customElements.define('default-page', DefaultPage);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LoginPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<a href="MyPage.html">Login</a>`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoginPage;


customElements.define('login-page', LoginPage);

/***/ })
/******/ ]);