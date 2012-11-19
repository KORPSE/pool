/**
 * User: KORPSE
 * Date: 15.11.12
 * Time: 0:57
 */
PocketContactListener = function (world) {}
PocketContactListener.prototype = b2ContactListener.prototype;

PocketContactListener.prototype.BeginContact = function(contact) {
    console.log("contact");
    var userDataA = contact.GetFixtureA().GetBody().GetUserData();
    var userDataB = contact.GetFixtureB().GetBody().GetUserData();

    if (userDataA instanceof BallData && userDataB instanceof PocketData) {
        var ball = contact.GetFixtureA().GetBody();
        var pocket = contact.GetFixtureB().GetBody();
        var vec1 = ball.GetLinearVelocity();
        var vec20 = ball.GetPosition();
        var vec21 = pocket.GetPosition();
        var vec2 = new b2Vec2(vec21.x - vec20.x, vec21.y - vec20.y);
        var len = (vec1.x * vec2.x + vec1.x * vec2.y) / (Math.pow(vec2.x, 2) + Math.pow(vec2.y, 2));
        if (Math.abs(len) > 0.2) {
            console.log("ball goes away");
            world.addToDestroy(contact.GetFixtureA().GetBody());
        }
    }
}

PocketContactListener.prototype.PostSolve = function (contact, impulse) {

}
