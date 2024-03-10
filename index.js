let tasks = [];
let lastId = 0;

document.getElementById('add-button').onclick = addTask;

function addTask() {
    let taskName = document.getElementById('add-input').value.trim();
    if (taskName.length === 0) {
        alert('Task name cannot be empty!');
        return;
    }

    // Перевірка на дублікати
    if (tasks.some(task => task.name.toLowerCase() === taskName.toLowerCase())) {
        alert('Task with this name already exists!');
        return;
    }

    document.getElementById('add-input').value = '';
    tasks.push({
        id: ++lastId,
        name: taskName[0].toUpperCase() + taskName.slice(1),
        isCompleted: false
    })
    if (tasks.length === 1) {
        addFilterButton();
    }
    updateUI();
}

function addFilterButton() {
    if (!document.getElementById('filter')) {
        const filterSelect = document.createElement('select');
        filterSelect.id = 'filter';
        filterSelect.innerHTML = `
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
        `;
        filterSelect.addEventListener('change', () => filterTasks(filterSelect.value));

        document.body.insertBefore(filterSelect, document.getElementById('task-container'));
    }
}

function deleteTask(taskId) {
    tasks.splice(tasks.findIndex(t => t.id === taskId), 1);
    updateUI();
}

function setTaskIsCompleted(taskId, isCompleted) {
    tasks.find(t => t.id === taskId).isCompleted = isCompleted
}

function editTaskName(taskId, newName) {
    tasks.find(t => t.id === taskId).name = newName;
    updateUI();
}

function filterTasks(filterValue) {
    let filteredTasks = [];

    if (filterValue === 'completed') {
        filteredTasks = tasks.filter(task => task.isCompleted);
    } else if (filterValue === 'uncompleted') {
        filteredTasks = tasks.filter(task => !task.isCompleted);
    } else {
        filteredTasks = tasks;
    }

    updateUI(filteredTasks);
}

function updateUI(tasksToDisplay = tasks) {
    document.getElementById('task-container').replaceChildren(...tasksToDisplay.map(t => createTaskElement(t)))
}

function createTaskElement(task) {
    let rootElement = document.createElement('div');
    let nameElement = document.createElement('span');
    let isCompletedElement = document.createElement('input');
    let editElement = document.createElement('button');
    let deleteElement = document.createElement('button');

    rootElement.id = 'task-' + task.id;

    deleteElement.innerText = 'Delete';
    deleteElement.onclick = () => deleteTask(task.id);

    nameElement.innerText = task.name;

    isCompletedElement.type = 'checkbox';
    isCompletedElement.checked = task.isCompleted;
    isCompletedElement.onchange = e => setTaskIsCompleted(task.id, e.target.checked);

    editElement.innerText = 'Edit';
    editElement.onclick = () => {
        const newName = prompt('Enter new task name:');
        if (newName) {
            editTaskName(task.id, newName.trim());
        }
    };

    rootElement.appendChild(deleteElement);
    rootElement.appendChild(nameElement);
    rootElement.appendChild(isCompletedElement);
    rootElement.appendChild(editElement);

    return rootElement;
}
