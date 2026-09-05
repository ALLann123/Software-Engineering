const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

//check when button is clicked we execute our function
addBtn.addEventListener("click", addTask);

//function is run when the button is clicked
function addTask() {
    //get the task added on the text box
    const taskText = taskInput.value.trim();

    // 1. If the taskText is empty, just return(dont add a blank task)
    if (taskText == "") {
        return;
    }

    //create a new <li> element to hold this task
    const li = document.createElement("li")

    //create a span to hold the tasks text
    const span = document.createElement("span")
    span.textContent = taskText;

    //create a button for deleting this task
    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"

    //Next the span and delete button inside the <li> tag
    li.appendChild(span);
    li.appendChild(deleteBtn);

    //4. Clicking anywhere on the <li> toggles the done class
    // Which  triggers the strikethrough style from style.css
    li.addEventListener("click", () => {
        li.classList.toggle("done");
    });

    //5. Clicking Delete removes this specific <li> from the list
    //stopPropagation() stops this click from also bubbling up
    //to the <li>'s own click Listener above(step 4)-otherwise
    //clicking delete would ALSO toggle done right before removal
    deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        li.remove();
    });

    //6. Add the fully-built <li> to the visible list on the page
    taskList.appendChild(li);

    //7. Clear the input box so it's ready for the next task
    taskInput.value = "";
}