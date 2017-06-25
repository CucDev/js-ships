/**
 * Created by garusis on 17/06/17.
 */
function drawShip(ctx, ship) {
    var offset = ship.size / 2;

    ctx.save(); // saves the coordinate system


    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.fillStyle = ship.isMyShip ? "red" : "blue";
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.beginPath();
    ctx.moveTo(0, -offset);
    ctx.lineTo(-offset, offset);
    ctx.lineTo(offset, offset);
    ctx.lineTo(0, -offset);
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(0, -offset, ship.size * 0.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    ship.bullets.forEach(function (bullet) {
        bullet.size = ship.size * 0.4;
        drawBullet(ctx, bullet)
    })
}