/**
 * Created by garusis on 7/06/17.
 */

function startApp() {

    //Center our canvas in the screen
    var socket = io();

    socket.on("load-settings", function (height) {
        var screenController = new ScreenController("my-screen", socket);

        var canvas = screenController.canvas;
        canvas.width = height.canvas.width
        canvas.height = height.canvas.height

        canvas.style.left = ((window.innerWidth / 2) - (canvas.clientWidth / 2)) + "px";

        setInterval(function () {
            screenController.render()
        }, 20)
    })

}

/**
 * document.body contains our canvas. If it doesn't exists
 * we'll get an error when we try to draw over the canvas.
 */
if (document.body) { //if document.body is different to null, undefined or false, then we can draw.
    startApp()
} else {
    //wait until document.body exists
    window.addEventListener("load", startApp)
}
