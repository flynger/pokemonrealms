$(function () {
    $("#overlay").hide();
    $("#overlay-fight").hide();
});

function showFightButtons() {
    $('#overlay').hide();
}

function runFromBattle() {
    $('#battle-UI').hide();
}
var battleOptions;

var battleDialogue = [];
var textSpeed = 50;
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
                    $("#overlay-fight").show();
                    $("#overlay").show();
                }
            }, 500);
        }
    }, 1000 / textSpeed);
}