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

/**
 * Ball constants
 */
const BALL_RADIUS = 0.35;
const BALL_DAMPING = 0.7;
const BALL_FORCECOEFF = 4;
const BALL_RESTITUTION = 1;

/**
 * World constants
 */
const WORLD_D = 0.5;
const WORLD_D2 = 0.6;
const WORLD_W = 0.7;
const WORLD_BW = WORLD_D;
const WORLD_FRICTION = 0.5;
const WORLD_RESTITUTION = 0.9;
const WORLD_MIN_SPEED = 0.15;

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
    this.onBorder = false;
}

function WallData() {
    this.getType = function () {
        return WALL;
    }
}