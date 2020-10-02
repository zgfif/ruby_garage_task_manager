'use strict';

import { extractId } from '../selector_helper';
import { TaskRequest } from '../requests/task_request';


function setBasicTaskListeners(taskElement) {
  setEditTaskNameListener(taskElement);
  setMarkCompleteTaskListener(taskElement);
  setRemoveTaskListener(taskElement);
}

// sets the listener to edit the name of the task
function setEditTaskNameListener(taskRow) {
    const editIcon = taskRow.querySelector('[data-edit]'),
          taskNameNode = taskRow.querySelector('.task-name');

    editIcon.addEventListener('click', () => {
      const newTaskName = prompt('You can change the name of task', taskNameNode.textContent);
      if (newTaskName && newTaskName != '') {
        const taskId = getTaskId(taskRow);
        const projectId = getProjectId(taskRow);
        const request = new TaskRequest('PATCH', `/projects/${projectId}/tasks/${taskId}`);
        request.send({ task: { name: newTaskName } });
        // updates corresponding task element on page if the task was successfully updated in DB
        request.handleNameUpdating(taskNameNode, newTaskName);
      }
    });
}

// sets the checkbox listener
function setMarkCompleteTaskListener(taskRow) {
    const taskCheckbox = taskRow.querySelector('.task-completing input');

    taskCheckbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const taskId = getTaskId(taskRow);
      const projectId = getProjectId(taskRow);
      const request = new TaskRequest('PATCH', `/projects/${projectId}/tasks/${taskId}`);
      const taskStatus = isChecked ? 'done' : 'undone';
      const payload = { task: { status: taskStatus } };
      request.send(payload);
    });
}

// sets the trash icon listener(to remove the task)
function setRemoveTaskListener(taskRow) {
      const trashIcon = taskRow.querySelector('[data-remove]'),
            taskName = taskRow.querySelector('.task-name').textContent;

      trashIcon.addEventListener('click', () => {
        const really = confirm(`Are you really want to remove ${taskName}?`);
        if(really) {
          const taskId = getTaskId(taskRow);
          const projectId = getProjectId(taskRow);
          // builds the request to delete certain task
          const request = new TaskRequest('DELETE', `/projects/${projectId}/tasks/${taskId}`);
          request.send();
          // removes corresponding task element on page if the task was successfully destroyed in DB
          request.handleDestroying(taskRow);
        }
      });
  }


// retrieve related to task the project_id
function getProjectId(taskRow) {
  return extractId('project', taskRow.parentNode.parentNode.id);
}

// retrieve the task_id of the task_element
function getTaskId(taskRow) {
  return extractId('task', taskRow.id);
}


export { setBasicTaskListeners };
