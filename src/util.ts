/**
 * This is a custom linear function to increase the random spawn rate
 * of obstacles as the score increases.
 * The max spawn time drops from 2 seconds to 0.1 seconds when the score reaches 500.
 * @param score current score of the game
 * @returns time until the next spawn
 */
export function spawnTimer(score: number): number {
    return Math.random() * Math.max(0.1, (2 - score * 0.006));
}

