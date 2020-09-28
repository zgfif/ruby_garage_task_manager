'use strict';

import { cookieObject } from '../cookie_helper';
import { Task } from '../elements/task';

// CRUD functions for Task

class TaskRequest {
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

  loadTasks(targetPlace, projectId) {
    this.xhr.addEventListener('load', () => {
      const tasks = JSON.parse(this.xhr.response);
      if (!tasks.error) { renderTaskElements(tasks); }

      function renderTaskElements(tasks) {
        tasks.forEach(task => {
          // render tasks items on page
          const taskItem = new Task(targetPlace, task.name, task.id, projectId, task.status);
          taskItem.populateNewTaskItem();
          taskItem.addToTasksArea();
          taskItem.setCommonTaskItemListeners();
        });
      }
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

  handleUpdating(taskNameNode, newName) {
    this.xhr.addEventListener('load', () => {
      const response = JSON.parse(this.xhr.response);

      if(this.xhr.status == 200) {
        taskNameNode.textContent = newName;
      } else {
        alert('Error: name ' + response.name);
      }
    });
  }
}

export { TaskRequest };
