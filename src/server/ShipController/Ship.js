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
    this.size = settings.canvas.height * 0.03;
    this.angle = 0;
    this.bullets = [];
    this.canShoot = true;

    this.remove = function () {
        socket.removeAllListeners("ship::translate");
        socket.removeAllListeners("ship::shoot");
    }

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
            setTimeout(function () {
                ship.canShoot = true;
            }, 500);
            return new Bullet(this.socket_id, this.x, this.y, this.angle, this.size * 0.4)
        }
    };

    this.toPlainObjet = function () {
        return {
            type: "Ship",
            socket_id: this.socket_id,
            x: this.x,
            y: this.y,
            angle: this.angle,
            size: this.size,
            bullets: this.bullets.map(function (bullet) {
                return bullet.toPlainObjet();
            }),
            canShoot: this.canShoot
        }
    }
}

module.exports = Ship