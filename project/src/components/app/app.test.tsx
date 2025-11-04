import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import App from './app';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { fakeFilmData, makeFakeStore } from '../../test-utils/mocks';
import { films } from '../../mocks/films';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    // Component FilmPromo
    expect(screen.getByTestId('promo')).toBeInTheDocument();
    expect(screen.getByTestId('background-image')).toBeInTheDocument();
    expect(screen.getByTestId('poster')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();

    // Component GenresList
    expect(screen.getByTestId('catalog-genres-list')).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();

    // Component FilmsCatalog
    expect(screen.getByTestId('catalog')).toBeInTheDocument();
    expect(screen.getByTestId('button-show-more')).toBeInTheDocument();

    // Component Footer
    expect(screen.getByTestId('footer-container')).toBeInTheDocument();
    expect(screen.getByTestId('copyright')).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigates to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER_PROCESS: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId('auth-screen')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render "UserListScreen" when user navigates to "/mylist"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER_PROCESS: { authorizationStatus: AuthorizationStatus.Auth, user: null },
    }));
    mockHistory.push(AppRoute.UserList);

    render(withStoreComponent);

    expect(screen.getByTestId('user-list-screen')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigates to "/films"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Films);

    render(withStoreComponent);

    expect(screen.getByTestId('not-found-screen')).toBeInTheDocument();
  });

  it('should render "FilmScreen" when user navigates to "/films/:id"', () => {
    const film = films[0];
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      FILM_DATA: { ...fakeFilmData, film },
    }));
    mockHistory.push(`${AppRoute.Films}/${film.id}`);

    render(withStoreComponent);

    expect(screen.getByTestId('film-screen')).toBeInTheDocument();
    expect(screen.getByText(film.name)).toBeInTheDocument();
  });

  it('should render "ReviewScreen" when user navigates to "/films/:id/review"', () => {
    const film = films[0];
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      FILM_DATA: { ...fakeFilmData, film },
    }));
    mockHistory.push(`${AppRoute.Films}/${film.id}/review`);

    render(withStoreComponent);

    expect(screen.getByTestId('review-screen')).toBeInTheDocument();
    expect(screen.getByText(film.name)).toBeInTheDocument();
  });

  it('should render "PlayerScreen" when user navigates to "/player/:id"', () => {
    const film = films[0];
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      FILM_DATA: { ...fakeFilmData, film },
    }));
    mockHistory.push(`${AppRoute.Player}/${film.id}`);

    render(withStoreComponent);

    expect(screen.getByTestId('player')).toBeInTheDocument();
    expect(screen.getByText(film.name)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByTestId('not-found-screen')).toBeInTheDocument();
  });
});
