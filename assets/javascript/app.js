
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

    var currentQuestion = 0; //used to parse through array
    var correct = 0;  //tracking answer total
    var incorrect = 0;
    var questionBox = $("#question-box"); //div for displaying questions and answer info

    function randomAnswers() {
        //Pulls entry from the current questions answer array to randomize answer display
        return questionArray[currentQuestion].answers.splice(Math.floor(Math.random() * questionArray[currentQuestion].answers.length), 1);

    }
    console.log(questionArray[currentQuestion].answers.length);

    var getQuestion = function() {
        triviaTimer.start();
        questionBox.empty();
        var newQuestion = $("<div>");
        var answerButtons = $("<button>");

        newQuestion.append(questionArray[currentQuestion].question+"<br>").appendTo(questionBox);

        //makes 4 buttons for each answer
        for (i=0; i<4; i++) {
            $("<button>").append(randomAnswers()).addClass("answer-button").appendTo(newQuestion);
            $("<br>").appendTo(newQuestion);
        }
    }

    var showAnswer = function(guess) {
        questionBox.empty();
        triviaTimer.stop(); 
        console.log(guess);
        console.log(questionArray[currentQuestion].correct); 
        if (guess === questionArray[currentQuestion].correct) {
            //show correct message + answer info here
            questionBox.append(questionArray[currentQuestion].info);
        }

        else {
            //show incorrect answer message + explanation
        }
        currentQuestion++;
        setTimeout(getQuestion, 5000);
    }

    var gameOver = function() {

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
                //call game end function
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

    $("#question-box").on("click", ".answer-button", function(){
        showAnswer($(this).text());
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
        getQuestion();
     });


}