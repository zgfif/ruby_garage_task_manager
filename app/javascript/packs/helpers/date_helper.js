'use strict';

function convertDateToString(date = new Date()) {
  const year = date.getFullYear(),
        month = date.getMonth() + 1 ,
        day = date.getDate(),
        hoursMinutesSeconds = '00:00:00';

  return `${year}-${month}-${day} ${hoursMinutesSeconds}`;
}


function decorateDeadline(deadline) {
    if(deadline) {
      return deadline.substring(0, 10);
    } else {
      return '';
    }
  }

export { convertDateToString, decorateDeadline };
