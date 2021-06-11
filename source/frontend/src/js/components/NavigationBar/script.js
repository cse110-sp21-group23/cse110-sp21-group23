import { NavigationBar } from './NavigationBar.js';

document.addEventListener('DOMContentLoaded', () => {
  let newBar;
  let custom = [];
  newBar = new NavigationBar(custom);
  const main = document.querySelector('main');
  main.append(newBar);
});
