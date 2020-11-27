const inputList = document.querySelector('.input-list'); 
const btnAdd = document.querySelector('.btn-add');
const task = document.querySelector('.tasks');

function createLi(){
    const li = document.createElement('li');
    return li;
}

inputList.addEventListener('keypress', function(e){
    if(e.keyCode == 13){
        if(!inputList.value) return;
        createTask(inputList.value);
    }
})

function cleanInput(){
    inputList.value = ''
    inputList.focus()
}

function createDelete(li){
    li.innerText += ' ';
    const buttonDelete = document.createElement('button')
    buttonDelete.innerText = 'Delete'
    buttonDelete.setAttribute('class', 'apagar');
    li.appendChild(buttonDelete);
}


function createTask(textInput){
    const li = createLi();
    li.innerText = textInput;
    li.style.listStyle = 'none';
    task.appendChild(li);
    cleanInput();
    createDelete(li);
    saveTask();
}

btnAdd.addEventListener('click', function(e){
    if(!inputList.value) return;
    createTask(inputList.value);
})

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        saveTask();
    }
})

function saveTask(){
    const liTasks = task.querySelectorAll('li')
    const listTasks = []
    for(let task of liTasks){
        let taskText = task.innerText;
        taskText = taskText.replace('Delete', '').trim();
        listTasks.push(taskText);
    }

    const taskJson = JSON.stringify(listTasks);
    localStorage.setItem('tasks', taskJson);

}

function addSaveTasks(){
    const tasks = localStorage.getItem('tasks');
    const listTasks = JSON.parse(tasks);

    for (let task of listTasks){
        createTask(task);
    }

}

addSaveTasks();