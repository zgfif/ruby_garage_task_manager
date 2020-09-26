'use strict';

export function hideElement(element, showingClass) {
  element.classList.remove(showingClass);
  element.classList.add('hide');
}

export function showElement(element, showingClass) {
  element.classList.remove('hide');
  element.classList.add(showingClass);
}
