$(function () {
    $('[data-toggle="tooltip"]').tooltip(); 
    $("#pokemon-summary").draggable({
        handle: "#pokemon-summary-header"
    });
    // Initialize the move list as sortable
    $("#move-list").sortable({
        axis: "y",
        containment: $("#pokemon-summary"),
        cursor: "grabbing",
        stop: function (event, ui) {
            ui.item.removeAttr("style");
        },
        update: function (event, ui) {
            // Update the move order in the backend
            //updateMoveOrder();
        }
    });

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
});