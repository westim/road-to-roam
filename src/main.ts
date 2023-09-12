import { init, Sprite, GameLoop, Text, Pool, track, getCanvas, collides } from 'kontra';
import { gameState } from './gameState';
import { createPause } from './pause';
import { initInputs } from './input';
import { createPointer, pointerToDirection } from './pointer';
import { audio } from './song';
import { saveScore, loadScore } from './storage';
import { createHeart } from './heart';
import { createEnd } from './end';
import { createPlayer } from './player';
import { createMute } from './mute';
import { createScore } from './score';
import { randomObstacle } from './randomObstacle';

let { canvas } = init();
({ clientWidth: canvas.width, clientHeight: canvas.height } = getCanvas() as HTMLCanvasElement);
window.addEventListener("resize", function() {
    ({ clientWidth: canvas.width, clientHeight: canvas.height } = getCanvas() as HTMLCanvasElement);
});

let speedScale = 0.002;
gameState.speed.x = canvas.width * speedScale;
gameState.speed.y = canvas.height * speedScale;
let bestScore = loadScore();

createPointer(gameState, canvas);

let ui = new Array<Text>();
let accentColor = 'white';

let player = createPlayer(canvas, gameState, accentColor);
let mute = createMute(canvas, gameState, audio, accentColor);
let hearts = Array.from({ length: gameState.life }, () => createHeart(canvas));
hearts.forEach((heart, i) => heart.x = canvas.width - (i + 2) * heart.world.width);

let obstacles = Pool({
    // @ts-ignore
    create: () => randomObstacle(canvas, gameState, accentColor),
    maxSize: 50,
});

let score = createScore(canvas, gameState, bestScore, accentColor);
ui.push(score);

let loop = GameLoop({
    blur: true,
    update: (dt: number) => {
        gameState.speed.x = -gameState.direction * canvas.width;
        gameState.speed.y = (Math.abs(gameState.direction) - 3) * canvas.height;
        gameState.speed = gameState.speed.normalize().scale(5);
        pointerToDirection(gameState, player);
        let alive = obstacles.getAliveObjects() as Sprite[];
        let obj: Sprite | undefined;
        if (obj = alive.find(ob => collides(player, ob))) {
            obj.kill = true;
            gameState.life--;
            hearts.pop();

            if (gameState.life === 0) {
                saveScore(Math.max(score.value, bestScore));
                let end = createEnd(canvas, accentColor);
                track(end);
                ui.push(end);
                gameState.end = true;
                loop.stop();
            }
        }
        obstacles.update();
        ui.forEach(s => s.update());
        player.update();

        if (gameState.spawnCounter <= 0) {
            obstacles.get();
            gameState.spawnCounter = Math.random() * Math.max(0, (1 - score.value * 0.005));
        }
        gameState.spawnCounter -= dt;
    },
    render: () => {
        obstacles.render();
        hearts.forEach(s => s.render());
        ui.forEach(s => s.render());
        mute.render();
        player.render();
    }
});

let pause = createPause(canvas, accentColor);
initInputs(gameState, loop, canvas, pause);

loop.start();

