// Get the new task and insert it in the Tasks section
const form = document.querySelector('#task-form');
form.addEventListener('submit', addTask);

function addTask(evt) {
  evt.preventDefault();
  // Get the value of the input
  const newTaskInput = evt.target.querySelector('#task');
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
  const taskList = document.querySelector('ul');
  taskList.appendChild(li);
  // Clear the input field and the backgound color
  newTaskInput.value = '';
  newTaskInput.style.backgroundColor = '';

}