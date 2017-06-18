/**
 * Created by garusis on 17/06/17.
 */
function Ship(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = 0;

    this.draw = function (ctx) {
        var offset =  this.size / 2

        ctx.save(); // saves the coordinate system


        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        ctx.fillStyle = "red";
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(0, -offset);
        ctx.lineTo(-offset, offset);
        ctx.lineTo(offset, offset);
        ctx.lineTo(0, -offset);
        ctx.fill();
        ctx.stroke();


        ctx.beginPath();
        ctx.arc(0, -offset, this.size*0.1, 0, 2*Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }

    this.translate = function (posX, posY) {
        //transform coordinates using the middle of canvas as (0, 0)
        posX = posX - this.x;
        posY = -(posY - this.y);

        this.angle = -Math.atan2(posY, posX) + (90 * Math.PI / 180);
    }

}