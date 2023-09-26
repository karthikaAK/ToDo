// Get HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Load tasks from local storage
 const tasks = JSON.parse(localStorage.getItem('tasks')) || [];



// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task item
function createTaskItem(taskText, isCompleted = false) {
    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted; // Set the checkbox state
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
        saveTasks();
    });
    
    li.appendChild(checkbox);   
    const taskSpan = document.createElement('p');
    taskSpan.textContent = taskText;


    // Add "Edit" button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
        taskSpan.contentEditable = true;
        taskSpan.focus();

    });

    // Add "Delete" button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        const taskIndex = tasks.indexOf(taskText);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            li.remove();
            saveTasks();
        }
    });

    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

   

    return li;
}

// 2.Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    // Create a new task item
    const taskItem = createTaskItem(taskText);

    // Add the task item to the list
    taskList.appendChild(taskItem);

    // Add the task to the tasks array and save it to local storage
    tasks.push(taskText);
    saveTasks();

    // Clear the input field
    taskInput.value = '';
}

// Function to clear completed tasks
function clearCompletedTasks() {
    const completedTasks = Array.from(taskList.getElementsByClassName('completed'));
    completedTasks.forEach((task) => {
        const taskText = task.querySelector('p').textContent;
        const taskIndex = tasks.indexOf(taskText);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            task.remove();
            saveTasks();
        }
    });
}

// 1.Event listeners
addTaskBtn.addEventListener('click', addTask);
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

//Initialize the task list from local storage
tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
});



