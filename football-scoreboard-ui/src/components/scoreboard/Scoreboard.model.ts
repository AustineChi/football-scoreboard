import { MatchProps } from '../match/Match.model';

export interface ScoreboardProps {
  matches: MatchProps[];
  onUpdateScore: (
    matchId: string,
    homeScore: number,
    awayScore: number
  ) => void;
  onFinishMatch: (matchId: string) => void;
}
