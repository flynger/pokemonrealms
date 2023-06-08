/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements the logic for the home page
*/

$(function () {
    var x = 0;
    var y = 0;
    
    var hero = $("#hero");

    function moveHero() {
        hero.css("backgroundPosition", x + 'px' + ' ' + y + 'px');
        y-=0.2;
        requestAnimationFrame(moveHero);
    }
    
    moveHero();
});