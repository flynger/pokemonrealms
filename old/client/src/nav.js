/*
Alex G, flynger, Richard W, Harry

This file implements navbar functionality 
*/
$(function () {
    // replaces placeholder navbar with actual navbar
    $.get("nav.html", function (data) {
        $("#nav-placeholder").replaceWith(data);
        var path = window.location.pathname;
        var page = path.split("/").pop();
        $(`#${page}`).addClass("active");
    });
});