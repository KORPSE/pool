/**
 * User: KORPSE
 * Date: 05.11.12
 * Time: 23:39
 */
function UserController(elm, ball) {
    var x0, y0;
    var x, y;
    var cx, cy;
    var dx, dy;
    var pressed = false;

    Event.observe(elm, 'mousedown', function(e) {
        x0 = (Event.pointerX(e) - elm.offsetLeft) / SCALE,
        y0 = (Event.pointerY(e) - elm.offsetTop) / SCALE;
        dx = 0;
        dy = 0;

        cx = ball.getBody().GetPosition().x - x0;
        cy = ball.getBody().GetPosition().y - y0;

        if (ball.testPoint(x0, y0)) {
            pressed = true
        }
    });

    Event.observe(document, 'mousemove', function(e) {
        x = (Event.pointerX(e) - elm.offsetLeft) / SCALE;
        y = (Event.pointerY(e) - elm.offsetTop) / SCALE;
        if(pressed) {
            dx = x0 - x;
            dy = y0 - y;
            var alpha = Math.atan2(dy, dx);
            var vecLen = Math.sqrt(dx * dx + dy * dy);
            if (vecLen > 3) {
                dx = 3 * Math.cos(alpha);
                dy = 3 * Math.sin(alpha);
                x = x0 - dx;
                y = y0 - dy;
            }
        }
    });
    Event.observe(document, 'mouseup', function(e) {
        if(pressed) {
//            x = (Event.pointerX(e) - elm.offsetLeft) / SCALE;
//            y = (Event.pointerY(e) - elm.offsetTop) / SCALE;

            ball.applyImpulse(dx, dy, cx, cy);
            pressed = false;
        }
    });

    this.drawLine = function() {
        if (pressed) {
            var context = elm.getContext('2d');
            context.beginPath();
            context.moveTo(x0 * SCALE, y0 * SCALE);
            context.lineTo(x * SCALE, y * SCALE);
            context.strokeStyle = '#ff0000';
            context.stroke();
        }
    }

}