var colors = ["blue", "green", "red", "yellow"];
var sequence = new Array();
var round = 0;
var checkCounter = 0;

$(".btn").on("click", function () {
    var index = colors.indexOf($(this).attr('id'));
    pressButton(index);
    checkAnswer(index);
});

function pressButton(index) {
    var filename = colors[index];
    $("#" + filename).addClass("pressed");
    var sound = new Audio("sounds/" + filename + ".mp3");
    sound.play();
    setTimeout(() => {
        $("#" + filename).removeClass("pressed");
    }, 100);
}

function getNextInSequence() {
    return Math.floor(Math.random() * 4);
}

function checkAnswer(index) {
    if (checkCounter == round) {
        return;
    }
    if (index == sequence[checkCounter]) {
        checkCounter += 1;
        if (checkCounter == round) {
            setTimeout(() => {
                startNextRound();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(() => {
            startNewGame();
        }, 200);
    }
}

function startNewGame() {
    round = 0;
    sequence = [];
    $("#level-title").text("Press A Key to Start");
    $("body").removeClass("game-over");
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
}

$(document).on("keypress", function (event) {
    if ((event.key == 'A' || event.key == 'a') && round == 0) {
        setTimeout(() => {
            startNextRound();
        }, 500);
    }
});

function startNextRound() {
    $("#level-title").text("Round# " + round.toString());
    round += 1;
    checkCounter = 0;
    var nextMove = getNextInSequence();
    pressButton(nextMove);
    sequence.push(nextMove);
}