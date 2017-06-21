/**
 * Created by garusis on 18/06/17.
 */
function Bullet(startX, startY, angle, size) {
    var bullet = this;

    this.x = startX;
    this.y = startY;
    this.size = size;
    this.angle = angle;

    setInterval(function () {
        bullet.translate()
    }, 20)


    this.translate = function () {
        this.x += 5 * Math.sin(this.angle);
        this.y -= 5 * Math.cos(this.angle);
    };

    this.draw = function (ctx) {
        var offset = this.size / 2;

        ctx.save(); // saves the coordinate system


        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        ctx.fillStyle = "blue";
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(0, -offset);
        ctx.lineTo(-offset, offset);
        ctx.lineTo(offset, offset);
        ctx.lineTo(0, -offset);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    };
}