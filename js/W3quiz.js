// dialog box to welcome user
//alert('Welcome to Quiz Ninja!');

// create array of objects to store quiz questions and their answers
const quiz = [
    {name: "Superman", realName: "Clark Kent"},
    {name: "Wonder Woman", realName: "Diana Prince"},
    {name: "Batman", realName: "Bruce Wayne"},
];

// View Object
const view = {
    start: document.getElementById('start'),
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    render(target,content,attributes) {
        for(const key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },
    show(element){
        element.style.display = 'block';
    },
    hide(element){
        element.style.display = 'none';
    }
};

// Will use object game as a namespace
const game = {
    start(quiz){
        view.hide(view.start);

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

        view.render(view.question, question);
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
            view.render(view.result,'Correct!',{'class':'correct'});
            alert('Correct!');
            this.score++;
            view.render(view.score,this.score);
        }
        else{
            view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
            alert(`Wrong! The correct answer is ${answer}`);
        }
    },
    gameOver(){
        view.show(view.start);
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    }

};

view.start.addEventListener('click', () => game.start(quiz), false);
//game.start(quiz);
