'use strict';

function convertDateToString(date = new Date()) {
  const year = date.getFullYear(),
        month = date.getMonth() + 1 ,
        day = date.getDate(),
        hoursMinutesSeconds = '00:00:00';

  return `${year}-${month}-${day} ${hoursMinutesSeconds}`;
}

export { convertDateToString };
