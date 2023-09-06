export interface GameState {
    direction: number;
    playerPosition: number[];
    useMouse: boolean;
}

export let gameState: GameState = {
    direction: 0,
    playerPosition: [0, 0],
    useMouse: false
};

