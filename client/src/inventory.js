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
  
    // populate the inventory items with dummy data
    var inventoryItems = [
      { name: "Potion", count: 10 },
      { name: "Revive", count: 2 },
      { name: "PokeBall", count: 5 },
      { name: "Master Ball", count: 99 }
    ];
  
    var $inventoryItems = $("#inventoryItems");
  
    $.each(inventoryItems, function(index, item) {
      var $inventoryItem = $("<div>", { class: "inventory-item" });
      var $itemName = $("<div>", { class: "item-name", text: item.name });
      var $itemCount = $("<div>", { class: "item-count", text: "x" + item.count });
  
      $inventoryItem.append($itemName).append($itemCount);
      $inventoryItems.append($inventoryItem);
    });
  }