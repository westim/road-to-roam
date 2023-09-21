import { Sprite } from 'kontra';
import { createObstacle } from './obstacle';
import { GameState } from './gameState';

export function createArrow(canvas: HTMLCanvasElement, gameState: GameState, img: HTMLImageElement): Sprite {
    let obj = createObstacle(canvas, gameState, img);
    obj.update = function() {
        this.dx = gameState.speed.x;
        this.dy = gameState.speed.y - gameState.speed.length();
        this.advance();
    }
    obj.setScale(canvas.height * 0.001);
    return obj;
}
