import { render, screen } from '@testing-library/react';

import PlayerScreen from './player-screen';
import { films } from '../../mocks/films';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { fakeFilmData, makeFakeStore } from '../../test-utils/mocks';

describe('Component: PlayerScreen', () => {
  it('should render correctly', () => {
    const film = films[0];
    const { withStoreComponent } = withStore(<PlayerScreen />, makeFakeStore({
      FILM_DATA: { ...fakeFilmData, film: film },
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('player')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toHaveAttribute('src', film.videoLink);
    expect(screen.getByTestId('video')).toHaveAttribute('poster', film.previewImage);
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(film.name, 'i'))).toBeInTheDocument();
  });
});
