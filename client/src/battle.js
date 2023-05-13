$(function () {
    // $("#overlay").hide();
    // $("#overlay-fight").hide();
});

function showFightButtons() {
    $('#overlay').hide();
}

function runFromBattle() {
    socket.emit("endBattle");
    $("#overlay").hide();
    $("#overlay-fight").hide();
}

var battleOptions;
var battleOver = false;
var battleDialogue = [];
var textSpeed = 80;
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
                    $('#dialogue').html("");
                    dialoguePlaying = false;
                    if (battleOver) {
                        $('#battle-UI').hide();
                        players[username].busy = false;
                        battleOver = false;
                    } else {
                        $("#overlay").show();
                        $("#overlay-fight").show();
                    }
                }
            }, 500);
        }
    }, 1000 / textSpeed);
}