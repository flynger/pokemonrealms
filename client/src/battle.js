$(function () {
    $("#overlay").hide();
    $("#overlay-fight").hide();
});

function showFightButtons() {
    $('#overlay').hide();
}

function runFromBattle() {
    socket.emit("endBattle");
}

var battleOptions;

var battleDialogue = [];
var textSpeed = 60;
var textInterval;
var dialoguePlaying = false;
function nextDialogue() {
    dialoguePlaying = true;
    clearInterval(textInterval);
    var letters = battleDialogue.shift().split("");
    $('#dialogue').html("");
    var index = 0;
    var textInterval = setInterval(function () {
        $('#dialogue').html($('#dialogue').html() + letters[index++]);
        if (index >= letters.length) {
            clearInterval(textInterval);
            setTimeout(() => {
                if (battleDialogue.length > 0) nextDialogue();
                else {
                    dialoguePlaying = false;
                    $("#overlay").show();
                    $("#overlay-fight").show();
                }
            }, 500);
        }
    }, 1000 / textSpeed);
}