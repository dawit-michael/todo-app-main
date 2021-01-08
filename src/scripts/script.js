var themeState = "dark";
// variables
var inputToDo = document.getElementById("inputToDo"),
  todoList = document.getElementById("todolist"),
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

// theme variables
var bodyBg = document.getElementById("bodybg"),
  bodyImg = document.getElementById("bodyimg"),
  inputTask = document.getElementById("inputtask"),
  tasksList = document.getElementById("list"),
  desktopTab = document.getElementById("desktoptab"),
  mobileTab = document.getElementById("mobiletab"),
  textContent = document.getElementsByClassName("content"),
  clearBtn = document.getElementById("clearCompleted");

var theme = document
  .getElementById("themeImg")
  .addEventListener("click", themeManager);
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
    "border-gray-600",
    "cursor-grab"
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
  cancel.classList.add("w-3", "h-3", "cursor-pointer", "hidden");
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
    inputToDo.value = "";
  }

  //   add event listener to delete button
  deleteTask();
  //   add event listener to check button
  completeTask();
  hoverdeleteTask();
  hovercompleteTask();
  itemsLeft++;
  itemsCount.innerHTML = itemsLeft + " " + "items left";
}

// add hover property to check btn
function hoverdeleteTask() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].onmouseenter = function () {
      var div = this.lastChild;
      div.classList.remove("hidden");
    };
    tiles[i].onmouseleave = function () {
      var div = this.lastChild;
      div.classList.add("hidden");
    };
  }
}
// hover complete task
function hovercompleteTask() {
  for (let i = 0; i < tiles.length; i++) {
    checkBtn[i].onmouseenter = function () {
      this.classList.remove("border");
      this.classList.remove("border-DarkGrayishBlue");
      this.classList.add("border-gradient");
    };
    checkBtn[i].onmouseleave = function () {
      this.classList.remove("border-gradient");
      this.classList.add("border");
      this.classList.add("border-DarkGrayishBlue");
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
// delete task from  tasklist

function deleteTask() {
  for (let i = 0; i < tiles.length; i++) {
    deleteBtn[i].onclick = function () {
      var div = this.parentElement;
      div.remove();
      if (!div.firstChild.firstChild.classList.contains("check-icon")) {
        itemsLeft--;
        itemsCount.innerHTML = itemsLeft-- + " " + "items left";
      }
    };
  }
}
// ! bug :  fixed clear completed doesnt remove elmements online hides them
// clearCompleted
function clearCompleted() {
  for (let index = 0; index < tiles.length; index++) {
    for (let j = 0; j < tiles.length; j++) {
      if (checkBtn[index].classList.contains("check-icon")) {
        var parent = checkBtn[index].parentElement;
        parent.parentElement.remove();
      }
    }
  }
}
// hover clearcompleted
function hoverclearCompleted() {
  clearBtn.onmouseenter = function () {
    if (themeState == "dark") {
      this.classList.remove("text-DarkGrayishBlue");
      this.classList.add("text-white");
    } else {
      this.classList.remove("text-DarkGrayishBlue");
      this.classList.add("text-black");
    }
  };
  clearBtn.onmouseleave = function () {
    this.classList.add("text-DarkGrayishBlue");
    this.classList.remove("text-white");
    this.classList.remove("text-black");
  };
}

hoverclearCompleted();
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

// theme themeManager
function themeManager() {
  var themeIcon = document.getElementById("themeImg");
  var imageString = themeIcon.src;
  var indexPosition = imageString.indexOf("/images");
  var imageSrc = imageString.substring(indexPosition);
  if (imageSrc == "/images/icon-moon.svg") {
    themeIcon.src = "/images/icon-sun.svg";
    darkTheme();
    themeState = "dark";
  } else {
    themeIcon.src = "/images/icon-moon.svg";
    lightTheme();
    themeState = "light";
  }
}

// themedatas
function lightTheme() {
  bodyImg.classList.remove("bg-image-dark");
  bodyImg.classList.add("bg-image-light");
  bodyBg.classList.remove("bg-VeryDarkBlue");
  bodyBg.classList.add("bg-VeryLightGray");
  inputTask.classList.remove("bg-VeryDarkDesaturatedBlue");
  inputTask.classList.add("bg-VeryLightGray");
  inputToDo.classList.remove("text-white");
  tasksList.classList.remove("bg-VeryDarkDesaturatedBlue");
  tasksList.classList.add("bg-VeryLightGray");
  desktopTab.classList.remove("bg-VeryDarkDesaturatedBlue");
  desktopTab.classList.add("bg-VeryLightGray");
  mobileTab.classList.remove("bg-VeryDarkDesaturatedBlue");
  mobileTab.classList.add("bg-VeryVeryLightGray");
  for (let index = 0; index < textContent.length; index++) {
    textContent[index].classList.remove("text-gray-200");
    textContent[index].classList.add("text-gray-800");
  }
}
function darkTheme() {
  bodyImg.classList.remove("bg-image-light");
  bodyImg.classList.add("bg-image-dark");
  bodyBg.classList.remove("bg-VeryLightGray");
  bodyBg.classList.add("bg-VeryDarkBlue");
  inputTask.classList.remove("bg-VeryLightGray");
  inputTask.classList.add("bg-VeryDarkDesaturatedBlue");
  inputToDo.classList.add("text-white");
  // inputToDo.classList.remove("text-black");
  tasksList.classList.add("bg-VeryDarkDesaturatedBlue");
  tasksList.classList.remove("bg-VeryLightGray");
  desktopTab.classList.add("bg-VeryDarkDesaturatedBlue");
  desktopTab.classList.remove("bg-VeryLightGray");
  mobileTab.classList.add("bg-VeryDarkDesaturatedBlue");
  mobileTab.classList.remove("bg-VeryLightGray");
  for (let index = 0; index < textContent.length; index++) {
    textContent[index].classList.add("text-gray-200");
    textContent[index].classList.remove("text-gray-800");
  }
}

// Create a timeline with default parameters
var tl = anime.timeline({
  easing: "easeOutCirc",
  duration: 250,
});

// Add children
tl.add({
  targets: "#heading",
  opacity: [0, 1],
})
  .add({
    targets: "#inputtask",
    translateY: [20, 0],
    opacity: [0, 1],
  })
  .add({
    targets: "#mobiletab",
    translateY: [20, 0],
    opacity: [0, 1],
  });

var animation = anime({
  easing: "easeOutCirc",
  targets: "#list",
  // translateY: [20, 0],
  opacity: [0, 1],
  delay: 350,
});
var tab = anime({
  targets: "#desktoptab",
  easing: "easeOutCirc",
  // translateY: [20, 0],
  opacity: [0, 1],
  delay: 350,
});
