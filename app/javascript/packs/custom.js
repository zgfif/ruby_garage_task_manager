'use strict';

// performs the js code after the loading of entire DOM tree
window.addEventListener('DOMContentLoaded', () => {
     const todoButton = document.querySelector('#btn-add-todo'),
           workspace = document.querySelector('.workspace');

    // performs the creation of new Todo list window
    function buildNewWindow() {
        const todoName = askTodoListName();
        if (!todoName) {
          return;
        }
         let newWindow = document.createElement('div');
         newWindow.classList.add('window');
         newWindow = populateNewWindow(newWindow, todoName);
         workspace.append(newWindow);
         return newWindow;
    }
    // creates BASIC tags for the new Todo list window
    function populateNewWindow(window, todoListName) {
        window.innerHTML = `<div class="window-header">
                               <div class="header-left-content">
                                  <div class="icon-schedule">
                                      <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-journal-text" fill="white" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                      <path fill-rule="evenodd" d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                      </svg>
                                  </div>
                                  <div class='todo-list-title'><div>${todoListName}</div></div>
                               </div>
                               <div class="header-right-content">
                                      <div class="icon-edit">
                                          <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-pen" fill="white" xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                          </svg>

                                      </div>
                                      <div class="header-line">
                                         <div class="vll-header"></div>
                                      </div>
                                      <div class="icon-trash">
                                          <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-trash" fill="white" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                          </svg>
                                      </div>
                               </div>
                           </div>
                           <div class="window-add">
                               <div class="icon-plus">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="#00b386" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                               </div>
                               <div class="input-area">
                                   <input id="add-task-input" type="text" placeholder="Start typing here to create a task...">
                               </div>
                               <div class="add-task-button">
                                   <button id="btn-add-task">Add Task</button></dib>
                               </div>
                           </div>
                           <div class="window-task-list"></div>`;

     return window;
    }

    // creates tags for a new task item
    function newTaskItem(taskName) {
       const taskItem = document.createElement('div');
       taskItem.classList.add('task-item');
       taskItem.innerHTML = `<div class="task-completing"><input type="checkbox"></div>
                             <div class="task-name">${taskName}</div>
                             <div class="task-actions">
                                 <div data-move class="action-icon">
                                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-arrow-down-up" fill="grey" xmlns="http://www.w3.org/2000/svg">
                                     <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                     </svg>
                                 </div>

                                 <div data-edit class="action-icon">
                                 <div class="vlr"></div>
                                     <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pen" fill="grey" xmlns="http://www.w3.org/2000/svg">
                                     <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                     </svg>
                                     <div class="vll"></div>
                                 </div>

                                 <div data-remove class="action-icon">
                                     <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-trash" fill="grey" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                     <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                     </svg>
                                 </div>
                             </div>`;
       return taskItem;
    }

    // asks the name of TODO list
    function askTodoListName() {
      let todo = '';
      while(todo == '') {
         todo = prompt('Please, enter the name of ToDo list', '');
      }
      return todo;
    }

    // sets the listener that creates TODO list window on click the 'Add TODO list' button
    todoButton.addEventListener('click', () => {
        const presentWindow = buildNewWindow();
        if (!presentWindow) {
          return;
        }
        addListerCloseWindow(presentWindow);
        addTaskListener(presentWindow);
    });

    // sets the listener that removes the TODO list window on click the 'trash' icon
    function addListerCloseWindow(parentWindow) {
      const trash = parentWindow.querySelector('.icon-trash');

      trash.addEventListener('click', () => {
          const really = confirm('Are you sure want to remove this TODO list?');
          if(really) {
            parentWindow.remove();
          }
      });
    }


    // sets the listener that creates a new task after click "Add Task" button
    function addTaskListener(parentWindow) {
      const addTaskBtn = parentWindow.querySelector('#btn-add-task'),
            inputTask = parentWindow.querySelector('#add-task-input'),
            taskNode = parentWindow.querySelector('.window-task-list');

      addTaskBtn.addEventListener('click', () => {
        const inputValue = inputTask.value;
        if(inputValue) {
            inputTask.value = '';
            const task = newTaskItem(inputValue);
            taskNode.append(task);

            addRemoveTaskListener(task);
            addEditTaskListener(task);
            // addDraggableTaskListener(task);
        }
      });
    }
    // changes the position of task in list on drag an drop it to the other place

    // sets the listener that removes the task on click the 'trash' icon
    function addRemoveTaskListener(taskNode) {
        const trashIcon = taskNode.querySelector('[data-remove]');

        trashIcon.addEventListener('click', () => {
          taskNode.remove();
        });
    }

    // sets the listner that edits the task's name on click on the 'edit' icon
    function addEditTaskListener(taskNode) {
        const editIcon = taskNode.querySelector('[data-edit]'),
              taskNameNode = taskNode.querySelector('.task-name');

        editIcon.addEventListener('click', () => {
          changeTaskName(taskNameNode);
        });
    }

    // changes the name of task
    function changeTaskName(taskNameNode) {
      const taskName = taskNameNode.textContent;
      let newTaskName = '';
      newTaskName = prompt('You can change the name of task', taskName);
      if(newTaskName && newTaskName !='') {
         taskNameNode.textContent = newTaskName;
      }
    }
});
