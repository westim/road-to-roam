import { Sprite, randInt } from 'kontra';
import { GameState } from './gameState';

const images = [
    '../assets/rock1.webp',
    '../assets/rock2.webp',
    '../assets/tree1.webp',
    '../assets/tree2.webp',
];

export function createObstacle(canvas: HTMLCanvasElement, gameState: GameState, accentColor: string): Sprite {
    let idx = randInt(0, images.length - 1);
    let img = new Image();
    img.src = images[idx];
    return Sprite({
        type: 'obstacle',
        image: img,
        scaleX: 3,
        scaleY: 3,
        init() {
            this.x = randInt(-canvas.width * 0.5, canvas.width * 1.5);
            this.y = canvas.height * 1.1;
            this.kill = false;
        },
        update() {
            this.dx = gameState.speed.x;
            this.dy = gameState.speed.y;
            this.advance();
        },
        isAlive() {
            return !this.kill && this.y > -this.world.height;
        }
    });
}

