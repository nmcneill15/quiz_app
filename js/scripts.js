var questionIndex = 0;
var deaths = 0;
var crossings = 0;

  var questions = [{
    question: "Stop! He who would cross the bridge of death must answer me these questions three, ere the other side he see",
    answers: {"Ask me the questions, bridgekeeper. I am not afraid": true},
    correct: false,
    index: 0
  },
  {
    question: "What is your name?",
    answers: {"Sir Lancelot of Camelot": true, "Ralph": false, "Brad Pitt": false, "Duke Lancelot of Brooklyn": false},
    correct: false,
    index: 1
  },
  {
    question: "What is your quest?",
    answers: {"To seek some peace and quiet": false, "To seek the Holy Grail": true, "Two sikhs walk into a bar": false, "Too slick for my own good": false},
    correct: false,
    index: 2
  },
  {
    question: "What is your favorite color?",
    answers: {"Blue": true, "Purple": false, "Coconut Cream": false, "yellow": false},
    correct: false,
    index: 3
  },
  {
    question: "What is your name?",
    answers: {"Sir Robin of Camelot": true, "Robin Hood": false, "Robin and Batman": false, "Rob": false},
    correct: false,
    index: 4
  },
  {
    question: "What is your quest?",
    answers: {"I've been going to counceling to try and answer that": false, "To seek the Holy Grail!": true, "I don't know": false, "To sip pinocolada's on the beach": false},
    correct: false,
    index: 5
  },
  {
    question: "What is the capital of Assyria?",
    answers: {"I don't know that!": false, "Lithuania": false, "Philadelphia": false, "Ashur": true},
    correct: false,
    index: 6
  },
  {
    question: "What is your name?",
    answers: {"Arthur, King of the Britons": true, "Ralph...yes, just Ralph": false, "Elvis, King of Rock and Roll": false, "Harry Potter": false},
    correct: false,
    index: 7
  }];

$(document).ready(function() {
  newQuiz();
});

function isCorrect(answer) {
  var correct = questions[questionIndex].answers[answer];
  console.log(answer);
  return correct;
}
function correct() {
  $("#crossing-modal").fadeIn().delay(200).fadeOut();
  $("#crossings").append("<img src='img/small-bridge.png' />");
  offYouGo = document.getElementById("off-you-go-audio");
  offYouGo.play();
  crossings++;
}

function incorrect() {
  $("#deaths-modal").append("<img class='die' src='img/die.gif' />");
  $("#deaths-modal").fadeIn().delay(200).fadeOut(function(){
    $("#deaths-modal").empty();
  });
  $("#deaths").append("<img src='img/die.png' />");
  dontKnow = document.getElementById("dont-know-audio");
  dontKnow.currentTime = 12;
  dontKnow.play();
  deaths++;
}

$("#answers").on("click", ".answer-btn", function(e) {
  e.preventDefault();
  var answer = e.target.innerText;
  var right = isCorrect(answer);
  if (right === true) {
    if (questionIndex > 0) {
      correct();
    } else {
      notAfraidAudio = document.getElementById("not-afraid-audio");
      notAfraidAudio.play();
    }
    nextQuestion();
  } else {
    if (questionIndex > 0) {
      incorrect();
    }
    nextQuestion();
  }
});

function newQuiz() {
  questionIndex = 0;
  $("#qa").show();
  var introAudio = document.getElementById("intro-audio");
  introAudio.play();
  $("#progress").empty();
  $("#deaths").empty();
  $("#crossings").empty();
  $("#answers").empty();
  $("#questions p").text(questions[questionIndex].question);
  for (i = 0; i < (questions.length - 1); i++) {
    $("#progress").append("<h2><i class='fa fa-circle' aria-hidden='true'></i></h2>");
  }
  for (var prop in questions[questionIndex].answers) {
    $("#answers").append("<button class='answer-btn'>" + prop + "</button>");
  }
}

function endQuiz() {
  $("#end-modal").fadeIn();
  $("#qa").hide();
  $("#end-modal h3").text("Your score is " + deaths + " deaths and " + crossings + " crossings");
}

$("#new-quiz-btn").on("click", function() {
  $("#end-modal").fadeOut();
  newQuiz();
});

function nextQuestion(){
  if (questionIndex === questions.length - 1) {
    endQuiz();
  } else {
    questionIndex++;
    $("#questions p").text(questions[questionIndex].question);
    $("#progress h2:nth-child(" + (questionIndex - 1) + ")").css("color", "white")
    .next().css("color", "#EF6C00");
    $("#answers").empty();
    for (var prop in questions[questionIndex].answers) {
      $("#answers").append("<button class='answer-btn'>" + prop + "</button");
      console.log(prop);
    }
  }
}
