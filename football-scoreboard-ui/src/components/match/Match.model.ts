import { Match as MatchFromLibrary } from 'football-scoreboard-library';

export interface MatchProps extends MatchFromLibrary {
  onUpdateScore: (
    matchId: string,
    homeScore: number,
    awayScore: number
  ) => void;
  onFinishMatch: (matchId: string) => void;
}
