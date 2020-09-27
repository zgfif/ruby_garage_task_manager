'use strict';

import { cookieObject, isSignIn } from './cookie_helper';
import { extractId } from './selector_helper';
import { hideElement, showElement } from './show_helpers';
import { ProjectRequest } from './requests/project_request';

window.addEventListener('DOMContentLoaded', () => {
  const workspace = document.querySelector('.workspace'), // windows area
        newWindowButton = document.querySelector('#btn-add-todo'); // button to add new window

  // show and hide signin, signout, signup links
  const signUpLink = document.querySelector('#signup-link'),
        signInLink = document.querySelector('#signin-link'),
        signOutLink = document.querySelector('#signout-link');

// the FIRST STEP
// after loading index page check token and
// hide or show certain links that depends from presence of the token
 updateLinksAndButtons();

 function updateLinksAndButtons() {
   if(isSignIn()) {
     // the SECOND STEP
     // load all existing TODO lists
     loadTodoLists();

     hideElement(signInLink, 'show-link');
     hideElement(signUpLink, 'show-link');
     showElement(signOutLink, 'show-link');
     showElement(newWindowButton, 'show-add-todo-button');
   } else {
     setSigninModalListener();
     setSignupModalListener();

     showElement(signInLink, 'show-link');
     showElement(signUpLink,'show-link');
     hideElement(signOutLink, 'show-link');
     hideElement(newWindowButton, 'show-add-todo-button');
   }
 }



 // loads all TODO LISTS (existing projects) related to the current_user from DB
 function loadTodoLists() {
   const requst = new ProjectRequest('GET', '/projects');
   requst.send();
   requst.loadProjects(workspace);
 }

// THE THIRD STEP
// set listener to add new TODO list
 listenNewListButton(newWindowButton);

  // sets the listener that creates TODO list window on click the 'Add TODO list' button
  function listenNewListButton(button) {
    button.addEventListener('click', () => {

      const listName = prompt('Enter the name of list');

      if(listName && listName != '') {
        // creates a new project after entering the new project name
        const newProject = new ProjectRequest('POST', '/projects/' );
        const projectData = { project: { name: listName } };
        newProject.send(projectData);
        newProject.handleCreation(workspace, listName);
       }
    });
  }

  // signup window
  function setSignupModalListener() {
    const signupWindow = document.querySelector('.signup-window'),
          closeBtn = signupWindow.querySelector('.close-window-icon'),
          submitBtn = signupWindow.querySelector('#signup-submit');

    signUpLink.addEventListener('click', (e) => {
      e.preventDefault();
      showElement(signupWindow, 'show');
      hideElement(signUpLink, 'show');
      hideElement(signInLink, 'show');

      closeBtn.addEventListener('click', () => {
        hideElement(signupWindow, 'show');
        showElement(signUpLink, 'show');
        showElement(signInLink, 'show');
      });

      submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const email = signupWindow.querySelector('.input-email'),
              password = signupWindow.querySelector('.input-password'),
              passwordConfirmation = signupWindow.querySelector('.input-password-confirmation');

       if(email.value !='' && password.value !='' && password.value == passwordConfirmation.value) {
         makeCreateUserRequest(email, password, passwordConfirmation);
       } else { alert('incorrect data'); }

      });

      function makeCreateUserRequest(email, pass, passConfirm) {
        const payload = JSON.stringify({ user: { email: email.value, password: pass.value, password_confirmation: passConfirm.value } });
        const request = new XMLHttpRequest();
        request.open('POST', '/signup');
        request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
        request.send(payload);

        request.addEventListener('load', () => {
          const response = JSON.parse(request.response);
          if (response.errors) {
            alert(request.response);
          } else {

            hideElement(signupWindow, 'show');
            showElement(signUpLink, 'show');
            showElement(signInLink, 'show');
            alert(`The user ${email.value} was successfully registered!`);
            email.value = '';
            pass.value = '';
            passConfirm.value = '';
          }
        });
      }
    });
  }

  // signin window
  function setSigninModalListener() {
    const signinWindow = document.querySelector('.signin-window'),
          closeBtn = signinWindow.querySelector('.close-window-icon'),
          submitBtn = signinWindow.querySelector('#signin-submit');

    // listener to open signin
    signInLink.addEventListener('click', event => {
      event.preventDefault();
      showElement(signinWindow, 'show');
      hideElement(signUpLink, 'show');
      hideElement(signInLink, 'show');
      setInputListeners();


      // listener to close signin
      closeBtn.addEventListener('click', event => {
         hideElement(signinWindow, 'show');
         showElement(signUpLink, 'show');
         showElement(signInLink, 'show');
      });
    });

    function setInputListeners() {
      const email = signinWindow.querySelector('.input-email'),
            password = signinWindow.querySelector('.input-password');

      submitBtn.addEventListener('click', event => {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/signin');
        xhr.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
        const payload = JSON.stringify({ user: { email: email.value, password: password.value } });
        xhr.send(payload);

        xhr.addEventListener('load', (e) => {
          const response = JSON.parse(xhr.response);
          if(response.auth_token) {
            document.cookie = `Authorization=${response.auth_token}; path=/`;
            hideElement(signinWindow, 'show');
            updateLinksAndButtons();
          } else { alert('invalid email or/and password'); }
        });
      });
    }
  }

  // signout
  // if a user clicks on 'Signout' reference then browser cleanes all cookies
  // const signoutLink = document.querySelector('#signout-link');
  signOutLink.addEventListener('click', (e) => {
    e.preventDefault();
    const result = confirm('Are you sure want to exit?');
    if(result) {
      document.cookie = 'Authorization=; path=/';
      workspace.innerHTML = '';
      updateLinksAndButtons();
    }
  });
});
