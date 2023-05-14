var Moves; // moves json fetched on setup

$(function () {
    $("#overlay").hide();
    $("#overlay-fight").hide();
    $('#battle-UI').show(() => {
        $('#battle-UI').hide();
    });
});

function showFightButtons() {
    $("#overlay-fight").show();
    $('#overlay').hide();
}

function useMove(num) {
    socket.emit("moveInput", num);
    $("#overlay-fight").hide();
    $("#overlay-message").show();
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
function nextAction() {
    if (!dialoguePlaying) {
        $("#overlay").hide();
        $("#overlay-fight").hide();
        $("#overlay-message").show();
        dialoguePlaying = true;
    }
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
                    $('#dialogue').html("Waiting for server...");
                    dialoguePlaying = false;
                    if (nextData.battleOver) {
                        $('#battle-UI').hide();
                        players[username].busy = false;
                        battleOver = false;
                        app.view.style.filter = "none";
                    } else {
                        $("#overlay").show();
                        // $("#overlay-fight").show();
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

function updateMoveChoices() {
    for (let moveNum = 1; moveNum <= 4; moveNum++) {
        if (battleOptions.active[0].moves.length >= moveNum) {
            let moveData = battleOptions.active[0].moves[moveNum - 1];
            let moveType = Moves[moveData.id.toUpperCase()].type.toLowerCase();
            $("#move" + moveNum).show();
            $("#move" + moveNum).removeClass();
            $("#move" + moveNum).addClass(moveType);
            $("#move" + moveNum).html(`<span class="movename">${moveData.move}</span><span class="movetype type ${moveType}"></span><span class="movepp">PP ${moveData.pp}/${moveData.maxpp}</span>`);
            // console.log($(".move1").addClass("water"));
        } else {
            $("#move" + moveNum).hide();
        }
    }
}