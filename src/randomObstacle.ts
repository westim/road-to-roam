import { Sprite, randInt } from 'kontra';
import { GameState } from './gameState';
import { createObstacle } from './obstacle';
import { createArrow } from './arrow';
import { createWheel } from './wheel';

export function randomObstacle(canvas: HTMLCanvasElement, gameState: GameState, assets: {[name: string]: HTMLImageElement}): Sprite {
    let weight = randInt(1, 10);
    if (weight <= 6) {
        let randomImage = ['rock1', 'rock2', 'tree1', 'tree2'][randInt(0, 3)];
        return createObstacle(canvas, gameState, assets[randomImage]);
    }
    else if (weight <= 8) {
        return createArrow(canvas, gameState, assets.arrow);
    }
    else {
        return createWheel(canvas, gameState, assets.wheel);
    }
}

