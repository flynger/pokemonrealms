/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements dialog-box functionality 
*/
$(document).ready(function () {
    let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    let index = 0;
    $("#dialog-close").on("click", function () {
        $("#dialog-UI").hide();
    });

    function printText() {
        const delay = 30; // Delay in milliseconds between each character
        const dialogContent = document.getElementById('dialog-content');

        const intervalId = setInterval(() => {
            dialogContent.scrollTop = dialogContent.scrollHeight;
            dialogContent.textContent += text[index];

            index++;
            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, delay);
    }
    // $("#dialog-UI").hide();
    printText();
});
