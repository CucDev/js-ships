var settings = require("../settings")
var Bullet = require("./Bullet")

/**
 * Created by garusis on 17/06/17.
 */

function Ship(socket) {
    var ship = this;

    this.socket_id = socket.id;
    this.x = 100 + (Math.random() * (settings.canvas.width - 200));
    this.y = 100 + (Math.random() * (settings.canvas.height - 200));
    this.size = settings.canvas.width * 0.05;
    this.angle = 0;
    this.bullets = [];
    this.canShoot = true;

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
            this.bullets.push(new Bullet(this.x, this.y, this.angle));
            setTimeout(function () {
                ship.canShoot = true;
            }, 500)
        }
    };

    this.toPlainObjet = function () {
        return {
            socket_id: this.socket_id,
            x: this.x,
            y: this.y,
            angle: this.angle,
            bullets: this.bullets.map(function (bullet) {
                return bullet.toPlainObjet();
            }),
            canShoot: this.canShoot
        }
    }
}

module.exports = Ship