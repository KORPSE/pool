/**
 * User: KORPSE
 * Date: 24.11.12
 * Time: 14:00
 */
var Utils = {

    calculateImpulsePoint: function (pb, p) {
        p.Add(pb.GetNegative());
        var c = BALL_RADIUS / p.Length();
        p.Multiply(c);
        p.x += pb.x;
        p.y += pb.y;

        return p;
    },

    calculateAngle: function (v1, v2) {
        return Math.acos((v1.x * v2.x + v1.y * v2.y) / (v1.Length() * v2.Length()));
    }

}