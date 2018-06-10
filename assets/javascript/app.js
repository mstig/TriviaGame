
window.onload = function () {

    var questionArray = [
        //answer is always index 0 of answer array
        //use a random splice function to change display order
        {
            question: "Who was the final act to perform at Woodstock?",
            answers: ["Jimi Hendrix", "The Grateful Dead", "The Who", "Crosby, Stills, Nash, and Young"],
            correct: "Jimi Hendrix",
            info: "Jimi Hendrix was the final performance of Woodstock, taking the stage at 8 AM after rain delays."
        },
        {
            question: "Which person was NOT a member of The Beatles?",
            answers: ["Billy Preston", "Ringo Starr", "George Harrison", "Paul McCartney"],
            correct: "Billy Preston",
            info: "Billy Preston was never an official member of the Beatles, but did collaborate with the band and was sometimes referred to as the 'Fifth Beatle.'"
        },
        {
            question: "Which artist has the highest selling album in the world?",
            answers: ["Michael Jackson", "The Beatles", "The Eagles", "Garth Brooks"],
            correct: "Michael Jackson",
            info: "Michael Jackson's Thriller, released in 1982, is the best selling album of all time."
        },
        {
            question: "Which artist/group was known to perform for inmates at various prisons?",
            answers: ["Johnny Cash", "Bob Dylan", "The Sex Pistols", "The Doors"],
            correct: "Johnny Cash",
            info: "Johnny Cash performed several prison showns, releasing popular live albums from Folsom and San Quentin prisons."
        },
        {
            question: "Who wrote the song 'Layla', about his love for the wife of a close friend?",
            answers: ["Eric Clapton", "Freddie Mercury", "John Lennon", "Jim Morrison"],
            correct: "Eric Clapton",
            info: "Eric Clapton wrote Layla about Pattie Boyd, the wife of Beatles member George Harrison."
        },
        {
            question: "Ozzy Osbourne and Ronnie James Dio were lead singers of which band?",
            answers: ["Black Sabbath", "AC/DC", "The Scorpions", "The Black Crowes"],
            correct: "Black Sabbath",
            info: "Black Sabbath fired Ozzy Osbourne in 1979 and hired Ronnie James Dio, though Osbourne would later return to the band."
        },
        {
            question: "Which album was the very first to be pressed as a CD in the United States?",
            answers: ["Born in the USA (Bruce Springsteen)", "The Dark Side of the Moon (Pink Floyd)", "Pet Sounds (The Beach Boys)", "Texas Flood (Stevie Ray Vaughan)"],
            correct: "Born in the USA (Bruce Springsteen)",
            info: "Born in the USA by Bruce Springsteen was the first CD pressed in America, in September 1984."
        },
        {
            question: "Who is the only original member of Guns N' Roses to graduate with a high school diploma?",
            answers: ["Izzy Stradlin", "Axl Rose", "Slash", "Duff McKagan"],
            correct: "Izzy Stradlin",
            info: "Izzy Stradlin was the only original member of the band to graduate high school."
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

}
