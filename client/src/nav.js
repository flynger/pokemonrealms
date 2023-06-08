/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements navbar functionality 
*/
$(function () {
    $.get("nav.html", function (data) {
        $("#nav-placeholder").replaceWith(data);
        var path = window.location.pathname;
        var page = path.split("/").pop();
        $(`#${page}`).addClass("active");
    });
});