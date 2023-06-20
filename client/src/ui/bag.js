/*
Alex G, flynger, Richard W, Harry

This file implements the bag UI in battles
*/

let selectedTab = "All";

function initBag() {
    var itemCategories = ["Poké Balls", "Medicine", "Berries", "Items"];
    $("#bagHeader").html(`<div class="bag-tab selected"><span class="bag-tab-text">All</span></div>`);
    for (let category of itemCategories) {
        $("#bagHeader").append(`<div class="bag-tab"><span class="bag-tab-text">${category}</span></div>`);
    }
    $(".bag-tab").on("click", function () {
        selectedTab = $(this).text();
        if (!$(this).hasClass("selected")) {
            $(".bag-tab").removeClass("selected");
            $(this).addClass("selected");
            filterBagInvAndGenerate(selectedTab);
        }
    });
}

// Filter for different categories in bag
function filterBagInvAndGenerate(selectedCategory) {
    console.log(selectedCategory);
    console.log(inventoryArray);
    let categoryFilter = selectedCategory == "All" ? () => true : (item) => item.category == selectedCategory;
    let filteredInv = inventoryArray.filter(categoryFilter);
    generateBagGrid(filteredInv);
}

// Creates UI and event listeners for each bag item
function generateBagGrid(items) {
    $('#bag-grid').html("");
    for (let item of items) {
      let { id, quantity } = item;
      $('#bag-grid').append(
        `<div id="bag-item-${id}" class="bag-item">
            <img class="bag-item-icon" src="res/items/${id}.png" />
            <div class="bag-item-count">${quantity != 1 ? quantity : ""}</div>
        </div>`
      );
      $(`#bag-item-${id}`).on('click', (e) => {
        e.stopPropagation();
        openItemContextMenu(e, item);
      })
    }
  }

// functions for showing and hiding different actions in battle
function showBag() {
    filterBagInvAndGenerate(selectedTab);
    $("#overlay-bag").show();
    $('#overlay-command').hide();
}

function cancelBag() {
    $("#overlay-bag").hide();
    $('#overlay-command').show();
}

function useItem(item) {
    socket.emit("itemInput", item);
    $("overlay-switch").hide();

}