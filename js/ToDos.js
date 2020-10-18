const toDos = [
    {id: 1, content: "Task 1", completed: true},
    {id: 2, content: "Task 2", completed: false},
    {id: 3, content: "Task 3", completed: false},
];

function displayList(toDos) {
    let list = "";
    for (let i = 0; i < toDos.length; i++){
        if (toDos[i].completed)
            list += `<li id="${toDos[i].id}"><input type="checkbox" name="tasks" checked/><strike> ${toDos[i].content} </strike><button>X</button></li>`;
        else
            list += `<li id="${toDos[i].id}"><input type="checkbox" name="tasks"/> ${toDos[i].content} <button>X</button></li>`;
    }
    document.querySelector("#list").innerHTML = list;
    //document.getElementById('list').innerHTML = list;
}

window.onload = () => displayList(toDos);
