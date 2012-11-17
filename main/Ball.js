/**
 * Created with JetBrains WebStorm.
 * User: KORPSE
 * Date: 05.11.12
 * Time: 14:18
 * To change this template use File | Settings | File Templates.
 */

function Ball(world, x, y) {

    const RADIUS = 0.45;
    const DUMPING = 0.5;
    const FORCECOEFF = 5;

    var bodyDef = new b2BodyDef;
    var fixDef = new b2FixtureDef;

    fixDef.density = 0.7;
    fixDef.friction = 0.8;
    fixDef.restitution = 0.9;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.linearDamping = DUMPING;
    bodyDef.angularDamping = DUMPING * 2;
    fixDef.shape = new b2CircleShape(RADIUS);
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    var ball = world.getWorld().CreateBody(bodyDef);
    ball.SetUserData(new BallData());
    var ballFixture = ball.CreateFixture(fixDef);

    this.getBody = function () {
        return ball;
    }

    this.testPoint = function (x, y) {
        return ballFixture.GetShape().TestPoint(ball.GetTransform(), new b2Vec2(x,y));
    }

    this.applyImpulse = function (dx, dy, cx, cy) {
        ball.ApplyImpulse(new b2Vec2(dx * FORCECOEFF, dy * FORCECOEFF), new b2Vec2(ball.GetPosition().x - cx, ball.GetPosition().y - cy));
    }

}