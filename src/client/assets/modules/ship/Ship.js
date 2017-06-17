/**
 * Created by garusis on 17/06/17.
 */
function Ship(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = Math.random() * 360;

    this.draw = function (ctx) {
        ctx.beginPath();
        ctx.lineJoin = "round";

        var offset =  this.size / 2

        ctx.save(); // saves the coordinate system
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.moveTo(0, -offset);
        ctx.lineTo(-offset, offset);
        ctx.lineTo(offset, offset);
        ctx.lineTo(0, -offset);

        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.restore();
    }

}