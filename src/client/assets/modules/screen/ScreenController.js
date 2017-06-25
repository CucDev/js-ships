/**
 * Created by garusis on 7/06/17.
 */
function ScreenController(screenId, socket) {
    var screenController = this;

    this.canvas = document.getElementById(screenId);

    this.ships = [];

    function notifyMoveShip(posX, posY) {
        //transform coordinates in window to coordinates in the html canvas object
        posX = posX - screenController.canvas.offsetLeft;
        posY = posY - screenController.canvas.offsetTop;

        //transform coordinates in canvas to coordinates in the canvas context.
        posX = (posX * screenController.canvas.width) / screenController.canvas.clientWidth;
        posY = (posY * screenController.canvas.height) / screenController.canvas.clientHeight;

        socket.emit("ship::translate", {x: posX, y: posY})
    }

    function notifyShot() {
        socket.emit("ship::shoot")
    }

    this.canvas.addEventListener("mousemove", function (event) {
        notifyMoveShip(event.pageX, event.pageY);
    });

    this.canvas.addEventListener("touchmove", function (event) {
        event.preventDefault();
        if (event.touches.length > 1) {
            return notifyShot();
        }
        var touch = event.touches[0];
        notifyMoveShip(touch.pageX, touch.pageY);
    });
    this.canvas.addEventListener("click", notifyShot);

    socket.on("update-ships-state", function (ships) {
        screenController.ships = ships;
    })

    function drawLine(ctx, xStart, yStart, xEnd, yEnd) {
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
    }

    this.drawBackground = function (ctx) {
        var columns = 15, rows = 15;
        var columnWidth = this.canvas.width / columns, rowHeight = this.canvas.height / rows;

        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.setLineDash([20, 5]);
        ctx.lineWidth = 1;
        for (var linePos = columnWidth; linePos < this.canvas.width; linePos += columnWidth) {
            drawLine(ctx, linePos, 0, linePos, this.canvas.height);
        }
        for (var linePos = rowHeight; linePos < this.canvas.height; linePos += rowHeight) {
            drawLine(ctx, 0, linePos, this.canvas.height, linePos);
        }
        ctx.setLineDash([]);
    }

    this.render = function () {
        var ctx = this.canvas.getContext("2d");
        this.drawBackground(ctx)

        this.ships.forEach(function (ship) {
            ship.size = screenController.canvas.height * 0.03;
            ship.isMyShip = ship.socket_id === socket.id;

            drawShip(ctx, ship)
        })
    }
}