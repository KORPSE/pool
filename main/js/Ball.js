/**
 * Created with JetBrains WebStorm.
 * User: KORPSE
 * Date: 05.11.12
 * Time: 14:18
 * To change this template use File | Settings | File Templates.
 */

function Ball(world, x, y, isCue) {

    var bodyDef = new b2BodyDef;
    var fixDef = new b2FixtureDef;

    fixDef.density = 0.9;
    fixDef.friction = BALL_FRICTION;
    fixDef.restitution = BALL_RESTITUTION;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.linearDamping = BALL_DAMPING;
    bodyDef.angularDamping = BALL_DAMPING * 3;
    fixDef.shape = new b2CircleShape(BALL_RADIUS);
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    var ball = world.getWorld().CreateBody(bodyDef);
    ball.SetUserData(new BallData(this, isCue));
    var ballFixture = ball.CreateFixture(fixDef);

    this.getBody = function () {
        return ball;
    }

    this.testPoint = function (x, y) {
        var shape = ballFixture.GetShape();
        if (shape != null) {
            return shape.TestPoint(ball.GetTransform(), new b2Vec2(x,y));
        } else {
            return false;
        }
    }

    this.applyImpulse = function (dx, dy, cx, cy) {
        ball.ApplyImpulse(new b2Vec2(dx * BALL_FORCECOEFF, dy * BALL_FORCECOEFF), new b2Vec2(ball.GetPosition().x - cx, ball.GetPosition().y - cy));
    }

}