import { generateId } from '../../utils/Utils';
import { Match } from './Match.model';

/**
 * Creates a new match with the given home and away teams.
 * @param {string} homeTeam - The name of the home team.
 * @param {string} awayTeam - The name of the away team.
 * @returns {Match} The newly created match object.
 */
export function createMatch(homeTeam: string, awayTeam: string): Match {
  return {
    id: generateId(),
    homeTeam,
    awayTeam,
    homeScore: 0,
    awayScore: 0,
    startTime: new Date(),
    isFinished: false,
  };
}
