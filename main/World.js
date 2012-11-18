/**
 * Created with JetBrains WebStorm.
 * User: KORPSE
 * Date: 05.11.12
 * Time: 12:59
 * To change this template use File | Settings | File Templates.
 */

function World(ctx, canvasWidth, canvasHeight) {

    const D = 0.5;
    const D2 = 0.6;
    const W = 0.7;
    const FRICTION = 0.5;
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

        fixDef.shape.SetAsBox(canvasWidth / SCALE, W);
        bodyDef.position.Set(canvasWidth / SCALE / 2, 0);
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        bodyDef.position.Set(canvasWidth / SCALE / 2, canvasHeight / SCALE);
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        fixDef.shape.SetAsBox(W, canvasWidth / SCALE);
        bodyDef.position.Set(0, canvasHeight / SCALE / 2);
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        bodyDef.position.Set(canvasWidth / SCALE, canvasHeight / SCALE / 2);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        /*
            Looses
         */
        fixDef.isSensor = true;

        var pockets = [
            {
                p: new b2Vec2(W, W),
                d: D2
            },
            {
                p: new b2Vec2(canvasWidth / 2 / SCALE, W),
                d: D
            },
            {
                p: new b2Vec2((canvasWidth / SCALE) - W, W),
                d: D2
            },
            {
                p: new b2Vec2(W, canvasHeight / SCALE - W),
                d: D2
            },
            {
                p: new b2Vec2(canvasWidth / 2 / SCALE, canvasHeight / SCALE - W),
                d: D
            },
            {
                p: new b2Vec2(canvasWidth / SCALE - W, canvasHeight / SCALE - W),
                d: D2
            }
        ];
        pockets.each(function (item) {
            doCreatePocket(fixDef, bodyDef, item.p.x, item.p.y, item.d);
        });

        var trapezes = [
            {
                p1: new b2Vec2(W + D2, W),
                p2: new b2Vec2(canvasWidth / 2 / SCALE - D, W),
                updown: 1,
                leftright: 0
            },
            {
                p1: new b2Vec2(canvasWidth / 2 / SCALE + D, W),
                p2: new b2Vec2(canvasWidth / SCALE - W - D2, W),
                updown: 1,
                leftright: 0
            },
            {
                p1: new b2Vec2(W + D2, canvasHeight / SCALE - W),
                p2: new b2Vec2(canvasWidth / 2 / SCALE - D, canvasHeight / SCALE - W),
                updown: -1,
                leftright: 0
            },
            {
                p1: new b2Vec2(canvasWidth / 2 / SCALE + D, canvasHeight / SCALE - W),
                p2: new b2Vec2(canvasWidth / SCALE - W - D2, canvasHeight / SCALE - W),
                updown: -1,
                leftright: 0
            },
            {
                p1: new b2Vec2(W, W + D2),
                p2: new b2Vec2(W, canvasHeight / SCALE - W - D2),
                updown: 0,
                leftright: 1
            },
            {
                p1: new b2Vec2(canvasWidth / SCALE - W, W + D2),
                p2: new b2Vec2(canvasWidth / SCALE - W, canvasHeight / SCALE - W - D2),
                updown: 0,
                leftright: -1
            }

        ];
        trapezes.each(function (t) {
            doCreateTrapeze(t.p1.x, t.p1.y, t.p2.x, t.p2.y, t.updown, t.leftright);
        });
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

    var doCreateTrapeze = function (x1, y1, x2, y2, updown, leftright) {
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        var bodyPoly = new b2PolygonShape();
        var polygon = new Array();
        if (updown != 0) {
            polygon.push(new b2Vec2(x1, y1));
            polygon.push(new b2Vec2(x2, y2));
            polygon.push(new b2Vec2(x2 - 0.4, y2 + 0.4 * updown));
            polygon.push(new b2Vec2(x1 + 0.4, y1 + 0.4 * updown));
        } else {
            polygon.push(new b2Vec2(x1, y1));
            polygon.push(new b2Vec2(x2, y2));
            polygon.push(new b2Vec2(x2 + 0.4 * leftright, y2 - 0.4));
            polygon.push(new b2Vec2(x1 + 0.4 * leftright, y1 + 0.4));
        }
        if (updown != 0) {
            polygon.sort(function (item) {
                return item.y * -updown;
            });
        } else {
            polygon.sort(function (item) {
                return item.x * leftright;
            });
        }
        bodyPoly.SetAsArray(polygon);
        var bodyFix = new b2FixtureDef();
        bodyFix.shape = bodyPoly;
        bodyFix.friction = FRICTION;
        bodyFix.restitution = RESTITUTION;

        bodyDef.position.Set(0, 0);
        bodyDef.shape = bodyPoly;
        bodyDef.position.Set(0, 0);
        world.CreateBody(bodyDef).CreateFixture(bodyFix);

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
