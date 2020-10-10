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
    response: document.querySelector('#response'),
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
    },
    setup(){
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score,game.score);
        this.render(this.result,'');
        this.render(this.info,'');
        this.resetForm();
    },
    resetForm(){
        this.response.answer.value = '';
        this.response.answer.focus();
    },
    teardown(){
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
    }
};

// Will use object game as a namespace
const game = {
    start(quiz){
        view.hide(view.start);

        // Variable to store score that keeps count of correctly answered
        // questions.
        this.score = 0;

        // spread quiz to array in game
        this.questions = [...quiz];

        view.setup();

        // main game loop
        this.ask();
    },
    ask(){
        if(this.questions.length > 0) {

            this.question = this.questions.pop();

            // create question string for prompt
            const question = `What is ${this.question.name}'s real name?`;

            view.render(view.question, question);
        }
        else
            this.gameOver();
    },
    check(event){

        event.preventDefault();

        const response = view.response.answer.value;
        // get answer for check
        const answer = this.question.realName;

        // check if answer and response are the same
        if(response === answer) {
            view.render(view.result,'Correct!',{'class':'correct'});
            this.score++;
            view.render(view.score,this.score);
        }
        else{
            view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        }
        view.resetForm();
        this.ask();
    },
    gameOver(){
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
        view.teardown();
    }
};

view.start.addEventListener('click', () => game.start(quiz), false);
view.response.addEventListener('submit', (event) => game.check(event), false);
view.hide(view.response);
//game.start(quiz);
