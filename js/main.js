// Create the links for each index for each week
// Main Table of Contents page
const mLinks = [
    {label: "Week 1", url: "week1/index.html"},
    {label: "Week 2", url: "week2/index.html"},
    {label: "Week 3", url: "week3/index.html"},
    {label: "Week 4", url: "week4/index.html"},
    {label: "Week 5", url: "week5/index.html"},
    {label: "Week 6 Midterm", url: "week6/toDoList.html"},
    {label: "Week 7", url: "week7/index.html"}
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
    {label: "JS Chapter 7 Notes", url: "ch7Notes.html"},
    {label: "Quiz Ninja Object Example", url: "quizNinjaObject.html"}
];

const w4Links = [
    {label: "JS Chapter 8 Notes", url: "ch8Notes.html"},
    {label: "JS Chapter 12 Notes", url: "ch12Notes.html"},
    {label: "JS Modular Javascript Notes", url: "modularJS.html"},
    {label: "Quiz Ninja Form Example", url: "quizNinjaForms.html"}
];

const w5Links = [
    {label: "JS Chapter 10 Notes", url: "ch10Notes.html"}
];

const w6Links = [];

const w7Links = [
    {label: "JS Chapter 11 Notes", url: "ch11Notes.html"},
    {label: "JS Chapter 13 Notes", url: "ch13Notes.html"}
];

/****************************************************************
 *  This function takes a number to select an array of links to
 *  then put those links in an ordered list.
 *  We use the value of title to determine which set of links
 *  to display. Using getNum we extract the number value to be
 *  used.
 *  This is to make it so that any index can come back to this
 *  js file.
 *  */
 function createList(){
    // Empty array to make a shallow copy.
    let links = [];

    // get title value
    const title = document.title;

    // Use getNum to get an array number value for the switch break
    let choice = getNum(title);

    // check if choice is null for table of contents page, also to check
    // before accessing the array.
    if(choice == null)
        links = mLinks;
    else {
        // switch case to determine with array to use based on 'choice'
        switch (parseInt(choice[0])) {
            case 1:
                links = w1Links;
                break;
            case 2:
                links = w2Links;
                break;
            case 3:
                links = w3Links;
                break;
            case 4:
                links = w4Links;
                break;
            case 5:
                links = w5Links;
                break;
            case 7:
                links = w7Links;
                break;
        }
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

// Use regex to return an array of the digits.
function getNum(string) {
     const check = /\d+/;
     return string.match(check);
}

// Event listener for when page is loaded.
window.onload = createList;