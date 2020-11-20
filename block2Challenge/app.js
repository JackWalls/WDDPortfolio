import RTest from "./test.js";

// Get elements for RTest class.
const button = document.getElementById("active");
const text = document.getElementById("message");
const replay = document.getElementById("replay");


window.onload = () => {
    // Create instance of rTest.
    const rTest = new RTest(button, text, replay);

    // Set Listener to get result when a test loop was completed
    rTest.registerListener(() => {
        let result = rTest.get();
        console.log(result);
    });

    // Set event Listener to replay button to be in charge of starting
    // and restarting the test.
    replay.addEventListener('click', () => {rTest.initialize()});
};