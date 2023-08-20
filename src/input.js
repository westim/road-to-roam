import { initInput, onInput } from 'kontra';
import { gameState } from './gameState';

initInput();

onInput(['arrowleft', 'dpadleft'], () => {
    gameState.direction = Math.max(gameState.direction - 1, -2);
});

onInput(['arrowright', 'dpadright'], () => {
    gameState.direction = Math.min(gameState.direction + 1, 2);
});

onInput(['arrowdown', 'dpaddown'], () => {
    gameState.direction = 0;
});

