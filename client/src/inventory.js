var inventory;
function initInventoryUI() {
  // add click event listener to the inventory btton to toggle the UI
  console.log("initializing inventoryUI");
  $("#inventoryBtn").on("click", function () {
    $("#inventory-UI").toggle();
  });

  $("#inventory-UI").draggable({
    handle: "#inventoryHeader",
    containment: "parent"
  });

  $("#inventory-UI").resizable({
    minWidth: 200,
    minHeight: 200,
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

function updateInventory() {
  // dummy data
  var inventoryItems = Object.values(inventory);

  console.log("updating inventory...");
  $('#item-list').html("");
  $.each(inventoryItems, function (index, item) {
    addItem(item.id, item.quantity);
  });
}

function addItem(itemId, itemQuantity) {
  // Create a new accordion item
  console.log(`adding ${itemQuantity} of ${itemId}`);
  let itemNumber = $('#item-list .accordion-item').length + 1;
  let newItem = $('<div class="accordion-item item">' +
    '<h2 class="accordion-header" id="heading' + itemNumber + '">' +
    '<button class="accordion-button collapsed bg-dark text-white item-label" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + itemNumber + '" aria-expanded="false" aria-controls="collapse' + itemNumber + '">' +
    '<img class="item-image" src="res/items/' + itemId + '.png">' + itemId + ' x' + itemQuantity +
    '</button>' +
    '</h2>' +
    '<div id="collapse' + itemNumber + '" class="accordion-collapse collapse" aria-labelledby="heading' + itemNumber + '" data-bs-parent="#item-list">' +
    '<div class="accordion-body bg-dark text-white">' + 'enter description here' + '</div>' +
    '</div>' +
    '</div>');

  // Append the new item to the accordion
  $('#item-list').append(newItem);
}