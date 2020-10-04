// 'use strict';

import { TaskRequest } from '../requests/task_request';
import { setBasicTaskListeners } from './tasks_listeners';
import { getProjectId, getTaskId } from '../helpers/task_helpers';

function setDndListeners(dragArea) {
  let dragSrcEl = null;
  let targetId = null;

  function handleDragStart(e) {
    // Target (this) element is the source node.
    this.style.opacity = '0.4';

    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('taskId', this.id);
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
     targetId = this.id;
     dragSrcEl.innerHTML = this.innerHTML;
     dragSrcEl.id = targetId;
     this.innerHTML = e.dataTransfer.getData('text/html');
     this.id = e.dataTransfer.getData('taskId');

      updateTaskPriority(this);
      updateTaskPriority(dragSrcEl);
     // send two requests to update src.priority and target.priority
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    // this/e.target is the source node.
    [].forEach.call(tasks, function (task) {
        setBasicTaskListeners(task);
    });
  }
  // replace each task with corresponding copy to get rid of existing listeners
  let tasks = dragArea.querySelectorAll('.task-item');

  tasks.forEach(task => {
    let clonedTask = task.cloneNode(true);
    task.parentNode.replaceChild(clonedTask, task);
  });

  tasks = dragArea.querySelectorAll('.task-item');

// set draggable listeners to each task
  [].forEach.call(tasks, function (task) {
    setBasicTaskListeners(task);
    task.addEventListener('dragstart', handleDragStart, false);
    task.addEventListener('dragover', handleDragOver, false);
    task.addEventListener('drop', handleDrop, false);
    task.addEventListener('dragend', handleDragEnd, false);
  });

  function updateTaskPriority(taskItem) {
    const taskPriority = taskItem.getAttribute('priority'),
          projectId = getProjectId(taskItem),
          taskId = getTaskId(taskItem),
          xhr = new TaskRequest('PATCH', `/projects/${projectId}/tasks/${taskId}`);
    xhr.send({ task: { priority: taskPriority } });
    // updates corresponding task element on page if the task was successfully updated in DB
    xhr.handlePriorityUpdating();


    // const project
  }
}

export { setDndListeners };
