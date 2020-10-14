'use strict';

export function disableScroll() {
  document.documentElement.style.setProperty('--with-scrollbar-width', ((window.innerWidth - document.getElementsByTagName('html')[0].clientWidth + 8) + 'px'));
  bodyElement().classList.add('stop-scrolling');
}

export function enableScroll() {
  bodyElement().classList.remove('stop-scrolling');
}

function bodyElement() {
  return document.querySelector('body');
}
