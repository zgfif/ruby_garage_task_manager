'use strict';

export function disableScroll() {
  bodyElement().classList.add('stop-scrolling');
}

export function enableScroll() {
  bodyElement().classList.remove('stop-scrolling');
}

function bodyElement() {
  return document.querySelector('body');
}
