'use strict';

import { extractId } from '../selector_helper';

export function getProjectId(taskRow) {
  return extractId('project', taskRow.parentNode.parentNode.id);
}

// retrieve the task_id of the task_element
export function getTaskId(taskRow) {
  return extractId('task', taskRow.id);
}
