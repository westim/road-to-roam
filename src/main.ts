import { init, Sprite, GameLoop, Text, getCanvas, randInt, collides } from 'kontra';
import { gameState } from './gameState';
import { createPause } from './pause';
import { initInputs } from './input';
import { createPointer, pointerToDirection } from './pointer';

let { canvas } = init();
let { clientWidth, clientHeight } = getCanvas() as HTMLCanvasElement;
canvas.width = clientWidth;
canvas.height = clientHeight;
let speedXScale = canvas.width / 400;
let speedYScale = canvas.height / 400;

createPointer(gameState, canvas);

let sprites = new Array<Sprite | Text>();
let leftBound = canvas.width / 32;
let rightBound = canvas.width - leftBound;
let accentColor = '#FFF';

let player = Sprite({
    type: 'player',
    x: canvas.width / 2,
    y: canvas.height / 4,
    radius: canvas.width / 64,
    height: canvas.width / 32,
    width: canvas.width / 32,
    render() {
        this.context.strokeStyle = accentColor;
        this.context.beginPath();
        this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
        this.context.stroke();
    },
    update() {
        if (gameState.useMouse) {
            pointerToDirection(gameState, this);
        }
    }
});
sprites.push(player);

function createHeart(x: number): Sprite {
    return Sprite({
        type: 'heart',
        x: x,
        y: 20,
        render() {
            this.context.strokeStyle = accentColor;
            this.context.beginPath();
            this.context.moveTo(-10, -10);
            this.context.lineTo(10, -10);
            this.context.lineTo(10, 10);
            this.context.lineTo(-10, 10);
            this.context.closePath();
            this.context.stroke();
        },
    });
}

let hearts = new Array(gameState.life).fill(undefined).map(_ => createHeart(canvas.width - 20));
hearts.forEach((heart, i) => heart.x -= i * 30);
sprites.push(...hearts);

let arrow = Sprite({
    type: 'arrow',
    x: randInt(0, canvas.width),
    y: canvas.height + 10,
    height: 10,
    width: 10,
    reset() {
        arrow.y = canvas.height;
        arrow.x = randInt(10, canvas.width);

    },
    render() {
        this.context.strokeStyle = accentColor;
        this.context.beginPath();
        this.context.moveTo(-5, 5);
        this.context.lineTo(0, -5);
        this.context.lineTo(5, 5);
        this.context.closePath();
        this.context.stroke();
    },
    update() {
        if (arrow.y < -10) {
            this.reset();
        }
        this.dx = gameState.speedX;
        this.dy = gameState.speedY;
        this.advance();
    }
});
sprites.push(arrow);

let score = Text({
    text: '',
    font: `${canvas.height / 20}px Courier New`,
    color: accentColor,
    x: 20,
    y: 20,
    value: 0,
    update() {
        score.value += -gameState.speedY / 100;
        score.text = `Distance: ${score.value.toFixed(1)} m`;
        this.advance();
    }
});
sprites.push(score);

let loop = GameLoop({
    blur: true,
    update: () => {
        gameState.speedY = (Math.abs(gameState.direction) - 3) * speedYScale;
        gameState.speedX = -gameState.direction * speedXScale;
        if (collides(player, arrow)) {
            arrow.reset();
            gameState.life--;
            let idx = sprites.findLastIndex((el: Sprite) => el.type === 'heart');
            if (idx >= 0) {
                sprites.splice(idx, 1);
            }
        }
        sprites.forEach(s => s.update());
    },
    render: () => {
        sprites.forEach(s => s.render());
    }
});

let pause = createPause(canvas, accentColor);
initInputs(gameState, loop, canvas, pause);

loop.start();

