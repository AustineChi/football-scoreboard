import { describe, it, expect } from 'vitest';
import { createScoreboard } from './createScoreboard';

describe('createScoreboard', () => {
  it('should initialize an empty scoreboard', () => {
    const scoreboard = createScoreboard();
    expect(scoreboard).toEqual({ matches: [] });
  });
});
