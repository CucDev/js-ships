/**
 * Created by garusis on 18/06/17.
 */
function drawBullet(ctx, bullet) {
    var offset = bullet.size / 2;

    ctx.save(); // saves the coordinate system


    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.fillStyle = "blue";
    ctx.translate(bullet.x, bullet.y);
    ctx.rotate(bullet.angle);
    ctx.beginPath();
    ctx.moveTo(0, -offset);
    ctx.lineTo(-offset, offset);
    ctx.lineTo(offset, offset);
    ctx.lineTo(0, -offset);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}