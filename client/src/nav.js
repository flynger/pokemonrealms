$(function () {
    $.get("nav.html", function (data) {
        $("#nav-placeholder").replaceWith(data);
        var path = window.location.pathname;
        var page = path.split("/").pop();
        $(`#${page}`).addClass("active");
    });
});