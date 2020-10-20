/*const tasks = [
    {id: 1, content: "Task 1", completed: true},
    {id: 2, content: "Task 2", completed: false},
    {id: 3, content: "Task 3", completed: false},
];*/
//localStorage.setItem('list',JSON.stringify(tasks));
let toDos = getList();


function displayList(toDo) {
    let elements = "";
    for (let i = 0; i < toDo.length; i++){
        if (toDo[i].completed)
            elements += `<li id="${toDo[i].id}"><input type="checkbox" name="tasks" checked/>
                <del> ${toDo[i].content} </del><button>X</button></li>`;
        else
            elements += `<li id="${toDo[i].id}"><input type="checkbox" name="tasks"/> 
                    ${toDo[i].content} <button>X</button></li>`;
    }
    document.querySelector("#list").innerHTML = elements;
    //document.getElementById('list').innerHTML = list;
}

if(getList() !== null)
    window.onload = () => displayList(toDos);

document.addEventListener('submit', appendList);
/****************************************************/

function getList() {
    return JSON.parse(localStorage.getItem('list'));
}

function appendList(event) {
    const input = document.forms[0].addTo.value;
    const add = {id: Date.now(), content: input, completed: false};
    toDos.unshift(add);
    localStorage.setItem('list',JSON.stringify(toDos));
    displayList(toDos);
    event.preventDefault();
}


//function findIndexById(){};