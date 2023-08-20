import { init, Sprite, GameLoop } from 'kontra';
import { gameState } from './gameState';

let { canvas } = init();

let { clientWidth, clientHeight } = document.getElementById('canvas');
canvas.width = clientWidth;
canvas.height = clientHeight;

let randInt = (min, max) => Math.random() * (max - min + 1) + min;

let sprites = [];
let leftBound = canvas.width / 32;
let rightBound = canvas.width - leftBound;

let player = Sprite({
    type: 'player',
    x: canvas.width / 2,
    y: canvas.height / 4,
    radius: canvas.width / 64,
    render() {
        this.context.strokeStyle = 'white';
        this.context.beginPath();
        this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
        this.context.stroke();
    },
    update() {
        this.dx = gameState.direction * (canvas.width / 256);
        this.advance();
        if (this.x < leftBound) {
            this.x = leftBound;
            gameState.direction = 0;
        }
        else if (this.x > rightBound) {
            this.x = rightBound;
            gameState.direction = 0;
        }
    }
});
sprites.push(player);

let arrow = Sprite({
    type: 'arrow',
    x: randInt(0, canvas.width),
    y: canvas.height + 10,
    dy: canvas.height * -0.01,
    render() {
        this.context.strokeStyle = 'white';
        this.context.beginPath();
        this.context.moveTo(-5, 5);
        this.context.lineTo(0, -5);
        this.context.lineTo(5, 5);
        this.context.closePath();
        this.context.stroke();
    },
    update() {
        if (arrow.y < -10) {
            arrow.y = canvas.height;
            arrow.x = randInt(5, canvas.width - 5);
        }
        this.advance();
    }
});
sprites.push(arrow);

let loop = GameLoop({
    blur: true,
    update: () => {
        sprites.forEach(s => s.update());
    },
    render: () => {
        sprites.forEach(s => s.render());
    }
}).start();

