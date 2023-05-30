var dragSrcEl;
function initPartyUI() {
    $('.party-mon-div').on('dragstart', function (e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;
        e.originalEvent.dataTransfer.effectAllowed = 'move';
        e.originalEvent.dataTransfer.dropEffect = 'move';
    });
    $('.party-mon-div').on('dragover', function (e) {
        e.preventDefault();
        return false;
    });
    // $('.party-mon-div').on('dragenter', function (e) {
    //     this.classList.add("party-drag-over");
    // });
    // $('.party-mon-div').on('dragleave', function (e) {
    //     this.classList.remove("party-drag-over");
    // });
    $('.party-mon-div').on('dragend', function (e) {
        this.style.opacity = '1';
        return false;
    });
    $('.party-mon-div').on('drop', function (e) {
        e.stopPropagation();

        if (dragSrcEl !== this) {
            swapPartySlots(dragSrcEl.attributes[1].value[17], this.attributes[1].value[17]); // the character at the 17th index of the onclick string
        }
        return false;
    });
}

function updatePartyMembers() {
    for (let i = 0; i < 6; i++) {
        let num = i + 1;
        if (!party[i]) {
            $("#party-icon-" + num).parent().hide();
            $("#party-name-" + num).parent().hide();
        } else {
            let pokemon = party[i];
            let entry = Pokedex.getPokedexEntry(pokemon.species);
            $("#party-icon-" + num).parent().show();
            $("#party-name-" + num).parent().show();
            $("#party-icon-" + num).attr("src", `res/pokemon/icons/${entry.id}.png`)
            // $("#party-hp-" + num)
            $("#party-name-" + num).attr("class", `party-mon-name${pokemon.shiny ? " shiny" : ""}`);
            $("#party-name-" + num).html(pokemon.name ? pokemon.name : entry.name);
            $("#party-level-" + num).html(`Lv. ${pokemon.level}`)
        }
    }
}