import { describe, it, expect } from 'vitest';
import { finishMatch } from './finishMatch';
import { createMatch } from './createMatch';

describe('finishMatch', () => {
  it('should mark a match as finished when given a valid match ID', () => {
    const matches = [
      createMatch('Team A', 'Team B'),
      createMatch('Team C', 'Team D'),
    ];
    const matchId = matches[0].id;

    const updatedMatches = finishMatch(matches, matchId);
    const finishedMatch = updatedMatches.find((match) => match.id === matchId);

    expect(finishedMatch?.isFinished).toBe(true);
  });

  it('should not modify other matches when finishing a specific match', () => {
    const matches = [
      createMatch('Team A', 'Team B'),
      createMatch('Team C', 'Team D'),
    ];
    const matchId = matches[0].id;

    const updatedMatches = finishMatch(matches, matchId);
    const otherMatch = updatedMatches.find((match) => match.id !== matchId);

    expect(otherMatch?.isFinished).toBe(false);
  });

  it('should throw an error for a non-existent match ID', () => {
    const matches = [
      createMatch('Team A', 'Team B'),
      createMatch('Team C', 'Team D'),
    ];

    expect(() => {
      finishMatch(matches, 'non-existent-id');
    }).toThrowError(`Match with ID non-existent-id not found.`);
  });

  it('should not alter the match object other than marking it as finished', () => {
    const match = createMatch('Team A', 'Team B');
    const matches = [match];
    const updatedMatches = finishMatch(matches, match.id);
    const finishedMatch = updatedMatches.find((m) => m.id === match.id);

    expect(finishedMatch?.homeTeam).toBe(match.homeTeam);
    expect(finishedMatch?.awayTeam).toBe(match.awayTeam);
    expect(finishedMatch?.homeScore).toBe(match.homeScore);
    expect(finishedMatch?.awayScore).toBe(match.awayScore);
    expect(finishedMatch?.startTime).toEqual(match.startTime);
    expect(finishedMatch?.isFinished).toBe(true);
  });

  it('should throw an error if there are no matches and trying to finish a match', () => {
    expect(() => {
      finishMatch([], '1234');
    }).toThrowError(`Match with ID 1234 not found.`);
  });
});
