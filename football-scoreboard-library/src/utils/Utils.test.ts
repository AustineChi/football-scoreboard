import { describe, it, expect } from 'vitest';
import { findMatchById, generateId, formatDate, sortMatches } from './Utils';
import { createMatch } from '../core/match/createMatch';

describe('Utils', () => {
  describe('findMatchById', () => {
    it('should return the correct match when a valid ID is provided', () => {
      const match1 = createMatch('Team A', 'Team B');
      const match2 = createMatch('Team C', 'Team D');
      const matches = [match1, match2];

      const result = findMatchById(matches, match1.id);
      expect(result).toEqual(match1);
    });

    it('should return undefined when a non-existent ID is provided', () => {
      const match1 = createMatch('Team A', 'Team B');
      const matches = [match1];

      const result = findMatchById(matches, 'non-existent-id');
      expect(result).toBeUndefined();
    });
  });

  describe('generateId', () => {
    it('should generate a valid UUID', () => {
      const id = generateId();
      expect(id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('formatDate', () => {
    it('should format the date correctly', () => {
      const date = new Date('2024-10-25T14:48:00');
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe('25/10/2024, 14:48');
    });
  });

  describe('sortMatches', () => {
    it('should sort matches by total score and start time', () => {
      const match1 = createMatch('Team A', 'Team B');
      const match2 = createMatch('Team C', 'Team D');
      match1.homeScore = 1;
      match1.awayScore = 2;
      match2.homeScore = 3;
      match2.awayScore = 1;

      const matches = [match1, match2];
      const sortedMatches = sortMatches(matches);

      expect(sortedMatches[0].homeTeam).toBe('Team C');
      expect(sortedMatches[1].homeTeam).toBe('Team A');
    });
  });
});
