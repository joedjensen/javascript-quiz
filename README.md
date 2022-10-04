# JavaScript Quiz

## Description 

This repository contains a Javascript quiz. Repository utilizes javascript to dynamically nearly all of the HTML elements present. It also stores a high score leaderboard in local storage.

This repository utilizes
* HTML
* CSS
* JavaScript

[Deployed Site](https://joedjensen.github.io/javascript-quiz/)

## Installation 
N/A

## Usage 

Press start to begin the quiz or 'view highscores' to view high scores. Your score is based on the time remaining at the end of the 10 questions. Remember that each wrong answer removes 10 seconds from the timer!

At the high score screen, enter your initials and submit your score.

## Code Snippets

The engine of the game is an array of question objects. These objects are of the form 
```Javascript
 {
   "questionText": "Javascript is an _______ language?",
   "answerArray": ["Object-Oriented", "Object-based", "Procedural", "None of the above"],
   "correctIndex": 0
 }
```

These are then used to create the HTML elements thusly
```Javascript
for (i = 0; i < question.answerArray.length; i++) {
    var answer = document.createElement('button')
    answer.textContent = (i+1) + ". " + question.answerArray[i]
    if (i == question.correctIndex) {
        answer.setAttribute("data-correct-answer", true)
    }
    answersEl.appendChild(answer)
}
```

And the 'data-correct-answer' is then used when checking answers
```Javascript
if (!event.target.hasAttribute('data-correct-answer')) {
    time = time - 10
    // used to create previousAnswerEl
    previousAnswer = "Incorrect!"
} else {
    previousAnswer = "Correct!"
}
```
Function to sort array of score objects from high to low
```Javascript
function compareScoreObjects(a, b) {
    return b.score - a.score 
}
```

Lastly, we use some cute formatting to alternate background colors on our leaderboard
```Javascript
var array = JSON.parse(highScores)
for (i = 0; i < array.length; i++) {
    var li = document.createElement('li')
    if (i % 2 == 0){
        li.classList.add("even-scores")
    } else {li.classList.add("odd-scores")}
    li.textContent = array[i].initials + " - " + array[i].score
    highScoreList.appendChild(li)
}
```

## License

Please refer to the license in the repo


