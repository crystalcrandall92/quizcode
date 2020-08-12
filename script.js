var currentQuestion = 0;
var score = 0;
var totalQuestions = questions.length;
var timeleft = 120;
var penalty = 10;

var container = document.querySelector('#box');
var questionList = document.querySelector('#question');
var possibleChoices1 = document.querySelector('#ans1');
var possibleChoices2 = document.querySelector('#ans2');
var possibleChoices3 = document.querySelector('#ans3');
var possibleChoices4 = document.querySelector('#ans4');
var nextQuestionbtn = document.querySelector('#nextQuestionbtn');
var totalScoreContainer = document.querySelector('#totalScore');

startButton.addEventListener('click', startQuiz)
// This causes the start button to disappear along with the paragraph stating what the quiz is, starting the timer when the button is pressed along with starting the quiz
function startQuiz () {
    startButton.classList.add('hide');
    paragraph.classList.add('hide');
    quizblock.classList.add('show');
    var clock = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(clock);
        document.getElementById("timer").innerHTML = timeleft + score + " out of " + questions.length + "." + " No time remaining.";
      } else {
        document.getElementById("timer").innerHTML = timeleft ;
      }
      timeleft -= 1;
    }, 1000);
};


function beginQuiz(questionIndex) {
    var questionNumber = questions[questionIndex];
    // +1 set so the count for the questions can start at 1 and not 0, total questions 10
    questionList.textContent = (questionIndex + 1) + '.' + questionNumber.question;
    possibleChoices1.textContent = questionNumber.possibleChoices1;
    possibleChoices2.textContent = questionNumber.possibleChoices2;
    possibleChoices3.textContent = questionNumber.possibleChoices3;
    possibleChoices4.textContent = questionNumber.possibleChoices4;
};

// Timer from 120, 12 seconds roughly per 10 questions

function loadNewQuestion() {
    var chosenAnswer = document.querySelector('input[type=radio]:checked');
    var answer = chosenAnswer.value;
    if(questions[currentQuestion].answer == answer){
        score++;
    } else {
      timeleft = timeleft - penalty
    }
    chosenAnswer.checked = false;
    currentQuestion++;
    // Shows result of Quiz 
    if(currentQuestion == totalQuestions){
        container.style.display = 'none';
        totalScoreContainer.style.display = '';
        totalScoreContainer.textContent = timeleft + " total score!"
        return;
    }
    beginQuiz(currentQuestion);
}

beginQuiz(currentQuestion);