/**
 * Created by garusis on 22/06/17.
 */

var Ship = require("./Ship")
var serverParts = require("../server-parts")
var settings = require("../settings")


var ships = []



serverParts.io.on("connection", function (socket) {

    socket.emit("load-settings", settings);

    var ship = new Ship(socket);
    ships.push(ship);

    socket.on("ship::translate", function (pointerPosition) {
        ship.translate(pointerPosition.x, pointerPosition.y);
    });

    socket.on("ship::shoot", function () {
        ship.shoot();
    });

    socket.on('disconnect', function(){
        var index = ships.indexOf(ship);
        ships.splice(index, 1);
    });
})

setInterval(function () {
    serverParts.io.emit("update-ships-state", ships.map(function (ship) {
        return ship.toPlainObjet()
    }))
}, 20)