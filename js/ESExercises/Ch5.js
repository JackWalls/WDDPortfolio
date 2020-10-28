'use strict';

// skipped exercise 5.4 for its odd complexity.

window.onload= () => {
    exercise51(document.getElementById("5.1"));
    exercise52(document.getElementById("5.2"));
    exercise53(document.getElementById("5.3"));
    //exercise54(document.getElementById("5.4"));
};

/*****************************************************************************************
 *  Function to hold the scope and execute the exercise 5.1
 *  @param element: element in html to update
 */
function exercise51(element) {
    let arrays = [[1, 2, 3], [4, 5], [6]];


// Your code here.
// → [1, 2, 3, 4, 5, 6]

    /* Correct Solution
    Forgot about reduce and concat. Had to review to understand that
    accumulator contains the return values of the call back that will be returned
    at the end, Current value hold the value at index. Concat merges an array with the array
    entered as the argument. In order to return an array the initial value of accumulator
    must be set to an empty array, this is declared after the callback. */

    const newArray = arrays.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
    console.log(newArray);
    element.innerText = "5.1 result: " + newArray.toString();

    /* My solution
     let newArray = [];
    function recursive(n, callback) {

        for (let i = 0; i < n; i++) {
            callback(i)
        }
    }
    function spread(index){
        for (let i = 0; i < arrays[index].length; i++){
            newArray.push(arrays[index][i]);
        }
    }
    recursive(arrays.length, spread);
    console.log(newArray);*/
}

/*****************************************************************************************
 *  Function to hold the scope and execute the exercise 5.2
 * @param element: element in html to update
 */
function exercise52(element){
    // set text to display results in a line in html document.
    let text = "";

    loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
    // Your code here.
    /*****************************************************************************************
     * Recursive function to act as a decrementing loop that displays the current value in
     * the log, for the html it makes use of the function scope to get a string to display
     * a line for the html document. Solution uses a for loop but I wanted to practice
     * using recursive functions, the solution would be better to get and return the
     * text value in order to enforce pure function rules.
     *
     * @param n: is a number
     * @param check: Checks if the argument is not zero
     * @param dec: Decrements the argument
     * @param log: Displays the value in the console log
     */
    function loop(n, check, dec, log) {
        if(check(n)){
            text += "→ " + n + ", ";
            log("→ " + n);
            loop(dec(n), check, dec, log);
        }
    }
    element.innerText = "5.2 result: " + text;
}

/*****************************************************************************************
 *  Function to hold the scope and execute the exercise 5.3
 *  @param element: element in html to update
 */
function exercise53(element) {
    /*****************************************************************************************
     * This function uses a callback function to check each element of an array.
     * @param array: Array to be looped through and tested.
     * @param test: Callback to perform the test, returns true if it passes else false
     * @returns {boolean}: If it fails the test then it stops and returns false, else true
     */
    function every(array, test) {
        // Your code here.
        for(let i = 0; i < array.length; i++) {
            if(!test(array[i]))
                return false;
        }
        return true;
    }

    const run1 = every([1, 3, 5], n => n < 10);
    const run2 = every([2, 4, 16], n => n < 10);
    const run3 = every([], n => n < 10);

    console.log(run1);
// → true
    console.log(run2);
// → false
    console.log(run3);
// → true

    element.innerText = "5.3 result: → " + run1 + ", " + "→ " + run2 + ", " + "→ " + run3;
}
