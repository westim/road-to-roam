import { Sprite } from 'kontra';
import { GameState } from './gameState';
import { pointerToDirection } from './pointer';

export function createPlayer(canvas: HTMLCanvasElement, gameState: GameState, accentColor: string): Sprite {
    return Sprite({
        type: 'player',
        x: canvas.width / 2,
        y: canvas.height / 4,
        radius: canvas.width / 64,
        height: canvas.width / 32,
        width: canvas.width / 32,
        render() {
            this.context.strokeStyle = accentColor;
            this.context.beginPath();
            this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
            this.context.stroke();
        },
        update() {
            if (gameState.useMouse) {
                pointerToDirection(gameState, this);
            }
        }
    });
}
