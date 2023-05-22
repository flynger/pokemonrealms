var Moves; // moves json fetched on setup

$(function () {
    // $('#battle-UI').show();
    $("#overlay-command").hide();
    $("#overlay-fight").hide();
    $("#overlay-switch").hide();
    $("#overlay-message").show();
    // $('#battle-UI').hide();
    // $('#battle-UI').show(() => {
    //     $('#battle-UI').hide();
    // });
});

function showFightButtons() {
    $("#overlay-fight").show();
    $('#overlay-command').hide();
}

function useMove(num) {
    socket.emit("moveInput", num);
    $("#overlay-fight").hide();
    $("#overlay-message").show();
}

function switchTo(slot) {
    socket.emit("switchInput", slot);
}

function showSwitchButtons() {
    var switchData = [
        { id: 'pkmn1', imageSrc: 'res/pokemon/icons/25.png', name: 'Pikachu' },
        { id: 'pkmn2', imageSrc: 'res/pokemon/icons/6.png', name: 'Charizard' },
        { id: 'pkmn3', imageSrc: 'res/pokemon/icons/151.png', name: 'Mew' },
        { id: 'pkmn4', imageSrc: 'res/pokemon/icons/151.png', name: 'Mew' },
        { id: 'pkmn5', imageSrc: 'res/pokemon/icons/151.png', name: 'Mew' },
        { id: 'pkmn6', imageSrc: 'res/pokemon/icons/151.png', name: 'Crabominable' }
    ];

    // Generate switch UI HTML
    var switchHtml = '';
    switchData.forEach(function (data) {
        switchHtml += '<div id="' + data.id + '" class="switch-button text-white" onclick="switchTo(' + data.id.slice(4) + ')">';
        switchHtml += '<img class="switch-image" src="' + data.imageSrc + '"></img>';
        switchHtml += '<div class="switch-info">';
        switchHtml += '<p class="mb-0">' + data.name + '</p>';
        switchHtml += '<div class="hp hp-small"></div>';
        switchHtml += '</div>';
        switchHtml += '</div>';
    });

    switchHtml += '<div class="cancel" onclick="cancelSwitch()"></div>'

    // Add switch UI HTML to the container element
    $('#overlay-switch').html(switchHtml);
    $("#overlay-switch").show();
    $('#overlay-command').hide();
}

function runFromBattle() {
    socket.emit("endBattle");
    $("#overlay-command").hide();
    $("#overlay-fight").hide();
}

var battleOptions;
var isBattleActive = false;
var battleData = [];
var textSpeed = 100; // 60
var textInterval;
var dialoguePlaying = false;
function nextAction() {
    if (!dialoguePlaying) {
        $("#overlay-command").hide();
        $("#overlay-fight").hide();
        $("#overlay-message").show();
        dialoguePlaying = true;
    }
    clearInterval(textInterval);
    var nextData = battleData.shift();
    if (nextData.switchIn) {
        let pokemonData = nextData.switchIn.split(', ');
        if (!pokemonData[1].startsWith("L")) {
            pokemonData.splice(1, 0, "L100");
        }
        let side = nextData.side;
        let nickname = nextData.nickname;
        let species = pokemonData[0].toLowerCase();
        let level = pokemonData[1].slice(1);
        let gender = pokemonData[2];
        let shiny = pokemonData[3] == "shiny";
        console.log(species, level, gender, shiny)
        showPokemon(side, species, nickname, level, shiny);
    }
    var letters = processFormatting(nextData.message, nextData.message.split(""));
    if ("damageHPTo" in nextData) {
        $("#hpbar-" + nextData.side).width(nextData.damageHPTo / 100 * 96);
        setTimeout(() => {
            textInterval = createTextInterval(nextData, letters)
        }, 666);
    }
    else textInterval = createTextInterval(nextData, letters);
}
function createTextInterval(nextData, letters) {
    $('#dialogue').html("");
    var index = 0;
    return setInterval(function () {
        $('#dialogue').html($('#dialogue').html() + letters[index++]);
        if (index >= letters.length) {
            clearInterval(textInterval);
            setTimeout(() => {
                if (battleData.length > 0) {
                    nextAction();
                } else {
                    if (nextData.battleOver) {
                        $('#battle-UI').hide();
                        players[username].busy = false;
                        isBattleActive = false;
                        app.view.style.filter = "none";
                        clearPokemon("you");
                        clearPokemon("foe");
                    } else {
                        $("#overlay-command").show();
                        // $("#overlay-fight").show();
                    }
                    $('#dialogue').html("");
                    dialoguePlaying = false;
                }
            }, 800);
        }
    }, 1000 / textSpeed);
}

function processFormatting(message, letters) {
    if (message.includes("**")) {
        let b1 = message.indexOf("**");
        message = message.replace("**", "BB");
        let b2 = message.indexOf("**");
        message = message.replace("**", "BB");
        letters[b1] = "<b>";
        letters[b2] = "</b>";
        letters.splice(b2 + 1, 1);
        letters.splice(b1 + 1, 1);
    }
    console.log(letters);
    return letters;
}

function showPokemon(side, species, name, level, shiny) {
    if (side == "you") {
        $('#command-message').html("What will<br>" + name + " do?");
    }
    $('#pokemon-name-' + side).html((shiny ? "<span class='shiny' data-toggle='tooltip' title='Shiny!'>" : "") + name + (shiny ? "</span>" : ""));
    $('[data-toggle="tooltip"]').tooltip();
    $('#lvl-' + side).html(level);
    var imageUrl = `https://play.pokemonshowdown.com/sprites/gen5ani${side == "you" ? "-back" : ""}${shiny ? "-shiny" : ""}/${species}.gif`;
    $("#pokemon-" + side).attr("src", imageUrl); // Set the image source URL
}

function clearPokemon(side) {
    $("#pokemon-" + side).attr("src", "");
    $('#pokemon-name-' + side).html("");
    $('#lvl-' + side).html("");
    $("#hpbar-" + side).css("transition-duration", "0s");
    $("#hpbar-" + side).width(96);
    $("#hpbar-" + side).css("transition-duration", "0.666s");
}

function cancelFight() {
    $("#overlay-fight").hide();
    $('#overlay').show();
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

