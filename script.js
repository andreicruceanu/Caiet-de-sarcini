const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("adaugaTask");
const allTasks = document.getElementById("all-tasks");

const createTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const buttonEdit = document.createElement("button");
  const buttonDelete = document.createElement("button");

  label.innerText = taskString;
  editInput.type = "text";
  buttonEdit.innerText = "Modifica";
  buttonDelete.innerText = "Sterge";
  buttonEdit.className = "edit";
  buttonDelete.className = "delete";

  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(buttonEdit);
  listItem.appendChild(buttonDelete);
  return listItem;
};
const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

const editTask = function () {
  const listItem = this.parentNode;
  const inputSelected = listItem.querySelector('input[type="text"]');
  const label = listItem.querySelector("label");
  const containsClass = listItem.classList.contains("editMode");

  if (containsClass == true) {
    label.innerText = inputSelected.value;
    if (inputSelected.value === "") {
      alert("Introdu o sarcina");
      inputSelected.value = "Introdu sarcina";
      return;
    }
  } else {
    inputSelected.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
};

const bindTaskEvents = function (taskListItem) {
  const editButton = taskListItem.querySelector(".edit");
  const deleteButton = taskListItem.querySelector(".delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};

const addTask = function () {
  const listItem = createTaskElement(taskInput.value);
  allTasks.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = "";
};

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

const initialEditBtns = document.getElementsByClassName("edit");

for (i = 0; i < initialEditBtns.length; i++) {
  initialEditBtns[i].addEventListener("click", editTask);
}

const initialDeleteBtns = document.getElementsByClassName("delete");

for (i = 0; i < initialDeleteBtns.length; i++) {
  initialDeleteBtns[i].addEventListener("click", deleteTask);
}
