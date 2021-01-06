var inputToDo = document.getElementById("inputToDo");

// attach key up event to the to do list input
inputToDo.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    //   Cancel the default action, if needed
    e.preventDefault();
    // Trigger the add to list function
    addTask();
    // newElement();
  }
});

// variables
var todoList = document.getElementById("todolist");
var checkBtn = document.getElementsByClassName("checkbtn");
var deleteBtn = document.getElementsByClassName("deleteBtn");
var checkIcon = document.createElement("img");
checkIcon.src = "/images/icon-check.svg";
//  function to add to list
function addTask() {
  var todoValue = inputToDo.value;

  //   create elements
  var tile = document.createElement("li"),
    container = document.createElement("div"),
    headline = document.createElement("h6"),
    text = document.createTextNode(todoValue),
    checkbox = document.createElement("button"),
    cancel = document.createElement("img");
  //   add styling
  tile.classList.add(
    "h-16",
    "flex",
    "items-center",
    "justify-between",
    "px-6",
    "border-b",
    "border-gray-600"
  );
  container.classList.add("flex", "items-center", "space-x-4");
  headline.className = "content";
  headline.classList.add("text-gray-200");
  checkbox.className = "checkbtn";
  checkbox.classList.add(
    "rounded-full",
    "w-6",
    "h-6",
    "border",
    "border-DarkGrayishBlue",
    "flex",
    "items-center",
    "justify-center",
    "focus:outline-none",
    "cursor-pointer"
  );

  cancel.src = "/images//icon-cross.svg";
  cancel.className = "deleteBtn";
  cancel.classList.add("w-3", "h-3", "cursor-pointer");
  // append childs
  headline.appendChild(text);
  container.appendChild(checkbox);
  container.appendChild(headline);
  tile.appendChild(container);
  tile.appendChild(cancel);
  if (todoValue == "" || todoValue == " ") {
    window.alert("Enter item to list first");
  } else {
    todoList.appendChild(tile);
  }

  //   add event listener to delete button
  deleteTask();
  //   add event listener to check button
  completeTask();
}

// delte task from todolist

function deleteTask() {
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", function () {
      var div = this.parentElement;
      div.style.display = "none";
    });
  }
}
// complete task from todolist
function completeTask() {
  for (let index = 0; index < checkBtn.length; index++) {
    checkBtn[index].addEventListener("click", function () {
      this.classList.toggle("check-icon");
      var content = this.nextElementSibling;
      content.classList.toggle("line-through");
      content.classList.toggle("text-DarkGrayishBlue");
    });
  }
}
