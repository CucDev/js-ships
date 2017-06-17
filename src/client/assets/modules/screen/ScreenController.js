/**
 * Created by garusis on 7/06/17.
 */
function ScreenController(screenId) {
    this.canvas = document.getElementById(screenId);

    this.height = this.canvas.height;
    this.width = this.canvas.width;

    var ship = new Ship(this.height / 2, this.width / 2, this.height * 0.05)

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
        ctx.fillRect(0, 0, this.width, this.height)

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