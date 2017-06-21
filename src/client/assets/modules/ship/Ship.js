/**
 * Created by garusis on 17/06/17.
 */
function Ship(x, y, size) {
    var ship = this;

    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = 0;
    this.bullets = [];
    this.canShoot = true;

    this.draw = function (ctx) {
        var offset = this.size / 2;

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
        ctx.fillStyle = "blue";
        ctx.arc(0, -offset, this.size * 0.2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw(ctx)
        }
    };

    this.translate = function (posX, posY) {
        //transform coordinates using the (0, 0) point of the ship
        var tPosX = posX - this.x;
        var tPosY = -(posY - this.y);

        this.angle = -Math.atan2(tPosY, tPosX) + (90 * Math.PI / 180);
        this.x += 2 * Math.sin(this.angle);
        this.y -= 2 * Math.cos(this.angle);
    };

    this.shoot = function () {
        if (this.canShoot) {
            this.canShoot = false;
            this.bullets.push(new Bullet(this.x, this.y, this.angle, this.size * 0.4));
            setTimeout(function () {
                ship.canShoot = true;
            }, 500)
        }
    };

}