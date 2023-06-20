/*
Alex G, flynger, Richard W, Harry

This file implements logic for the login page
*/

// handles login-page submissions
$(function () {
    // Event listener for submissions and redirects when logged in
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        let data = $("#login-form").serialize();
        $.post("/login", data, (response) => {
            if (response.success) {
                window.location.href = "/play";
            } else {
                $("#login-fail").html(response.reason);
                $("#login-fail")[0].style.display = "inherit";
                $("#login-fail").addClass("mb-3");
            }
        });
    });
});