export interface GameState {
    direction: number;
    speedX: number;
    speedY: number;
    life: number;
    muted: boolean;
    useMouse: boolean;
}

export let gameState: GameState = {
    direction: 0,
    speedX: 0,
    speedY: 0,
    life: 3,
    muted: false,
    useMouse: false
};

