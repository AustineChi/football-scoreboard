import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScoreboard } from './useScoreboard';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('useScoreboard Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with an empty scoreboard', () => {
    const { result } = renderHook(() => useScoreboard());
    expect(result.current.scoreboard.matches).toHaveLength(0);
  });

  it('should add a new match successfully', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.addMatch('Team A', 'Team B');
    });

    expect(result.current.scoreboard.matches).toHaveLength(1);
    expect(result.current.scoreboard.matches[0].homeTeam).toBe('Team A');
    expect(result.current.scoreboard.matches[0].awayTeam).toBe('Team B');
  });

  it('should show a toast error when trying to add a match without team names', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.addMatch('', '');
    });

    expect(result.current.scoreboard.matches).toHaveLength(0);
    expect(toast.error).toHaveBeenCalledWith(
      'Both home and away team names must be provided.'
    );
  });

  it('should update the score of an existing match', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.addMatch('Team A', 'Team B');
    });

    const matchId = result.current.scoreboard.matches[0].id;

    act(() => {
      result.current.updateMatchScore(matchId, 3, 2);
    });

    expect(result.current.scoreboard.matches[0].homeScore).toBe(3);
    expect(result.current.scoreboard.matches[0].awayScore).toBe(2);
  });

  it('should show a toast error when trying to update the score of a non-existent match', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.updateMatchScore('invalid-id', 2, 1);
    });

    expect(toast.error).toHaveBeenCalledWith(
      'Match not found. Cannot update score.'
    );
  });

  it('should finish an existing match', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.addMatch('Team A', 'Team B');
    });

    const matchId = result.current.scoreboard.matches[0].id;

    act(() => {
      result.current.finishMatchById(matchId);
    });

    expect(result.current.scoreboard.matches[0].isFinished).toBe(true);
  });

  it('should show a toast error when trying to finish a non-existent match', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.finishMatchById('invalid-id');
    });

    expect(toast.error).toHaveBeenCalledWith(
      'Match not found. Cannot finish match.'
    );
  });

  it('should maintain state integrity after multiple operations', () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.addMatch('Team A', 'Team B');
      result.current.addMatch('Team C', 'Team D');
    });

    expect(result.current.scoreboard.matches).toHaveLength(2);

    const firstMatchId = result.current.scoreboard.matches[0].id;
    const secondMatchId = result.current.scoreboard.matches[1].id;

    act(() => {
      result.current.updateMatchScore(firstMatchId, 1, 0);
      result.current.updateMatchScore(secondMatchId, 2, 2);
    });

    expect(result.current.scoreboard.matches[0].homeScore).toBe(0);
    expect(result.current.scoreboard.matches[0].awayScore).toBe(0);
    expect(result.current.scoreboard.matches[1].homeScore).toBe(2);
    expect(result.current.scoreboard.matches[1].awayScore).toBe(2);

    act(() => {
      result.current.finishMatchById(firstMatchId);
    });

    expect(result.current.scoreboard.matches).toHaveLength(2);
    expect(result.current.scoreboard.matches[0].isFinished).toBe(true);
    expect(result.current.scoreboard.matches[0].homeTeam).toBe('Team A');
    expect(result.current.scoreboard.matches[0].awayTeam).toBe('Team B');
  });
});
