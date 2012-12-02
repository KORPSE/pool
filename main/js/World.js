/**
 * User: KORPSE
 * Date: 05.11.12
 * Time: 12:59
 */

function World(ctx, canvasWidth, canvasHeight) {

    var controller;

    var pockets = new Array();
    var bodiesToDestroy = new Array();

    var sleepState = false;

    var world =  new b2World(
        new b2Vec2(0, 0),   // Вектор гравитации.
        true                // doSleep флаг.
    );

    var render;

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
        fixDef.friction = WORLD_FRICTION;
        fixDef.restitution = WORLD_RESTITUTION;

        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape();

        fixDef.shape.SetAsBox(canvasWidth / SCALE, WORLD_W);
        bodyDef.position.Set(canvasWidth / SCALE / 2, 0);
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        bodyDef.position.Set(canvasWidth / SCALE / 2, canvasHeight / SCALE);
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        fixDef.shape.SetAsBox(WORLD_W, canvasWidth / SCALE);
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
                p: new b2Vec2(WORLD_W, WORLD_W),
                d: WORLD_D2
            },
            {
                p: new b2Vec2(canvasWidth / 2 / SCALE, WORLD_W),
                d: WORLD_D
            },
            {
                p: new b2Vec2((canvasWidth / SCALE) - WORLD_W, WORLD_W),
                d: WORLD_D2
            },
            {
                p: new b2Vec2(WORLD_W, canvasHeight / SCALE - WORLD_W),
                d: WORLD_D2
            },
            {
                p: new b2Vec2(canvasWidth / 2 / SCALE, canvasHeight / SCALE - WORLD_W),
                d: WORLD_D
            },
            {
                p: new b2Vec2(canvasWidth / SCALE - WORLD_W, canvasHeight / SCALE - WORLD_W),
                d: WORLD_D2
            }
        ];
        pockets.each(function (item) {
            doCreatePocket(fixDef, bodyDef, item.p.x, item.p.y, item.d);
        });

        var trapezes = [
            {
                p1: new b2Vec2(WORLD_W + WORLD_D2, WORLD_W),
                p2: new b2Vec2(canvasWidth / 2 / SCALE - WORLD_D, WORLD_W),
                updown: 1,
                leftright: 0
            },
            {
                p1: new b2Vec2(canvasWidth / 2 / SCALE + WORLD_D, WORLD_W),
                p2: new b2Vec2(canvasWidth / SCALE - WORLD_W - WORLD_D2, WORLD_W),
                updown: 1,
                leftright: 0
            },
            {
                p1: new b2Vec2(WORLD_W + WORLD_D2, canvasHeight / SCALE - WORLD_W),
                p2: new b2Vec2(canvasWidth / 2 / SCALE - WORLD_D, canvasHeight / SCALE - WORLD_W),
                updown: -1,
                leftright: 0
            },
            {
                p1: new b2Vec2(canvasWidth / 2 / SCALE + WORLD_D, canvasHeight / SCALE - WORLD_W),
                p2: new b2Vec2(canvasWidth / SCALE - WORLD_W - WORLD_D2, canvasHeight / SCALE - WORLD_W),
                updown: -1,
                leftright: 0
            },
            {
                p1: new b2Vec2(WORLD_W, WORLD_W + WORLD_D2),
                p2: new b2Vec2(WORLD_W, canvasHeight / SCALE - WORLD_W - WORLD_D2),
                updown: 0,
                leftright: 1
            },
            {
                p1: new b2Vec2(canvasWidth / SCALE - WORLD_W, WORLD_W + WORLD_D2),
                p2: new b2Vec2(canvasWidth / SCALE - WORLD_W, canvasHeight / SCALE - WORLD_W - WORLD_D2),
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
            polygon.push(new b2Vec2(x2 - WORLD_BW, y2 + WORLD_BW * 0.8 * updown));
            polygon.push(new b2Vec2(x1 + WORLD_BW, y1 + WORLD_BW * 0.8 * updown));
        } else {
            polygon.push(new b2Vec2(x1, y1));
            polygon.push(new b2Vec2(x2, y2));
            polygon.push(new b2Vec2(x2 + WORLD_BW * 0.8 * leftright, y2 - WORLD_BW));
            polygon.push(new b2Vec2(x1 + WORLD_BW * 0.8 * leftright, y1 + WORLD_BW));
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
        bodyFix.friction = WORLD_FRICTION;
        bodyFix.restitution = WORLD_RESTITUTION;

        bodyDef.position.Set(0, 0);
        bodyDef.shape = bodyPoly;
        bodyDef.position.Set(0, 0);
        world.CreateBody(bodyDef).CreateFixture(bodyFix);

    }

    this.getWorld = function () {
        return world;
    }

    this.setController = function (c) {
        controller = c;
    }

    this.setRender = function (r) {
        render = r;
    }

    this.addToDestroy = function (body) {
        bodiesToDestroy.push(body);
    }

    this.isAllBallsSleep = function () {
        return sleepState;
    }

    var doDestroyBodies = function () {
        var newBodiesToDestroy = new Array();

        while(bodiesToDestroy.length > 0) {
            var ballPocket = bodiesToDestroy.shift();
            var ball = ballPocket.ball;
            var pocket = ballPocket.pocket;
            var vec0 = ball.GetPosition();
            var vec1 = pocket.GetPosition();
            vec0.Subtract(vec1);
            var len = vec0.Length();
            var pocketRadius = pocket.GetFixtureList().GetShape().GetRadius();
            if (len < BALL_RADIUS + pocketRadius - BALL_RADIUS / 2) {
                console.log("ball goes away");

                if (ball.GetUserData().isCue) {
                    controller.newCueState();
                }

                world.DestroyBody(ball);
            } else if (len < BALL_RADIUS + pocketRadius) {
                newBodiesToDestroy.push(ballPocket);
            }
        }

        bodiesToDestroy = newBodiesToDestroy;

    }

    var doStopByMinSpeed = function () {
        var item = world.GetBodyList();
        while (item != null) {
            if (item.GetLinearVelocity().Length() < WORLD_MIN_SPEED && item.GetLinearVelocity().Length() > 0) {
                console.log("stop");
                item.SetLinearVelocity(new b2Vec2(0, 0));
            }
            item = item.GetNext();
        }
    }

    var doSetSleepState = function () {
        var r = true;
        for (var body = world.GetBodyList(); body != null; body = body.GetNext()) {
            if (body.GetUserData() instanceof BallData && body.IsAwake()) {
                r = false;
                break;
            }
        }
        sleepState = r;

    }

    this.update = function () {

        world.Step(1/60, 20);
        if (DEBUG_RENDER) {
            world.DrawDebugData();
        }
        if (render != null && !DEBUG_RENDER) {
            render.drawRender(world.GetBodyList());
            if (this.newCueVec != null) {
                render.renderCueSpriteOnly(this.newCueVec);
            }
        }

        world.ClearForces();

        doDestroyBodies();

        doStopByMinSpeed();

        if (controller != null) {
            controller.drawControlSight();
        }

        doSetSleepState();
    }

    this.initWorld = function () {
        initDraw();
        x = this;
        window.setInterval(function() { x.update(); }, 1000 / 60);
    }

    this.checkPosition4Cue = function (x, y) {
        if (x > WORLD_W + WORLD_BW + BALL_RADIUS && x < canvasWidth / SCALE - WORLD_W - WORLD_BW - BALL_RADIUS &&
            y > WORLD_W + WORLD_BW + BALL_RADIUS && y < canvasHeight / SCALE - WORLD_W - WORLD_BW - BALL_RADIUS) {

            var r = true;
            for (var body = world.GetBodyList(); body != null; body = body.GetNext()) {
                if (body.GetUserData() instanceof BallData) {
                    var p0 = body.GetPosition();
                    var p1 = new b2Vec2(x, y);
                    p1.Subtract(p0);
                    if (p1.Length() < 2 * BALL_RADIUS) {
                        r = false;
                        break;
                    }
                }
            }

            return r;

        }
    }

    this.newCueVec = null;
}
