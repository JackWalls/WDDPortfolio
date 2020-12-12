'use strict';
// Message to be displayed at the beginning of the test.
const startMessage =
    "This test is used to measure your reaction time. \n" +
    "When you click start a 3 second timer will begin.\n" +
    "After that, at some point the box will turn green.\n" +
    "You are then to click on the button as soon as \n" +
    "the screen turns green. Good Luck.\n";

/********************************************************
 * Class to contain and run the Reaction Test.
 */
export default class RTest {
    /********************************************************
     * Sets the parameters as properties. Initialize done and  result
     * property. As well as the doneListener.
     * @param button: Multi-use button element.
     * @param text: Element used to display text to the user.
     * @param replay: Button to handle reinitialization of the test.
     * @param test: Div element to change background color.
     */
    constructor(button, text, replay, test) {
        this.button = button;
        this.text = text;
        this.replay = replay;
        this.test = test;
        this.done = false;
        this.result = 0;
        this.doneListener = function() {};
    }

    /********************************************************
     * This function is used to set the test to the Pre-test state
     * before the countdown.
     */
    initialize() {
        // Reset the done check.
        if(this.done === true) {
            this.set(false);
        }

        // Set a const for this as that for nested use through event listeners.
        let that = this;

        // Swap the replay button with the multi-use button.
        this.replay.setAttribute('style', 'display: none');
        this.button.setAttribute('style', 'display: block');

        // Display global start message.
        this.text.innerText = startMessage;

        // Wait for the user to click the button to go to the countdown-
        // test phase.
        this.button.addEventListener('click', function handler(event) {
            event.target.removeEventListener('click', handler);
            RTest.run(event, that);
        });
    }

    /********************************************************
     * Prep button for the countdown.
     * @param e: event object
     * @param that: class this for nested use.
     */
    static run(e, that) {
        e.target.setAttribute("disabled", "true");
        e.target.innerText = 'Wait';
        that.test.setAttribute('style', 'background: #CF142B')
        that.countdown(e, that);
    }

    /********************************************************
     * Commences the countdown before engaging the test, the test
     * commences sometime after the countdown and calls endFunction
     * to finish test.
     * @param e: event object
     * @param that: class this for nested use.
     */
    countdown(e, that) {
        // Start with 3
        that.text.innerText = "3...";

        // Use set timeout to simulate countdown. 0 used to avoid drastic
        // shift in button position. Will be changed later.
        setTimeout(() => {that.text.innerText = "2..."}, 1000);
        setTimeout(() => {that.text.innerText = "1..."}, 2*1000);
        setTimeout(() => {that.text.innerText = "";}, 3*1000);

        // Somewhere between 500 ms to 3 seconds the test will activate
        setTimeout(() => {
            // Start timer using Date at execution time.
            that.startTime = new Date();

            // Activate button
            e.target.addEventListener('click', function handler(event) {
                    // Call the endFunction first before removing listener for accuracy.
                    RTest.endFunction(event, that);
                    event.target.removeEventListener('click', handler);
            });

            // On the assumption of speed of the process, the difference
            // between the event listener and activation of the button
            // won't be significant enough to affect the score.
            e.target.removeAttribute('disabled');
            that.test.setAttribute('style', 'background: #33A532');
            e.target.innerText = 'click';

            // Math floor and ceil used to keep random result as an integer.
        }, (Math.random() * (Math.floor(3001) - Math.ceil(500)) + Math.ceil(500) + 3000));

    }

    /********************************************************
     * End the test, calculate result, and then call set
     * to fire the doneListener.
     * @param e: event object
     * @param that: class this for nested use.
     */
    static endFunction(e, that) {
        that.endTime = new Date();
        that.result = that.endTime - that.startTime;
        that.set(true);
        // Display result to user
        that.test.setAttribute('style', 'background: #32A59E');
        that.text.innerText = `Your reaction time was: ${that.result} ms`;
    }

    /********************************************************
     * Returns the result variable.
     * @returns {number}
     */
    get() {
        return this.result;
    }

    /********************************************************
     * Set the done variable to the new value. If the value
     * is true then activate the listener and reset the Test
     * @param bool
     */
    set(bool) {
        this.done = bool;
        if(this.done === true) {
            this.doneListener();
            this.replay.setAttribute('style', 'display: block');
            this.button.setAttribute('style', 'display: none');
        }
    }

    /********************************************************
     * Allows one to set a callback for the done Listener that
     * will activate after a completed loop of the test.
     * @param listener: Callback
     */
    registerListener = function(listener) {
        this.doneListener = listener;
    }
}