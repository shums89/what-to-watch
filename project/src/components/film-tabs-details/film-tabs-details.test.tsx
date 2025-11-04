import { render, screen } from '@testing-library/react';

import FilmTabsDetails from './film-tabs-details';
import { films } from '../../mocks/films';

describe('Component: FilmTabsDetails', () => {
  it('should be rendered correctly', () => {
    const film = films[0];
    const { director, genre, released } = film;

    render(<FilmTabsDetails {...film} />);

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(director, 'i'))).toBeInTheDocument();

    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();

    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(genre, 'i'))).toBeInTheDocument();

    expect(screen.getByText(/Released/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(released.toString(), 'i'))).toBeInTheDocument();
  });
});
