import { sortMatches } from '../../utils/Utils';
import { Match } from '../match';

/**
 * Gets a summary of matches in progress, sorted by total score and start time.
 * @param {Match[]} matches - The list of matches in the scoreboard.
 * @returns {Match[]} The sorted list of matches in progress.
 */
export function getSummary(matches: Match[]): Match[] {
  const inProgressMatches = matches.filter((match) => !match.isFinished);

  return sortMatches(inProgressMatches);
}
