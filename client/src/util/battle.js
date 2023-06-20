/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements client-sided battle functionality 
*/
var Moves; // moves json fetched on setup

// Setup UI for battle
$(function () {
    // $('#battle-UI').show();
    initBag();
    $("#overlay-bag").hide();
    $("#overlay-switch").hide();
    $("#overlay-command").hide();
    $("#overlay-fight").hide();
    $("#overlay-switch").hide();
    $("#info-you").hide();
    $("#info-foe").hide();
    $("#overlay-message").show();
    $('#battle-UI').hide();
    // $('#battle-UI').show();
    // $('#battle-UI').show(() => {
    //     $('#battle-UI').hide();
    // });
});

function showFightButtons() {
    $("#overlay-fight").show();
    $('#overlay-command').hide();
}

function useMove(num) {
    client.socket.emit("moveInput", num);
    $("#overlay-fight").hide();
    $("#overlay-message").show();
}

function switchTo(slot) {
    client.socket.emit("switchInput", slot);
    $("#overlay-switch").hide();
}

function useItem(item) {
    client.socket.emit("itemInput", item);
    $("overlay-switch").hide();
}


// function useItem(item) {
//     socket.emit("useItem", item);
//     $("overlay-switch").hide();
// }

// Recieves data from the server and interprets it
var battleOptions;
var isBattleActive = false;
var battleData = [];
var textSpeed = 100; // 60
var textInterval;
var dialoguePlaying = false;
var waitMessage;
var nextData;
var currentMaxHp;
function nextAction() {
    if (!dialoguePlaying) {
        $("#overlay-command").hide();
        $("#overlay-fight").hide();
        $("#overlay-message").show();
        dialoguePlaying = true;
    }
    clearInterval(textInterval);
    nextData = battleData.shift();

    // When a pokemon switches out
    if (nextData.switchOut) {
        let side = nextData.side;
        $(`#info-${side}`).hide();
        $(`#pokemon-${side}`).hide();
        $(`#pokemon-${side}`).attr("src", "");
    }

    // When a pokemon switches in
    if (nextData.switchIn) {
        let pokemonData = nextData.switchIn.split(', ');
        let side = nextData.side;
        let nickname = nextData.nickname;
        let species = Pokedex.getPokedexEntry(pokemonData[0]).species.toLowerCase();
        let level = !pokemonData[1].startsWith("L") ? "100" : pokemonData[1].slice(1);
        let gender = pokemonData[2];
        let shiny = pokemonData[pokemonData.length - 1] == "shiny";
        console.log(species, level, gender, shiny)

        let hpValues = nextData.switchInCondition.split('/');
        hpValues[1] = hpValues[1].split(" ")[0];
        $("#hpbar-" + nextData.side).width((+hpValues[0] !== 0 ? +hpValues[0] / +hpValues[1] : 0) * 96);
        currentMaxHp = +hpValues[1];

        showPokemon(side, species, nickname, level, shiny);
        $(`#pokemon-${nextData.side}`).show();
        $(`#info-${nextData.side}`).show();
    }
    var letters = processFormatting(nextData.message, nextData.message.split(""));

    // updates Hp Bar
    if ("damageHPTo" in nextData) {
        $("#hpbar-" + nextData.side).width(nextData.damageHPTo / 100 * 96);
        $("#pokemon-" + nextData.side).addClass('flash');
        setTimeout(() => {
            $("#pokemon-" + nextData.side).removeClass('flash');
        }, 600);
        setTimeout(() => {
            if (nextData.message != " ") textInterval = createTextInterval(nextData, letters)
            else nextActionLogic(nextData);
        }, 666);
    }
    else textInterval = createTextInterval(nextData, letters);
}


// Creates the text in battle
function createTextInterval(nextData, letters) {
    $('#dialogue').html("");
    var index = 0;
    return setInterval(function () {
        $('#dialogue').html($('#dialogue').html() + letters[index++]);
        if (index >= letters.length) {
            clearInterval(textInterval);
            setTimeout(nextActionLogic, 800, nextData);
        }
    }, 1000 / textSpeed);
}

//skips the text printing animation
// function skipText() {
//     clearInterval(textInterval);
//     $('#dialogue'.html(nextData.message));
// }

// Changes UI for forceswitches, battle end, and when dialogue ends
function nextActionLogic(nextData) {
    if (battleData.length > 0) {
        // Either nextAction called when text is not present
        nextAction();
    } else {
        if (nextData.battleOver) {
            $('#battle-UI').hide();
            client.player.busy = false;
            isBattleActive = false;
            app.view.style.filter = "none";
            clearPokemon("you");
            clearPokemon("foe");
            $("#party-div").show();
        } else {
            if (battleOptions.forceSwitch) {
                showSwitchButtons();
            } else if (!battleOptions.wait) {
                $("#overlay-command").show();
            }
            // $("#overlay-fight").show();
        }
        $('#dialogue').html(waitMessage);
        dialoguePlaying = false;
    }
}

// Processes dialogue messages in battle
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
    // console.log(letters);
    return letters;
}

// Updates the pokemon info and sprites when pokemon switch in
function showPokemon(side, species, name, level, shiny) {
    var imageUrl = `res/pokemon/showdown_sprites/${side == "you" ? "back" : "front"}/${shiny ? "shiny/" : ""}${species}.gif`; //`https://play.pokemonshowdown.com/sprites/gen5ani${side == "you" ? "-back" : ""}${shiny ? "-shiny" : ""}/${species}.gif`;
    $("#pokemon-" + side).attr("src", imageUrl); // Set the image source URL
    if (side == "you") {
        $('#command-message').html("What will<br>" + name + " do?");
    }
    $('#pokemon-name-' + side).html((shiny ? "<span class='shiny' data-toggle='tooltip' title='Shiny!'>" : "") + name + (shiny ? "</span>" : ""));
    $('[data-toggle="tooltip"]').tooltip();
    $('#lvl-text-' + side).html(level);
}

// Updates the pokemon info and sprites when pokemon switch out
function clearPokemon(side) {
    $("#pokemon-" + side).attr("src", "");
    $('#pokemon-name-' + side).html("");
    $('#lvl-text-' + side).html("");
    $("#hpbar-" + side).css("transition-duration", "0s");
    $("#hpbar-" + side).width(96);
    $("#hpbar-" + side).css("transition-duration", "0.666s");
}

// Creates UI and event listeners for each tab of the bag


function cancelFight() {
    $("#overlay-fight").hide();
    $('#overlay-command').show();
}

function cancelSwitch() {
    $("#overlay-switch").hide();
    $('#overlay-command').show();
}

// Generates updated information and UI for switch action
function showSwitchButtons() {
    let party = battleOptions.side.pokemon;

    // Gets information of pokemon and generate switch UI HTML
    for (let i = 0; i < 6; i++) {
        let pkmn = `#pkmn${+i + 1}`;
        if (!party[i]) { $(pkmn).hide(); continue }
        let pkmnNickname = party[i].ident.split(": ")[1];
        let pkmnDetails = party[i].details.split(", ");
        let pkdexId = Pokedex.getPokedexEntry(pkmnDetails[0]).id;
        let lv = !pkmnDetails[1].startsWith("L") ? "100" : pkmnDetails[1].slice(1);
        let hpValues = party[i].condition.split(" ")[0].split("/");
        let isFainted = +hpValues[0] === 0;
        let hpPercent = !isFainted ? +hpValues[0] / +hpValues[1] : 0;
        let hpOutline = hpPercent > 0.5 ? "g" : hpPercent > 0.2 ? "y" : "r";

        $(pkmn).attr("class", "switch-button text-white");
        $(pkmn).addClass(!isFainted ? "pkmn-alive" : "pkmn-fainted");
        $(`${pkmn}-img`).attr("src", `res/pokemon/icons/${pkdexId}.png`);
        $(`${pkmn}-info`).html(`<span class="${pkmnDetails[pkmnDetails.length - 1] === "shiny" ? "shiny" : ""}">${pkmnNickname}</span> Lv. ${lv}`);
        $(`${pkmn}-hpbar`).width(hpPercent * 96);
        $(`${pkmn}-switch-hpbar-outline`).attr("class", `switch-hpbar-outline ${hpOutline}`);
        $(`${pkmn}-hpbar`).attr("class", `hp small ${hpOutline}`);
        if (!isFainted && i !== 0) {
            $(pkmn).attr("onclick", `switchTo(${+i + 1})`)
        } else {
            $(pkmn).attr("onclick", "")
        };
        $(pkmn).show()
    }
    if (!battleOptions.forceSwitch) {
        $('#switch-cancel').show();
    }
    else {
        $('#switch-cancel').hide();
    }

    // Add switch UI HTML to the container element
    $("#overlay-switch").show();
    $('#overlay-command').hide();
}

function runFromBattle() {
    client.socket.emit("endBattle");
    $("#overlay-command").hide();
    $("#overlay-fight").hide();
}

// Updates the current pokemon's move options
function updateMoveChoices() {
    for (let moveNum = 1; moveNum <= 4; moveNum++) {
        if (battleOptions.active && battleOptions.active[0].moves.length >= moveNum) {
            let moveData = battleOptions.active[0].moves[moveNum - 1];
            let moveType = Moves[moveData.id.toUpperCase()].type.toLowerCase();
            $("#move" + moveNum).show();
            $("#move" + moveNum).removeClass();
            $("#move" + moveNum).addClass(moveType);
            $("#move" + moveNum).html(`<span class="movename">${moveData.move}</span><span class="movetype type ${moveType}"></span><span class="movepp">${moveData.pp ? `PP ${moveData.pp}/${moveData.maxpp}` : ""}</span>`);
            // console.log($(".move1").addClass("water"));
        } else {
            $("#move" + moveNum).hide();
        }
    }
}

function playThrowAnimation() {
    $("#ball-image-container").addClass('throw-fall');
    $("#ball-image").addClass('throw-x');

    setTimeout(() => {
        $("#ball-image-container").removeClass('throw-fall');
        $("#ball-image").removeClass('throw-x');
        $("#ball-image-container").css("bottom", "64%");
        $("#ball-image-container").css("left", "79%");

        setInterval(() => {
            $("#ball-image").addClass('shake');
            setTimeout(() => {
                $("#ball-image").removeClass('shake');
            }, 300);
        }, 800);
    }, 2200);
}