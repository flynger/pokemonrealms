var Moves; // moves json fetched on setup

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
    $("#overlay-switch").hide();
}

function useItem(item) {
    socket.emit("itemInput", item);
    $("overlay-switch").hide();
}

// function useItem(item) {
//     socket.emit("useItem", item);
//     $("overlay-switch").hide();
// }

var battleOptions;
var isBattleActive = false;
var battleData = [];
var textSpeed = 100; // 60
var textInterval;
var dialoguePlaying = false;
var waitMessage;
function nextAction() {
    if (!dialoguePlaying) {
        $("#overlay-command").hide();
        $("#overlay-fight").hide();
        $("#overlay-message").show();
        dialoguePlaying = true;
    }
    clearInterval(textInterval);
    var nextData = battleData.shift();

    if (nextData.switchOut) {
        let side = nextData.side;
        $(`#info-${side}`).hide();
        $(`#pokemon-${side}`).hide();
        $(`#pokemon-${side}`).attr("src", "");
    }
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
        $("#hpbar-" + nextData.side).width((+hpValues[0] !== 0 ? +hpValues[0] / +hpValues[1] : 0) * 96);

        showPokemon(side, species, nickname, level, shiny);
        $(`#pokemon-${nextData.side}`).show();
        $(`#info-${nextData.side}`).show();
    }
    var letters = processFormatting(nextData.message, nextData.message.split(""));
    if ("damageHPTo" in nextData) {
        $("#hpbar-" + nextData.side).width(nextData.damageHPTo / 100 * 96);
        setTimeout(() => {
            if (nextData.message != " ") textInterval = createTextInterval(nextData, letters)
            else nextActionLogic(nextData);
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
            setTimeout(nextActionLogic, 800, nextData);
        }
    }, 1000 / textSpeed);
}

function nextActionLogic(nextData) {
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
            if (battleOptions.forceSwitch) {
                showSwitchButtons();
            }
            else {
                $("#overlay-command").show();
            }
            // $("#overlay-fight").show();
        }
        $('#dialogue').html(waitMessage);
        dialoguePlaying = false;
    }
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
    // console.log(letters);
    return letters;
}

function showPokemon(side, species, name, level, shiny) {
    var imageUrl = `https://play.pokemonshowdown.com/sprites/gen5ani${side == "you" ? "-back" : ""}${shiny ? "-shiny" : ""}/${species}.gif`;
    $("#pokemon-" + side).attr("src", imageUrl); // Set the image source URL
    if (side == "you") {
        $('#command-message').html("What will<br>" + name + " do?");
    }
    $('#pokemon-name-' + side).html((shiny ? "<span class='shiny' data-toggle='tooltip' title='Shiny!'>" : "") + name + (shiny ? "</span>" : ""));
    $('[data-toggle="tooltip"]').tooltip();
    $('#lvl-text-' + side).html(level);
}

function clearPokemon(side) {
    $("#pokemon-" + side).attr("src", "");
    $('#pokemon-name-' + side).html("");
    $('#lvl-text-' + side).html("");
    $("#hpbar-" + side).css("transition-duration", "0s");
    $("#hpbar-" + side).width(96);
    $("#hpbar-" + side).css("transition-duration", "0.666s");
}

function initBag() {
    var selectedCategory = "All";
    var itemCategories = ["Poké Balls", "Medicine", "Berries", "Items"];
    for (let category of itemCategories) {
        $("#bagHeader").append(`<div class="bag-tab"><span class="bag-tab-text">${category}</span></div>`);
    }
    $(".bag-tab").on("click", function () {
        if (!$(this).hasClass("selected")) {
            $(".bag-tab").removeClass("selected");
            $(this).addClass("selected")
            selectedCategory = $(this).text();
            filterInvAndGenerate();
        }
    });
}

function showBag() {
    $("#overlay-bag").show();
    $('#overlay-command').hide();
}

function cancelBag() {
    $("#overlay-bag").hide();
    $('#overlay-command').show();
}

function cancelFight() {
    $("#overlay-fight").hide();
    $('#overlay-command').show();
}

function cancelSwitch() {
    $("#overlay-switch").hide();
    $('#overlay-command').show();
}

function showSwitchButtons() {
    let party = battleOptions.side.pokemon;

    // Generate switch UI HTML
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
    socket.emit("endBattle");
    $("#overlay-command").hide();
    $("#overlay-fight").hide();
}

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

