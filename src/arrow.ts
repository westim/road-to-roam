import { Sprite } from 'kontra';
import { createObstacle } from './obstacle';
import { GameState } from './gameState';

export async function createArrow(canvas: HTMLCanvasElement, gameState: GameState): Promise<Sprite> {
    let img = await loadImage('../assets/arrow.webp');
    let obj = createObstacle(canvas, gameState);
    obj.update = function() {
        this.dx = gameState.speed.x;
        this.dy = gameState.speed.y - gameState.speed.length();
        this.advance();
    }
    return obj;
}
