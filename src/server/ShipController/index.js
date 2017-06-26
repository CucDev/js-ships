/**
 * Created by garusis on 22/06/17.
 */

var Ship = require("./Ship");
var Bullet = require("./Bullet");
var serverParts = require("../server-parts");
var settings = require("../settings");

var io = serverParts.io;

var targets = [];

function findCollisionBody(bodyA) {
    return targets.find(function (bodyB) {
        if (
            bodyA === bodyB
            || (bodyA instanceof Ship && bodyB instanceof Bullet && bodyA.socket_id === bodyB.parentId)
            || (bodyA instanceof Bullet && bodyB instanceof Ship && bodyA.parentId === bodyB.socket_id)
        ) {
            return false;
        }

        var dx = bodyA.x - bodyB.x;
        var dy = bodyA.y - bodyB.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        return distance < bodyA.size + bodyB.size;
    })
}

function removeShip(ship) {
    var index = targets.indexOf(ship);
    if(index === -1 ) return;

    targets.splice(index, 1);
    ship.remove();
    io.emit("ship::remove", ship.socket_id);
}

function removeBullet(bullet) {
    var index = targets.indexOf(bullet);
    if(index === -1 ) return;

    targets.splice(index, 1);
    clearInterval(bullet.intervalId);
    io.emit("bullet::remove", bullet.id);
}

io.on("connection", function (socket) {

    socket.emit("load-settings", settings);
    socket.emit("load-current-targets", targets.map(function (target) {
        return target.toPlainObjet();
    }));

    var ship = new Ship(socket);
    targets.push(ship);
    io.emit("ship::add", ship.toPlainObjet());

    socket.on("ship::translate", function (pointerPosition) {
        ship.translate(pointerPosition.x, pointerPosition.y);

        var bodyB = findCollisionBody(ship);
        if (bodyB) {
            removeShip(ship);
            if (bodyB instanceof Ship) {
                removeShip(bodyB);
            } else {
                removeBullet(bodyB);
            }
        } else {
            io.emit("ship::update", ship.toPlainObjet())
        }
    });

    socket.on("ship::shoot", function () {
        var bullet = ship.shoot();
        if (bullet) {
            targets.push(bullet);
            io.emit("bullet::add", bullet.toPlainObjet());

            bullet.intervalId = setInterval(function () {
                bullet.translate();
                if (bullet.x < 0 || bullet.x > settings.canvas.width || bullet.y < 0 || bullet.y > settings.canvas.height) {
                    return removeBullet(bullet);
                }

                var bodyB = findCollisionBody(bullet);
                if (bodyB) {
                    removeBullet(bullet);
                    if (bodyB instanceof Ship) {
                        removeShip(bodyB);
                    } else {
                        removeBullet(bodyB);
                    }
                } else {
                    io.emit("bullet::update", bullet.toPlainObjet());
                }
            }, 20);
        }
    });

    socket.on('disconnect', function () {
        removeShip(ship);
    });
})