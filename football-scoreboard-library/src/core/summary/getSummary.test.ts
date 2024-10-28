import { describe, it, expect } from 'vitest';
import { createMatch } from '../match/createMatch';
import { getSummary } from './getSummary';

describe('getSummary', () => {
  it('should return matches in progress sorted by total score', () => {
    const match1 = createMatch('Team A', 'Team B');
    const match2 = createMatch('Team C', 'Team D');
    match1.homeScore = 2;
    match1.awayScore = 1;
    match2.homeScore = 3;
    match2.awayScore = 2;

    const matches = [match1, match2];
    const summary = getSummary(matches);

    expect(summary[0].homeTeam).toBe('Team C');
    expect(summary[1].homeTeam).toBe('Team A');
  });

  it('should sort matches with the same total score by start time (most recent first)', () => {
    const match1 = createMatch('Team A', 'Team B');
    const match2 = createMatch('Team C', 'Team D');
    match1.homeScore = 2;
    match1.awayScore = 2;
    match2.homeScore = 1;
    match2.awayScore = 3;

    match1.startTime = new Date('2024-10-01T10:00:00');
    match2.startTime = new Date('2024-10-01T12:00:00');

    const matches = [match1, match2];
    const summary = getSummary(matches);

    expect(summary[0].homeTeam).toBe('Team C');
    expect(summary[1].homeTeam).toBe('Team A');
  });

  it('should only include matches that are in progress', () => {
    const match1 = createMatch('Team A', 'Team B');
    const match2 = createMatch('Team C', 'Team D');
    match1.homeScore = 1;
    match1.awayScore = 1;
    match2.isFinished = true;

    const matches = [match1, match2];
    const summary = getSummary(matches);

    expect(summary.length).toBe(1);
    expect(summary[0].homeTeam).toBe('Team A');
  });

  it('should return an empty array if no matches are in progress', () => {
    const match1 = createMatch('Team A', 'Team B');
    match1.isFinished = true;

    const summary = getSummary([match1]);

    expect(summary).toEqual([]);
  });
});
