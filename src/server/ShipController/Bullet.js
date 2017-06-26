/**Ship
 * Created by garusis on 18/06/17.
 */
function Bullet(parentId, startX, startY, angle, size) {
    this.x = startX;
    this.y = startY;
    this.angle = angle;
    this.size = size;
    this.parentId = parentId;
    this.id = parentId + Date.now();

    this.translate = function () {
        this.x += 5 * Math.sin(this.angle);
        this.y -= 5 * Math.cos(this.angle);
    };

    this.toPlainObjet = function () {
        return {
            parentId: parentId,
            id: this.id,
            type: "Bullet",
            x: this.x,
            y: this.y,
            angle: this.angle,
            size: this.size
        }
    }

}

module.exports = Bullet