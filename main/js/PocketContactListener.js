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
        world.addToDestroy({
            ball: ball,
            pocket: pocket
        });
    }
}