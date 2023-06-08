/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file handles player movement 
*/
var Input = {
    RIGHT: false,
    LEFT: false,
    UP: false,
    DOWN: false,
    SHIFT: false,
    SPACE: false
}
//function createInputHandlers() {
function keyDownHandler(event) {
    if (event.target == document.body) {
        if (event.keyCode === 39 || event.keyCode === 68) {
            Input.RIGHT = true;
        } else if (event.keyCode === 37 || event.keyCode === 65) {
            Input.LEFT = true;
        }
        if (event.keyCode === 40 || event.keyCode === 83) {
            Input.DOWN = true;
        } else if (event.keyCode === 38 || event.keyCode === 87) {
            Input.UP = true;
        }
        if (event.keyCode === 16) {
            Input.SHIFT = true;
        }
        if (event.keyCode === 32) {
            Input.SPACE = true;
        }
    }
}
function keyUpHandler(event) {
    if (event.keyCode === 39 || event.keyCode === 68) {
        Input.RIGHT = false;
    } else if (event.keyCode === 37 || event.keyCode === 65) {
        Input.LEFT = false;
    }
    if (event.keyCode === 40 || event.keyCode === 83) {
        Input.DOWN = false;
    } else if (event.keyCode === 38 || event.keyCode === 87) {
        Input.UP = false;
    }
    if (event.keyCode === 16) {
        Input.SHIFT = false;
    }
    if (event.keyCode === 32) {
        Input.SPACE = false;
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
window.addEventListener("blur", () => {
    Input = {
        RIGHT: false,
        LEFT: false,
        UP: false,
        DOWN: false,
        SHIFT: false
    }
});
//}