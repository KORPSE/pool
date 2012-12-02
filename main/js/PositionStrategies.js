/**
 * User: KORPSE
 * Date: 22.11.12
 * Time: 0:40
 */

function getStrategy(str) {
    switch (str) {
        case "triangle" :
            return new TriangleStrategy();
            break;
        case "rhomb" :
            return new RhombStrategy();
            break;
        default :
            return new TriangleStrategy();
    }
}

function BaseStrategy() {
    this.generate = function (startPoint) {}
}

function TriangleStrategy() {
    this.generate = function(startPoint) {
        var result = new Array();
        const dy0 = BALL_RADIUS / 5;
        for (var i = 0; i < 4; i++) {
            var y0 = startPoint.y - (BALL_RADIUS + dy0) * i;
            for (var j = 0; j < i + 1; j++) {
                result.push(new b2Vec2(startPoint.x + BALL_RADIUS * 2 * i, y0 + (BALL_RADIUS + dy0) * 2 * j));
            }
        }
        return result;
    }
}

function RhombStrategy() {
    this.generate = function(startPoint) {
        var result = new Array();
        const dy0 = BALL_RADIUS / 5;
        for (var i = 0; i < 3; i++) {
            var y0 = startPoint.y - (BALL_RADIUS + dy0) * i;
            for (var j = 0; j < i + 1; j++) {
                result.push(new b2Vec2(startPoint.x + BALL_RADIUS * 2 * i, y0 + (BALL_RADIUS + dy0) * 2 * j));
            }
        }
        for (var i = 3; i < 5; i++) {
            var y0 = startPoint.y - BALL_RADIUS * (4 - i);
            for (var j = 0; j < (5 - i); j++) {
                result.push(new b2Vec2(startPoint.x + BALL_RADIUS * 2 * i, y0 + (BALL_RADIUS + dy0) * 2 * j));
            }
        }

        return result;
    }
}