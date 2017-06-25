/**
 * Created by garusis on 7/06/17.
 */
function ScreenController(screenId) {
    var screenController = this;

    this.canvas = document.getElementById(screenId);
    this.height = this.canvas.height;
    this.width = this.canvas.width;

    var ship = new Ship(this.height / 2, this.width / 2, this.height * 0.03);

    function notifyMoveShip(posX, posY) {
        //transform coordinates in window to coordinates in the html canvas object
        posX = posX - screenController.canvas.offsetLeft;
        posY = posY - screenController.canvas.offsetTop;

        //transform coordinates in canvas to coordinates in the canvas context.
        posX = (posX * screenController.width) / screenController.canvas.clientWidth;
        posY = (posY * screenController.height) / screenController.canvas.clientHeight;

        ship.translate(posX, posY);
    }

    function notifyShot() {
        ship.shoot()
    }

    this.canvas.addEventListener("mousemove", function (event) {
        notifyMoveShip(event.pageX, event.pageY);
    })
    this.canvas.addEventListener("touchmove", function (event) {
        event.preventDefault();
        if (event.touches.length > 1) {
            return notifyShot();
        }
        var touch = event.touches[0];
        notifyMoveShip(touch.pageX, touch.pageY);
    });
    this.canvas.addEventListener("click", notifyShot);

    function drawLine(ctx, xStart, yStart, xEnd, yEnd) {
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
    }

    this.drawBackground = function (ctx) {
        var columns = 15, rows = 15;
        var columnWidth = this.width / columns, rowHeight = this.height / rows;

        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.setLineDash([20, 5]);
        ctx.lineWidth = 1;
        for (var linePos = columnWidth; linePos < this.width; linePos += columnWidth) {
            drawLine(ctx, linePos, 0, linePos, this.height);
        }
        for (var linePos = rowHeight; linePos < this.height; linePos += rowHeight) {
            drawLine(ctx, 0, linePos, this.height, linePos);
        }
        ctx.setLineDash([]);
    }

    this.render = function () {
        var ctx = this.canvas.getContext("2d");
        this.drawBackground(ctx)

        ship.draw(ctx)
    }
}