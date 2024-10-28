import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface MatchFormProps {
  onAddMatch: (homeTeam: string, awayTeam: string) => void;
}

const MatchForm: React.FC<MatchFormProps> = ({ onAddMatch }) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeTeam.trim() && awayTeam.trim()) {
      onAddMatch(homeTeam, awayTeam);
      setHomeTeam('');
      setAwayTeam('');
    } else {
      toast.error('Both home and away team names must be provided.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          className="w-full my-2 px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
          aria-label="Home team input"
        />
        <input
          type="text"
          placeholder="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          className="w-full my-2 px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
          aria-label="Away team input"
        />
        <button
          type="submit"
          className="min-w-[100px] my-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500"
        >
          Add Match
        </button>
      </div>
    </form>
  );
};

export default MatchForm;
