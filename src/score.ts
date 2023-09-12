import { Text } from 'kontra';
import { GameState } from './gameState';

export function createScore(canvas: HTMLCanvasElement, gameState: GameState, bestScore: number, accentColor: string): Text {
    let score = Text({
        text: '',
        font: `${canvas.width / 32}px Courier New`,
        color: accentColor,
        x: 20,
        y: 20,
        value: 0,
        update() {
            score.value += -gameState.speed.y * 0.01;
            if (bestScore > 0) {
                score.text = `Distance: ${score.value.toFixed(1)} m (Best: ${Math.max(score.value, bestScore).toFixed(1)} m)`;
            }
            else {
                score.text = `Distance: ${score.value.toFixed(1)} m`;
            }
        }
    });
    return score;
}
