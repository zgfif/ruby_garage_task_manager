Task manager
I​ 'm a person who passionate about my own productivity. I want to
manage my tasks and projects more effectively. I need a simple tool that
supports me in controlling my task-flow
Functional requirements
- I want to be able to create​
/ ​ update​ / ​ delete projects
- I want to be able to add tasks to my project
- I want to be able to update​
/ ​ delete tasks
- I want to be able to prioritize tasks into a project
- I want to be able to choose deadline for my task
- I want to be able to mark a task as 'done'
Technical requirements
01​ . It should be a WEB application
02​ . For the client side must be used:
HTML, CSS (any libs as Twitter Boorstrap, Blueprint ...),
JavaScript (any libs as jQuery, Prototype ...)
03​ . For a server side any language as Ruby, PHP, Python,
JavaScript, C#, Java ...
04​ . It should have a client side and server side validation
05.​ It should look like on screens (see attached file
“​ test-task-ruby-courses-view.png”​ ).Additional requirements
- It should work like one page WEB application and should use AJAX
technology, load and submit data without reloading a page.
- It should have user authentication solution and a user should only
have access to their own projects and tasks.
- It should have automated tests for the all functionality
SQL task
Given tables:
01​ . tasks (id, name, status, project_id)
02.​ projects (id, name)
Technical requirements
-
-
get all statuses, not repeating, alphabetically ordered
get the count of all tasks in each project, order by tasks count
descending
- get the count of all tasks in each project, order by projects
names
- get the tasks for all projects having the name beginning with
"N" letter
- get the list of all projects containing the 'a' letter in the middle of
the name, and show the tasks count near each project. Mentionthat there can exist projects without tasks and tasks with
project_id = NULL
- get the list of tasks with duplicate names. Order alphabetically
- get list of tasks having several exact matches of both name and
status, from the project 'Garage'. Order by matches count
- get the list of project names having more than 10 tasks in status
'completed'. Order by project_id
RubyGarage
