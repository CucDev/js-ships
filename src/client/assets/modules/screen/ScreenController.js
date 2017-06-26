/**
 * Created by garusis on 7/06/17.
 */

function findInArray(array, field, comparator) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][field] === comparator) {
            return array[i]
        }
    }
}

function findIndexArray(array, field, comparator) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][field] === comparator) {
            return i
        }
    }
}


function ScreenController(screenId, socket) {
    var screenController = this;

    this.canvas = document.getElementById(screenId);

    this.ships = [];
    this.bullets = [];
    this.gameStatus = "playing";

    function notifyMoveShip(posX, posY) {

        //transform coordinates in window to coordinates in the html canvas object
        posX = posX - screenController.canvas.offsetLeft;
        posY = posY - screenController.canvas.offsetTop;

        //transform coordinates in canvas to coordinates in the canvas context.
        posX = (posX * screenController.canvas.width) / screenController.canvas.clientWidth;
        posY = (posY * screenController.canvas.height) / screenController.canvas.clientHeight;

        socket.emit("ship::translate", {x: posX, y: posY})
    }

    function notifyShot() {
        socket.emit("ship::shoot")
    }

    this.canvas.addEventListener("mousemove", function (event) {
        notifyMoveShip(event.pageX, event.pageY);
    });

    this.canvas.addEventListener("touchmove", function (event) {
        event.preventDefault();
        if (event.touches.length > 1) {
            return notifyShot();
        }
        var touch = event.touches[0];
        notifyMoveShip(touch.pageX, touch.pageY);
    });
    this.canvas.addEventListener("click", notifyShot);

    socket.on("load-current-targets", function (targets) {
        targets.forEach(function (target) {
            if (target.type === "Ship") {
                screenController.ships.push(target);
            } else {
                screenController.bullets.push(target);
            }
        });
    });


    socket.on("ship::add", function (ship) {
        ship.isMyShip = ship.socket_id === socket.id;
        screenController.gameStatus = "playing";
        screenController.ships.push(ship);
    });

    socket.on("ship::update", function (ship) {
        var existingShip = findInArray(screenController.ships, "socket_id", ship.socket_id);
        for (var key in ship) {
            existingShip[key] = ship[key];
        }
    });

    socket.on("ship::remove", function (shipSocketId) {
        var index = findIndexArray(screenController.ships, "socket_id", shipSocketId);
        var ship = screenController.ships[index];

        screenController.ships.splice(index, 1);

        if (ship.isMyShip) {
            screenController.gameStatus = "looser";
        } else if (screenController.gameStatus !== "looser" && screenController.ships.length === 1) {
            screenController.gameStatus = "winner";
        }
    });

    socket.on("bullet::add", function (bullet) {
        screenController.bullets.push(bullet);
    });

    socket.on("bullet::update", function (bullet) {
        var existingBullet = findInArray(screenController.bullets, "id", bullet.id);
        for (var key in bullet) {
            existingBullet[key] = bullet[key];
        }
    });

    socket.on("bullet::remove", function (bulletId) {
        var index = findIndexArray(screenController.bullets, "id", bulletId);
        screenController.bullets.splice(index, 1);
    });


    function drawLine(ctx, xStart, yStart, xEnd, yEnd) {
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
    }

    this.drawBackground = function (ctx) {
        var columns = 15, rows = 15;
        var columnWidth = this.canvas.width / columns, rowHeight = this.canvas.height / rows;

        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.setLineDash([20, 5]);
        ctx.lineWidth = 1;
        for (var linePos = columnWidth; linePos < this.canvas.width; linePos += columnWidth) {
            drawLine(ctx, linePos, 0, linePos, this.canvas.height);
        }
        for (var linePos = rowHeight; linePos < this.canvas.height; linePos += rowHeight) {
            drawLine(ctx, 0, linePos, this.canvas.height, linePos);
        }
        ctx.setLineDash([]);
    }

    this.render = function () {
        var ctx = this.canvas.getContext("2d");
        this.drawBackground(ctx);

        this.ships.forEach(function (ship) {
            drawShip(ctx, ship)
        });

        this.bullets.forEach(function (bullet) {
            drawBullet(ctx, bullet)
        });

        ctx.font = "60px Arial";
        ctx.fillStyle = "red";
        if (this.gameStatus === "winner") {
            ctx.fillText("You win!!!", (this.canvas.width / 2) - 125, (this.canvas.height / 2) - 15);
        } else if (this.gameStatus === "looser") {
            ctx.fillText("You are a loooooooser!!! :D", (this.canvas.width / 2) - 365, (this.canvas.height / 2) - 15);
        }
    }
}