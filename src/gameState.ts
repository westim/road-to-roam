export interface GameState {
    direction: number;
    speedX: number;
    speedY: number;
    life: number;
    useMouse: boolean;
}

export let gameState: GameState = {
    direction: 0,
    speedX: 0,
    speedY: 0,
    life: 3,
    useMouse: false
};

