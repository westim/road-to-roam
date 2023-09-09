import { getPointer, Sprite, initPointer } from 'kontra';
import { GameState } from './gameState';

export function createPointer(gameState: GameState, canvas: HTMLCanvasElement) {
    initPointer();
    canvas.addEventListener('mousemove', () => gameState.useMouse = true);
}

export function pointerToDirection(gameState: GameState, player: Sprite): void {
    let { x: pointerX, y: pointerY } = getPointer();
    let { x: playerX, y: playerY } = player;

    let deltaX = Math.abs(pointerX - playerX);
    let deltaY = Math.abs(pointerY - playerY);
    if (deltaY < 10 && deltaX < 10) {
        gameState.direction = 0;
        return;
    }

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
    if (pointerX < playerX) {
        gameState.direction = -gameState.direction;
    }
}

