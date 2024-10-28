import { findMatchById } from '../../utils/Utils';
import { Match } from '../match';

export function updateScore(
  matches: Match[],
  matchId: string,
  homeScore: number,
  awayScore: number
): Match[] {
  const matchToUpdate = findMatchById(matches, matchId);

  if (!matchToUpdate) {
    throw new Error(`Match with ID ${matchId} not found.`);
  }

  if (matchToUpdate.isFinished) {
    throw new Error(
      `Cannot update score for a finished match (ID: ${matchId}).`
    );
  }

  if (
    typeof homeScore !== 'number' ||
    typeof awayScore !== 'number' ||
    homeScore < 0 ||
    awayScore < 0
  ) {
    return matches;
  }

  return matches.map((match) =>
    match.id === matchId ? { ...match, homeScore, awayScore } : match
  );
}
