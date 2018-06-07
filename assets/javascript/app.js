
window.onload = function () {

    var questionArray = [
        //answer is always index 0 of answer array
        //use a random splice function to change display order
        {
            question: "Test question one",
            answers: ["zero", "one", "two", "three"],
            correct: "zero",
            info: "The answer is this because XXX q1"

        },
        {
            question: "Test question two",
            answers: ["zero", "one", "two", "three"],
            correct: "zero",
            info: "The answer is this because XXX q2"

        },
        {
            question: "Test question three",
            answers: ["zero", "one", "two", "three"],
            correct: "zero",
            info: "The answer is this because XXX q3"

        }
    ]

    var savedArray = $.extend(true, {}, questionArray); //copies array to save answers lost to splicing

    var currentQuestion = 0; //used to parse through array
    var totalQuestions = questionArray.length; //checks for game end
    var unanswered = questionArray.length;
    var answersRight = 0;  //tracking answer total
    var answersWrong = 0;
    var questionBox = $("#question-box"); //div for displaying questions and answer info

    function randomAnswers() {
        //Pulls entry from the current questions answer array to randomize answer display
        return questionArray[currentQuestion].answers.splice(Math.floor(Math.random() * questionArray[currentQuestion].answers.length), 1);

    }
    console.log(questionArray[currentQuestion].answers.length);

    var getQuestion = function () {
        if (currentQuestion < totalQuestions) {
            triviaTimer.start();
            questionBox.empty();
            var newQuestion = $("<div>").appendTo(questionBox)

            $("<div>").append(questionArray[currentQuestion].question + "<br>").addClass("current-question").appendTo(newQuestion);

            //makes 4 buttons for each answer
            for (i = 0; i < 4; i++) {
                $("<button>").append(randomAnswers()).addClass("answer-button").appendTo(newQuestion);
                $("<br>").appendTo(newQuestion);
            }
        }

        else {
            gameOver();
        }
    }

    var showAnswer = function (guess) {
        questionBox.empty();
        triviaTimer.stop();
        console.log(guess);
        console.log(questionArray[currentQuestion].correct);
        if (guess === questionArray[currentQuestion].correct) {
            //show correct message + answer info here
            $("<div>").append("You are correct!").appendTo(questionBox);
            answersRight++;
        }

        else {
            //show incorrect answer message + explanation
            $("<div>").append("That is incorrect!").appendTo(questionBox);
            answersWrong++;
        }
        $("<div>").append(questionArray[currentQuestion].info).appendTo(questionBox)
        unanswered--;
        currentQuestion++;
        setTimeout(getQuestion, 5000);
    }

    var gameOver = function () {
        questionBox.empty();
        triviaTimer.stop();
        questionArray = $.extend(true, {}, savedArray);


        //show right, wrong, unanswered questions
        $("<div>").append("Correct answers: " + answersRight).appendTo(questionBox);
        $("<div>").append("Incorrect answers: " + answersWrong).appendTo(questionBox);
        $("<div>").append("Unanswered questions: " + unanswered).appendTo(questionBox);
        //ask to restart
        $("<button>").append("Want to play again?").addClass("replay-button").appendTo(questionBox);
    }

    var newGame = function () {
        questionBox.empty();
        triviaTimer.time = 60;
        answersRight = 0;
        answersWrong = 0;
        currentQuestion = 0;
        unanswered = questionArray.length;
        getQuestion();
    }




    //timer object & variables
    var countdown;
    var timerRunning = false;
    var triviaTimer = {

        //second time bank to play
        time: 60,

        //method to start countdown, calls count to decrement every 1 sec
        start: function () {
            if (!timerRunning) {
                countdown = setInterval(triviaTimer.count, 1000);
                timerRunning = true;
            }
        },

        //method to stop when they click an answer
        stop: function () {
            clearInterval(countdown);
            timerRunning = false;
        },

        //count function to decrement remaining time
        count: function () {
            if (triviaTimer.time > 0) {
                triviaTimer.time--;
                $("#seconds-left").text(triviaTimer.time);
            }

            else {
                gameOver();
            }
        }
    };

    $("#time-show").hide();

    $("#start").on("click", function () {
        $("#start").hide();

        getQuestion();

        //call timer start
        $("#time-show").show();
        triviaTimer.start();

        //show $("#question-box");
        $("#question-box").show();

    });

    $("#question-box").on("click", ".answer-button", function () {
        showAnswer($(this).text());
    });

    $("#question-box").on("click", ".replay-button", function () {
        newGame();
    });

    // $("#test-button").on("click", function() {
    //     console.log(questionArray[0].question)
    // });

    $("#test-button").on("click", function () {
        triviaTimer.stop();
    });

    $("#test-button-two").on("click", function () {
        questionBox.empty();
        setTimeout(getQuestion, 5000);
    });

    $("#log-button").on("click", function () {
        console.log(unanswered);
    });

}