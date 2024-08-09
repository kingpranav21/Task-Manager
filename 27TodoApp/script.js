document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromLocalStorage();
});
document.getElementById("task-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const date = document.querySelector("#due-date").value;

  const task = {
    title,
    description,
    date,
  };
  addTaskToList(task);
  clearForm();
});

const tasks = [];
const addTaskToList = (task) => {
  tasks.unshift(task);
  saveToLocalStorage();
  displayTasks();
};
const displayTasks = () => {
  const taskList = document.querySelector(".taskList");
  taskList.innerHTML = "";
  tasks.forEach((item, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
                    <h3 id="hId-${index}"> ${item.title} </h3>
                    <p id="pId-${index}"> ${item.description}</p>
                    <p id="p2Id-${index}"> <strong>${item.date} </strong> </p>
                    <button class="edit-btn" onclick="editTask(${index})">📝</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
                `;

    taskList.appendChild(taskItem);
  });
};

const editTask = (i) => {
  const task = tasks[i];
  document.querySelector(
    `#hId-${i}`
  ).outerHTML = `<input type='text' id='hEdit-${i}' value="${task.title}" onblur="saveTask(${i},'title', this.value)" />`;
  document.querySelector(
    `#pId-${i}`
  ).outerHTML = `<input type='text' id='pEdit-${i}' value="${task.description}" onblur="saveTask(${i},'description', this.value)" />`;
  document.querySelector(
    `#p2Id-${i}`
  ).outerHTML = `<input type='date' id='p2Edit-${i}' value="${task.date}" onblur="saveTask(${i},'date', this.value)" />`;
};

const saveTask = (index, key, value) => {
  tasks[index][key] = value;
  saveToLocalStorage();
  displayTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
};
const clearForm = () => {
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#due-date").value = "";
};

const loadTasksFromLocalStorage = () => {
  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  if (tasksStorage) {
    tasks.push(...tasksStorage);
    displayTasks();
  }
};
const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
