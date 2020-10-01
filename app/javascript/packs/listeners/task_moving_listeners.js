// 'use strict';
import { extractId } from '../selector_helper';
import { TaskRequest } from '../requests/task_request';

function setDndListeners(dragArea) {
  var dragSrcEl = null;

  function handleDragStart(e) {
    // Target (this) element is the source node.
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
     e.preventDefault(); // Necessary. Allows us to drop.
   }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
  }

  function handleDrop(e) {
    // this/e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
      // Set the source column's HTML to the HTML of the column we dropped on.
     dragSrcEl.innerHTML = this.innerHTML;
     this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    // this/e.target is the source node.
    [].forEach.call(cols, function (col) {
        setEditTaskListener(col);
        setRemoveTaskListener(col);
        setMarkCompleteListener(col);
    });
  }

  var cols = dragArea.querySelectorAll('.task-item');

  [].forEach.call(cols, function (col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
  });
}


function setEditTaskListener(taskRow) {
    const editIcon = taskRow.querySelector('[data-edit]'),
          taskNameNode = taskRow.querySelector('.task-name');

    editIcon.addEventListener('click', () => {
      const newTaskName = prompt('You can change the name of task', taskNameNode.textContent);
      if (newTaskName && newTaskName != '') {
        const taskId = extractId('task', taskRow.id); // example: from 'task_555' to '555'
        const projectId = extractId('project', taskRow.parentNode.parentNode.id);
        const request = new TaskRequest('PATCH', `/projects/${projectId}/tasks/${taskId}`);
        request.send({ task: { name: newTaskName } });
        // updates corresponding task element on page if the task was successfully updated in DB
        request.handleUpdating(taskNameNode, newTaskName);
      }
    });
}

function setRemoveTaskListener(taskRow) {
      const trashIcon = taskRow.querySelector('[data-remove]'),
            taskName = taskRow.querySelector('.task-name').textContent;

      trashIcon.addEventListener('click', () => {
        const really = confirm(`Are you really want to remove ${taskName}?`);
        if (really) {
          const taskId = extractId('task', taskRow.id); // example: from 'task_555' to '555'
          const projectId = extractId('project', taskRow.parentNode.parentNode.id);
          // builds the request to delete certain task
          const request = new TaskRequest('DELETE', `/projects/${projectId}/tasks/${taskId}`);
          request.send();
          // removes corresponding task element on page if the task was successfully destroyed in DB
          request.handleDestroying(taskRow);
        }
      });
  }

  function setMarkCompleteListener(taskRow) {
    const taskCheckbox = taskRow.querySelector('.task-completing input');

    taskCheckbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const taskId = extractId('task', taskRow.id);
      const projectId = extractId('project', taskRow.parentNode.parentNode.id);
      const request = new TaskRequest('PATCH', `/projects/${projectId}/tasks/${taskId}`);
      const taskStatus = isChecked ? 'done' : 'undone';
      const payload = { task: { status: taskStatus } };
      request.send(payload);
    });
  }

export { setDndListeners };
