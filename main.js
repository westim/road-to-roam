import { init, Sprite, GameLoop } from 'kontra';
const { canvas } = init();

let { clientWidth, clientHeight } = document.getElementById('canvas');
canvas.width = clientWidth;
canvas.height = clientHeight;

let randInt = (min, max) => Math.random() * (max - min) + min;
let sprites = [];

let arrow = Sprite({
    type: 'arrow',
    x: randInt(0, canvas.width),
    y: canvas.height + 10,
    dy: -10,
    render() {
        this.context.strokeStyle = 'white';
        this.context.beginPath();
        this.context.moveTo(-5, 5);
        this.context.lineTo(0, -5);
        this.context.lineTo(5, 5);
        this.context.closePath();
        this.context.stroke();
    }
});

sprites.push(arrow);

const loop = GameLoop({  // create the main game loop
    blur: true,
    update: function() { // update the game state
        sprites.forEach(s => s.update());
        if (arrow.y < -10) {
            arrow.y = canvas.height;
            arrow.x = randInt(5, canvas.width - 5);
        }
    },
    render: function() { // render the game state
        sprites.forEach(s => s.render());
    }
});

loop.start();    // start the game

