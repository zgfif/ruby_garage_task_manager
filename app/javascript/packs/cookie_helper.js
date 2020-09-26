'use strict';

// extract string cookies to js object
export function cookieObject() {
  let obj = {};
  let cookies = document.cookie;
  cookies = cookies.split('; ');
  cookies.forEach(item => {
    item = item.split('=');
    obj[item[0]] = item[1];
  });
  return obj;
}

// checks if cookies has Authorization token
export function isSignIn() {
  const token = cookieObject().Authorization;
  if(token && token != 'undefined') {
    return true;
  } else {
    return false;
  }
}
