import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Match from './Match.component';

describe('Match Component', () => {
  const mockUpdateScore = vi.fn();
  const mockFinishMatch = vi.fn();

  const sampleMatch = {
    id: '1',
    homeTeam: 'Team A',
    awayTeam: 'Team B',
    homeScore: 2,
    awayScore: 1,
    isFinished: false,
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <Match
        {...sampleMatch}
        onUpdateScore={mockUpdateScore}
        onFinishMatch={mockFinishMatch}
      />
    );
    expect(getByText('Team A vs Team B')).toBeTruthy();
    expect(getByText('Home Score:')).toBeTruthy();
    expect(getByText('Away Score:')).toBeTruthy();
  });

  it('displays "Full Time" for finished matches', () => {
    const { getByText } = render(
      <Match
        {...{ ...sampleMatch, isFinished: true }}
        onUpdateScore={mockUpdateScore}
        onFinishMatch={mockFinishMatch}
      />
    );
    expect(getByText('Full Time')).toBeTruthy();
  });

  it('does not display "Full Time" for ongoing matches', () => {
    const { queryByText } = render(
      <Match
        {...sampleMatch}
        onUpdateScore={mockUpdateScore}
        onFinishMatch={mockFinishMatch}
      />
    );
    expect(queryByText('Full Time')).toBeNull();
  });

  it('calls onUpdateScore with correct parameters when update button is clicked', () => {
    const { getByRole } = render(
      <Match
        {...sampleMatch}
        onUpdateScore={mockUpdateScore}
        onFinishMatch={mockFinishMatch}
      />
    );

    fireEvent.change(getByRole('spinbutton', { name: /home score/i }), {
      target: { value: 3 },
    });
    fireEvent.change(getByRole('spinbutton', { name: /away score/i }), {
      target: { value: 2 },
    });
    fireEvent.click(getByRole('button', { name: /update score/i }));

    expect(mockUpdateScore).toHaveBeenCalledWith(sampleMatch.id, 3, 2);
  });

  it('calls onFinishMatch with correct match ID when finish button is clicked', () => {
    const { getByRole } = render(
      <Match
        {...sampleMatch}
        onUpdateScore={mockUpdateScore}
        onFinishMatch={mockFinishMatch}
      />
    );

    fireEvent.click(getByRole('button', { name: /finish match/i }));

    expect(mockFinishMatch).toHaveBeenCalledWith(sampleMatch.id);
  });
});
