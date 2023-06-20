/*
Alex G, flynger, Richard W, Harry

This file implements inventory functionality 
*/
var inventory;
var inventoryArray;
var selectedCategory = "All";
var itemCategories = ["Poké Balls", "Medicine", "Berries", "Items"];
function initInventoryUI() {
  // add click event listener to the inventory btton to toggle the UI
  console.log("initializing inventoryUI");
  // creates UI and event listeners for inventory
  for (let category of itemCategories) {
    $("#inventoryHeader").append(`<div class="inventory-tab"><span class="inventory-tab-text">${category}</span></div>`);
  }
  $("#inventoryHeader").append('<button id="inventory-close" type="button" class="btn-close btn-close-white" aria-label="Close" style="position: absolute; right: 1.5%"></button>');
  $(".inventory-tab").on("click", function () {
    if (!$(this).hasClass("selected")) {
      $(".inventory-tab").removeClass("selected");
      $(this).addClass("selected")
      selectedCategory = $(this).text();
      filterInvAndGenerate();
    }
  });
  $("#inventoryBtn").on("click", function () {
    $("#inventory-UI").toggle();
  });
  $("#inventory-close").on("click", function () {
    $("#inventory-UI").hide();
  });
  $(document.body).on('click', () => {
    $('#item-context-menu').hide();
  });
  $("#inventory-UI").draggable({
    handle: ".card-header",
    containment: "parent"
  });
  $(".popup-container").draggable({
    handle: ".popup-header",
    containment: "parent"
  });
  $("#discard-input").on("change keyup", limitDiscardAmount);
  // $("#inventory-UI").resizable({
  //   minWidth: 200,
  //   minHeight: 200,
  //   containment: "parent"
  // });
  $("#trade-UI").draggable({
    handle: "#trade-header",
    containment: "parent"
  });


  // // dummy data
  // var inventoryItems = [
  //   { name: "Potion", quantity: 10 },
  //   { name: "Revive", quantity: 2 },
  //   { name: "PokeBall", quantity: 5 },
  //   { name: "Master Ball", quantity: 99 }
  // ];

  // var $inventoryItems = $("#inventoryItems");
  // console.log("preparing to add items");

  // $.each(inventoryItems, function (index, item) {
  //   addItem(item.name, item.quantity);
  // });
}

// Filter for different categories of items
function filterInvAndGenerate() {
  let categoryFilter = selectedCategory == "All" ? () => true : (item) => item.category == selectedCategory;
  let filteredInv = inventoryArray.filter(categoryFilter);
  generateGrid(filteredInv);
}

// Updates inventory of player
function updateInventory() {
  inventoryArray = Object.values(inventory).map((item) => Object.assign(item, Items[item.id])).sort((itemA, itemB) => {
    if (itemA.category != itemB.category) return itemCategories.indexOf(itemA.category) - itemCategories.indexOf(itemB.category);
    return itemA.num - itemB.num;
  });
  console.log("updating inventory...");
  // $('#item-list').html("");
  // $.each(inventoryArray, function (index, item) {
  //   //addItem(item);
  // });
}
// Creates grid and item UI for inventory
function generateGrid(items) {
  $('#inventory-grid').html("");
  for (let item of items) {
    let { id, quantity, name, desc, isHoldable, isUsable } = item;
    $('#inventory-grid').append(
      `<div id="inventory-item-${id}" class="inventory-item">
        <img class="inventory-item-icon" src="res/items/${id}.png" />
        <div class="inventory-item-count">${quantity != 1 ? quantity : ""}</div>
      </div>`
    );
    $(`#inventory-item-${id}`).on('click', (e) => {
      e.stopPropagation();
      openItemContextMenu(e, item);
    })
  }
}

// function addItem(item) {
//   let { id, quantity, name, desc, isHoldable, isUsable } = item;
//   // Create a new accordion item
//   console.log(`adding ${quantity} of ${id}`);
//   let itemNumber = $('#item-list .accordion-item').length + 1;
//   let newItem = $(`<div class="accordion-item item"> 
//     <h2 class="accordion-header" id="heading${itemNumber}">
//     <button class="accordion-button collapsed bg-dark text-white item-label" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${itemNumber}" aria-expanded="false" aria-controls="collapse${itemNumber}">
//     <img class="item-image" src="res/items/${id}.png">${name} x ${quantity}
//     </button>
//     </h2>
//     <div id="collapse${itemNumber}" class="accordion-collapse collapse" aria-labelledby="heading${itemNumber}" data-bs-parent="#item-list">
//     <div class="accordion-body bg-dark text-white">${desc}<br>
//     ${isUsable ? '<button class="item-button">Use</button>' : ""}
//     ${isHoldable ? '<button class="item-button">Give</button>' : ""}
//     <button class="item-button" onclick="openDiscardUI(inventory.${id})">Discard</button>
//     </div>
//     </div>
//     </div>`);

//   // Append the new item to the accordion
//   $('#item-list').append(newItem);
// }

// Context menu with actions when an item is clicked
function openItemContextMenu(e, item) {
  $('#item-context-menu')
    .css("top", e.clientY - 56)
    .css("left", e.clientX)
    .show();
  $("#item-context-menu-name").html(`${item.name} x${item.quantity}`);
  $('#item-context-menu-info')
    .off()
    .on("click", () => {
      $('#item-context-menu').hide();
      openItemInfo(item);
    });
  if (!battle.isBattleActive) {
    item.isHoldable ? $("#item-context-menu-give").show().off().on("click", () => { openGiveUI(item); }) : $("#item-context-menu-give").hide();
    item.isUsable ? $("#item-context-menu-use").show().off().on("click", () => { openUseUI(item); }) : $("#item-context-menu-use").hide();
    $("#item-context-menu-discard")
      .show()
      .off()
      .on("click", () => {
        $('#item-context-menu').hide();
        openDiscardUI(item);
      });
  } else {
    $("#item-context-menu-give").hide();
    item.isUsableInBattle ? $("#item-context-menu-use").show().off().on("click", () => { useItem(item.id);$("#overlay-bag").hide(); }) : $("#item-context-menu-use").hide();
    $("#item-context-menu-discard").hide();
  }
}

// Info of item: name, description, and image
function openItemInfo(item) {
  $('#item-info').show();
  $('#item-info-image').attr('src', `res/items/${item.id}.png`);
  $('#item-info-name').text(item.name);
  $('#item-info-description').text(item.desc);
}

// Creates use item UI
function openUseUI(item) {
  $('#item-use-select-menu').show();
  $('#item-use-select-header').text(`Use ${item.name} on?`);
  $('#item-use-select').html(
    `<option class="popup-select-option" value="" selected>Choose a Pokémon</option>`
  );
  for (let i in party) { // $('#item-use-select')
    let member = party[i];
    let monName = member.name ? member.name : Pokedex.getPokedexEntry(member.species).name;
    $('#item-use-select').append(`<option class="popup-select-option" value="${+i + 1}">${monName}</option>`);
  }
  $('#use-button')
    .off()
    .on('click', () => {
      client.socket.emit("useItem", item.id, +$('#item-use-select').val());
    });
}

// Creates give item UI
function openGiveUI(item) {
  $('#item-give-select-menu').show();
  $('#item-give-select-header').text(`Give ${item.name} to?`);
  $('#item-give-select').html(
    `<option class="popup-select-option" value="" selected>Choose a Pokémon</option>`
  );
  for (let i in party) { // $('#item-use-select')
    let member = party[i];
    let monName = member.name ? member.name : Pokedex.getPokedexEntry(member.species).name;
    $('#item-give-select').append(`<option class="popup-select-option" value="${+i + 1}">${monName}</option>`);
  }
  $('#give-button')
    .off()
    .on('click', () => {
      client.socket.emit("giveItem", item.id, +$('#item-give-select').val());
    });
}

// Creates discard item UI
function openDiscardUI(item) {
  let { id, quantity, name } = item;
  $("#discard-item-name").html(name);
  $("#discard-item-image").attr("src", "res/items/" + id + ".png");
  $("#discard-input").attr("max", quantity);
  $("#discard-input").val(1);
  $("#discard-amount-text").html(1);
  $("#discard-button")
    .off()
    .on("click", () => {
      $('#item-discard').hide();
      client.socket.emit("discardItem", id, $("#discard-input").val());
    });
  $('#item-discard').show();
}

// limits input numbers
function limitNumber(val, min, max) {
  if (val < min) return min;
  else if (val > max) return max;
  else return Math.round(val);
}

function limitInput(input, min, max) {
  input.val(limitNumber(+input.val(), min, max));
}

function limitDiscardAmount() {
  limitInput($("#discard-input"), $("#discard-input").attr("min"), $("#discard-input").attr("max"));
  $("#discard-amount-text").html($("#discard-input").val());
}