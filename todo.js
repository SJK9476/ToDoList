const submitButton = document.querySelector(".submit-button");
const taskInput = document.querySelector(".todo-input");
const listInput = document.querySelector(".list-input");
const checkboxDelete = document.querySelectorAll(".checkbox");
const deleteButton = document.querySelector(".delete-tasks");

let todoList = [];

submitButton.addEventListener("click", () => {
  const checkIfhidden = document.querySelector(".todo-list");
  const deleteButton = document.querySelector(".delete-tasks");

  if (taskInput.value === "") {
    window.alert("Please enter a new task before submitting");
  } else {
    addTodo(taskInput.value);

    deleteButton.classList.remove("hidden");

    if (checkIfhidden.classList.contains("hidden")) {
      checkIfhidden.classList.remove("hidden");
    }
  }
});

function addTodo(item) {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };
    todoList.push(todo);
    renderTodoList(todo);
    taskInput.value = "";
  }
}

let todoHTML = "";

function renderTodoList() {
  const renderedList = document.querySelector(".todo-list");
  renderedList.innerHTML = "";

  todoList.forEach((todo) => {
    const newListItem = document.createElement("div");
    newListItem.classList.add("list-item");

    newListItem.innerHTML = `
  <label for="item-${todo.id}">${todo.name}</label>
                 <input type="checkbox" class="checkbox" data-delete-id="${todo.id}">`;

    renderedList.appendChild(newListItem);
  });
}

deleteButton.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".checkbox:checked");
  checkboxes.forEach((checkbox) => {
    const todoId = parseInt(checkbox.getAttribute("data-delete-id"));
    todoList = todoList.filter((todo) => todo.id !== todoId);
  });

  if (todoList.length < 1) {
    document.querySelector(".todo-list").classList.add("hidden");
    document.querySelector(".delete-tasks").classList.add("hidden");
  }
  renderTodoList();
});
