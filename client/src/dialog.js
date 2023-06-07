$(document).ready(function() {
    $("#dialog-close").on("click", function() {
      $("#dialog-UI").hide();
    });

    function printText(text) {
        const delay = 30; // Delay in milliseconds between each character
        let index = 0;
        const dialogContent = document.getElementById('dialog-content');
      
        const intervalId = setInterval(() => {
          dialogContent.textContent += text[index];
      
          index++;
          if (index === text.length) {
            clearInterval(intervalId);
          }
        }, delay);
      }
    // $("#dialog-UI").hide();
    printText("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
});
