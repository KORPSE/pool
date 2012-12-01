/**
 * User: KORPSE
 * Date: 24.11.12
 * Time: 14:00
 */
var Utils = {

    calculateImpulsePoint: function (pb, p) {
        var p0 = new b2Vec2(p.x, p.y);
        p0.Add(pb.GetNegative());
        var c = BALL_RADIUS / p0.Length();
        p0.Multiply(c);
        p0.x += pb.x;
        p0.y += pb.y;

        return p0;
    },

    calculateAngle: function (v1, v2) {
        return Math.acos((v1.x * v2.x + v1.y * v2.y) / (v1.Length() * v2.Length()));
    }

}