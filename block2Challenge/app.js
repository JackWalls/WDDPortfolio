import RTest from "./test.js";
import Data from "./data.js";

// Get elements for RTest class.
const button = document.getElementById("active");
const text = document.getElementById("message");
const replay = document.getElementById("replay");

//
const currProfile = document.getElementById("currProfile");

// Get elements for Data
const mean = document.getElementById("mean");
const list = document.getElementById("profileList");
const save = document.forms[0];

// Create instance of rTest.
const rTest = new RTest(button, text, replay);

window.onload = () => {
    // Create instance of Data
    const data = new Data(mean, undefined, list, currProfile);

    list.addEventListener('change', event => {
        if(event.target.value !== '-1')
            data.changeProfile(event.target.value);
    });

    save.addEventListener('submit', event => {
        event.preventDefault();
        if(!data.saveProfile(save.newName.value))
            alert('Profile name already taken');
    });

    // Set Listener to get result when a test loop was completed
    rTest.registerListener(() => {
        let result = rTest.get();

        // Add result of test to record
        data.addEntry(result);
    });

    // Set event Listener to replay button to be in charge of starting
    // and restarting the test.
    replay.addEventListener('click', () => rTest.initialize());
};