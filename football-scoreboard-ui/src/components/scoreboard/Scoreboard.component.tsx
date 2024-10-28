import React from 'react';
import Match from '../match/Match.component';
import type { Match as MatchType } from 'football-scoreboard-library';

interface ScoreboardProps {
  matches: MatchType[];
  onUpdateScore: (
    matchId: string,
    homeScore: number,
    awayScore: number
  ) => void;
  onFinishMatch: (matchId: string) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({
  matches,
  onUpdateScore,
  onFinishMatch,
}) => {
  return (
    <div className=" p-4">
      {matches.length === 0 ? (
        <p className="text-center text-gray-500">No matches in progress</p>
      ) : (
        matches.map((match) => (
          <Match
            key={match.id}
            id={match.id}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            homeScore={match.homeScore}
            awayScore={match.awayScore}
            onUpdateScore={onUpdateScore}
            onFinishMatch={onFinishMatch}
            isFinished={match.isFinished}
          />
        ))
      )}
    </div>
  );
};

export default Scoreboard;
