import { Text } from 'kontra';

export function createPause(canvas: HTMLCanvasElement): Text {
    return Text({
        text: 'paused',
        font: `italic ${canvas.height / 20}px Arial`,
        color: 'white',
        anchor: { x: 0.5, y: 0.5 },
        x: canvas.width / 2,
        y: canvas.height / 2,
    });
}

