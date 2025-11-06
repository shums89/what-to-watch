import { render, screen } from '@testing-library/react';

import FilmsCatalog from './films-catalog';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { fakeFilmData, makeFakeStore } from '../../test-utils/mocks';

jest.mock('../genres-list/genres-list', () => () => <div>Component GenresList</div>);
jest.mock('../films-list/films-list', () => () => <div>Component FilmsList</div>);
jest.mock('../spinner/spinner', () => () => <div>Component Spinner</div>);

describe('Component: FilmsCatalog', () => {
  it('should be rendered correctly', () => {
    const { withStoreComponent } = withStore(<FilmsCatalog />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('catalog')).toBeInTheDocument();
    expect(screen.getByTestId('button-show-more')).toBeInTheDocument();
    expect(screen.getByText('Component GenresList')).toBeInTheDocument();
    expect(screen.getByText('Component FilmsList')).toBeInTheDocument();
  });

  it('should be rendered correctly when films are loading', () => {
    const { withStoreComponent } = withStore(<FilmsCatalog />, makeFakeStore({
      FILM_DATA: { ...fakeFilmData, isFilmsDataLoading: true, }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('Component Spinner')).toBeInTheDocument();
  });
});
