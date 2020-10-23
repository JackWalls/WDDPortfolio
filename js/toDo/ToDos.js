import ls from './ls.js';
export default {
    displayList,
    appendList,
    removeTask,
    sortList,
    changeStatus
}

// Should've made this into a class so that I can have
// a getId function that will set it globally within
// the scope of the class.
const key = 'list';
let toDos = ls.getJSON(key);

/*function getList() {
    return JSON.parse(localStorage.getItem('list'));
}

function updateLocalStorage() {
    localStorage.setItem('list',JSON.stringify(toDos));
}*/

function displayList() {
    if(toDos !== null) {
        let elements = "";
        for (let i = 0; i < toDos.length; i++) {
            if (toDos[i].completed)
                elements += `<li id="${toDos[i].id}" style="text-decoration: line-through;">
                    <input type="checkbox" name="tasks" checked/>${toDos[i].content} 
                    <button class="remove">X</button></li>`;
            else
                elements += `<li id="${toDos[i].id}"><input type="checkbox" name="tasks"/> 
                    ${toDos[i].content} <button class="remove">X</button></li>`;
        }
        document.querySelector("#list").innerHTML = elements;
    }
    //document.getElementById('list').innerHTML = list;
}

function appendList(event) {
    event.preventDefault();
    const input = document.forms[0].addTo.value;
    if(input === '')
        alert('Cannot create a blank task');
    else {
        const add = {id: Date.now(), content: input, completed: false};
        toDos.unshift(add);
        //updateLocalStorage();
        ls.setJSON(key, JSON.stringify(toDos));
        displayList();
    }

}

function removeTask(event){
    console.log('called');
    let index = findIndexById(event.target.parentElement.id);
    if(confirm(`Do you want to remove this task? "${toDos[index].content}"`)){
        toDos.splice(index, 1);
        ls.setJSON(key, JSON.stringify(toDos));
        displayList();
    }
}

function sortList(event) {
    switch(parseInt(event.target.value)) {
        case 0:
            toDos.sort((a, b) => {return b.id - a.id;});
            displayList();
            break;
        case 1:
            toDos.sort((a, b) => {
                if(a.completed)
                    return 1;
                return b.id - a.id;
            });
            displayList();
            break;
        case 2:
            toDos.sort((a, b) => {
                if(!a.completed)
                    return 1;
                return b.id - a.id;
            });
            displayList();
            break;
    }
}
function changeStatus(event) {
    let index = findIndexById(event.target.parentElement.id);
    if (index !== false) {
        if (event.target.checked) {
            event.target.parentElement.style.textDecoration = "line-through";
            toDos[index].completed = true;
            ls.setJSON(key, JSON.stringify(toDos));
        }
        else {
            event.target.parentElement.style.textDecoration = "none";
            toDos[index].completed = false;
            ls.setJSON(key, JSON.stringify(toDos));
        }
    }
}

function findIndexById(check){
    for(let i = 0; i < toDos.length; i ++) {
        if (toDos[i].id === parseInt(check)) {
            return i;
        }
    }
    return false;
}