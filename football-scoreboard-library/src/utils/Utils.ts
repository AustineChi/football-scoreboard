import { v4 as uuidv4 } from 'uuid';
import { Match } from '../core/match/Match.model';

/**
 * Generates a unique identifier.
 * @returns {string} A unique UUID string.
 */
export function generateId(): string {
  return uuidv4();
}

/**
 * Formats a Date object to a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} Formatted date string.
 */
export function formatDate(date: Date): string {
  return date.toLocaleString('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

/**
 * Sorts matches by total score, then by most recent start time if scores are equal.
 * @param {Match[]} matches - The list of matches to sort.
 * @returns {Match[]} Sorted list of matches.
 */
export function sortMatches(matches: Match[]): Match[] {
  return matches.sort((a, b) => {
    const scoreDifference =
      b.homeScore + b.awayScore - (a.homeScore + a.awayScore);

    if (scoreDifference !== 0) return scoreDifference;

    const timeA = a.startTime ? a.startTime.getTime() : 0;
    const timeB = b.startTime ? b.startTime.getTime() : 0;

    return timeB - timeA;
  });
}

/**
 * Finds a match by its ID.
 * @param {Match[]} matches - The list of matches.
 * @param {string} matchId - The ID of the match to find.
 * @returns {Match | undefined} The match if found, otherwise undefined.
 */
export function findMatchById(
  matches: Match[],
  matchId: string
): Match | undefined {
  return matches.find((match) => match.id === matchId);
}
