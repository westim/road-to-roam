import { Sprite, randInt } from 'kontra';
import { GameState } from './gameState';
import { createObstacle } from './obstacle';
import { createArrow } from './arrow';
import { createCart } from './cart';

export function randomObstacle(canvas: HTMLCanvasElement, gameState: GameState, accentColor: string): Sprite {
    return createObstacle(canvas, gameState, accentColor);
    let weight = randInt(1, 10);
    if (weight <= 6) {
        return createObstacle(canvas, gameState, accentColor);
    }
    else if (weight <= 9) {
        return createArrow(canvas, gameState, accentColor);
    }
    else {
        return createCart(canvas, gameState, accentColor);
    }
}

