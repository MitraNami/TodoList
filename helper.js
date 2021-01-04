// Adds the value to the array associated with the key name in the localStorage
const persist = function(name, value) {
  if (!localStorage.getItem(name)) {
    localStorage.setItem(name, '[]');
  }
  const values = JSON.parse(localStorage.getItem(name));
  values.push(value);
  localStorage.setItem(name, JSON.stringify(values));
};