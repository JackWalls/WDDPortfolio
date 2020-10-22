// import
/*********************************************************************
 * This event handler will be used to initialize all other event
 * listeners for the web application using functions from other
 * modules, a nested function is used to keep an array of the buttons
 * for each task. It has to be nested since it will get the array of
 * buttons after displayList is called.
 * A fault I found with using a display function to update the list
 * every time a change was made is that new event listeners need
 * to be attached to the new button elements.
 */
window.onload = () => {
    // This function solves the issue mentioned in the function header.
    function resetListeners() {
        // If the list is empty then do nothing.
        if(buttons.length > 0) {
            // For older browsers it is important to remove all lost event listeners to avoid a memory leak.
            buttons.forEach(button => {
                button.removeEventListener('click', removeTask);
            });

            // Update array of button elements.
            buttons = document.querySelectorAll('.remove');

            // These two lines add event listeners to each new button. A call to resetListeners
            // is needed to maintain all the event listeners on the buttons.
            buttons.forEach(button => {
                button.addEventListener('click', removeTask);
            });
            buttons.forEach(button => {
                button.addEventListener('click', resetListeners);
            });
        }
    }

    displayList(toDos);
    // Create the array after the list is displayed.
    let buttons = document.querySelectorAll('.remove');

    // If the list is empty then do nothing.
    if(buttons.length > 0) {
        buttons.forEach(button => {
            button.addEventListener('click', removeTask);
        });
        buttons.forEach(button => {
            button.addEventListener('click', resetListeners);
        });
    }

    // Listeners to handle adding tasks to the list.
    document.addEventListener('submit', appendList);
    document.addEventListener('submit', resetListeners);

    // Listeners to handle sorting the list.
    document.querySelector('#sort').addEventListener('change', sortList);
    document.querySelector('#sort').addEventListener('change', resetListeners);

    // Listener for changing the completed status of a task.
    document.querySelector('#toDo').addEventListener('change', changeStatus);
};

/****************************************************/
let toDos = getList();

function getList() {
    return JSON.parse(localStorage.getItem('list'));
}

function updateLocalStorage() {
    localStorage.setItem('list',JSON.stringify(toDos));
}

function displayList(toDo) {
    let elements = "";
    for (let i = 0; i < toDo.length; i++){
        if (toDo[i].completed)
            elements += `<li id="${toDo[i].id}" style="text-decoration: line-through;"><input type="checkbox" name="tasks" checked/>
                 ${toDo[i].content} <button class="remove">X</button></li>`;
        else
            elements += `<li id="${toDo[i].id}"><input type="checkbox" name="tasks"/> 
                    ${toDo[i].content} <button class="remove">X</button></li>`;
    }
    document.querySelector("#list").innerHTML = elements;
    //document.getElementById('list').innerHTML = list;
}

function appendList(event) {
    event.preventDefault();
    const input = document.forms[0].addTo.value;
    const add = {id: Date.now(), content: input, completed: false};
    toDos.unshift(add);
    updateLocalStorage();
    displayList(toDos);

}

function removeTask(event){
    let index = findIndexById(event.target.parentElement.id);
    if(confirm(`Do you want to remove this task? "${toDos[index].content}"`)){
        toDos.splice(index, 1);
        updateLocalStorage();
        displayList(toDos);
    }
}

function sortList(event) {
    switch(parseInt(event.target.value)) {
        case 0:
            toDos.sort((a, b) => {return b.id - a.id;});
            displayList(toDos);
            break;
        case 1:
            toDos.sort((a, b) => {
                if(a.completed)
                    return 1;
                return b.id - a.id;
            });
            displayList(toDos);
            break;
        case 2:
            toDos.sort((a, b) => {
                if(!a.completed)
                    return 1;
                return b.id - a.id;
            });
            displayList(toDos);
            break;
    }
}
function changeStatus(event) {
    let index = findIndexById(event.target.parentElement.id);
    if (index !== false) {
        if (event.target.checked) {
            event.target.parentElement.style.textDecoration = "line-through";
            toDos[index].completed = true;
            updateLocalStorage();
        }
        else {
            event.target.parentElement.style.textDecoration = "none";
            toDos[index].completed = false;
            updateLocalStorage();
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