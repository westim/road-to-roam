import { Sprite } from "kontra";

export function createHeart(canvas: HTMLCanvasElement, img: HTMLImageElement): Sprite {
    let heart =  Sprite({
        anchor: { x: 0.5, y: 0.5 },
        image: img,
    });
    heart.setScale(canvas.width * 0.004);
    heart.y = heart.world.height;
    return heart;
}

