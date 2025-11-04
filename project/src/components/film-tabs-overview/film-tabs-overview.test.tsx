import { render, screen } from '@testing-library/react';

import FilmTabsOverview from './film-tabs-overview';
import { films } from '../../mocks/films';

describe('Component: FilmTabsOverview', () => {
  it('should be rendered correctly', () => {
    const film = films[0];
    const { scoresCount, director, starring } = film;

    render(<FilmTabsOverview {...film} />);

    expect(screen.getByText(/ratings/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(scoresCount.toString(), 'i'))).toBeInTheDocument();

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(director, 'i'))).toBeInTheDocument();

    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(starring[0], 'i'))).toBeInTheDocument();
  });
});
