/*
Alex G, flynger, Richard W, Harry

This file implements client-sided battle functionality 
*/
class battle {
    // Variables for battle info
    static isBattleActive = false;
    static battleOptions = null;
    static battleData = [];
    static nextData = null;
    static currentMaxHp;

     // Variables for text info
     static textSpeed = 100; // 60
     static textInterval;
     static waitMessage;
     static dialoguePlaying = false;
     static letters = [];
     
    // Setup UI for battle
    static setup() {
        initBag();
        $("#overlay-bag").hide();
        $("#overlay-switch").hide();
        $("#overlay-command").hide();
        $("#overlay-fight").hide();
        $("#overlay-switch").hide();
        $("#info-you").hide();
        $("#info-foe").hide();
        $("#overlay-message").show();
    }

    // Recieves data from the server and interprets it
    static nextAction() {
        if (!this.dialoguePlaying) {
            $("#overlay-command").hide();
            $("#overlay-fight").hide();
            $("#overlay-message").show();
            this.dialoguePlaying = true;
        }
        clearInterval(this.textInterval);
        this.nextData = this.battleData.shift();

        // When a pokemon switches out
        if (this.nextData.switchOut) {
            this.switchOut();
        }
        // When a pokemon switches in
        if (this.nextData.switchIn) {
            this.switchIn();
        }

        this.processFormatting();
        
        // updates status effect of pokemon
        if ("statusEffect" in this.nextData) {
            $(`#status-effect-${this.nextData.side}`).addClass(this.nextData.statusEffect);
        }
        // updates Hp Bar
        if ("damageHPTo" in this.nextData) {
            this.updateHpBar();
        }
        else this.createTextInterval();
    }

    // When a pokemon switches out
    static switchOut() {
        let side = this.nextData.side;
        $(`#info-${side}`).hide();
        $(`#pokemon-${side}`).hide();
        $(`#pokemon-${side}`).attr("src", "");
    }

    // When a pokemon switches in
    static switchIn() {
        let pokemonData = this.nextData.switchIn.split(', ');
        let side = this.nextData.side;
        let nickname = this.nextData.nickname;
        let species = Pokedex.getPokedexEntry(pokemonData[0]).species.toLowerCase();
        let level = !pokemonData[1].startsWith("L") ? "100" : pokemonData[1].slice(1);
        let gender = pokemonData[2];
        let shiny = pokemonData[pokemonData.length - 1] === "shiny";
        // console.log(species, level, gender, shiny)

        let hpValues = this.nextData.switchInCondition.split('/');
        hpValues[1] = hpValues[1].split(" ")[0];
        $("#hpbar-" + this.nextData.side).width((+hpValues[0] !== 0 ? +hpValues[0] / +hpValues[1] : 0) * 96);
        if (this.nextData.side === "you") {
            this.currentMaxHp = +hpValues[1];
        }

        let statusEffect = this.nextData.switchInCondition.split(' ')[1];
        if (statusEffect) {
            $(`#status-effect-${side}`).addClass(statusEffect);
        }
        else {
            $(`#status-effect-${side}`).attr("class", "status-effect");
        }

        this.showPokemon(side, species, nickname, level, shiny);
        $(`#info-${this.nextData.side}`).show();
    }

    // updates Hp Bar
    static updateHpBar() {
        $("#hpbar-" + this.nextData.side).width(this.nextData.damageHPTo / 100 * 96);
        $("#pokemon-" + this.nextData.side).addClass('flash');
        setTimeout(() => {
            $("#pokemon-" + this.nextData.side).removeClass('flash');
        }, 600);
        setTimeout(() => {
            if (this.nextData.message !== " ") this.createTextInterval();
            else this.nextActionLogic();
        }, 666);
    }

    // Creates the text in battle
    static createTextInterval() {
        $('#dialogue').html("");
        var index = 0;
        this.textInterval = setInterval(() => {
            $('#dialogue').html($('#dialogue').html() + this.letters[index++]);
            if (index >= this.letters.length) {
                clearInterval(this.textInterval);
                setTimeout(() => {
                    this.nextActionLogic()
                }, 800);
            }
        }, 1000 / this.textSpeed);
    }

    //skips the text printing animation
    // skipText() {
    //     clearInterval(this.textInterval);
    //     $('#dialogue'.html(this.nextData.message));
    // }

    // Changes UI for forceswitches, battle end, and when dialogue ends
    static nextActionLogic() {
        if (this.battleData.length > 0) {
            // Either nextAction called when text is not present
            this.nextAction();
        } else {
            if (this.nextData.battleOver) {
                $('#battle-UI').hide();
                players[client.username].busy = false;
                this.isBattleActive = false;
                app.view.style.filter = "none";
                this.clearPokemon("you");
                this.clearPokemon("foe");
                $("#party-div").show();
            } else {
                if (this.battleOptions.forceSwitch) {
                    this.showSwitchButtons();
                } else if (!this.battleOptions.wait) {
                    $("#overlay-command").show();
                }
                // $("#overlay-fight").show();
            }
            $('#dialogue').html(this.waitMessage);
            this.dialoguePlaying = false;
        }
    }

    // Processes dialogue messages in battle (removes **)
    static processFormatting() {
        let message = this.nextData.message;
        let letters = this.nextData.message.split("");
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
        this.letters = letters;
    }

    // Updates the pokemon info and sprites when pokemon switch in
    static showPokemon(side, species, name, level, shiny) {
        var imageUrl = `res/pokemon/showdown_sprites/${side === "you" ? "back" : "front"}/${shiny ? "shiny/" : ""}${species}.gif`; //`https://play.pokemonshowdown.com/sprites/gen5ani${side === "you" ? "-back" : ""}${shiny ? "-shiny" : ""}/${species}.gif`;
        $("#pokemon-" + side).attr("src", imageUrl); // Set the image source URL
        if (side === "you") {
            $('#command-message').html("What will<br>" + name + " do?");
        }
        $('#pokemon-name-' + side).html((shiny ? "<span class='shiny' data-toggle='tooltip' title='Shiny!'>" : "") + name + (shiny ? "</span>" : ""));
        $('[data-toggle="tooltip"]').tooltip();
        $('#lvl-text-' + side).html(level);
        $(`#pokemon-${this.nextData.side}`).show();
    }

    static playThrowAnimation() {
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

    // Updates the pokemon info and sprites when pokemon switch out
    static clearPokemon(side) {
        $("#pokemon-" + side).attr("src", "");
        $('#pokemon-name-' + side).html("");
        $('#lvl-text-' + side).html("");
        $("#hpbar-" + side).css("transition-duration", "0s");
        $("#hpbar-" + side).width(96);
        $("#hpbar-" + side).css("transition-duration", "0.666s");
    }

    // Updates the current pokemon's move options
    static updateMoveChoices() {
        for (let moveNum = 1; moveNum <= 4; moveNum++) {
            if (this.battleOptions.active && this.battleOptions.active[0].moves.length >= moveNum) {
                let moveData = this.battleOptions.active[0].moves[moveNum - 1];
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

    static showFightButtons() {
        $("#overlay-fight").show();
        $('#overlay-command').hide();
    }

    static useMove(num) {
        client.socket.emit("moveInput", num);
        $("#overlay-fight").hide();
        $("#overlay-message").show();
    }

    static cancelFight() {
        $("#overlay-fight").hide();
        $('#overlay-command').show();
    }

    // Generates updated information and UI for switch action
    static showSwitchButtons() {
        let party = this.battleOptions.side.pokemon;

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
                $(pkmn).attr("onclick", `battle.switchTo(${+i + 1})`)
            } else {
                $(pkmn).attr("onclick", "")
            };
            $(pkmn).show()
        }
        if (!this.battleOptions.forceSwitch) {
            $('#switch-cancel').show();
        }
        else {
            $('#switch-cancel').hide();
        }

        // Add switch UI HTML to the container element
        $("#overlay-switch").show();
        $('#overlay-command').hide();
    }

    static switchTo(slot) {
        client.socket.emit("switchInput", slot);
        $("#overlay-switch").hide();
    }

    static cancelSwitch() {
        $("#overlay-switch").hide();
        $('#overlay-command').show();
    }

    static useItem(id) {
        client.socket.emit("itemInput", id);
        $("overlay-switch").hide();
    }

    static runFromBattle() {
        client.socket.emit("endBattle");
        $("#overlay-command").hide();
        $("#overlay-fight").hide();
    }
}