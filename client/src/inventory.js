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
  }
  
  initInventoryUI();