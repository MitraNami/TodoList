// Event handler for submitting a new task
const addTask = function(evt) {
  evt.preventDefault();
  // Get the value of the input
  const newTaskInput = document.querySelector('#task');
  const newTask = newTaskInput.value;
  // Make sure newTask is not blanck, make it pink if it is blanck
  if (!newTask) {
    newTaskInput.style.backgroundColor = 'pink';
    return;
  }
  const li = createLiElement(newTask);
  // Append the li element into the unordered list
  const taskList = document.querySelector('ul.collection');
  taskList.appendChild(li);
  // Persist to localStorage
  persistInLocalStorage('tasks', newTask);
  // Clear the input field and the backgound color
  newTaskInput.value = '';
  newTaskInput.style.backgroundColor = '';
};


// Event handler for removing a task from both the DOM and localStorage
const removeTask = function(evt) {
  // Only when the trashbin icon is clicked, the task should be removed
  // We check if the parent element has a class named delete-item
  if (evt.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      // Remove the li elememnt which is the parent of the parent of the trashbin icon
      evt.target.parentElement.parentElement.remove();
      // Remove the task from localStorage as well
      const taskName = evt.target.parentElement.previousSibling.textContent;
      removeFromLocalStorage('tasks', taskName);
    }
  }
};


// Event handler for removing all tasks from both the DOM and localStorage
const removeAllTasks = function(evt) {
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
    // Remove all tasks from localStorage as well
    removeAllFromLocalStorage('tasks');
  }
};


// Event handler for filtering the tasks while typing in the filter input
const filterTasks = function(evt) {
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
};


// Event handler for displaying the tasks from localStorage after page reload
const loadTasks = function() {
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', '[]');
  }
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach(task => {
    const li = createLiElement(task);
    // Append the li element into the unordered list
    const taskList = document.querySelector('ul.collection');
    taskList.appendChild(li);
  });
};


// Adds the value to the array associated with the key name in the localStorage
const persistInLocalStorage = function(name, value) {
  if (!localStorage.getItem(name)) {
    localStorage.setItem(name, '[]');
  }
  const values = JSON.parse(localStorage.getItem(name));
  values.push(value);
  localStorage.setItem(name, JSON.stringify(values));
};


// Remove the given value from the array associated with the key name in the localStorage
const removeFromLocalStorage = function(name, value) {
  if (!localStorage.getItem(name)) {
    localStorage.setItem(name, '[]');
  }
  const values = JSON.parse(localStorage.getItem(name));
  const newValues = values.filter(val => val !== value);
  localStorage.setItem(name, JSON.stringify(newValues));
};


// Remove all tasks from localStorage for the key name
const removeAllFromLocalStorage = function(name) {
  localStorage.removeItem(name);
};


// Create an li element containing a textNode and an anchor element
const createLiElement = function(text) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  // Append the newTask as text node into the li element
  const textNode = document.createTextNode(text);
  li.appendChild(textNode);
  // Create remove link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  // Add icon to the link
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  // Append the link to the li element
  li.appendChild(link);
  return li;
};