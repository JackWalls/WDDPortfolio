/*const tasks = [
    {id: 1, content: "Task 1", completed: true},
    {id: 2, content: "Task 2", completed: false},
    {id: 3, content: "Task 3", completed: false},
];*/
//localStorage.setItem('list',JSON.stringify(tasks));

window.onload = () => {
    displayList(toDos);
    const checkbox = document.querySelector('#toDo');
    checkbox.addEventListener('change', changeStatus);
    const button = document.querySelector("button");
    button.addEventListener('click', removeTask);
};

document.addEventListener('submit', appendList);


/****************************************************/
let toDos = getList();

function getList() {
    return JSON.parse(localStorage.getItem('list'));
}

function displayList(toDo) {
    let elements = "";
    for (let i = 0; i < toDo.length; i++){
        if (toDo[i].completed)
            elements += `<li id="${toDo[i].id}" style="text-decoration: line-through;"><input type="checkbox" name="tasks" checked/>
                 ${toDo[i].content} <button>X</button></li>`;
        else
            elements += `<li id="${toDo[i].id}"><input type="checkbox" name="tasks"/> 
                    ${toDo[i].content} <button>X</button></li>`;
    }
    document.querySelector("#list").innerHTML = elements;
    //document.getElementById('list').innerHTML = list;
}

function appendList(event) {
    const input = document.forms[1].addTo.value;
    const add = {id: Date.now(), content: input, completed: false};
    toDos.unshift(add);
    updateLocalStorage();
    displayList(toDos);
    event.preventDefault();
}

function changeStatus(event) {
    let index = findIndexById(event.target.parentElement.id);
    if (event.target.checked) {
        event.target.parentElement.style.textDecoration = "line-through";
        if (index !== false) {
            toDos[index].completed = true;
            updateLocalStorage();
        }

    }
    else {
        event.target.parentElement.style.textDecoration = "none";
        toDos[findIndexById(event.target.parentElement.id)].completed = false;
        if (index !== false) {
            toDos[index].completed = false;
            updateLocalStorage();
        }
    }
}

function removeTask(event){
    let index = findIndexById(event.target.parentElement.id);
    if(confirm(`Do you want to remove this task? "${toDos[index].content}"`)){
        toDos.splice(index, 1);
        updateLocalStorage();
        displayList(toDos);
    }
}

function updateLocalStorage() {
    localStorage.setItem('list',JSON.stringify(toDos));
}
function findIndexById(check){
    for(let i = 0; i < toDos.length; i ++) {
        if (toDos[i].id === parseInt(check)) {
            return i;
        }
    }
    return false;
}