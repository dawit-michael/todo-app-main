var inputToDo = document.getElementById("inputToDo");
// variables
var todoList = document.getElementById("todolist"),
  checkBtn = document.getElementsByClassName("checkbtn"),
  deleteBtn = document.getElementsByClassName("deleteBtn"),
  clear = document
    .getElementById("clearCompleted")
    .addEventListener("click", function () {
      clearCompleted();
    }),
  itemsCount = document.getElementById("itemsCount"),
  filter = document.getElementsByClassName("filter"),
  checkIcon = document.createElement("img");
checkIcon.src = "/images/icon-check.svg";
// attach key up event to the to do list input
inputToDo.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    //   Cancel the default action, if needed
    e.preventDefault();
    // Trigger the add to list function
    addTask();
    itemsCount.innerHTML = itemsLeft + " " + "items left";
  }
});

var itemsLeft = todoList.childElementCount;

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
    todoList.prepend(tile);
  }

  //   add event listener to delete button
  deleteTask();
  //   add event listener to check button
  completeTask();

  itemsLeft++;
  itemsCount.innerHTML = itemsLeft + " " + "items left";
}

// delete task from  tasklist

function deleteTask() {
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
      if (div.style.display == "none") {
        if (!checkBtn[i].classList.contains("check-icon")) {
          itemsLeft--;
          itemsCount.innerHTML = itemsLeft + " " + "items left";
        }
      }
    };
  }
}
// complete task from tasklist
function completeTask() {
  for (let index = 0; index < checkBtn.length; index++) {
    checkBtn[index].onclick = function () {
      this.classList.toggle("check-icon");
      if (this.classList.contains("check-icon")) {
        if (itemsLeft == 0) {
          itemsLeft = 0;
        } else itemsLeft--;
      } else {
        itemsLeft++;
      }
      itemsCount.innerHTML = itemsLeft + " " + "items left";
      var content = this.nextElementSibling;
      content.classList.toggle("line-through");
      content.classList.toggle("text-DarkGrayishBlue");
    };
  }
}
// clearCompleted
function clearCompleted() {
  for (let index = 0; index < checkBtn.length; index++) {
    if (checkBtn[index].classList.contains("check-icon")) {
      var parent = checkBtn[index].parentElement;
      parent.parentElement.style.display = "none";
      console.log(parent);
    }
  }
}
// filter:
for (let index = 0; index < filter.length; index++) {
  filter[index].onclick = function () {
    if (filter[index].value == "All") {
      console.log("all");
    } else if (filter[index].value == "Active") {
      console.log("Active");
    } else {
      console.log("Completed");
    }
  };
}
