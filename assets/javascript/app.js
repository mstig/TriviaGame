
window.onload = function () {

    //countdown function for remaining time
    var countdown;

    var timerRunning = false;

    //timer object
    var triviaTimer = {

        //second time bank to play
        time: 60,

        //method to start countdown
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
            triviaTimer.time--;
            $("#seconds-left").text(triviaTimer.time);
        }


    };

    $("#start").on("click", function () {
        //hide button
        $("#start").hide();
        //set score to 0

        //call timer start
        triviaTimer.start();

        //show $("#question-box");
        $("#question-box").show();

        $("#secondspleft").text(triviaTimer.time);

    });

    //hide question-box at start $("#question-box").hide();
    $("#question-box").hide();

    $("#test-button").on("click", function () {
        countdown = setInterval(triviaTimer.count, 1000);
    });


}