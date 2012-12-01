/**
 * User: KORPSE
 * Date: 08.11.12
 * Time: 0:15
 */
function BallFactory (world) {

    const INCREMENT_X = 10;
    const INCREMENT_Y = 2.5;

    this.createBall = function (x, y, isCue) {
        return new Ball(world, x, y, isCue);
    }

    this.createMany = function (col) {
        col.forEach(function (coords) {
            return new Ball(world, coords.x + INCREMENT_X,
                coords.y + INCREMENT_Y, false);
        });
    }
}