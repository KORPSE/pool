/**
 * User: KORPSE
 * Date: 05.11.12
 * Time: 23:39
 */
function UserController(elm, ball) {
    var x0, y0;
    var x, y;
    var cx, cy;
    var pressed = false;

    Event.observe(elm, 'mousedown', function(e) {
        x0 = (Event.pointerX(e) - elm.offsetLeft) / SCALE,
        y0 = (Event.pointerY(e) - elm.offsetTop) / SCALE;

        cx = ball.getBody().GetPosition().x - x0;
        cy = ball.getBody().GetPosition().y - y0;

        if (ball.testPoint(x0, y0)) {
            pressed = true
        }
    });

    Event.observe(document, 'mouseup', function(e) {
        if(pressed) {
            x = (Event.pointerX(e) - elm.offsetLeft) / SCALE,
            y = (Event.pointerY(e) - elm.offsetTop) / SCALE;
            ball.applyImpulse(x0 - x, y0 - y, cx, cy);
            pressed = false;
        }
    });

}