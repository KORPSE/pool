
var world;
var ballFactory;
var listener;
var controller;

Event.observe(window, 'load', function() {
    var ctx = $('canvas').getContext('2d');
    var canvasElm = $('canvas');
    var canvasWidth = parseInt(canvasElm.width);
    var canvasHeight = parseInt(canvasElm.height);

    world = new World(ctx, canvasWidth, canvasHeight);

    ballFactory = new BallFactory(world);

    var ball = ballFactory.createBall(3, 6.5, true);

    var strategy = new RhombStrategy();

    ballFactory.createMany(strategy.generate(new b2Vec2(3.5, 4)));

    listener = new PocketContactListener(world.getWorld());
    world.getWorld().SetContactListener(listener);

    controller = new UserController(canvasElm, ball, world);
    world.setController(controller);

    var render = new Render(ctx, canvasWidth, canvasHeight);
    world.setRender(render);

    world.initWorld();
    //ball.applyImpulse(5, 5);
    //ball1.applyImpulse(5, -5);

    //window.setInterval(function() { world.update(); }, 1000 / 60);

//    step();
});