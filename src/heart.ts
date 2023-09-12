import { Sprite } from "kontra";

export function createHeart(canvas: HTMLCanvasElement): Sprite {
    let img = new Image();
    img.src = '../assets/heart.webp';
    let heart =  Sprite({
        type: 'heart',
        anchor: { x: 0.5, y: 0.5 },
        image: img,
    });
    heart.setScale(canvas.width * 0.003);
    heart.y = heart.world.height;
    return heart;
}

