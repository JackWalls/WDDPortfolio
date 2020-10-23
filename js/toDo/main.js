import toDo from './ToDos.js';
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
                button.removeEventListener('click', toDo.removeTask);
            });

            // Update array of button elements.
            buttons = document.querySelectorAll('.remove');

            // These two lines add event listeners to each new button. A call to resetListeners
            // is needed to maintain all the event listeners on the buttons.
            buttons.forEach(button => {
                button.addEventListener('click', toDo.removeTask);
            });
            buttons.forEach(button => {
                button.addEventListener('click', resetListeners);
            });
        }
    }

    toDo.displayList();
    // Create the array after the list is displayed.
    let buttons = document.querySelectorAll('.remove');

    // If the list is empty then do nothing.
    if(buttons.length > 0) {
        buttons.forEach(button => {
            button.addEventListener('click', toDo.removeTask);
        });
        buttons.forEach(button => {
            button.addEventListener('click', resetListeners);
        });
    }

    // Listeners to handle adding tasks to the list.
    document.addEventListener('submit', toDo.appendList);
    document.addEventListener('submit', resetListeners);

    // Listeners to handle sorting the list.
    document.querySelector('#sort').addEventListener('change', toDo.sortList);
    document.querySelector('#sort').addEventListener('change', resetListeners);

    // Listener for changing the completed status of a task.
    document.querySelector('#toDo').addEventListener('change', toDo.changeStatus);
};
