import { Sprite } from 'kontra';
import { GameState } from './gameState';
import { createObstacle } from './obstacle';

export function createCart(canvas: HTMLCanvasElement, gameState: GameState): Sprite {
    let obj = createObstacle(canvas, gameState);
    let sideFactor = Math.random() < 0.5 ? -1 : 1;
    obj.update = function() {
        this.dx = gameState.speed.x + sideFactor * gameState.speed.length();
        this.dy = gameState.speed.y * 0.8;
        this.advance();
    }
    obj.init = function() {
        this.x = canvas.width * 0.5 + canvas.width * (Math.random() + 0.5) * -sideFactor;
        this.y = canvas.height * 1.1;
        this.kill = false;
    }
    return obj;
}
