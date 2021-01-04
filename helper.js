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
  localStorage.setItem(name, '[]');
};