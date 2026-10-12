const taskInput = document.getElementById('inputfield');
const taskForm = document.getElementById('forminput');
const todoTaskContainer = document.querySelector('#todo-box .tasks');
let draggedTask = null;

taskForm.addEventListener('submit', function(event){
    event.preventDefault();
    const taskText = taskInput.value;
    if (taskText !== ""){
        const newTask = document.createElement('div');
        newTask.classList.add('task-items');
        newTask.setAttribute('draggable', 'true');
        newTask.innerHTML = `<span class="task">${taskText}</span><button type="reset" class="delete-button">DELETE</button>`;

        todoTaskContainer.appendChild(newTask);
        taskInput.value = '';
        saveTasks();
        const deleteBtn = newTask.querySelector('.delete-button');
        
        deleteBtn.addEventListener('click', function() {
            newTask.remove();
            saveTasks();
        })
        newTask.addEventListener('dragstart', function(){
            draggedTask = newTask
        })
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
}
loadTasks();



