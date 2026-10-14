const taskInput = document.getElementById('inputfield');
const taskForm = document.getElementById('forminput');
const todoTaskContainer = document.querySelector('#todo-box .tasks');
let draggedTask = null;

function addEvents(task) {
    const deleteBtn = task.querySelector('.delete-button');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            task.remove();
            saveTasks();
        });
    }
    task.addEventListener('dragstart', function(){
        draggedTask = task;
    });
}

taskForm.addEventListener('submit', function(event){
    event.preventDefault();
    const taskText = taskInput.value;
    if (taskText !== ""){
        const newTask = document.createElement('div');
        newTask.classList.add('task-items');
        newTask.setAttribute('draggable', 'true');
        newTask.innerHTML = `<span class="task">${taskText}</span><button type="reset" class="delete-button">DELETE</button>`;

        todoTaskContainer.appendChild(newTask);
        addEvents(newTask);
        taskInput.value = '';
        saveTasks();
    }
})



const boxes = document.querySelectorAll('.tasks')

boxes.forEach(function(box){
    box.addEventListener('dragover', function(event){
        event.preventDefault();
    })
    box.addEventListener('drop', function() {
        box.appendChild(draggedTask);
        saveTasks();
    });
})

function saveTasks() {
    localStorage.setItem('todoTasks', document.querySelector('#todo-box .tasks').innerHTML);
    localStorage.setItem('progressTasks', document.querySelector('#progress-box .tasks').innerHTML);
    localStorage.setItem('completedTasks', document.querySelector('#completed-box .tasks').innerHTML);
}

function loadTasks() {
    if (localStorage.getItem('todoTasks')) {
        document.querySelector('#todo-box .tasks').innerHTML = localStorage.getItem('todoTasks');
    }
    if (localStorage.getItem('progressTasks')) {
        document.querySelector('#progress-box .tasks').innerHTML = localStorage.getItem('progressTasks');
    }
    if (localStorage.getItem('completedTasks')) {
        document.querySelector('#completed-box .tasks').innerHTML = localStorage.getItem('completedTasks');
    }

    document.querySelectorAll('.task-items').forEach(function(task) {
        addEvents(task);
    });
}
loadTasks();



