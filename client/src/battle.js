$(function () {
    // $("#overlay").hide();
    // $("#overlay-fight").hide();
    $('#battle-UI').show();
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
var battleData = [];
var textSpeed = 60;
var textInterval;
var dialoguePlaying = false;
function nextDialogue() {
    dialoguePlaying = true;
    clearInterval(textInterval);
    var nextData = battleData.shift();
    var letters = nextData.message.split("");
    $('#dialogue').html("");
    var index = 0;
    var textInterval = setInterval(function () {
        $('#dialogue').html($('#dialogue').html() + letters[index++]);
        if (index >= letters.length) {
            clearInterval(textInterval);
            setTimeout(() => {
                if (battleData.length > 0) {
                    nextAction();
                } else {
                    $('#dialogue').html("");
                    dialoguePlaying = false;
                    if (nextData.battleOver) {
                        $('#battle-UI').hide();
                        players[username].busy = false;
                        battleOver = false;
                        app.view.style.filter = "none";
                    } else {
                        $("#overlay").show();
                        $("#overlay-fight").show();
                    }
                }
            }, 800);
        }
    }, 1000 / textSpeed);
}

function showPokemonYou(species) {
    species = species.toLowerCase();
    var imageUrl = `https://play.pokemonshowdown.com/sprites/gen5ani-back/${species}.gif`;

    // Set the image source URL
    $("#pokemon-you").attr("src", imageUrl);
}

function showPokemonFoe(species) {
    species = species.toLowerCase();
    var imageUrl = `https://play.pokemonshowdown.com/sprites/gen5ani/${species}.gif`;
    $("#pokemon-foe").attr("src", imageUrl);
}