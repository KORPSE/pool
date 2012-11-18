/**
 * User: KORPSE
 * Date: 16.11.12
 * Time: 23:36
 */

b2Vec2 = Box2D.Common.Math.b2Vec2;
b2AABB = Box2D.Collision.b2AABB;
b2BodyDef = Box2D.Dynamics.b2BodyDef;
b2Body = Box2D.Dynamics.b2Body;
b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
b2Fixture = Box2D.Dynamics.b2Fixture;
b2World = Box2D.Dynamics.b2World;
b2ContactListener = Box2D.Dynamics.b2ContactListener;
b2MassData = Box2D.Collision.Shapes.b2MassData;
b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;
b2Math = Box2D.Common.b2Math;
const BALL = 1;
const POCKET = 2;
const WALL = 3;
const SCALE = 30;

function PocketData() {
    this.getType = function () {
        return POCKET;
    }
}

function BallData(b) {
    this.getType = function () {
        return BALL;
    }
    this.ball = b;
}

function WallData() {
    this.getType = function () {
        return WALL;
    }
}