import { Match } from '../match';

export interface Scoreboard {
  matches: Match[];
}
/**
 * Creates an empty scoreboard.
 * @returns {Scoreboard} The newly initialized scoreboard.
 */
export function createScoreboard(): Scoreboard {
  return {
    matches: [],
  };
}
