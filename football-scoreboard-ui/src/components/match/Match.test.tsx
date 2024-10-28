import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Match from './Match.component';

describe('Match Component', () => {
  const mockOnUpdateScore = vi.fn();
  const mockOnFinishMatch = vi.fn();

  const defaultProps = {
    id: '1',
    homeTeam: 'Team A',
    awayTeam: 'Team B',
    homeScore: 0,
    awayScore: 0,
    onUpdateScore: mockOnUpdateScore,
    onFinishMatch: mockOnFinishMatch,
  };

  beforeEach(() => {
    mockOnUpdateScore.mockClear();
    mockOnFinishMatch.mockClear();
  });

  it('renders match details correctly', () => {
    const { getByRole } = render(<Match {...defaultProps} />);
    const headingElement = getByRole('heading', { level: 2 });
    // Use direct comparison instead of toHaveTextContent
    expect(headingElement.textContent).toBe('Team A vs Team B');
  });

  it('updates the score correctly', () => {
    const { getByLabelText, getByText } = render(<Match {...defaultProps} />);

    const homeScoreInput = getByLabelText('Home Score:');
    const awayScoreInput = getByLabelText('Away Score:');
    fireEvent.change(homeScoreInput, { target: { value: '3' } });
    fireEvent.change(awayScoreInput, { target: { value: '2' } });

    fireEvent.click(getByText('Update Score'));

    expect(mockOnUpdateScore).toHaveBeenCalledWith('1', 3, 2);
  });

  it('finishes the match correctly', () => {
    const { getByText } = render(<Match {...defaultProps} />);

    fireEvent.click(getByText('Finish Match'));

    expect(mockOnFinishMatch).toHaveBeenCalledWith('1');
  });
});
