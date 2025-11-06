import { render, screen } from '@testing-library/react';

import { films } from '../../mocks/films';
import { withHistory, withStore } from '../../test-utils/mock-component';
import FilmSmallCard from './film-small-card';


jest.mock('../video-player/video-player', () => () => <div>Component VideoPlayer</div>);

describe('Component: FilmSmallCard', () => {
  it('should be rendered correctly', () => {
    const film = films[0];
    const { withStoreComponent } = withStore(<FilmSmallCard {...film} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('film-small-card')).toBeInTheDocument();
    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText('Component VideoPlayer')).toBeInTheDocument();
  });
});
