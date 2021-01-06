var inputToDo = document.getElementById("inputToDo");
// variables
var todoList = document.getElementById("todolist"),
  tiles = document.getElementsByClassName("tile"),
  checkBtn = document.getElementsByClassName("checkbtn"),
  deleteBtn = document.getElementsByClassName("deleteBtn"),
  clear = document
    .getElementById("clearCompleted")
    .addEventListener("click", clearCompleted),
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
  tile.className = "tile";
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
      div.remove();
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
    switch (filter[index].value) {
      case "All":
        {
          for (let j = 0; j < filter.length; j++) {
            if (j === index) {
              if (filter[j].classList.contains("text-DarkGrayishBlue")) {
                if (!filter[j].classList.contains("text-BrightBlue")) {
                  filter[j].classList.remove("text-DarkGrayishBlue");
                  filter[j].classList.add("text-BrightBlue");
                }
              }
            }
            //    else
            else {
              if (filter[j].classList.contains("text-BrightBlue")) {
                filter[j].classList.remove("text-BrightBlue");
                filter[j].classList.add("text-DarkGrayishBlue");
              } else {
              }
            }
          }
          for (let j = 0; j < tiles.length; j++) {
            tiles[j].style.display = "flex";
          }
        }
        break;
      case "Active":
        for (let j = 0; j < filter.length; j++) {
          if (j === index) {
            if (filter[j].classList.contains("text-DarkGrayishBlue")) {
              if (!filter[j].classList.contains("text-BrightBlue")) {
                filter[j].classList.remove("text-DarkGrayishBlue");
                filter[j].classList.add("text-BrightBlue");
              }
            }
          }
          //    else
          else {
            if (filter[j].classList.contains("text-BrightBlue")) {
              filter[j].classList.remove("text-BrightBlue");
              filter[j].classList.add("text-DarkGrayishBlue");
            } else {
            }
          }
        }
        for (let j = 0; j < tiles.length; j++) {
          tiles[j].style.display = "flex";
          if (checkBtn[j].classList.contains("check-icon")) {
            tiles[j].style.display = "none";
          }
        }
        break;
      case "Completed":
        for (let j = 0; j < filter.length; j++) {
          if (j === index) {
            if (filter[j].classList.contains("text-DarkGrayishBlue")) {
              if (!filter[j].classList.contains("text-BrightBlue")) {
                filter[j].classList.remove("text-DarkGrayishBlue");
                filter[j].classList.add("text-BrightBlue");
              }
            }
          }
          //    else
          else {
            if (filter[j].classList.contains("text-BrightBlue")) {
              filter[j].classList.remove("text-BrightBlue");
              filter[j].classList.add("text-DarkGrayishBlue");
            } else {
            }
          }
        }
        for (let j = 0; j < tiles.length; j++) {
          tiles[j].style.display = "flex";
          if (!checkBtn[j].classList.contains("check-icon")) {
            tiles[j].style.display = "none";
          }
        }
    }
  };
}
