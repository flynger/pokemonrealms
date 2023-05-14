$(function () {
    $("#overlay").hide();
    $("#overlay-fight").hide();
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
var textSpeed = 50;
var textInterval;
var dialoguePlaying = false;
var pokemonImage = "https://play.pokemonshowdown.com/sprites/gen5ani-back/bulbasaur.gif";

// Set the image source URL
$("#player-pokemon").attr("src", pokemonImage);
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