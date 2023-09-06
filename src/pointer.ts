import { getPointer, Sprite, initPointer } from 'kontra';
import { GameState } from './gameState';

export function createPointer(gameState: GameState, canvas: HTMLCanvasElement) {
    initPointer();
    canvas.addEventListener('mousemove', () => gameState.useMouse = true, false);
}

export function pointerToDirection(gameState: GameState, player: Sprite) {
    let { x: pointerX, y: pointerY } = getPointer();
    let { x: playerX, y: playerY } = player;

    let deltaX = Math.abs(pointerX - playerX);
    let deltaY = Math.abs(pointerY - playerY);
    let angle = Math.atan(deltaX / deltaY);
    if (angle <= 0.4) {
        gameState.direction = 0;
    }
    else if (angle <= 0.8) {
        gameState.direction = 1;
    }
    else if (angle <= 1.2) {
        gameState.direction = 2;
    }
    else {
        gameState.direction = 3;
    }

    if (pointerX < playerX) {
        gameState.direction *= -1;
    }
}

