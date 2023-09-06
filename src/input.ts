import { initInput, onInput, GameLoop, Text } from 'kontra';
import { GameState } from './gameState';

export function initInputs(gameState: GameState, gameLoop: GameLoop, canvas: HTMLCanvasElement, pause: Text) {
    initInput();

    onInput(['arrowleft', 'dpadleft'], () => {
        gameState.direction = Math.max(gameState.direction - 1, -3);
        gameState.useMouse = false;
    });

    onInput(['arrowright', 'dpadright'], () => {
        gameState.direction = Math.min(gameState.direction + 1, 3);
        gameState.useMouse = false;
    });

    onInput(['arrowdown', 'dpaddown'], () => {
        gameState.direction = 0;
        gameState.useMouse = false;
    });

    onInput(['esc', 'start'], () => {
        if (gameLoop.isStopped) {
            gameLoop.start();
            canvas.style.background = '#057';
        }
        else {
            gameLoop.stop();
            canvas.style.background = '#003';
            pause.render();
        }
    });
}

