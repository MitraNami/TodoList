// Get the new task and insert it in the Tasks section
const form = document.querySelector('#task-form');
form.addEventListener('submit', addTask);


// Remove the task from the list when its trashbin icon is clicked
// Put the EventListener on the parent of the li elements ie unordered list
const taskList = document.querySelector('ul.collection');
taskList.addEventListener('click', removeTask);


// Remove all the tasks when the CLEAR TASKS button is clicked
const clearbtn = document.querySelector('.clear-task');
clearbtn.addEventListener('click', removeAllTasks);


// Filter the tasks
const filterInput = document.querySelector('#filter');
filterInput.addEventListener('keyup', filterTasks);


// Display the tasks in the localStorage after reload
document.addEventListener('DOMContentLoaded', loadTasks);