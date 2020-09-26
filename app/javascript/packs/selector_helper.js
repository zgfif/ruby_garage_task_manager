'use strict';

// this function is used to extract some id from CSS seletor(id), for example,
// from 'project_1234' to '1234' which is used for further async requests to DB.
export function extractId(prefix, selector) {
  return selector.replace(`${prefix}_`, '');
}
