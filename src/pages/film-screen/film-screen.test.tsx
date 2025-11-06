import { render, screen } from '@testing-library/react';

import FilmScreen from './film-screen';
import { films } from '../../mocks/films';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { fakeFilmData, makeFakeStore } from '../../test-utils/mocks';
import { AuthorizationStatus } from '../../const';

jest.mock('../../components/header-user-block/header-user-block', () => () => <div>Component HeaderUserBlock</div>);
jest.mock('../../components/logo/logo', () => () => <div>Component Logo</div>);
jest.mock('../../components/similar-films/similar-films', () => () => <div>Component SimilarFilms</div>);
jest.mock('../../components/film-tabs/film-tabs', () => () => <div>Component FilmTabs</div>);
jest.mock('../../components/favorite-button/favorite-button', () => () => <div>Component FavoriteButton</div>);
jest.mock('../../components/spinner/spinner', () => () => <div>Component Spinner</div>);


describe('Component: FilmScreen', () => {
  it('should be rendered correctly', () => {
    const film = films[0];
    const { withStoreComponent } = withStore(<FilmScreen />, makeFakeStore({
      FILM_DATA: { ...fakeFilmData, film: film },
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('film-screen')).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released)).toBeInTheDocument();
    expect(screen.getByTestId('background-image')).toBeInTheDocument();
    expect(screen.getByTestId('background-image')).toHaveAttribute('src', film.backgroundImage);
    expect(screen.getByTestId('poster')).toBeInTheDocument();
    expect(screen.getByTestId('poster')).toHaveAttribute('src', film.posterImage);
    expect(screen.getByText('Play')).toBeInTheDocument();

    expect(screen.getByText('Component HeaderUserBlock')).toBeInTheDocument();
    expect(screen.getByText('Component Logo')).toBeInTheDocument();
    expect(screen.getByText('Component SimilarFilms')).toBeInTheDocument();
    expect(screen.getByText('Component FilmTabs')).toBeInTheDocument();
    expect(screen.getByText('Component FavoriteButton')).toBeInTheDocument();
  });

  it('should be rendered correctly when film is loading', () => {
    const { withStoreComponent } = withStore(<FilmScreen />, makeFakeStore({
      FILM_DATA: { ...fakeFilmData, isFilmDataLoading: true, }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Component Spinner')).toBeInTheDocument();
  });

  it('should be rendered correctly when user authorized', () => {
    const { withStoreComponent } = withStore(<FilmScreen />, makeFakeStore({
      USER_PROCESS: { authorizationStatus: AuthorizationStatus.Auth, user: null },
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('should be rendered correctly when user not authorized', () => {
    const { withStoreComponent } = withStore(<FilmScreen />, makeFakeStore({
      USER_PROCESS: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByText('Add review')).toBeNull();
  });
});
