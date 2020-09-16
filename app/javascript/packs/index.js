'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const workspace = document.querySelector('.workspace'), // windows area
  newWindowButton = document.querySelector('#btn-add-todo'); // button to add new window

  listenNewListButton(newWindowButton);

  class TodoWindow {
      constructor(targetPlace, listName, projectId) {
        this.targetPlace = targetPlace;
        this.listName = listName;
        this.newWindow = document.createElement('div');
        this.newWindow.classList.add('window');
        this.newWindow.id = `project_${projectId}`;
      }

      addToWorkSpace() {
         this.targetPlace.append(this.newWindow);
      }

      populateNewWindow() {
        this.newWindow.innerHTML = `<div class="window-header">
                               <div class="header-left-content">
                                  <div class="icon-schedule">
                                      <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-journal-text" fill="white" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                      <path fill-rule="evenodd" d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                      </svg>
                                  </div>
                                  <div class='todo-list-title'><div>${this.listName}</div></div>
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
                                   <button id="btn-add-task">Add Task</button>
                               </div>
                           </div>
                           <div class="window-task-list"></div>`;
      }


      setCommonWindowListeners() {
           this.setEditTodoListListener();
           this.setCloseWindowListener();
           this.setAddTaskListener();
      }

      // Below shown listeners that used only indirectly
      // (in setCommonWindowListeners() function)

      // sets the listener that removes the TODO list window on click the 'trash' icon
      setCloseWindowListener() {
        const trash = this.newWindow.querySelector('.icon-trash');

        trash.addEventListener('click', () => {
            const really = confirm('Are you sure want to remove this TODO list?');
            if(really) {
              // deletes an existing project after click on 'trash icon and ok in alert'
              const projectId = retrieveId('project', this.newWindow.id);
              const deleteRequest = new ProjectRequest('DELETE', `/projects/${projectId}`);
              deleteRequest.send();
              deleteRequest.handleDestroying(this.newWindow);
            }
        });
      }

      // sets the listener that creates a new task after click "Add Task" button
      setAddTaskListener() {
        const addTaskBtn = this.newWindow.querySelector('#btn-add-task'),
              inputTask = this.newWindow.querySelector('#add-task-input'),
              tasksNode = this.newWindow.querySelector('.window-task-list');

        addTaskBtn.addEventListener('click', () => {
          if (inputTask.value) {
            const projectId = retrieveId('project', this.newWindow.id);
            const request = new TaskRequest('POST', `/projects/${projectId}/tasks`);
            request.send({ task: { name: inputTask.value } });
            request.saveTask(tasksNode, inputTask);
          }
        });
      }

      // set the listener taht edits the todo list name on click 'pen' icon
      setEditTodoListListener() {
          const editIcon = this.newWindow.querySelector('.header-right-content .icon-edit'),
                todoListTitleNode = this.newWindow.querySelector('.todo-list-title div');

          editIcon.addEventListener('click', () => {
            const newTodoListName = prompt('Enter the new name of list', todoListTitleNode.textContent);
            if (newTodoListName && newTodoListName != '') {
              // update the name of existing project
              const projectId = retrieveId('project', this.newWindow.id);

              const updateRequest = new ProjectRequest('PATCH', `/projects/${projectId}`);

              const projectData = { project: { name: newTodoListName } };
              updateRequest.send(projectData);
              updateRequest.handleEditing(newTodoListName, todoListTitleNode);
            }
          });
      }
   }

  class Task {
    constructor(tasksArea, taskName, taskId, projectId) {
      this.tasksArea = tasksArea;
      this.taskName = taskName;
      this.taskItem = document.createElement('div');
      this.taskItem.classList.add('task-item');
      this.taskItem.id = `task_${taskId}`;
      this.projectId = projectId;
    }

    populateNewTaskItem() {
      this.taskItem.innerHTML = `<div class="task-completing"><input type="checkbox"></div>
                               <div class="task-name">${this.taskName}</div>
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
    }

    addToTasksArea() {
      this.tasksArea.append(this.taskItem);
    }

    setCommonTaskItemListeners() {
      this.setRemoveTaskListener();
      this.setEditTaskListener();
    }

    // sets the listener that removes the task on click the 'trash' icon
    setRemoveTaskListener() {
        const trashIcon = this.taskItem.querySelector('[data-remove]'),
              taskName = this.taskItem.querySelector('.task-name').textContent;

        trashIcon.addEventListener('click', () => {
          const really = confirm(`Are you really want to remove ${taskName}?`);
          if (really) {
            const taskId = retrieveId('task', this.taskItem.id);
            const request = new TaskRequest('DELETE', `/projects/${this.projectId}/tasks/${taskId}`);
            request.send();
            request.handleDestroying(this.taskItem);
          }
        });
    }

    // sets the listner that edits the task's name on click on the 'edit' icon
    setEditTaskListener() {
        const editIcon = this.taskItem.querySelector('[data-edit]'),
              taskNameNode = this.taskItem.querySelector('.task-name');

        editIcon.addEventListener('click', () => {
          const newTaskName = prompt('You can change the name of task', taskNameNode.textContent);
          if (newTaskName && newTaskName != '') {
            taskNameNode.textContent = newTaskName;
          }
        });
    }
  }

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

  // CRUD functions for Project
  class ProjectRequest {
    constructor(method, path) {
       this.xhr = new XMLHttpRequest();
       this.xhr.open(method, path);
       this.xhr.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
    }

    send(data = null) {
      if (data != null) { data = JSON.stringify(data); }
      this.xhr.send(data);
    }

    loadProjects() {
       this.xhr.addEventListener('load', () => {
         const projects = JSON.parse(this.xhr.response);

         projects.forEach(project => {
           const projectWindow = new TodoWindow(workspace, project.name, project.id);
           projectWindow.populateNewWindow();
           projectWindow.addToWorkSpace();
           projectWindow.setCommonWindowListeners();

           // load all tasks related to the project
           const targetPlace = workspace.querySelector(`#project_${project.id} .window-task-list`);

           const tasks = new TaskRequest('GET', `/projects/${project.id}/tasks`);
           tasks.send();
           tasks.loadTasks(targetPlace, project.id);
         });
      });
    }

    handleCreation(workspace, projectName) {
      this.workspace = workspace;
      this.projectName = projectName;

      this.xhr.addEventListener('load', () => {
        const response = JSON.parse(this.xhr.response);

        if (this.xhr.status == 201) {
          const newWindow = new TodoWindow(workspace, projectName, response.id);
          newWindow.populateNewWindow();
          newWindow.addToWorkSpace();
          newWindow.setCommonWindowListeners();
        } else {
          alert('Error! name: ' + response.name);
        }
      });
    }

    handleEditing(projectNewName, titleNode) {
      this.xhr.addEventListener('load', () => {
         const result = JSON.parse(this.xhr.response);
         if(this.xhr.status == 200) {
           titleNode.textContent = projectNewName;
         } else {
           alert('Error! name: ' + result.name);
         }
      });
    }

    handleDestroying(projectNode) {
      this.xhr.addEventListener('load', () => {
        if(this.xhr.status == 204) { projectNode.remove(); }
      });
    }
  }

  // CRUD functions for Task
  class TaskRequest {
    constructor(method, path) {
      this.xhr = new XMLHttpRequest();
      this.xhr.open(method, path);
      this.xhr.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
    }

    send(data = null) {
      if (data != null) { data = JSON.stringify(data); }
      this.xhr.send(data);
    }

    loadTasks(targetPlace, projectId) {
      this.xhr.addEventListener('load', () => {
        const tasks = JSON.parse(this.xhr.response);
        tasks.forEach(task => {
          // render tasks items on page
          const taskItem = new Task(targetPlace, task.name, task.id, projectId);
          taskItem.populateNewTaskItem();
          taskItem.addToTasksArea();
          taskItem.setCommonTaskItemListeners();
        });
     });
    }

    saveTask(tasksNode, inputTask) {
      this.xhr.addEventListener('load', () => {
         const response = JSON.parse(this.xhr.response);
         // render task item on page if the new task was saved to db
         if(this.xhr.status == 201) {
           const newTask = new Task(tasksNode, response.name, response.id);
           newTask.populateNewTaskItem();
           newTask.addToTasksArea();
           newTask.setCommonTaskItemListeners();
           inputTask.value = '';
         } else {
            alert('Error: name ' + response.name);
         }
      });
    }

    handleDestroying(taskItem) {
      this.xhr.addEventListener('load', () => {
        if(this.xhr.status == 204) {
          taskItem.remove();
        }
      });
    }
  }

  // loads all existing projects related to the existing user from DB
  const loadAllRequst = new ProjectRequest('GET', '/projects');
  loadAllRequst.send();
  loadAllRequst.loadProjects();


  function convertToIdSelector(prefix, identificator) {
    return `${prefix}_${identificator}`;
  }

  function retrieveId(prefix, selector) {
    return selector.replace(`${prefix}_`, '');
  }
});
