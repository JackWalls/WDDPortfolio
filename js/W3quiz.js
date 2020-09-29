// dialog box to welcome user
alert('Welcome to Quiz Ninja!');

// create array of objects to store quiz questions and their answers
const quiz = [
    {name: "Superman", realName: "Clark Kent"},
    {name: "Wonder Woman", realName: "Diana Prince"},
    {name: "Batman", realName: "Bruce Wayne"},
];

// Will use object game as a namespace
const game = {
    start(quiz){
        // spread quiz to array in game
        this.question = [...quiz];

        // Variable to store score that keeps count of correctly answered
        // questions.
        this.score = 0;

        // main game loop
        for(const question of this.question){
            // call ask to get input
            this.question = question;
            this.ask();
        }
        // end of game loop
        this.gameOver();
    },
    ask(){
        // create question string for prompt
        const question = `What is ${this.question.name}'s real name?`;

        // get user input for question
        const response = prompt(question);

        // call check handle input
        this.check(response);
    },
    check(response){
        // get answer for check
        const answer = this.question.realName;

        // check if answer and response are the same
        if(response === answer) {
            alert('Correct!');
        }
        else{
            alert(`Wrong! The correct answer is ${answer}`);
        }
    },
    gameOver(){
        alert(`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    }

};

game.start(quiz);
