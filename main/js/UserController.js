/**
 * User: KORPSE
 * Date: 05.11.12
 * Time: 23:39
 */
function UserController(elm, ball, world, controlSightDraw) {
    var x0, y0;
    var x, y;
    var cx, cy;
    var dx, dy;

    const PRESSED = 1;
    const RELEASED = 2;
    const FREE = 0;

    var state = FREE;


    var stop = function (stop) {
        x0 = null; y0 = null;
        x = null; y = null;
        if (stop) {
            state = FREE;
        }
    }

    Event.observe(elm, 'contextmenu', function(e) {
        stop(true);
        e.stop();
    });


    Event.observe(document, 'mousedown', function(e) {
        var mx = (Event.pointerX(e) - elm.offsetLeft) / SCALE;
        var my = (Event.pointerY(e) - elm.offsetTop) / SCALE;

        if (state == FREE) {
            if (ball.testPoint(mx, my) && world.isAllBallsSleep()) {
                state = PRESSED;
            }
        } else if (state == RELEASED) {
            stop(true);
            if (Event.isLeftClick(e)) {
                if (!ball.testPoint(mx, my)) {
                    cx = ball.getBody().GetPosition().x - x0;
                    cy = ball.getBody().GetPosition().y - y0;
                }
                ball.applyImpulse(dx, dy, cx, cy);
            }
        }

    });

    Event.observe(document, 'mousemove', function(e) {
        var mx = (Event.pointerX(e) - elm.offsetLeft) / SCALE;
        var my = (Event.pointerY(e) - elm.offsetTop) / SCALE;
        var ballVec = ball.getBody().GetPosition();

        if(state == PRESSED || state == FREE) {
            var p = Utils.calculateImpulsePoint(ball.getBody().GetPosition(), new b2Vec2(mx, my));

            x0 = p.x;
            y0 = p.y;
        }

        if(state == PRESSED) {
            if (!ball.testPoint(mx, my)) {
                dx = x0 - mx;
                dy = y0 - my;
                var alpha = Math.atan2(dy, dx);
                var vecLen = (new b2Vec2(dx, dy)).Length();
                if (vecLen > 3) {
                    dx = 3 * Math.cos(alpha);
                    dy = 3 * Math.sin(alpha);
                    x = x0 - dx;
                    y = y0 - dy;
                } else  if (!ball.testPoint(mx, my)) {
                    x = mx;
                    y = my;
                }
            } else {
                stop(false);
            }
        } else if (state == RELEASED) {
            var ballVec = ball.getBody().GetPosition();
            var p = Utils.calculateImpulsePoint(ballVec, new b2Vec2(mx, my));
            if (Utils.calculateAngle(new b2Vec2(p.x - ballVec.x, p.y - ballVec.y), new b2Vec2(-dx, -dy)) < Math.PI / 2.3) {
                x0 = p.x; y0 = p.y;
                x = x0 - dx; y = y0 - dy;
            }
        }
    });

    Event.observe(document, 'mouseup', function(e) {

        var mx = (Event.pointerX(e) - elm.offsetLeft) / SCALE;
        var my = (Event.pointerY(e) - elm.offsetTop) / SCALE;

        if (state == PRESSED ) {
            if (!ball.testPoint(mx, my)) {
                state = RELEASED;
            } else {
                stop(true);
            }
        }
    });

    this.drawControlSight = function() {
        var context = elm.getContext('2d');
        if ((state == PRESSED || state == RELEASED) && world.isAllBallsSleep()) {
            controlSightDraw.drawControlSight(x0, y0, x, y, ball);
        }

    }

}