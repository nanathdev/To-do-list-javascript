const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");



document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  updateCounter();
});



addTaskBtn.addEventListener("click", addTask);


taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") return;

  const task = {
    text: text,
    completed: false
  };


  createTaskElement(task);
  saveTask(task);

  taskInput.value = "";
  updateCounter();
}

function createTaskElement(task) {
  const li = document.createElement("li");

  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check-btn");

  if (task.completed) {
    checkBtn.classList.add("done");
  }

  const span = document.createElement("span");
  span.textContent = task.text;

  if (task.completed) {
    span.classList.add("completed");
  }

  checkBtn.addEventListener("click", () => {
    checkBtn.classList.toggle("done");
    span.classList.toggle("completed");
    updateLocalStorage();
  });


  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Excluir";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
    updateCounter();
  });


  li.appendChild(checkBtn);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}


function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => createTaskElement(task));
}

function updateLocalStorage() {
  const tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("span").classList.contains("completed");

    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
  const total = document.querySelectorAll("#taskList li").length;
  document.getElementById("taskCounter").textContent = `${total} tarefa(s)`;
}


function filterTasks(type) {
  const tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(task => {
    const isCompleted = task.querySelector("span").classList.contains("completed");

    if (type === "all") {
      task.style.display = "flex";
    } else if (type === "completed") {
      task.style.display = isCompleted ? "flex" : "none";
    } else {
      task.style.display = !isCompleted ? "flex" : "none";
    }
  });
}


clearAllBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
  updateCounter();
});



