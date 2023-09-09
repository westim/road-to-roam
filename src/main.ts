import { init, Sprite, GameLoop, Text, track, getCanvas, randInt, collides } from 'kontra';
import { gameState } from './gameState';
import { createPause } from './pause';
import { initInputs } from './input';
import { createPointer, pointerToDirection } from './pointer';
import { audio } from './song';
import { saveScore, loadScore } from './storage';

let { canvas } = init();
let { clientWidth, clientHeight } = getCanvas() as HTMLCanvasElement;
canvas.width = clientWidth;
canvas.height = clientHeight;
let speedXScale = canvas.width / 400;
let speedYScale = canvas.height / 400;
let bestScore = loadScore();

createPointer(gameState, canvas);

let sprites = new Array<Sprite | Text>();
let leftBound = canvas.width / 32;
let rightBound = canvas.width - leftBound;
let accentColor = 'white';

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

let mute = Sprite({
    x: 30,
    y: canvas.height - 30,
    height: 40,
    width: 40,
    anchor: { x: 0.5, y: 0.5 },
    render() {
        this.context.fillStyle = accentColor;
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(0, this.height);
        this.context.lineTo(this.width * 0.6, this.height * 0.6);
        this.context.lineTo(this.width, this.height * 0.6);
        this.context.lineTo(this.width, this.height * 0.4);
        this.context.lineTo(this.width * 0.6, this.height * 0.4);
        this.context.lineTo(0, 0);
        this.context.closePath();
        this.context.fill();

        if (gameState.muted) {
            this.context.strokeStyle = 'red';
            this.context.lineWidth = 3;
            this.context.beginPath();
            this.context.moveTo(this.width * 0.8, this.height + 3);
            this.context.lineTo(this.width * 0.2, -3);
            this.context.stroke();
        }
    },
    onDown() {
        gameState.muted = !gameState.muted;
        if (gameState.muted) {
            audio.pause();
        }
        else {
            audio.play();
        }
    },
});
track(mute);

function createHeart(): Sprite {
    return Sprite({
        type: 'heart',
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
let hearts = Array.from({ length: gameState.life }, () => createHeart());
hearts.forEach((heart, i) => heart.x = canvas.width - (i + 1) * 30);

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
    font: `${canvas.height / 28}px Courier New`,
    color: accentColor,
    x: 20,
    y: 20,
    value: 0,
    update() {
        score.value += -gameState.speedY / 100;
        score.text = `Distance: ${score.value.toFixed(1)} m (Best: ${Math.max(score.value, bestScore).toFixed(1)} m)`;
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
            hearts.pop();

            if (gameState.life === 0) {
                saveScore(Math.max(score.value, bestScore));
            }
        }
        sprites.forEach(s => s.update());
    },
    render: () => {
        sprites.forEach(s => s.render());
        hearts.forEach(s => s.render());
        mute.render();
    }
});

let pause = createPause(canvas, accentColor);
initInputs(gameState, loop, canvas, pause);

loop.start();

