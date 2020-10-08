'use strict';

import { getProjectId, getTaskId } from '../helpers/task_helpers';
import { TaskRequest } from '../requests/task_request';
import { CalendarWindow } from '../elements/calendar_window';

function setBasicTaskListeners(taskElement) {
  setEditTaskNameListener(taskElement);
  setMarkCompleteTaskListener(taskElement);
  setRemoveTaskListener(taskElement);
  setOpenCalendarListener(taskElement);
}

// sets the listener to edit the name of the task
function setEditTaskNameListener(taskRow) {
    const editIcon = taskRow.querySelector('[data-edit]'),
          taskNameNode = taskRow.querySelector('.task-name');

    editIcon.addEventListener('click', () => {
      const newTaskName = prompt('You can change the name of task', taskNameNode.textContent);
      if (newTaskName && newTaskName != '') {
        const taskId = getTaskId(taskRow),
              projectId = getProjectId(taskRow),
              request = new TaskRequest('PATCH', `/projects/${projectId}/tasks/${taskId}`);
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
      const isChecked = e.target.checked,
            taskId = getTaskId(taskRow),
            projectId = getProjectId(taskRow),
            request = new TaskRequest('PATCH', `/projects/${projectId}/tasks/${taskId}`),
            taskStatus = isChecked ? 'done' : 'undone' ,
            payload = { task: { status: taskStatus } };
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
          const taskId = getTaskId(taskRow),
                projectId = getProjectId(taskRow),
                // builds the request to delete certain task
                request = new TaskRequest('DELETE', `/projects/${projectId}/tasks/${taskId}`);
          request.send();
          // removes corresponding task element on page if the task was successfully destroyed in DB
          request.handleDestroying(taskRow);
        }
      });
  }

// set the calendar icon listener(to set deadline of the task)
function setOpenCalendarListener(taskRow) {
  const calendarIcon = taskRow.querySelector('[data-deadline]');
  calendarIcon.addEventListener('click', () => {
    if (!document.querySelector('.calendar-window')) {
      const cw = new CalendarWindow(taskRow, calendarIcon);
      cw.processCalendar();
    }
  });

  calendarIcon.addEventListener('mouseover', () => {
      const notice = taskRow.querySelector('.deadline-notice');
      notice.style.display = 'block';
  });

  calendarIcon.addEventListener('mouseout', () => {
      const notice = taskRow.querySelector('.deadline-notice');
      notice.style.display = 'none';
  });
}

export { setBasicTaskListeners };
