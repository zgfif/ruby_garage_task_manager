'use strict';

import { CalendarPicker } from '../CalendarPicker';
import { getProjectId, getTaskId } from '../helpers/task_helpers';
import { TaskRequest } from '../requests/task_request';
import { convertDateToString } from '../helpers/date_helper';

function processCalendar(taskItem, calendarIcon) {
  const body = document.querySelector('body'),
        calendarWindow = document.createElement('div');

  calendarWindow.classList.add('calendar-window');
  body.append(calendarWindow);
  calendarObject('.calendar-window', taskItem, calendarWindow);
  setCloseCalendarListener(calendarWindow, calendarIcon);
}

// remove calendar if a user clicks outside of modal
function setCloseCalendarListener(calendar, calendarIcon) {
   document.addEventListener('click', (e) => {
     if (!calendar.contains(e.target) && e.target != calendarIcon) {
       calendar.remove();
     }
   });
}


function calendarObject(targetSelector, taskItem, calendar) {
  const nextYear = new Date().getFullYear() + 1 ,
        // builds the calendar in target selector(place), the calendar has the
        // range(min - minimum date, max - maximum date)
        myCalender = new CalendarPicker(targetSelector, { min: new Date(), max: new Date(nextYear, 10) });

  // if user clicks on some date the calendar starts to update the deadline of
  // the corresponding task.
  myCalender.onValueChange((currentValue) => {
     updateTaskDeadline(taskItem, currentValue, calendar);
  });
}

function updateTaskDeadline(taskItem, currentValue, calendarElement) {
  const projectId = getProjectId(taskItem),
        taskId = getTaskId(taskItem),
        // converts the date object to string 'YYYY-MM-DD 00:00:00'
        deadlineDate = convertDateToString(currentValue),
        xhr = new TaskRequest('PATCH', `/projects/${projectId}/tasks/${taskId}`);

  xhr.send({ task: { deadline: deadlineDate } });

  xhr.handleDeadlineUpdating(calendarElement);
}

export { processCalendar };
