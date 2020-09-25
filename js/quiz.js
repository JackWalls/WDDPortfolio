// dialog box to welcome user
alert('Welcome to Quiz Ninja!');

// create array to store quiz questions and their answers
const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonder Woman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
];

function start(quiz) {

// Variable to store score that keeps count of correctly answered
// questions.
    let score = 0;

// for loop to go through quiz questions
    for (const [question, answer] of quiz) {

        // call ask to get input
        const response = ask(question);

        // call check to handle question response
        score += check(response, answer)
    }

    // Call game over for final prompt
    gameOver(score);
}

// prompt question and get answer
function ask(question) {
    return prompt(question);
}

// check if answer is correct
function check(response, answer) {
    if (response === answer) {
        // if correct let the user know and add a point to score
        alert("Correct");

        // user gets 1 for point
        return 1;
    }
    else {
        // if incorrect let the user know and display the correct answer
        alert(`Wrong! The correct answer ${answer}`);

        // user gets no points
        return 0;
    }
}

// Display the game is over and show the final score
function gameOver(score) {
    alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
}

window.onload(start(quiz));

