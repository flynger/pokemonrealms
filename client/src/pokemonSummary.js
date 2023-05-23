function initSummaryUI() {
  $("#summaryBtn").on("click", () => {
    $("#pokemon-summary").toggle();
  });
  $("#pokemon-summary").draggable({
    handle: "#pokemon-summary-header",
    containment: "parent"
  });
  $('[data-toggle="tooltip"]').attr("data-bs-delay", '{"show":"500", "hide":"200"}');
  $('[data-toggle="tooltip"]').tooltip();
  // dragElement(document.getElementById("pokemon-summary"));
  // Initialize the move list as sortable
  // $("#move-list").sortable({
  //     axis: "y",
  //     containment: $("#pokemon-summary"),
  //     cursor: "grabbing",
  //     stop: function (event, ui) {
  //         ui.item.removeAttr("style");
  //     },
  //     update: function (event, ui) {
  //         // Update the move order in the backend
  //         //updateMoveOrder();
  //     }
  // });
}

// Function to update the move order in the backend
function updateMoveOrder() {
  var moveOrder = [];
  $(".move-item").each(function () {
    moveOrder.push($(this).data("move-id"));
  });

  // Send the move order to the backend using AJAX
  $.ajax({
    type: "POST",
    url: "update_move_order.php",
    data: {
      move_order: moveOrder
    },
    success: function (response) {
      // Handle the response from the backend
    }
  });
}

function createSummaryUI(pokemon) {
  let entry = Pokedex.getPokedexEntry(pokemon.species);
  let moveEntries = pokemon.moves.map((move) => Moves[move]);
  let abilityEntry = Abilities[entry.abilities[pokemon.abilitySlot]];
  let natureEntry = Natures[pokemon.nature];
  $('#game').append(`<div id="pokemon-summary" class="pokemon-summary bg-dark text-white d-block">
      <div id="pokemon-summary-header">
        Pokémon Summary
      </div>
      <div id="stats-body">
        <div id="stats-body-left">
          <div id="stats-name-card">
            <div id="stats-sprite-container">
              <img id="stats-sprite" src="https://play.pokemonshowdown.com/sprites/gen5ani${pokemon.shiny ? "-shiny" : ""}/${pokemon.species.toLowerCase()}.gif" />
            </div>
            <div id="stats-name-tag"><img id="stats-caught-ball" src="res/items/${pokemon.caughtBall}.png" />&nbsp;<span${pokemon.shiny ? ` class="shiny"` : ""}>${pokemon.name ? pokemon.name : entry.name}</span><span
                class="${pokemon.gender == "N" ? "" : pokemon.gender == "M" ? "blue" : "red"}"> ${pokemon.gender == "N" ? "" : pokemon.gender == "M" ? " ♂" : " ♀"}</span> Lv. ${pokemon.level}</div>
          </div>
          <div class="stats-field">
            <div class="stats-label">EXP</div>
            <div class="stats-data"><span data-toggle="tooltip" title="EXP gained">${pokemon.xp}</span>${pokemon.level < 100 ? ` / <span data-toggle="tooltip" title="EXP required to level up">${GrowthRates[entry.growthRate][pokemon.level + 1]}</span>` : ""}</div>
          </div>
          <div class="stats-field">
            <div class="stats-label">Held Item</div>
            <div class="stats-data">${pokemon.heldItem || "None"}</div>
          </div>
          <div id="move1-div" class="stats-field">
            <div class="stats-data-full d-flex">
              <div class="stats-move-name">
                ${moveEntries[0] ? `<span data-toggle="tooltip" title="${getMoveDescription(moveEntries[0])}">${moveEntries[0].name}</span>` : "-"}
              </div>
              <div class="stats-move-type-div">
                ${moveEntries[0] ? `<div class="stats-move-type type ${moveEntries[0].type.toLowerCase()}"></div>` : ""}
              </div>
            </div>
          </div>
          <div id="move2-div" class="stats-field">
            <div class="stats-data-full d-flex">
              <div class="stats-move-name">
                ${moveEntries[1] ? `<span data-toggle="tooltip" title="${getMoveDescription(moveEntries[1])}">${moveEntries[1].name}</span>` : "-"}
              </div>
              <div class="stats-move-type-div">
                ${moveEntries[1] ? `<div class="stats-move-type type ${moveEntries[1].type.toLowerCase()}"></div>` : ""}
              </div>
            </div>
          </div>
          <div id="move3-div" class="stats-field">
            <div class="stats-data-full d-flex">
              <div class="stats-move-name">
                ${moveEntries[2] ? `<span data-toggle="tooltip" title="${getMoveDescription(moveEntries[2])}">${moveEntries[2].name}</span>` : "-"}
              </div>
              <div class="stats-move-type-div">
                ${moveEntries[2] ? `<div class="stats-move-type type ${moveEntries[2].type.toLowerCase()}"></div>` : ""}
              </div>
            </div>
          </div>
          <div id="move4-div" class="stats-field">
            <div class="stats-data-full d-flex">
              <div class="stats-move-name">
                ${moveEntries[3] ? `<span data-toggle="tooltip" title="${getMoveDescription(moveEntries[3])}">${moveEntries[3].name}</span>` : "-"}
              </div>
              <div class="stats-move-type-div">
                ${moveEntries[3] ? `<div class="stats-move-type type ${moveEntries[3].type.toLowerCase()}"></div>` : ""}
              </div>
            </div>
          </div>
        </div>
        <div id="stats-body-right">
          <div class="stats-field">
            <div class="stats-label">Pokédex</div>
            <div class="stats-data">${entry.id}</div>
          </div>
          <div class="stats-field">
            <div class="stats-label">Species</div>
            <div class="stats-data">${entry.name}</div>
          </div>
          <div class="stats-field">
            <div class="stats-label">Type</div>
            <div class="stats-type-data">
              ${entry.types.length == 2 ? `<span class="stats-type1 type ${entry.types[0].toLowerCase()}"></span>` : ""}
              <span class="stats-type2 type ${entry.types.length == 1 ? entry.types[0].toLowerCase() : entry.types[1].toLowerCase()}"></span>
            </div>
          </div>
          <div class="stats-field">
            <div class="stats-label" data-toggle="tooltip"
              title="Abilities are special attributes given to each Pokémon that can aid them in battle.">
              Ability</div>
            <div class="stats-data">
              <span data-toggle="tooltip" title="${abilityEntry.desc}">${abilityEntry.name}</span>
            </div>
          </div>
          <div class="stats-field">
            <div class="stats-label" data-toggle="tooltip"
              title="Affects the growth of a Pokémon, increasing one of a Pokémon's stats by 10% while decreasing another by 10%. However, some natures have no effect.">
              Nature</div>
            <div class="stats-data"><span data-toggle="tooltip" title="${natureEntry.plus ? `+10% ${Stats[natureEntry.plus]}, -10% ${Stats[natureEntry.minus]}` : "No additional effect."}">${natureEntry.name}</span></div>
          </div>
          <div class="stats-field">
            <div id="stats-happiness" class="stats-label" data-toggle="tooltip"
              title="Affects the evolution of certain Pokémon and the power of certain moves.">Happiness</div>
            <div class="stats-data">${pokemon.happiness} / 255</div>
          </div>
          <div class="stats-field">
            <div class="stats-label" data-toggle="tooltip"
              title="The player who first encountered this Pokémon.">OT</div>
            <div class="stats-data">${pokemon.originalTrainer}</div>
          </div>
          <div class="stats-field">
            <div class="stats-label" data-toggle="tooltip"
              title="The player who currently possesses this Pokémon.">Owner</div>
            <div class="stats-data">${pokemon.owner}</div>
          </div>
          <div id="stats-stat-labels">
            <div id="stats-stat-label" data-toggle="tooltip"
              title="The actual stat value a Pokémon uses in battle. Depends on a Pokémon's base stats, level, IVs, EVs, and nature.">
              Stat</div>
            <div id="stats-iv-label" data-toggle="tooltip"
              title="Individual Values are fixed, randomly generated values from 0 to 31. They contribute to the final stat value of a Pokémon.">
              IV</div>
            <div id="stats-ev-label" data-toggle="tooltip"
              title="Effort Values are usually obtained from defeating Pokémon in battle. They contribute to the final stat value of a Pokémon.">
              EV</div>
          </div>
          <div class="stats-field">
            <div class="stats-label">HP</div>
            <div class="stats-data-flex">
              <div id="stats-hp-stat" class="stats-data-flex-child-l">${pokemon.currenthp} / ${pokemon.stats.hp}</div>
              <div class="stats-data-flex-child-s stats-iv" data-toggle="tooltip" title="${getIVDescription(pokemon.ivs.hp)}">${pokemon.ivs.hp}</div>
              <div class="stats-data-flex-child-s stats-ev">${pokemon.evs.hp}</div>
            </div>
          </div>
          <div class="stats-field">
            <div class="stats-label">Attack</div>
            <div class="stats-data-flex">
              <div class="stats-data-flex-child-l">${pokemon.stats.atk}</div>
              <div class="stats-data-flex-child-s stats-iv" data-toggle="tooltip" title="${getIVDescription(pokemon.ivs.atk)}">${pokemon.ivs.atk}</div>
              <div class="stats-data-flex-child-s stats-ev">${pokemon.evs.atk}</div>
            </div>
          </div>
          <div class="stats-field">
            <div class="stats-label">Defense</div>
            <div class="stats-data-flex">
              <div class="stats-data-flex-child-l">${pokemon.stats.def}</div>
              <div class="stats-data-flex-child-s stats-iv" data-toggle="tooltip" title="${getIVDescription(pokemon.ivs.def)}">${pokemon.ivs.def}</div>
              <div class="stats-data-flex-child-s stats-ev">${pokemon.evs.def}</div>
            </div>
          </div>
          <div class="stats-field">
            <div class="stats-label">Sp.
              Atk</div>
            <div class="stats-data-flex">
              <div class="stats-data-flex-child-l">${pokemon.stats.spa}</div>
              <div class="stats-data-flex-child-s stats-iv" data-toggle="tooltip" title="${getIVDescription(pokemon.ivs.spa)}">${pokemon.ivs.spa}</div>
              <div class="stats-data-flex-child-s stats-ev">${pokemon.evs.spa}</div>
            </div>
          </div>
          <div class="stats-field">
            <div class="stats-label">Sp. Def</div>
            <div class="stats-data-flex">
              <div class="stats-data-flex-child-l">${pokemon.stats.spd}</div>
              <div class="stats-data-flex-child-s stats-iv" data-toggle="tooltip" title="${getIVDescription(pokemon.ivs.spd)}">${pokemon.ivs.spd}</div>
              <div class="stats-data-flex-child-s stats-ev">${pokemon.evs.spd}</div>
            </div>
          </div>
          <div class="stats-field">
            <div class="stats-label">Speed</div>
            <div class="stats-data-flex">
              <div class="stats-data-flex-child-l">${pokemon.stats.spe}</div>
              <div class="stats-data-flex-child-s stats-iv" data-toggle="tooltip" title="${getIVDescription(pokemon.ivs.spe)}">${pokemon.ivs.spe}</div>
              <div class="stats-data-flex-child-s stats-ev">${pokemon.evs.spe}</div>
            </div>
          </div>
        </div>
      </div>
    </div>`);
  refreshTooltips();
  $(".pokemon-summary").draggable({
    handle: "#pokemon-summary-header",
    containment: "parent"
  });
}

function getIVDescription(value) {
  if (value <= 14) return "No good";
  else if (value < 20) return "Meh";
  else if (value <= 24) return "Decent";
  else if (value <= 27) return "Pretty good";
  else if (value <= 29) return "Really good";
  else if (value == 30) return "Fantastic";
  else return "Best";
}

function getMoveDescription(moveEntry) {
  let description = "";
  description += `Power: ${moveEntry.basePower ? moveEntry.basePower : "—"}`
  description += `<br>Accuracy: ${moveEntry.accuracy === true ? "—" : moveEntry.accuracy}`
  description += `<br>Category: ${moveEntry.category}`
  description += `<br>Description: ${moveEntry.desc}`;
  return description;
}

function refreshTooltips() {
  $('[data-toggle="tooltip"]').attr("data-bs-delay", '{"show":"500", "hide":"200"}');
  $('[data-toggle="tooltip"]').tooltip({ html: true });
}