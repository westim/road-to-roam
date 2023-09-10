import { Sprite } from "kontra";

export function createHeart(accentColor: string): Sprite {
    return Sprite({
        type: 'heart',
        y: 20,
        render() {
            this.context.strokeStyle = accentColor;
            this.context.beginPath();
            this.context.moveTo(-10, -10);
            this.context.lineTo(10, -10);
            this.context.lineTo(10, 10);
            this.context.lineTo(-10, 10);
            this.context.closePath();
            this.context.stroke();
        },
    });
}

