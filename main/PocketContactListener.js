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

    if (userDataA != null && userDataB != null) {
        if (userDataA.getType() == BALL && userDataB.getType() == POCKET) {
            console.log("ball goes away");
            world.addToDestroy(contact.GetFixtureA().GetBody());
        }
    }
}