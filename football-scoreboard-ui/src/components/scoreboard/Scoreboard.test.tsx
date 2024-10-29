import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Scoreboard from './Scoreboard.component';
import { MatchProps } from '../match/Match.model';

describe('Scoreboard Component', () => {
  const mockOnUpdateScore = vi.fn();
  const mockOnFinishMatch = vi.fn();

  const defaultMatches: MatchProps[] = [
    {
      id: '1',
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      homeScore: 0,
      awayScore: 0,
      startTime: new Date('2024-10-01T10:00:00'),
      isFinished: false,
      onUpdateScore: mockOnUpdateScore,
      onFinishMatch: mockOnFinishMatch,
    },
    {
      id: '2',
      homeTeam: 'Team C',
      awayTeam: 'Team D',
      homeScore: 1,
      awayScore: 2,
      startTime: new Date('2024-10-01T10:00:00'),
      isFinished: false,
      onUpdateScore: mockOnUpdateScore,
      onFinishMatch: mockOnFinishMatch,
    },
  ];

  beforeEach(() => {
    mockOnUpdateScore.mockClear();
    mockOnFinishMatch.mockClear();
  });

  it('renders correctly with no matches', () => {
    const { getByText } = render(
      <Scoreboard
        matches={[]}
        onUpdateScore={mockOnUpdateScore}
        onFinishMatch={mockOnFinishMatch}
      />
    );
    expect(getByText('No matches in progress')).toBeTruthy();
  });

  it('renders matches correctly', () => {
    const { getByText } = render(
      <Scoreboard
        matches={defaultMatches}
        onUpdateScore={mockOnUpdateScore}
        onFinishMatch={mockOnFinishMatch}
      />
    );

    expect(getByText('Team A vs Team B')).toBeTruthy();
    expect(getByText('Team C vs Team D')).toBeTruthy();
  });

  it('handles updating score correctly for the first match', () => {
    const { getAllByLabelText, getAllByText } = render(
      <Scoreboard
        matches={defaultMatches}
        onUpdateScore={mockOnUpdateScore}
        onFinishMatch={mockOnFinishMatch}
      />
    );

    const homeScoreInputs = getAllByLabelText('Home Score:');
    const awayScoreInputs = getAllByLabelText('Away Score:');
    fireEvent.change(homeScoreInputs[0], { target: { value: '2' } });
    fireEvent.change(awayScoreInputs[0], { target: { value: '3' } });

    const updateButtons = getAllByText('Update Score');
    fireEvent.click(updateButtons[0]);

    expect(mockOnUpdateScore).toHaveBeenCalledWith('1', 2, 3);
  });

  it('handles finishing the first match correctly', () => {
    const { getAllByText } = render(
      <Scoreboard
        matches={defaultMatches}
        onUpdateScore={mockOnUpdateScore}
        onFinishMatch={mockOnFinishMatch}
      />
    );

    const finishMatchButtons = getAllByText('Finish Match');
    fireEvent.click(finishMatchButtons[0]);

    expect(mockOnFinishMatch).toHaveBeenCalledWith('1');
  });
});
