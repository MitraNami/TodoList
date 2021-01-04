// Get the new task and insert it in the Tasks section
const form = document.querySelector('#task-form');
form.addEventListener('submit', addTask);

function addTask(evt) {
  evt.preventDefault();
  // Get the value of the input
  const newTaskInput = document.querySelector('#task');
  const newTask = newTaskInput.value;
  // Make sure newTask is not blanck, make it pink if it is blanck
  if (!newTask) {
    newTaskInput.style.backgroundColor = 'pink';
    return;
  }
  const li = document.createElement('li');
  li.className = 'collection-item';
  // Append the newTask as text node into the li element
  const textNode = document.createTextNode(newTask);
  li.appendChild(textNode);
  // Create remove link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  // Add icon to the link
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  // Append the link to the li element
  li.appendChild(link);
  // Append the li element into the unordered list
  const taskList = document.querySelector('ul.collection');
  taskList.appendChild(li);
  // Persist to localStorage
  persist('tasks', newTask);
  // Clear the input field and the backgound color
  newTaskInput.value = '';
  newTaskInput.style.backgroundColor = '';
}


// Remove the task from the list when its trashbin icon is clicked
// Put the EventListener on the parent of the li elements ie unordered list
const taskList = document.querySelector('ul.collection');
taskList.addEventListener('click', removeTask);

function removeTask(evt) {
  // Only when the trashbin icon is clicked, the task should be removed
  // We check if the parent element has a class named delete-item
  if (evt.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      // Remove the li elememnt which is the parent of the parent of the trashbin icon
      evt.target.parentElement.parentElement.remove();
    }
  }
}


// Remove all the tasks when the CLEAR TASKS button is clicked
const clearbtn = document.querySelector('.clear-task');
clearbtn.addEventListener('click', removeAllTasks);

function removeAllTasks(evt) {
  evt.preventDefault();
  const taskList = document.querySelector('ul.collection');
  if (taskList.children.length === 0) {
    return;
  }
  if (confirm('Are you sure you want to delete all tasks?')) {
    // Remove all the li elements in the unordered list
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }  
  }
}


// Filter the tasks
const filterInput = document.querySelector('#filter');
filterInput.addEventListener('keyup', filterTasks);

function filterTasks(evt) {
  const taskQueried = evt.target.value.toLowerCase();
  const lis = document.querySelectorAll('.collection-item');
  // Show only the li elements whose textNodes includes the task queried string
  lis.forEach(li => {
    const taskName = li.firstChild.textContent.toLowerCase();
    if (taskName.includes(taskQueried)) {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  });
}

// Display the information in the localStorage after reload
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks(evt) {
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', '[]');
  }
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'collection-item';
    // Append the newTask as text node into the li element
    const textNode = document.createTextNode(task);
    li.appendChild(textNode);
    // Create remove link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon to the link
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // Append the link to the li element
    li.appendChild(link);
    // Append the li element into the unordered list
    const taskList = document.querySelector('ul.collection');
    taskList.appendChild(li);
  });
}