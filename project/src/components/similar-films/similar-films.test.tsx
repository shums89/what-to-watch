import { render, screen } from '@testing-library/react';

import SimilarFilms from './similar-films';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { makeFakeStore } from '../../test-utils/mocks';

jest.mock('../films-list/films-list', () => () => <div>Component FilmsList</div>);
jest.mock('../footer/footer', () => () => <div>Component Footer</div>);

describe('Component: SimilarFilms', () => {
  it('should be rendered correctly', () => {
    const { withStoreComponent } = withStore(<SimilarFilms id={1} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText('Component FilmsList')).toBeInTheDocument();
    expect(screen.getByText('Component Footer')).toBeInTheDocument();
  });
});
