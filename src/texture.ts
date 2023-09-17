import { Sprite, randInt } from 'kontra';
import { GameState } from './gameState';

export function createTexture(canvas: HTMLCanvasElement, gameState: GameState, img: HTMLImageElement): Sprite {
    let sprite = Sprite({
        image: img,
        x: randInt(-canvas.width * 0.5, canvas.width * 1.5),
        y: canvas.height * 1.1,
        anchor: { x: 0.5, y: 0.5 },
        kill: false,
        update() {
            this.dx = gameState.speed.x;
            this.dy = gameState.speed.y;
            this.advance();
        },
        isAlive() {
            return !this.kill && this.y > -this.world.height * 2;
        }
    });
    sprite.setScale(canvas.width * 0.0005);
    return sprite;
}
