import { render, screen } from '@testing-library/react';

import FilmsList from './films-list';
import { films } from '../../mocks/films';
import { withHistory } from '../../test-utils/mock-component';

jest.mock('../film-small-card/film-small-card', () => () => <div>Component FilmSmallCard</div>);

describe('Component: FilmsList', () => {
  it('should be rendered correctly', () => {
    const preparedComponent = withHistory(<FilmsList films={films} />);

    render(preparedComponent);

    expect(screen.getByTestId('catalog-films-list')).toBeInTheDocument();
    expect(screen.getAllByText('Component FilmSmallCard')).toHaveLength(films.length);
  });
});
