import { describe, it, expect } from 'vitest';
import { createMatch } from './createMatch';

describe('createMatch', () => {
  it('should create a match with the given home and away teams', () => {
    const match = createMatch('Team A', 'Team B');

    expect(match.homeTeam).toBe('Team A');
    expect(match.awayTeam).toBe('Team B');
  });

  it('should initialize scores to 0-0', () => {
    const match = createMatch('Team A', 'Team B');

    expect(match.homeScore).toBe(0);
    expect(match.awayScore).toBe(0);
  });

  it('should generate a unique ID for each match', () => {
    const match1 = createMatch('Team A', 'Team B');
    const match2 = createMatch('Team C', 'Team D');

    expect(match1.id).toBeDefined();
    expect(match2.id).toBeDefined();
    expect(match1.id).not.toBe(match2.id);
  });

  it('should set the startTime to the current date/time', () => {
    const now = new Date();
    const match = createMatch('Team A', 'Team B');

    expect(match?.startTime?.getTime()).toBeGreaterThanOrEqual(now.getTime());
    expect(match?.startTime?.getTime()).toBeLessThanOrEqual(
      new Date().getTime()
    );
  });

  it('should mark the match as not finished upon creation', () => {
    const match = createMatch('Team A', 'Team B');

    expect(match.isFinished).toBe(false);
  });

  it('should handle empty team names gracefully', () => {
    const match = createMatch('', '');

    expect(match.homeTeam).toBe('');
    expect(match.awayTeam).toBe('');
  });
});
