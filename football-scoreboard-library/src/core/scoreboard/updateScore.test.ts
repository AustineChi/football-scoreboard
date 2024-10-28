import { describe, it, expect } from 'vitest';
import { createMatch } from '../match/createMatch';
import { updateScore } from './updateScore';

describe('updateScore', () => {
  it('should update the score of a match in the scoreboard', () => {
    const match = createMatch('Team A', 'Team B');
    const matches = [match];
    const updatedMatches = updateScore(matches, match.id, 3, 2);

    const updatedMatch = updatedMatches.find((m) => m.id === match.id);
    expect(updatedMatch?.homeScore).toBe(3);
    expect(updatedMatch?.awayScore).toBe(2);
  });

  it('should not update the score if the match is finished', () => {
    const match = createMatch('Team A', 'Team B');
    match.isFinished = true;
    const matches = [match];

    expect(() => {
      updateScore(matches, match.id, 3, 2);
    }).toThrowError(
      `Cannot update score for a finished match (ID: ${match.id}).`
    );
  });

  it('should handle a non-existent match ID gracefully', () => {
    const match = createMatch('Team A', 'Team B');
    const matches = [match];

    expect(() => {
      updateScore(matches, 'non-existent-id', 3, 2);
    }).toThrowError(`Match with ID non-existent-id not found.`);
  });

  it('should handle negative scores gracefully', () => {
    const match = createMatch('Team A', 'Team B');
    const matches = [match];

    const updatedMatches = updateScore(matches, match.id, -3, -2);
    const updatedMatch = updatedMatches.find((m) => m.id === match.id);

    expect(updatedMatch?.homeScore).toBe(0);
    expect(updatedMatch?.awayScore).toBe(0);
  });

  it('should handle non-numeric scores gracefully', () => {
    const match = createMatch('Team A', 'Team B');
    const matches = [match];

    // @ts-expect-error - We are intentionally passing non-numeric values to test edge case
    const updatedMatches = updateScore(matches, match.id, 'invalid', 'invalid');
    const updatedMatch = updatedMatches.find((m) => m.id === match.id);

    expect(updatedMatch?.homeScore).toBe(0);
    expect(updatedMatch?.awayScore).toBe(0);
  });

  it('should not mutate the original matches array', () => {
    const match = createMatch('Team A', 'Team B');
    const matches = [match];

    const updatedMatches = updateScore(matches, match.id, 2, 3);

    expect(matches[0].homeScore).toBe(0);
    expect(updatedMatches[0].homeScore).toBe(2);
  });
});
