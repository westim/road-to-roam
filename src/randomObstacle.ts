import { Sprite, randInt } from 'kontra';
import { GameState } from './gameState';
import { createObstacle } from './obstacle';
import { createArrow } from './arrow';
import { createCart } from './cart';

export async function randomObstacle(canvas: HTMLCanvasElement, gameState: GameState): Promise<Sprite> {
    return await createObstacle(canvas, gameState);
    let weight = randInt(1, 10);
    if (weight <= 6) {
        return createObstacle(canvas, gameState);
    }
    else if (weight <= 9) {
        return createArrow(canvas, gameState);
    }
    else {
        return createCart(canvas, gameState);
    }
}

