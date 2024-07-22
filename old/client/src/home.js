/*
Alex G, flynger, Richard W, Harry

This file implements the logic for the home page
*/

// Animates hero image on home page
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