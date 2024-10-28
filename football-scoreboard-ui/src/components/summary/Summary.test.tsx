import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Summary from './Summary.component';

describe('Summary Component', () => {
  const sampleMatches = [
    {
      id: '1',
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      homeScore: 2,
      awayScore: 1,
      startTime: new Date('2023-10-20T12:00:00Z'),
      isFinished: true,
    },
    {
      id: '2',
      homeTeam: 'Team C',
      awayTeam: 'Team D',
      homeScore: 3,
      awayScore: 3,
      startTime: new Date('2023-10-21T14:00:00Z'),
      isFinished: false,
    },
  ];

  it('renders correctly with no matches', () => {
    const { getByText } = render(<Summary matches={[]} />);
    expect(getByText('No matches in progress.')).toBeTruthy();
  });

  it('renders matches correctly', () => {
    const { getByText } = render(<Summary matches={sampleMatches} />);

    expect(getByText('Team A 2 - 1 Team B')).toBeTruthy();
    expect(getByText('Team C 3 - 3 Team D')).toBeTruthy();
  });

  it('displays "Full Time" for finished matches', () => {
    const { getByText } = render(<Summary matches={sampleMatches} />);

    expect(getByText('Full Time')).toBeTruthy();
  });

  it('does not display "Full Time" for unfinished matches', () => {
    const unfinishedMatch = [
      {
        id: '2',
        homeTeam: 'Team C',
        awayTeam: 'Team D',
        homeScore: 3,
        awayScore: 3,
        startTime: new Date('2023-10-21T14:00:00Z'),
        isFinished: false,
      },
    ];

    const { queryByText } = render(<Summary matches={unfinishedMatch} />);

    expect(queryByText('Full Time')).not.toBeTruthy();
  });
});
