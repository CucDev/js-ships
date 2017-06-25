/**
 * Created by garusis on 18/06/17.
 */
function Bullet(startX, startY, angle) {
    var bullet = this;

    this.x = startX;
    this.y = startY;
    this.angle = angle;

    setInterval(function () {
        bullet.translate();
    }, 20)


    this.translate = function () {
        this.x += 5 * Math.sin(this.angle);
        this.y -= 5 * Math.cos(this.angle);
    };

    this.toPlainObjet = function () {
        return {
            x: this.x,
            y: this.y,
            angle: this.angle
        }
    }

}

module.exports = Bullet