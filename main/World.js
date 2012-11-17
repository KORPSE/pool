/**
 * Created with JetBrains WebStorm.
 * User: KORPSE
 * Date: 05.11.12
 * Time: 12:59
 * To change this template use File | Settings | File Templates.
 */

function World(ctx, canvasWidth, canvasHeight) {

    const SCALE = 30;
    const D = 0.5;
    const D2 = 0.6
    const FRICTION = 0.001;
    const RESTITUTION = 1.0;

    var pockets = new Array();
    var bodiesToDestroy = new Array();

    var world =  new b2World(
        new b2Vec2(0, 0),   // Вектор гравитации.
        true                // doSleep флаг.
    );

    function initDraw() {
        var debugDraw = new b2DebugDraw();

        debugDraw.SetSprite(ctx);
        debugDraw.SetDrawScale(SCALE);
        debugDraw.SetFillAlpha(0.5);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
        draw();
    }

    function draw() {
        var bodyDef = new b2BodyDef();
        var fixDef = new b2FixtureDef();
        /*
            Walls
         */
        fixDef.friction = FRICTION;
        fixDef.restitution = RESTITUTION;

        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape();

        fixDef.shape.SetAsBox(canvasWidth / SCALE, 0.7);
        bodyDef.position.Set(canvasWidth / SCALE / 2, 0);
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        bodyDef.position.Set(canvasWidth / SCALE / 2, canvasHeight / SCALE);
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        fixDef.shape.SetAsBox(0.7, canvasWidth / SCALE);
        bodyDef.position.Set(0, canvasHeight / SCALE / 2);
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        bodyDef.position.Set(canvasWidth / SCALE, canvasHeight / SCALE / 2);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        /*
            Looses
         */
        fixDef.isSensor = true;

        doCreatePocket(fixDef, bodyDef, 0.7, 0.7, D2);
        doCreatePocket(fixDef, bodyDef, canvasWidth / 2 / SCALE, 0.7, D);
        doCreatePocket(fixDef, bodyDef, (canvasWidth / SCALE) - 0.7, 0.7, D2);
        doCreatePocket(fixDef, bodyDef, 0.7, canvasHeight / SCALE - 0.7, D2);
        doCreatePocket(fixDef, bodyDef, canvasWidth / 2 / SCALE, canvasHeight / SCALE - 0.7, D);
        doCreatePocket(fixDef, bodyDef, (canvasWidth / SCALE) - 0.7, canvasHeight / SCALE - 0.7, D2);
    }

    var doCreatePocket = function (fixDef, bodyDef, x, y, d) {

        fixDef.shape = new b2CircleShape(d);
        var pocket;
        bodyDef.position.Set(x, y);
        pockets.push(pocket);

        pocket = world.CreateBody(bodyDef);
        pocket.SetUserData(new PocketData());
        pocket.CreateFixture(fixDef);

    }

    this.getWorld = function () {
        return world;
    }

    this.addToDestroy = function (body) {
        bodiesToDestroy.push(body);
    }

    this.update = function() {

        world.Step(1/60, 10, 10);
        world.DrawDebugData();
        world.ClearForces();

        while(bodiesToDestroy.length > 0) {
            world.DestroyBody(bodiesToDestroy.shift());
        }
    }

    this.initWorld = function () {
        initDraw();
        x = this;
        window.setInterval(function() { x.update(); }, 1000 / 60);
    }
}
