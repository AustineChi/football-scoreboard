import { useState } from 'react';
import {
  createScoreboard,
  createMatch,
  finishMatch,
  updateScore,
} from 'football-scoreboard-library';
import { toast } from 'react-toastify';

export function useScoreboard() {
  const [scoreboard, setScoreboard] = useState(createScoreboard());

  const addMatch = (homeTeam: string, awayTeam: string) => {
    if (!homeTeam || !awayTeam) {
      toast.error('Both home and away team names must be provided.');
      return;
    }

    const newMatch = createMatch(homeTeam, awayTeam);
    setScoreboard((prev) => ({
      ...prev,
      matches: [...prev.matches, newMatch],
    }));
  };

  const updateMatchScore = (
    matchId: string,
    homeScore: number,
    awayScore: number
  ) => {
    const matchExists = scoreboard.matches.some(
      (match) => match.id === matchId
    );
    if (!matchExists) {
      toast.error('Match not found. Cannot update score.');
      return;
    }

    const updatedMatches = updateScore(
      scoreboard.matches,
      matchId,
      homeScore,
      awayScore
    );
    setScoreboard((prev) => ({
      ...prev,
      matches: updatedMatches,
    }));
  };

  const finishMatchById = (matchId: string) => {
    const matchExists = scoreboard.matches.some(
      (match) => match.id === matchId
    );
    if (!matchExists) {
      toast.error('Match not found. Cannot finish match.');
      return;
    }

    const updatedMatches = finishMatch(scoreboard.matches, matchId);
    setScoreboard((prev) => ({
      ...prev,
      matches: updatedMatches,
    }));
  };

  return {
    scoreboard,
    addMatch,
    updateMatchScore,
    finishMatchById,
  };
}
