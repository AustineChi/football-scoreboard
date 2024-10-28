import React, { useState } from 'react';

interface MatchProps {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isFinished: boolean;
  onUpdateScore: (
    matchId: string,
    homeScore: number,
    awayScore: number
  ) => void;
  onFinishMatch: (matchId: string) => void;
}

const Match: React.FC<MatchProps> = ({
  id,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  isFinished,
  onUpdateScore,
  onFinishMatch,
}) => {
  const [localHomeScore, setLocalHomeScore] = useState(homeScore);
  const [localAwayScore, setLocalAwayScore] = useState(awayScore);

  const handleUpdateScore = () => {
    onUpdateScore(id, localHomeScore, localAwayScore);
  };

  const handleFinishMatch = () => {
    onFinishMatch(id);
  };

  return (
    <div
      className={`match bg-white shadow-md rounded-md p-6 mb-4 border ${isFinished ? 'border-gray-400' : 'border-gray-300'}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {homeTeam} vs {awayTeam}
        </h2>
        {isFinished && (
          <span className="text-red-600 font-semibold">Full Time</span>
        )}
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4 items-center">
          <label
            htmlFor={`home-score-${id}`}
            className="text-gray-700 font-semibold"
          >
            Home Score:
          </label>
          <input
            id={`home-score-${id}`}
            type="number"
            min="0"
            value={localHomeScore}
            onChange={(e) => setLocalHomeScore(Number(e.target.value))}
            className="w-16 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Home score input"
            disabled={isFinished}
          />
        </div>

        <div className="flex space-x-4 items-center">
          <label
            htmlFor={`away-score-${id}`}
            className="text-gray-700 font-semibold"
          >
            Away Score:
          </label>
          <input
            id={`away-score-${id}`}
            type="number"
            min="0"
            value={localAwayScore}
            onChange={(e) => setLocalAwayScore(Number(e.target.value))}
            className="w-16 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Away score input"
            disabled={isFinished}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleUpdateScore}
          className={`bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-200 ease-in-out ${isFinished ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isFinished}
        >
          Update Score
        </button>
        <button
          onClick={handleFinishMatch}
          className={`bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-500 transition duration-200 ease-in-out ${isFinished ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isFinished}
        >
          Finish Match
        </button>
      </div>
    </div>
  );
};

export default Match;
