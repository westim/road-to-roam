import { Sprite, SpriteSheet } from 'kontra';
import { loadImage } from './util';

export async function createPlayer(canvas: HTMLCanvasElement): Promise<Sprite> {
    let img = await loadImage('../assets/frontpng.png');
    let sheet = SpriteSheet({
        image: img,
        frameWidth: 26,
        frameHeight: 63,
        animations: {
            idle: {
                frames: '0..1',
                frameRate: 4
            }
        }
    });

    let player = Sprite({
        type: 'player',
        anchor: { x: 0.5, y: 0.5 },
        x: canvas.width / 2,
        y: canvas.height / 4,
        animations: sheet.animations,
    });
    player.setScale(3);
    return player;
}

