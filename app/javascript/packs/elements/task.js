'use strict';

import { TaskRequest } from '../requests/task_request';

import { setBasicTaskListeners } from '../listeners/tasks_listeners';

class Task {
  constructor(tasksArea, taskName, taskId, projectId, taskStatus) {
    this.tasksArea = tasksArea;
    this.taskName = taskName;
    this.taskItem = document.createElement('div');
    this.taskItem.classList.add('task-item');
    this.taskItem.id = `task_${taskId}`;
    this.projectId = projectId;
    this.taskStatus = taskStatus == 'done' ? 'checked' : '' ;
    this.taskItem.setAttribute('draggable', 'true');
  }

  populateNewTaskItem() {
    this.taskItem.innerHTML = `<div class="task-completing"><input type="checkbox" ${this.taskStatus}></div>
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

  // sets listeners to interact with a task item (click on destroy and edit task)
  setCommonTaskItemListeners() {
    setBasicTaskListeners(this.taskItem);
  }
}

export { Task };
