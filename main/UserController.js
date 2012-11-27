/**
 * User: KORPSE
 * Date: 05.11.12
 * Time: 23:39
 */
function UserController(elm, ball, world) {
    var x0, y0;
    var x, y;
    var cx, cy;
    var dx, dy;
    var pressed = false;
    var readyToRelease = false

    Event.observe(elm, 'mousedown', function(e) {
        x0 = (Event.pointerX(e) - elm.offsetLeft) / SCALE;
        y0 = (Event.pointerY(e) - elm.offsetTop) / SCALE;
        dx = 0;
        dy = 0;

        if (ball.testPoint(x0, y0) && world.isAllBallsSleep()) {
            pressed = true
        }

        var p = Utils.calculateImpulsePoint(ball.getBody().GetPosition(), new b2Vec2(x0, y0));

        x0 = p.x;
        y0 = p.y;

        cx = ball.getBody().GetPosition().x - x0;
        cy = ball.getBody().GetPosition().y - y0;
    });

    Event.observe(document, 'mousemove', function(e) {
        x = (Event.pointerX(e) - elm.offsetLeft) / SCALE;
        y = (Event.pointerY(e) - elm.offsetTop) / SCALE;
        var ballVec = ball.getBody().GetPosition();
        if (Utils.calculateAngle(new b2Vec2(x0 - ballVec.x, y0 - ballVec.y), new b2Vec2(x - x0, y - y0)) < Math.PI / 2.3) {
            if(pressed) {
                dx = x0 - x;
                dy = y0 - y;
                var alpha = Math.atan2(dy, dx);
                var vecLen = (new b2Vec2(dx, dy)).Length();
                if (vecLen > 3) {
                    dx = 3 * Math.cos(alpha);
                    dy = 3 * Math.sin(alpha);
                    x = x0 - dx;
                    y = y0 - dy;
                }
            }
            readyToRelease = true;
        } else {
            readyToRelease = false;
        }
    });
    Event.observe(document, 'mouseup', function(e) {
        if(pressed && readyToRelease) {
            ball.applyImpulse(dx, dy, cx, cy);
        }
        pressed = false;
    });

    this.drawControlSight = function() {
        var context = elm.getContext('2d');
        if (pressed && readyToRelease) {
            context.beginPath();
            context.moveTo(x0 * SCALE, y0 * SCALE);
            context.lineTo(x * SCALE, y * SCALE);
            context.strokeStyle = '#ff0000';
            context.stroke();
        } else if (ball.testPoint(x, y) && world.isAllBallsSleep()) {
            var p = Utils.calculateImpulsePoint(ball.getBody().GetPosition(), new b2Vec2(x, y));
            context.beginPath();
            context.arc(p.x * SCALE, p.y * SCALE, 0.1 * SCALE, 0 , 2 * Math.PI, false);
            context.strokeStyle = '#ff0000';
            context.stroke();
        }

    }

}