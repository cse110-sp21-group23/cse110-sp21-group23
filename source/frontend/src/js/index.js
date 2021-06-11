import { store } from './store';
import { Delph } from './Delph';
import { routes } from './routes';
import '@babel/polyfill';

export class Index {
  constructor () {
    const path = window.location.pathname.substr(1);
    const config = {
      routes: routes,
      store: store,
      path: path
    };
    // new Header(config)
    new Delph(config);
  }
};
document.addEventListener('DOMContentLoaded', () => {
  new Index();
});
