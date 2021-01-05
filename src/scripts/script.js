var inputToDo = document.getElementById("inputToDo");

// attach key up event to the to do list input
inputToDo.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    //   Cancel the default action, if needed
    e.preventDefault();
    // Trigger the add to list function
    addToList();
  }
});

//  function to add to list
function addToList() {
  var todoValue = inputToDo.value;

  //   create elements
  var todoList = document.getElementById("todolist"),
    tile = document.createElement("li"),
    container = document.createElement("div"),
    headline = document.createElement("h6"),
    text = document.createTextNode(todoValue),
    checkbox = document.createElement("button"),
    cancel = document.createElement("img");
  //   add styling
  tile.classList.add("h-16", "flex", "items-center", "justify-between", "px-6");
  container.classList.add("flex", "items-center", "space-x-4");
  headline.classList.add("text-gray-200");
  checkbox.classList.add(
    "rounded-full",
    "w-6",
    "h-6",
    "border",
    "border-DarkGrayishBlue",
    "flex",
    "items-center",
    "justify-center",
    "focus:outline-none"
  );
  cancel.classList.add("w-4", "h-4");
  cancel.src = "/images//icon-cross.svg";
  // append childs
  headline.appendChild(text);
  container.appendChild(checkbox);
  container.appendChild(headline);
  tile.appendChild(container);
  tile.appendChild(cancel);
  todoList.appendChild(tile);
}
