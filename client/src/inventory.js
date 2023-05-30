var inventory;
var inventoryArray;
var selectedCategory = "All";
var itemCategories = ["Poké Balls", "Medicine", "Berries", "Items"];
function initInventoryUI() {
  // add click event listener to the inventory btton to toggle the UI
  console.log("initializing inventoryUI");
  for (let category of itemCategories) {
    $("#inventoryHeader").append(`<div class="inventory-tab"><span class="inventory-tab-text">${category}</span></div>`);
  }
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
  $("#inventory-UI").draggable({
    handle: ".card-header",
    containment: "parent"
  });
  $(".popup-container").draggable({
    handle: ".card-header",
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

function filterInvAndGenerate() {
  let categoryFilter = selectedCategory == "All" ? () => true : (item) => item.category == selectedCategory;
  let filteredInv = inventoryArray.filter(categoryFilter);
  generateGrid(filteredInv);
}

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

function generateGrid(items) {
  $('#inventory-grid').html("");
  for (let item of items) {
    let { id, quantity, name, desc, isHoldable, isUsable } = item;
    $('#inventory-grid').append(
      `<div class="inventory-item" onclick="openDiscardUI(inventory.${id})">
        <img class="inventory-item-icon" src="res/items/${id}.png" />
        <div class="inventory-item-count">${quantity != 1 ? quantity : ""}</div>
      </div>`
    );
  }
}

function addItem(item) {
  let { id, quantity, name, desc, isHoldable, isUsable } = item;
  // Create a new accordion item
  console.log(`adding ${quantity} of ${id}`);
  let itemNumber = $('#item-list .accordion-item').length + 1;
  let newItem = $(`<div class="accordion-item item"> 
    <h2 class="accordion-header" id="heading${itemNumber}">
    <button class="accordion-button collapsed bg-dark text-white item-label" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${itemNumber}" aria-expanded="false" aria-controls="collapse${itemNumber}">
    <img class="item-image" src="res/items/${id}.png">${name} x ${quantity}
    </button>
    </h2>
    <div id="collapse${itemNumber}" class="accordion-collapse collapse" aria-labelledby="heading${itemNumber}" data-bs-parent="#item-list">
    <div class="accordion-body bg-dark text-white">${desc}<br>
    ${isUsable ? '<button class="item-button">Use</button>' : ""}
    ${isHoldable ? '<button class="item-button">Give</button>' : ""}
    <button class="item-button" onclick="openDiscardUI(inventory.${id})">Discard</button>
    </div>
    </div>
    </div>`);

  // Append the new item to the accordion
  $('#item-list').append(newItem);
}

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
      socket.emit("discardItem", id, $("#discard-input").val());
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