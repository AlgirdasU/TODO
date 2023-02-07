"use strict";
const addBtn = document.querySelector(".todo__btn-add");
const tasks = document.querySelector(".tasks");
const taskContainer = document.querySelector(".task-container");
const input = document.querySelector(".todo__input");
const topThreeBtns = document.querySelector(".tasks__btn-box");

let tasksArray = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

console.log(tasksArray);

const renderTask = () => {
  tasksArray.forEach((_, i) => {
    let html = `
      <div class="task">
        <form action="#" class="task__form">
          <input
            type="checkbox"
            name="task"
            aria-label="checkbox"
            class="task__checkbox"
          
          />
          <span class="task__description" contenteditable = "false"
            >${tasksArray[i]}</span
          >
        </form>
        <div class="task__btn-box">
          <button class="task__btn-edit" type="submit" aria-label="Edit">
            <svg class="task__btn-edit--icon">
              <use
                xLink:href="../images/sprite.svg#edit-svgrepo-com"
              ></use>
            </svg>            
          </button>
          <button class="task__btn-delete" aria-label="Trash">
            <svg class="task__btn-delete--icon">
              <use
                xLink:href="../images/sprite.svg#trash-svgrepo-com"
              ></use>
            </svg>            
          </button>
          <button class="task__btn-update" type="submit" aria-label="Update" value="Update">
            <svg class="task__btn-edit--icon">
                <use
                   xLink:href="../images/sprite.svg#update-page-svgrepo-com"
              ></use>
            </svg>  
          </button>
          <button class="task__btn-cancel" type="submit" aria-label="Cancel" value="Cancel">
            <svg class="task__btn-edit--icon">
              <use
                xLink:href="../images/sprite.svg#cancel-svgrepo-com"
              ></use>
            </svg>  
          </button>
         </div>
        </div>
`;

    taskContainer.insertAdjacentHTML("beforeend", html);
    tasks.style.display = "block";
    topThreeBtns.style.display = "block";
  });
  activateEdit();
  activateUpdate();
  activateCancel();
  activateDelete();
  checkAll();
  uncheckAll();
};

// DELETE
function activateDelete() {
  const deleteBtn = document.querySelectorAll(".task__btn-delete");
  deleteBtn.forEach((delBtn, index) => {
    delBtn.addEventListener("click", () => {
      deleteTask(index);
    });
  });
}

function deleteTask(index) {
  tasksArray.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  location.reload();
}

// EDIT
function activateEdit() {
  const editBtn = document.querySelectorAll(".task__btn-edit");
  const deleteBtn = document.querySelectorAll(".task__btn-delete");
  const updateBtn = document.querySelectorAll(".task__btn-update");
  const cancelBtn = document.querySelectorAll(".task__btn-cancel");
  const taskUpdate = document.querySelectorAll("[contenteditable=false]");

  editBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      updateBtn[index].style.display = "block";
      cancelBtn[index].style.display = "block";
      editBtn[index].style.display = "none";
      deleteBtn[index].style.display = "none";
      taskUpdate[index].setAttribute("contenteditable", true);
    });
  });
}

// UPDATE START
function activateUpdate() {
  const editBtn = document.querySelectorAll(".task__btn-edit");
  const deleteBtn = document.querySelectorAll(".task__btn-delete");
  const updateBtn = document.querySelectorAll(".task__btn-update");
  const cancelBtn = document.querySelectorAll(".task__btn-cancel");
  const taskUpdate = document.querySelectorAll("[contenteditable=false]");
  const taskDescription = document.querySelectorAll(".task__description");

  updateBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      updateBtn[index].style.display = "none";
      cancelBtn[index].style.display = "none";
      editBtn[index].style.display = "block";
      deleteBtn[index].style.display = "block";
      taskUpdate[index].setAttribute("contenteditable", false);
      tasksArray[index] = taskDescription[index].textContent;
      localStorage.setItem("tasks", JSON.stringify(tasksArray));
      location.reload();
    });
  });
}

// CANCEL START
function activateCancel() {
  const editBtn = document.querySelectorAll(".task__btn-edit");
  const deleteBtn = document.querySelectorAll(".task__btn-delete");
  const updateBtn = document.querySelectorAll(".task__btn-update");
  const cancelBtn = document.querySelectorAll(".task__btn-cancel");
  const taskUpdate = document.querySelectorAll("[contenteditable=false]");
  cancelBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      updateBtn[index].style.display = "none";
      cancelBtn[index].style.display = "none";
      editBtn[index].style.display = "block";
      deleteBtn[index].style.display = "block";
      taskUpdate[index].setAttribute("contenteditable", false);
      location.reload();
    });
  });
}

//CHECK ALL
function checkAll() {
  const taskCheckbox = document.querySelectorAll("input[type=checkbox]");
  const checkAllBtn = document.querySelector(".tasks__check-all");
  taskCheckbox.forEach((check) => {
    checkAllBtn.addEventListener("click", () => {
      check.checked = true;
    });
  });
}

// UNCHECK ALL
function uncheckAll() {
  const taskCheckbox = document.querySelectorAll("input[type=checkbox]");
  const uncheckAllBtn = document.querySelector(".tasks__uncheck-all");
  taskCheckbox.forEach((check) => {
    uncheckAllBtn.addEventListener("click", () => {
      check.checked = false;
    });
  });
}

let task;
let checkedBox;
let newTasksArray = [];

function delSelected() {
  const taskCheckboxes = document.querySelectorAll("input[type=checkbox]");
  const taskBox = document.querySelectorAll(".task");

  taskCheckboxes.forEach((check, index) => {
    if (check.checked) {
      task = taskBox[index];
      task.remove();
      checkedBox = taskCheckboxes[index];
      checkedBox.remove();
      tasksArray.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasksArray));
      delSelected();
      location.reload();
    }
  });
}

addBtn.addEventListener("click", () => {
  if (input.value) {
    tasksArray.push(input.value);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    location.reload();
  }
});
window.onload = () => {
  renderTask();
};
