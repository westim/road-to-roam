import { Text } from 'kontra';

export function createPause(canvas: HTMLCanvasElement, accentColor: string): Text {
    return Text({
        text: 'paused',
        font: `italic ${canvas.height / 20}px Arial`,
        color: accentColor,
        x: canvas.width / 2,
        y: canvas.height / 2,
    });
}

