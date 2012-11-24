/**
 * User: KORPSE
 * Date: 24.11.12
 * Time: 10:42
 */
test("point calculation", function() {
    var a = Utils.calculateImpulsePoint(new b2Vec2(1, 1), new b2Vec2(0.5, 0.5));
    equal(a.x, 1 - BALL_RADIUS / Math.sqrt(2));
    equal(a.x, a.y);
});

test("calculate angle", function() {
    equal(Utils.calculateAngle(new b2Vec2(1, 0), new b2Vec2(1, 1)).toPrecision(4), (Math.PI / 4).toPrecision(4));
});
