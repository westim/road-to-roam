import { Sprite, randInt } from 'kontra';
import { GameState } from './gameState';
import { loadImage } from './util';

const images = [
    '../assets/rock1.webp',
    '../assets/rock2.webp',
    '../assets/tree1.webp',
    '../assets/tree2.webp',
];

export async function createObstacle(canvas: HTMLCanvasElement, gameState: GameState): Promise<Sprite> {
    let idx = randInt(0, images.length - 1);
    let img = await loadImage(images[idx]);
    return Sprite({
        type: 'obstacle',
        image: img,
        x: randInt(-canvas.width * 0.5, canvas.width * 1.5),
        y: canvas.height * 1.1,
        kill: false,
        scaleX: 3,
        scaleY: 3,
        update() {
            this.dx = gameState.speed.x;
            this.dy = gameState.speed.y;
            this.advance();
        },
        isAlive() {
            return !this.kill && this.y > -this.world.height * 2;
        }
    });
}
