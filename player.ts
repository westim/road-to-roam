import { Sprite, SpriteSheet } from 'kontra';

const playerScale = (canvas: HTMLCanvasElement) => canvas.width * 0.002;

export function createFrontPlayer(canvas: HTMLCanvasElement, img: HTMLImageElement): Sprite {
    let frontSheet = SpriteSheet({
        image: img,
        frameWidth: 23,
        frameHeight: 50,
        frameMargin: 1,
        animations: {
            front: {
                frames: '0..1',
                frameRate: 4
            },
        }
    });

    let player = Sprite({
        anchor: { x: 0.5, y: 0.5 },
        x: canvas.width / 2,
        y: canvas.height / 4,
        scaleX: playerScale(canvas),
        scaleY: playerScale(canvas),
        animations: frontSheet.animations
    });
    return player;
}

export function createRightSidePlayer(canvas: HTMLCanvasElement, img: HTMLImageElement): Sprite {
    // The animations don't have the same height & width, so it's easier
    // to build a separate SpriteSheet instead of 2 animations on the same sheet
    let sideSheet = SpriteSheet({
        image: img,
        frameWidth: 50,
        frameHeight: 50,
        animations: {
            idle: {
                frames: '0..1',
                frameRate: 4
            },
        }
    });

    let player = Sprite({
        anchor: { x: 0.5, y: 0.5 },
        x: canvas.width / 2,
        y: canvas.height / 4,
        scaleX: playerScale(canvas),
        scaleY: playerScale(canvas),
        animations: sideSheet.animations
    });
    return player;
}

export function createLeftSidePlayer(canvas: HTMLCanvasElement, img: HTMLImageElement): Sprite {
    let player = createRightSidePlayer(canvas, img);
    player.setScale(-playerScale(canvas), playerScale(canvas));
    return player;
}

