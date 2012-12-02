
var world;
var ballFactory;
var listener;
var draw;
var controller;

function start (strategyName) {

    if (world != null) {
        clearInterval(world.interval);
    }
    var ctx = $('canvas').getContext('2d');
    var canvasElm = $('canvas');
    var canvasWidth = parseInt(canvasElm.width);
    var canvasHeight = parseInt(canvasElm.height);

    world = new World(ctx, canvasWidth, canvasHeight);

    ballFactory = new BallFactory(world);

    var ball = ballFactory.createBall(3, 6.5, true);

    var strategy = getStrategy(strategyName);

    ballFactory.createMany(strategy.generate(new b2Vec2(3.5, 4)));

    listener = new PocketContactListener(world.getWorld());
    world.getWorld().SetContactListener(listener);

    draw = new ControlSightsDraw(ctx);

    controller = new UserController(canvasElm, ball, world, draw, ballFactory);
    world.setController(controller);

    var render = new Render(ctx, canvasWidth, canvasHeight);
    world.setRender(render);

    world.initWorld();
}

Event.observe(window, 'load', function() {
    start("triangle");
    $$("input[type=radio][name='strategy']").each(function (a) {
        a.observe("change", function(event) {
            var strategyName = Form.getInputs("strForm", "radio", "strategy").find(function(radio) { return radio.checked; }).value;
            start(strategyName);
        });
    });
});