let tasks = [];
let lastId = 0;

document.getElementById('add-button').onclick = addTask;

function addTask() {
    let taskName = document.getElementById('add-input').value.trim();
    if (taskName.length === 0) {
        alert('Task name cannot be empty!');
        return;
    }
    document.getElementById('add-input').value = '';
    tasks.push({
        id: ++lastId,
        name: taskName[0].toUpperCase() + taskName.slice(1),
        isCompleted: false
    })
    updateUI();
}

function deleteTask(taskId) {
    tasks.splice(tasks.findIndex(t => t.id === taskId), 1);
    updateUI();
}

function setTaskIsCompleted(taskId, isCompleted) {
    tasks.find(t => t.id === taskId).isCompleted = isCompleted
}

function updateUI() {
    document.getElementById('task-container').replaceChildren(...tasks.map(t => createTaskElement(t)))
}

function createTaskElement(task) {
    let rootElement = document.createElement('div');
    let nameElement = document.createElement('span');
    let isCompletedElement = document.createElement('input');
    let deleteElement = document.createElement('button');

    rootElement.id = 'task-' + task.id;
    nameElement.innerText = task.name;
    isCompletedElement.type = 'checkbox';
    isCompletedElement.checked = task.isCompleted;
    isCompletedElement.onchange = e => setTaskIsCompleted(task.id, e.target.checked)
    deleteElement.innerText = 'Delete'
    deleteElement.onclick = () => deleteTask(task.id);

    rootElement.appendChild(deleteElement);
    rootElement.appendChild(isCompletedElement);
    rootElement.appendChild(nameElement);

    return rootElement;
}
