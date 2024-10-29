import { findMatchById } from '../../utils/Utils';
import { Match } from './Match.model';

/**
 * Marks a match as finished.
 * @param {Match[]} matches - The list of current matches.
 * @param {string} matchId - The ID of the match to finish.
 * @returns {Match[]} The updated list of matches.
 */
export function finishMatch(matches: Match[], matchId: string): Match[] {
  const matchToFinish = findMatchById(matches, matchId);

  if (!matchToFinish) {
    throw new Error(`Match with ID ${matchId} not found.`);
  }

  return matches.map((match) =>
    match.id === matchId ? { ...match, isFinished: true } : match
  );
}
