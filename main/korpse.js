
var world;
var ballFactory;
var listener;
var controller;

Event.observe(window, 'load', function() {
    var ctx = $('canvas').getContext('2d');
    var canvasElm = $('canvas');
    var canvasWidth = parseInt(canvasElm.width);
    var canvasHeight = parseInt(canvasElm.height);

    world = new World(ctx, 600, 400);
    world.initWorld();
    ballFactory = new BallFactory(world);

    var ball = ballFactory.createBall(3, 6.5);

    ballFactory.createMany(
        [
            {x:4, y: 4},
            {x:4.7, y: 3.6}, {x:4.7, y: 4.4},
            {x:5.4, y: 3.2}, {x:5.4, y: 4}, {x:5.4, y: 4.8}
        ]
    );

    listener = new PocketContactListener(world.getWorld());
    world.getWorld().SetContactListener(listener);

    controller = new UserController(canvasElm, ball);
    world.setController(controller);

    //ball.applyImpulse(5, 5);
    //ball1.applyImpulse(5, -5);

    //window.setInterval(function() { world.update(); }, 1000 / 60);

//    step();
});