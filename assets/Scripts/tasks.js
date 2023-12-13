const tasks = document.querySelector(".tasks");
const ulTask = document.querySelector(".task-list");
const formEl = document.querySelector("#to-do");
const toDoInput = document.querySelector(".todo-input");
const creatBtn = document.querySelector("#creat-task");
const deleteTask = document.querySelector(".delete-task");
const tasksToDo = JSON.parse(localStorage.getItem("todos")) || [];

creatTask();

// =========
formEl.addEventListener("submit", async function (e) {
  e.preventDefault();
  const task = {
    id: Date.now(),
    task: toDoInput.value,
  };
  if (toDoInput.value.trim() === "") {
    alert("please enter your task!");
  } else if (toDoInput.value.trim()) {
    tasksToDo.push(task);
    localStorage.setItem("todos", JSON.stringify(tasksToDo));
    creatTask();
    toDoInput.value = "";
    toDoInput.focus();
  }
});

function creatTask() {
  ulTask.innerHTML = "";
  tasksToDo.forEach((task) => {
    const liEl = document.createElement("li");
    liEl.id = task.id;
    liEl.innerHTML = `
      <input type="checkbox" name="" id="check-box"/>
      <label class="togglebox" for="check-box"> </label>
      <p>${smallerTask(task.task, 10)}</p>
      <div>
        <img src="../project1/assets/Images/edit.png" alt="" />
        <img src="../project1/assets/Images/trash.png" alt="" class="delete-task" />
      </div>`;
    ulTask.prepend(liEl);
  });
}

function smallerTask(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

ulTask.addEventListener("click", async function (e) {
  const id = e.target.closest("li").id;
  if (e.target.classList.contains("delete-task")) {
    const index = tasksToDo.findIndex((task) => task.id == id);
    tasksToDo.splice(index, 1);
    document.getElementById(id).remove();
    saveToLocalStorage();
  }
});

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(tasksToDo));
}
