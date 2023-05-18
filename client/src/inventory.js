function initInventoryUI() {
    // add click event listener to the inventory button to toggle the UI
    $("#inventoryBtn").on("click", function() {
      $("#inventory-UI").toggle();
    });
  
    $("#closeBtn").on("click", function() {
      $("#inventory-UI").hide();
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

    function addItem(itemName) {
      // Create a new accordion item
      let itemNumber = ($('#item-list .accordion-item').length + 1);
      let newItem = $('<div class="accordion-item">' +
        '<h2 class="accordion-header" id="heading' + itemNumber + '>' +
        '<button class="accordion-button collapsed bg-dark text-white" type="button" data-bs-toggle="collapse" dat-bs-target="#collapse' + itemNumber + 'aria-expanded="false" aria-controls="collapse' + itemNumber +'>' +
        '<img class="item-image" src="res/items/' + itemName + '.png">' + itemName +
        '</button>' +
        '</h2>' +
        '<div id="collapse"' + itemNumber + 'class="accordion-collapse collapse" aria-labelledby="heading' + itemNumber + '">' +
        '<div class="accordion-body bg-dark text-white">New item content</div>' +
        '</div>' +
        '</div>');
    
      // Append the new item to the accordion
      $('#item-list').append(newItem);
    }
  
    // populate the inventory items with dummy data
    var inventoryItems = [
      { name: "Potion", quantity: 10 },
      { name: "Revive", quantity: 2 },
      { name: "PokeBall", quantity: 5 },
      { name: "Master Ball", quantity: 99 }
    ];
  
    var $inventoryItems = $("#inventoryItems");
  
    $.each(inventoryItems, function(index, item) {
      var $inventoryItem = $("<div>", { class: "inventory-item" });
      var $itemName = $("<div>", { class: "item-name", text: item.name });
      var $itemCount = $("<div>", { class: "item-count", text: "x" + item.quantity });
  
      $inventoryItem.append($itemName, $itemCount);
      $inventoryItems.append($inventoryItem);
    });
  }