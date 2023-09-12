import { init, Sprite, GameLoop, track, getCanvas, collides } from 'kontra';
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
import { spawnTimer } from './util';

let { canvas } = init();
({ clientWidth: canvas.width, clientHeight: canvas.height } = getCanvas() as HTMLCanvasElement);

let speedScale = 0.002;
gameState.speed.x = canvas.width * speedScale;
gameState.speed.y = canvas.height * speedScale;
let bestScore = loadScore();

createPointer(gameState, canvas);

// Top-level await makes asset loading way way less annoying
let player = await createPlayer(canvas);
let hearts = await Promise.all(Array.from({ length: gameState.life }, async () => await createHeart(canvas)));
hearts.forEach((heart, i) => heart.x = canvas.width - (i + 2) * heart.world.width);

let mute = createMute(canvas, gameState, audio);
let score = createScore(canvas, gameState, bestScore);
let ui = [mute, score];
let obstacles: Sprite[];

let loop = GameLoop({
    blur: true,
    update: async (dt: number) => {
        pointerToDirection(gameState, player);
        gameState.speed.x = -gameState.direction * canvas.width;
        gameState.speed.y = (Math.abs(gameState.direction) - 3) * canvas.height;
        gameState.speed = gameState.speed.normalize().scale(5);
        obstacles = obstacles.filter(ob => ob.isAlive());
        let obj: Sprite | undefined;
        if (obj = obstacles.find(ob => collides(player, ob))) {
            obj.kill = true;
            gameState.life--;
            hearts.pop();
        }

        if (gameState.life <= 0) {
            saveScore(Math.max(score.value, bestScore));
            let end = createEnd(canvas);
            track(end);
            ui.push(end);
            gameState.end = true;
            loop.stop();
        }

        obstacles.forEach(s => s.update());
        ui.forEach(s => s.update());
        player.update();

        // Spawn rates probably shouldn't be tied to framerate,
        // but it's way easier than time-based spawning
        gameState.spawnCounter -= dt;
        if (gameState.spawnCounter <= 0) {
            obstacles.push(await randomObstacle(canvas, gameState));
            gameState.spawnCounter = spawnTimer(score.value);
        }
    },
    render: () => {
        obstacles.forEach(s => s.render());
        hearts.forEach(s => s.render());
        ui.forEach(s => s.render());
        player.render();
    }
});

let pause = createPause(canvas);
initInputs(gameState, loop, canvas, pause);

loop.start();
