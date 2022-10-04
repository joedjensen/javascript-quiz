var headerEl = document.getElementById('page-header')
var mainEl = document.getElementById('main')
var currentIndex = 0
var questionArray = [
    {
        "questionText": "this is the first question",
        "answerArray": ["wrong", "right", "wrong", "wrong"],
        "correctIndex": 1
    },
    {
        "questionText": "this is the first question",
        "answerArray": ["wrong", "wrong", "wrong", "right"],
        "correctIndex": 3
    }]

renderHomePage();

function renderHomePage() {
    // clear inner HTML
    clearEls();
    // reset question index to beginning
    currentIndex = 0;
    // home page header
    var highScoreLink = document.createElement('a');
    highScoreLink.textContent = "View Highscores"
    highScoreLink.addEventListener('click', function () {
        renderHighScorePage()
    })
    headerEl.appendChild(highScoreLink)
    var homePageHeader = document.createElement("h2")
    homePageHeader.textContent = "JavaScript Quiz"
    mainEl.appendChild(homePageHeader)
    // home page body
    var homePageBody = document.createElement('p')
    homePageBody.textContent = "Welcome to an interactive JavaScript Quiz. Answer as quickly as you can and see if you can get a high score!"
    mainEl.appendChild(homePageBody);
    // start button
    var startButton = document.createElement("button")
    startButton.textContent = "Start Quiz"
    mainEl.appendChild(startButton)
    // render first question on 
    startButton.addEventListener('click', startGame);
}

function clearEls() {
    headerEl.innerHTML = '';
    mainEl.innerHTML = '';
};

function startGame() {
    var time = 10;
    clearEls()
    renderGameHeader()
    var timeEl = document.getElementById('time')
    timeEl.textContent = time
    const timerId = setInterval(function () {
        time--
        timeEl.textContent = time
        if (time <= 0) {
            // stop timer function
            clearInterval(timerId);
            // increment losses, store, update text
            endGame();
        }
    }, 1000)

    renderNextQuestion();

    function renderNextQuestion() {
        // win condition
        if (currentIndex >= questionArray.length) {
            clearInterval(timerId)
            endGame()
            return
        }
        mainEl.innerHTML = '';
        var question = questionArray[currentIndex]
        var questionBodyEl = document.createElement('p')
        questionBodyEl.textContent = question.questionText
        var answersEl = document.createElement('ol')
        for (i = 0; i < question.answerArray.length; i++) {
            var answer = document.createElement('button')
            answer.textContent = question.answerArray[i]
            if (i == question.correctIndex) {
                answer.setAttribute("data-correct-answer", true)
            }
            answersEl.appendChild(answer)
        }
        answersEl.addEventListener("click", checkAnswer)
        mainEl.appendChild(questionBodyEl)
        mainEl.appendChild(answersEl)
        currentIndex++
    }


    function endGame() {
        mainEl.innerHTML = ''
        var endGameHeaderEl = document.createElement("h2")
        endGameHeaderEl.textContent = "All Done!"
        mainEl.appendChild(endGameHeaderEl)
        var endGameBodyEl = document.createElement('p')
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
        mainEl.appendChild(formEl)
        button.addEventListener("click", submitHighScore)
    }

    function submitHighScore(event) {
        event.preventDefault()
        var highScores = localStorage.getItem('highScores')
        var inputVal = document.getElementsByTagName('input')[0].value
        var newScoreObj = { "initials": inputVal, "score": time }
        if (inputVal != '') {
            if (highScores) {
                highScores = JSON.parse(highScores)
                highScores.push(newScoreObj)
                highScores.sort(compareScoreObjects)
            } else {
                highScores = [newScoreObj]
            }
            localStorage.setItem('highScores', JSON.stringify(highScores))
            renderHighScorePage()
        }
    }


    function checkAnswer(event) {
        if (event.target.matches('button')) {
            if (!event.target.hasAttribute('data-correct-answer')) {
                time = time - 5
            }
            console.log("check")
            renderNextQuestion()
        }


    }
    function renderGameHeader() {
        var highScoreLink = document.createElement('a');
        highScoreLink.textContent = "View Highscores"
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
    timerEl.innerHTML = "Timer: <span id = time></span>s"
    headerEl.appendChild(timerEl)
}



function renderHighScorePage() {
    clearEls()
    var highScoreHeader = document.createElement("h2")
    var highScoreList = document.createElement("ol")
    var highScores = localStorage.getItem("highScores")
    var homeButton = document.createElement('button')
    var resetScores = document.createElement('button')
    homeButton.textContent = "Go back"
    resetScores.textContent = "Reset scores"

    highScoreHeader.textContent = "High Scores"
    if (highScores) {
        var array = JSON.parse(highScores)
        for (i = 0; i < array.length; i++) {
            var li = document.createElement('li')
            li.textContent = array[i].initials + "-" + array[i].score
            highScoreList.appendChild(li)
        }
    }
    mainEl.appendChild(highScoreHeader)
    mainEl.appendChild(highScoreList)
    mainEl.appendChild(homeButton)
    mainEl.appendChild(resetScores)
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
