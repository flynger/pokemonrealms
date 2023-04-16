/*


This file implements the logic for the register page
*/

// handles register page submissions
$(function () {
    $('#register-form').on('submit', function (e) {
        e.preventDefault();
        let data = $("#register-form").serialize();
        $.post("/register", data, (response) => {
            if (response.success) {
                window.location.href = "/home";
            } else {
                $("#register-fail").html(response.reason);
                $("#register-fail")[0].style.display = "inherit";
            }
        });
    });
});