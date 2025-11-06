import { render, screen } from '@testing-library/react';

import UserListScreen from './user-list-screen';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { fakeFilmData, makeFakeStore } from '../../test-utils/mocks';

jest.mock('../../components/logo/logo', () => () => <div>Component Logo</div>);
jest.mock('../../components/header-user-block/header-user-block', () => () => <div>Component HeaderUserBlock</div>);
jest.mock('../../components/films-list/films-list', () => () => <div>Component FilmsList</div>);
jest.mock('../../components/footer/footer', () => () => <div>Component Footer</div>);
jest.mock('../../components/spinner/spinner', () => () => <div>Component Spinner</div>);

describe('Component: UserListScreen', () => {
  it('should be rendered correctly', () => {
    const { withStoreComponent } = withStore(<UserListScreen />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('user-list-screen')).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText('Component Logo')).toBeInTheDocument();
    expect(screen.getByText('Component HeaderUserBlock')).toBeInTheDocument();
    expect(screen.getByText('Component FilmsList')).toBeInTheDocument();
    expect(screen.getByText('Component Footer')).toBeInTheDocument();
  });

  it('should be rendered correctly when favorite films are loading', () => {
    const { withStoreComponent } = withStore(<UserListScreen />, makeFakeStore({
      FILM_DATA: { ...fakeFilmData, isFavoriteFilmsLoading: true },
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Component Spinner')).toBeInTheDocument();
  });
});
