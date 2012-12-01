/**
 * User: KORPSE
 * Date: 01.12.12
 * Time: 2:35
 */
function ControlSightsDraw(context) {
    var drawDashedLine = function (p0, p1) {
        var dashLen = 0.3;
        var dp = new b2Vec2(p1.x - p0.x, p1.y - p0.y);
        var finLen = dp.Length();
        var alpha = Math.atan2(dp.y, dp.x);
        var dx = dashLen * Math.cos(alpha);
        var dy = dashLen * Math.sin(alpha);
        var vdx = new b2Vec2(dx, dy);
        var ps = new b2Vec2(p0.x, p0.y);
        var pn = new b2Vec2(p0.x + dx, p0.y + dy);
        var pn0 = new b2Vec2(dx, dy);
        context.beginPath();
        var i = 0;
        while (pn0.Length() < finLen) {
            if (i % 2 == 1) {
                context.moveTo(ps.x * SCALE, ps.y * SCALE);
                context.lineTo(pn.x * SCALE, pn.y * SCALE);
            }
            ps.Add(vdx);
            pn.Add(vdx);
            pn0.Add(vdx);
            i++;
        }
        if (i % 2 == 0) {
            context.moveTo((p0.x + dx * i) * SCALE, (p0.y + dy * i) * SCALE);
            context.lineTo(p1.x * SCALE, p1.y * SCALE);
        }
        context.strokeStyle = '#cccccc';
        context.stroke();
    }

    this.drawControlSight = function(x0, y0, x, y, ball) {
        if (x != null && y != null && x0 != null && y0 != null) {
            context.beginPath();
            context.moveTo(x0 * SCALE, y0 * SCALE);
            context.lineTo(x * SCALE, y * SCALE);
            context.strokeStyle = '#eff800';
            context.stroke();

            var p = Utils.calculateImpulsePoint(ball.getBody().GetPosition(), new b2Vec2(x0, y0));
            context.beginPath();
            context.arc(p.x * SCALE, p.y * SCALE, 0.1 * SCALE, 0 , 2 * Math.PI, false);
            context.strokeStyle = '#eff800';
            context.stroke();

            var p0 = ball.getBody().GetPosition();
            var dx = x0 - x,
                dy = y0 - y;
            var p1 = new b2Vec2(dx, dy);
            p1.Multiply(20 / p1.Length());
            p1.Add(p0);
            p0 = Utils.calculateImpulsePoint(p0, p1);
            drawDashedLine(p0, p1);
        }

    }

}