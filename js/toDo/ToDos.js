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

let toDos = ls.getJSON(key) || [];

/*******************************************************************
 * This function tasks care of displaying the list elements by
 * getting values out of the global array toDos. It also
 * keeps track of the amount of active tasks and updates that
 * as well.
 */
function displayList() {
    // Variable to keep count of active tasks
    let actives = 0;

    // Make sure that toDos has values
    if(toDos !== null) {
        // Variable to hold list elements to be added
        let elements = "";

        // Loop through the array to create elements based on each object, also set the style
        // for text decoration if the task is completed.
        for (let i = 0; i < toDos.length; i++) {
            if (toDos[i].completed)
                elements += `<li id="${toDos[i].id}" style="text-decoration: line-through;">
                    <input type="checkbox" name="tasks" checked/>${toDos[i].content} 
                    <button class="remove">X</button></li>`;
            else
                elements += `<li id="${toDos[i].id}"><input type="checkbox" name="tasks"/> 
                    ${toDos[i].content} <button class="remove">X</button></li>`;
                actives++;
        }
        // Update the html with list items and # of active tasks
        document.querySelector("#list").innerHTML = elements;
        document.querySelector('#tally').innerHTML = `&nbsp;|&nbsp;&nbsp;${actives} tasks left`;
    }
    else
        document.querySelector('#tally').innerHTML = `&nbsp;|&nbsp;&nbsp;0 tasks left`;
}

/*******************************************************************
 * This function handles form validation and adding valid entries
 * for a new task, it also updates localstorage and calls
 * displayList() to update the list for the user.
 */
function appendList(event) {
    event.preventDefault();
    // Get the input from the user
    const input = document.forms[0].addTo.value;

    // Form validation to alert the user to enter a task
    // within 50 chars.
    if(input === '')
        alert('Cannot create a blank task');
    else if(input.length > 50)
        alert('Entry is to big');
    else {
        // Using the input we create an object to store it
        const add = {id: Date.now(), content: input, completed: false};

        // Add it to the top of the list and then update local storage
        toDos.unshift(add);
        ls.setJSON(key, JSON.stringify(toDos));

        // Update the list displayed to the user
        displayList();
    }

}

/*******************************************************************
 * This function handles removing tasks from the list and
 * updating the list in local storage.
 */
function removeTask(event){
    // Get the index of the task to be removed
    let index = findIndexById(event.target.parentElement.id);

    // Confirm if the user wants to remove said task
    if(confirm(`Do you want to remove this task? "${toDos[index].content}"`)){
        // Use splice to delete the task object and reorder the array then update local storage
        toDos.splice(index, 1);
        ls.setJSON(key, JSON.stringify(toDos));

        // Update the list displayed to the user
        displayList();
    }
}

/*******************************************************************
 * This function handles sorting the list in 3 ways, by Date
 * value, by active tasks up top, and completed task up top.
 */
function sortList(event) {
    // Using the event object to determine the sort to perform
    // we can easily select the operation for the sort and
    // then display the sorted list to the user.
    switch(parseInt(event.target.value)) {
        case 0:
            toDos.sort((a, b) => {return b.id - a.id;});
            displayList();
            break;
        case 1:
            toDos.sort((a) => {
                if(a.completed)
                    return 1;
                else
                    return -1;
            });
            displayList();
            break;
        case 2:
            toDos.sort((a) => {
                if(!a.completed)
                    return 1;
                else
                    return -1;
            });
            displayList();
            break;
    }
}

/*******************************************************************
 * This function handles changing the style when a list item
 * completed status is changed
 */
function changeStatus(event) {
    // Get index of the list item to be updated
    let index = findIndexById(event.target.parentElement.id);

    // Make sure there is an index to use.
    if (index !== false) {
        // When the task is completed we update the text to have a line through it,
        //  and then update the completed status and update the local storage
        if (event.target.checked) {
            event.target.parentElement.style.textDecoration = "line-through";
            toDos[index].completed = true;
            ls.setJSON(key, JSON.stringify(toDos));
        }
        // When the task is completed we update the text to remove the line, and then
        // update the completed status and update the local storage
        else {
            event.target.parentElement.style.textDecoration = "none";
            toDos[index].completed = false;
            ls.setJSON(key, JSON.stringify(toDos));
        }
    }
}

/*******************************************************************
 * This function handles getting the index from toDos using the id
 * from the element.
 */
function findIndexById(check){
    // Loop through until we find id that matches the check
    for(let i = 0; i < toDos.length; i ++) {
        if (toDos[i].id === parseInt(check)) {
            return i;
        }
    }
    return false;
}
