import { render, screen } from '@testing-library/react';

import MainScreen from './main-screen';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { makeFakeStore } from '../../test-utils/mocks';

jest.mock('../../components/film-promo/film-promo', () => () => <div>Component FilmPromo</div>);
jest.mock('../../components/films-catalog/films-catalog', () => () => <div>Component FilmsCatalog</div>);
jest.mock('../../components/footer/footer', () => () => <div>Component Footer</div>);

describe('Component: MainScreen', () => {
  it('should be rendered correctly', () => {
    const { withStoreComponent } = withStore(<MainScreen />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Component FilmPromo')).toBeInTheDocument();
    expect(screen.getByText('Component FilmsCatalog')).toBeInTheDocument();
    expect(screen.getByText('Component Footer')).toBeInTheDocument();
  });
});
