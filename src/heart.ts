import { Sprite } from "kontra";

export function createHeart(): Sprite {
    let img = new Image();
    img.src = '../assets/heart.webp';
    return Sprite({
        type: 'heart',
        y: 40,
        anchor: { x: 0.5, y: 0.5 },
        scaleX: 4,
        scaleY: 4,
        image: img,
    });
}

