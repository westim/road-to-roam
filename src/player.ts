import { Sprite, SpriteSheet } from 'kontra';

export function createFrontPlayer(canvas: HTMLCanvasElement, img: HTMLImageElement): Sprite {
    let frontSheet = SpriteSheet({
        image: img,
        frameWidth: 90,
        frameHeight: 200,
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
        animations: frontSheet.animations
    });
    return player;
}

export function createRightSidePlayer(canvas: HTMLCanvasElement, img: HTMLImageElement): Sprite {

    // The animations don't have the same height & width, so it's easier
    // to build a separate SpriteSheet instead of 2 animations on the same sheet
    let sideSheet = SpriteSheet({
        image: img,
        frameWidth: 200,
        frameHeight: 200,
        frameMargin: 1,
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
        animations: sideSheet.animations
    });
    return player;
}

export function createLeftSidePlayer(canvas: HTMLCanvasElement, img: HTMLImageElement): Sprite {
    // The animations don't have the same height & width, so it's easier
    // to build a separate SpriteSheet instead of 2 animations on the same sheet
    let sideSheet = SpriteSheet({
        image: img,
        frameWidth: 200,
        frameHeight: 200,
        frameMargin: 1,
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
        animations: sideSheet.animations
    });
    return player;
}

