
// Create the links for each index for each week
// Main Table of Contents page
const mLinks = [
    {label: "Week 1", url: "week1/index.html"},
    {label: "Week 2", url: "week2/index.html"},
    {label: "Week 3", url: "week3/index.html"}
];

// Week 1 page
const w1Links = [
    {label: "DS Notes", url: "dsNotes.html"},
    {label: "UX Notes", url: "uxNotes.html"},
    {label: "Story Editor Example", url: "story_editor.html"}
];

const w2Links = [
    {label: "JS Chapter 2 Notes", url: "ch2Notes.html"},
    {label: "JS Chapter 3 Notes", url: "ch3Notes.html"},
    {label: "JS Chapter 4 Notes", url: "ch4Notes.html"},
    {label: "Quiz Ninja Example", url: "quizNinja.html"}
];

const w3Links = [
    {label: "Object 'this' Notes", url: "objectThis.html"},
    {label: "JS Chapter 5 Notes", url: "ch5Notes.html"},
    {label: "JS Chapter 6 Notes", url: "ch6Notes.html"},
    {label: "Quiz Ninja Object Example", url: "quizNinjaObject.html"}
];
/* This function takes a number to select an array of links to
# then put those links in an ordered list.
# The choice parameter takes the number from the index.html
# This is to make it so that any index can come back to this
# js file.
# Task to do: Can the object arrays be safely made global
# or does that not work/bad practice?*/
 function createList(choice){
    // Empty array to make a shallow copy.
    let links = [];

    // switch case to determine with array to use based on 'choice'
    switch(choice){
        case 0:
            links = mLinks;
            break;
        case 1:
            links = w1Links;
            break;
        case 2:
            links = w2Links;
            break;
        case 3:
            links = w3Links;
    }

    // Empty string to hold new elements to add to html
    let text = "";

    // For loop to go through chosen array
    for(let i = 0; i < links.length; i++){

        // Create the list element and put it in text
            text += "<li><a href='" + links[i].url + "'>" + links[i].label + "</a></li>";
    }

    // Put the list elements in the ordered list id as list
    document.getElementById("list").innerHTML = text;
}
