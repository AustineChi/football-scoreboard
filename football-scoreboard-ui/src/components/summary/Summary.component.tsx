import React from 'react';
import { SummaryProps } from './Summary.model';

const Summary: React.FC<SummaryProps> = ({ matches }) => {
  return (
    <div className="bg-white p-6 rounded-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Match Summary</h1>
      <div className="space-y-4">
        {matches.length === 0 ? (
          <div className="text-center text-gray-500">
            No matches in progress.
          </div>
        ) : (
          matches.map((match) => (
            <div
              key={match.id}
              className="bg-gray-100 p-4 rounded-md shadow-md border border-gray-200"
            >
              <h2 className="flex justify-between items-center text-xl font-semibold">
                <span>
                  {match.homeTeam} {match.homeScore} - {match.awayScore}{' '}
                  {match.awayTeam}
                </span>
                {match.isFinished && (
                  <span className="text-red-600 font-semibold">Full Time</span>
                )}
              </h2>
              <p className="text-sm text-gray-600">
                Started at: {match?.startTime?.toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Summary;
