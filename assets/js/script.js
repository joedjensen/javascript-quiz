// two elements in HTML
var headerEl = document.getElementById('page-header')
var mainEl = document.getElementById('main')
// set index to 0 at load
var currentIndex = 0
// array of question objects to loop through
var questionArray = [
    {
        "questionText": "Javascript is an _______ language?",
        "answerArray": ["Object-Oriented", "Object-based", "Procedural", "None of the above"],
        "correctIndex": 0
    },
    {
        "questionText": "Which of the following keywords is used to define a variable in Javascript?",
        "answerArray": ["var", "let", "Both A and B", "None of the above"],
        "correctIndex": 2
    },
    {
        "questionText": "Which of the following methods can be used to display data in some form using Javascript?",
        "answerArray": ["document.write()","console.log()","window.alert()","None of the above"],
        "correctIndex": 1
    },
    {
        "questionText": "Which of the following methods is used to access HTML elements using Javascript?",
        "answerArray": ["getElementById()","getElementsByClassName()","Both A and B", "None of the above"],
        "correctIndex": 2
    },
    {
        "questionText": "Which function is used to serialize an object into a JSON string in Javascript?",
        "answerArray": ["stringify()","parse()","convert()", "None of the above"],
        "correctIndex": 0
    },
    {
        "questionText": "How do you stop an interval timer in Javascript?",
        "answerArray": ["clearInterval()","clearTimer()","intervalOver()", "None of the above"],
        "correctIndex": 0
    },
    {
        "questionText": "Inside which HTML element do we put the Javascript?",
        "answerArray": ["<js>","<script>","<javascript>", "<scripting>"],
        "correctIndex": 1
    },
    {
        "questionText": "Which of the following type of variable takes precedence over hte other if names are the same?",
        "answerArray": ["Local variable","global variable","Both of the above", "None of the above"],
        "correctIndex": 0
    },
    {
        "questionText": "Javascript is the scripting language of Java?",
        "answerArray": ["True", "False"],
        "correctIndex": 1
    },
]
// variable used to store previous answer
var previousAnswer;

// render home page on page load
renderHomePage();

function renderHomePage() {
    // clear inner HTML
    clearEls();
    // reset question index to beginning
    currentIndex = 0;
    // anchor link to view high scores
    var highScoreLink = document.createElement('a');
    highScoreLink.textContent = "View Highscores"
    highScoreLink.addEventListener('click', function () {
        renderHighScorePage()
    })
    headerEl.appendChild(highScoreLink)
    // header element to add to main
    var homePageHeader = document.createElement("h2")
    homePageHeader.textContent = "Coding Quiz Challenge"
    mainEl.appendChild(homePageHeader)
    // home page body
    var homePageBody = document.createElement('p')
    homePageBody.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!"
    mainEl.appendChild(homePageBody);
    // start button
    var startButton = document.createElement("button")
    startButton.textContent = "Start Quiz"
    mainEl.appendChild(startButton)
    // start game on click of start button
    startButton.addEventListener('click', startGame);
}

// clear inner HTML for our base elements
function clearEls() {
    headerEl.innerHTML = '';
    mainEl.innerHTML = '';
};

// game
function startGame() {
    // default time set to 60seconds
    var time = 60;
    clearEls()
    // renders timer and high score link
    renderGameHeader()
    // get span to write time to 
    var timeEl = document.getElementById('time')
    timeEl.textContent = time
    // timer function
    const timerId = setInterval(function () {
        time--
        timeEl.textContent = time
        // loss conditiion
        if (time <= 0) {
            // stop timer function
            clearInterval(timerId);
            // endGame
            endGame();
        }
    }, 1000)
    // render the first question
    renderNextQuestion();

    function renderNextQuestion() {
        // win condition, you have finished the questions
        if (currentIndex >= questionArray.length) {
            clearInterval(timerId)
            endGame()
            return
        }
        mainEl.innerHTML = '';
        var question = questionArray[currentIndex]
        // get body of question
        var questionBodyEl = document.createElement('h2')
        questionBodyEl.classList.add("left-align")
        questionBodyEl.textContent = question.questionText
        var answersEl = document.createElement('div')
        answersEl.classList.add("answers")
        // loop through answers generating HTML elements
        for (i = 0; i < question.answerArray.length; i++) {
            var answer = document.createElement('button')
            answer.textContent = (i+1) + ". " + question.answerArray[i]
            if (i == question.correctIndex) {
                answer.setAttribute("data-correct-answer", true)
            }
            answersEl.appendChild(answer)
        }
        answersEl.addEventListener("click", checkAnswer)
        mainEl.appendChild(questionBodyEl)
        mainEl.appendChild(answersEl)
        // add previous answer element if we are not on the first question
        if (currentIndex>0) {
            var previousAnswerEl = document.createElement('p')
            previousAnswerEl.classList.add('previous-answer')
            previousAnswerEl.classList.add('show')
            previousAnswerEl.textContent = previousAnswer
            // set display to none after 1 second
            setTimeout(function() {
                previousAnswerEl.classList.remove('show');
            }, 1000)
            mainEl.appendChild(previousAnswerEl)
        }
        // iterate index
        currentIndex++
    }

    // takes us to the high score submission page
    function endGame() {
        mainEl.innerHTML = ''
        timeEl.textContent = time
        var endGameHeaderEl = document.createElement("h2")
        endGameHeaderEl.classList.add("left-align")
        endGameHeaderEl.textContent = "All Done!"
        mainEl.appendChild(endGameHeaderEl)
        var endGameBodyEl = document.createElement('p')
        endGameBodyEl.classList.add("left-align")
        endGameBodyEl.textContent = "Your score was a " + time
        mainEl.appendChild(endGameBodyEl)
        var formEl = document.createElement('form')
        var input = document.createElement('input')
        var button = document.createElement('button')
        var label = document.createElement('label')
        button.textContent = "Submit"
        label.textContent = "Initials: "
        formEl.appendChild(label)
        formEl.appendChild(input)
        formEl.appendChild(button)
        formEl.classList.add("left-align")
        mainEl.appendChild(formEl)
        // submit high score on submission click
        button.addEventListener("click", submitHighScore)
    }

    function submitHighScore(event) {
        // prevent default behavior
        event.preventDefault()
        // get high scores from local storage.
        // array of score objects with initials and score
        var highScores = localStorage.getItem('highScores')
        // gets the value of the input form
        var inputVal = document.getElementsByTagName('input')[0].value
        // create a new score object
        var newScoreObj = { "initials": inputVal, "score": time }
        // if they have entered text
        if (inputVal != '') {
            // check if high scores already existed
            if (highScores) {
                // parse old array
                highScores = JSON.parse(highScores)
                // add new object
                highScores.push(newScoreObj)
                // sort array so high scores first
                highScores.sort(compareScoreObjects)
            } else {
                highScores = [newScoreObj]
            }
            // stringify the array and set to local storage
            localStorage.setItem('highScores', JSON.stringify(highScores))
            renderHighScorePage()
        }
    }


    function checkAnswer(event) {
        // make sure they clicked a button
        if (event.target.matches('button')) {
            // correct answers have this attribute
            if (!event.target.hasAttribute('data-correct-answer')) {
                time = time - 10
                // used to create previousAnswerEl
                previousAnswer = "Incorrect!"
            } else {
                previousAnswer = "Correct!"
            }
            renderNextQuestion()
        }
    }

    // renders header and timer
    function renderGameHeader() {
        var highScoreLink = document.createElement('a');
        highScoreLink.textContent = "View Highscores"
        // view highscores link stops game timer if clicked during game
        highScoreLink.addEventListener('click', function () {
            clearInterval(timerId)
            renderHighScorePage()
        })
        headerEl.appendChild(highScoreLink)
        renderTimer()
    }


}

function renderTimer() {
    var timerEl = document.createElement('p')
    // create element with span to write time to
    timerEl.innerHTML = "Timer: <span id = time></span>s"
    headerEl.appendChild(timerEl)
}



function renderHighScorePage() {
    clearEls()
    var highScoreHeader = document.createElement("h2")
    var highScoreList = document.createElement("ol")
    var highScores = localStorage.getItem("highScores")
    var buttonsDiv = document.createElement('div')
    var homeButton = document.createElement('button')
    var resetScores = document.createElement('button')
    homeButton.textContent = "Go back"
    resetScores.textContent = "Reset scores"
    highScoreHeader.textContent = "High Scores"
    // add list items for each score
    // different formating for odd and even scores
    if (highScores) {
        var array = JSON.parse(highScores)
        for (i = 0; i < array.length; i++) {
            var li = document.createElement('li')
            if (i % 2 == 0){
                li.classList.add("even-scores")
            } else {li.classList.add("odd-scores")}
            li.textContent = array[i].initials + " - " + array[i].score
            highScoreList.appendChild(li)
        }
    }
    mainEl.appendChild(highScoreHeader)
    mainEl.appendChild(highScoreList)
    mainEl.appendChild(buttonsDiv)
    buttonsDiv.appendChild(homeButton)
    buttonsDiv.appendChild(resetScores)
    homeButton.addEventListener('click', renderHomePage)
    resetScores.addEventListener('click', resetHighScoreList)
}

function resetHighScoreList() {
    localStorage.setItem('highScores', JSON.stringify([]))
    renderHighScorePage()
}


function compareScoreObjects(a, b) {
    return b.score - a.score 
}
