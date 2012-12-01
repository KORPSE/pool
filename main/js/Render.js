/**
 * User: KORPSE
 * Date: 27.11.12
 * Time: 0:46
 */

function Render(context, canvasWidth, canvasHeight) {
    this.DrawRender = function (bodyList) {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        for (var body = bodyList; body != null; body = body.GetNext()) {
            if (body.GetUserData() instanceof BallData) {
                var x = (body.GetPosition().x - BALL_RADIUS) * SCALE,
                    y = (body.GetPosition().y - BALL_RADIUS) * SCALE,
                    h = BALL_RADIUS * 2 * SCALE,
                    w = h;
                context.drawImage(body.GetUserData().image, x, y, h, w);
            }
        }
    }
}