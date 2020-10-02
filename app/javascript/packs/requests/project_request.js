'use strict';

import { cookieObject } from '../cookie_helper';
import { TodoWindow } from '../elements/todo_window';
import { TaskRequest } from './task_request';

// CRUD functions for Project
class ProjectRequest {
  constructor(method, path) {
     this.xhr = new XMLHttpRequest();
     this.xhr.open(method, path);
     this.xhr.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
     this.xhr.setRequestHeader('Authorization', cookieObject().Authorization);
  }

  send(data = null) {
    if (data != null) { data = JSON.stringify(data); }
    this.xhr.send(data);
  }

  loadProjects(workspace) {
     this.xhr.addEventListener('load', () => {
       const projects = JSON.parse(this.xhr.response);

       if(!projects.error) { renderProjectElements(workspace, projects); }
    });

    function renderProjectElements(workspace, projects) {
      workspace.innerHTML = '';
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
    }
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

  handleNameUpdating(projectNewName, titleNode) {
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

export { ProjectRequest };
