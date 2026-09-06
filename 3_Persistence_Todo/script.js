const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


//This array is the single source of truth for all taks
//Each task is an object: {text: "...", done: false}
let tasks = []

//1. On Page load, try to read saved tasks from localStorage
// getItem():returns null if nothing has been saved yet
// only JSON.parse() when there's actually something there--
// otherwise JSON.parse(null) would throw an error

const savedTasks = localStorage.getItem("tasks");

if (savedTasks != null) {
    tasks = JSON.parse(savedTasks);
}

//2. saveTasks() converts the array into a string(localStorage
// can only store strings) and writes it under the key "tasks".
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

//3. RenderTasks() rebuilds the ENTIRE visible list from scratch
//based on whatever is currently in the 'tasks' array. This
// the "data drives the UI" pattern- we never edit the page
// directly, we edit the array, then redraw everything from it
function renderTasks() {
    //wipe out whatever <li> elements are currenly on screen
    taskList.innerHTML = ""

    //forEach gives us both the task object AND its index in the 
    //array- we need the index to know which taks to toggle/delete
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        //Reflect the taks actual saved state, not just a blind toggle
        if (task.done) {
            li.classList.add("done")
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"

        li.appendChild(span);
        li.appendChild(deleteBtn)

        //clicking the <li> flips tasks 'done' state in the
        // array, then saves and re-renders so the checkbox/strikethrough
        //reflects the new state and persists across refreshes
        li.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            renderTasks();
        });

        //Clicking Delete removes this task from the array using
        //its index, then saves and re-renders. stopPropagation() prevents
        //this click from also Bubbling up and firing the <li>'s own
        //click listener above
        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            tasks.splice(index, 1);
            saveTasks()
            renderTasks()
        });

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    //4. Add a new task objet to the array(not a DOM element direcly)
    //  the array is now the source of truth
    tasks.push({ text: taskText, done: false });

    //5. Persist the updated array and redraw the list to include it
    saveTasks()
    renderTasks()

    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

//Render once on page load. Pull task from localStorage
renderTasks();