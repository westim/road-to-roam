import { Sprite } from 'kontra';
import { createObstacle } from './obstacle';
import { GameState } from './gameState';

export function createArrow(canvas: HTMLCanvasElement, gameState: GameState, accentColor: string): Sprite {
    let obj = createObstacle(canvas, gameState, accentColor);
    obj.update = function() {
        this.dx = gameState.speed.x;
        this.dy = gameState.speed.y - gameState.speed.length();
        this.advance();
    }
    return obj;
}
