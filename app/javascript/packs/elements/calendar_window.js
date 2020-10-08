'use strict';

import { CalendarPicker } from '../CalendarPicker';
import { getProjectId, getTaskId } from '../helpers/task_helpers';
import { TaskRequest } from '../requests/task_request';
import { convertDateToString } from '../helpers/date_helper';
import { disableScroll, enableScroll } from '../helpers/scrolling';


class CalendarWindow {
  constructor(taskItem, calendarIcon) {
    this.taskItem = taskItem;
    this.icon = calendarIcon;
    this.clearDeadlineBtn = this.buildClearButton();
  }

  processCalendar() {
    this.buildCalendar();
    this.showCalendar();
    this.setCloseCalendarListener();
    this.setClearDeadlineListener();
  }

  buildCalendar() {
    this.calendarNode = document.createElement('div');
    this.calendarNode.classList.add('calendar-window');
  }

  showCalendar() {
    disableScroll();
    if(this.hasItDeadline()) { this.attachClearButton(); }

    this.taskItem.append(this.calendarNode);
    this.calendarObject();
  }

  calendarObject() {
    const nextYear = new Date().getFullYear() + 1 ,
          // builds the calendar in target selector(place), the calendar has the
          // range(min - minimum date, max - maximum date)
          myCalender = new CalendarPicker('.calendar-window', { min: new Date(), max: new Date(nextYear, 10) });

    // if user clicks on some date the calendar starts to update the deadline of
    // the corresponding task.
    myCalender.onValueChange((currentValue) => {
       this.updateTaskDeadline(currentValue);
    });
  }

  updateTaskDeadline(currentValue) {
    const projectId = getProjectId(this.taskItem),
          taskId = getTaskId(this.taskItem),
          // converts the date object to string 'YYYY-MM-DD 00:00:00'
          deadlineDate = convertDateToString(currentValue),
          xhr = new TaskRequest('PATCH', `/projects/${projectId}/tasks/${taskId}`);

    xhr.send({ task: { deadline: deadlineDate } });
    xhr.handleDeadlineUpdating(this.calendarNode, this.taskItem);
  }

  setCloseCalendarListener() {
    document.addEventListener('click', (e) => {
      if(e.target.contains(this.calendarNode) && e.target != this.icon) {
          enableScroll();
          this.closeCalendar();
      }
    });
  }

  closeCalendar() {
    this.calendarNode.remove();
  }

  setClearDeadlineListener() {
    const projectId = getProjectId(this.taskItem),
          taskId = getTaskId(this.taskItem);

    this.clearDeadlineBtn.addEventListener('click', () => {
      if(!this.hasItDeadline()) { return; }

        const xhr = new TaskRequest('PATCH', `/projects/${projectId}/tasks/${taskId}`);
        xhr.send({ task: { deadline: null } });
        xhr.handleDeadlineUpdating(this.calendarNode, this.taskItem);
    });
  }

// checks if taskRow has deadline content
  hasItDeadline() {
    const deadline = this.taskItem.querySelector('.deadline-notice').textContent,
          boolean = deadline == '' ? false : true;
    return boolean;
  }

  attachClearButton() {
    this.calendarNode.append(this.clearDeadlineBtn);
    this.setClearDeadlineListener();
  }

  buildClearButton() {
    const cb = document.createElement('div');
    cb.classList.add('clear-deadline-button');
    cb.textContent = 'clear deadline';
    return cb;
  }
}

export { CalendarWindow };
