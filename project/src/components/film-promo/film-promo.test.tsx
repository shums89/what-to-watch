import { render, screen } from '@testing-library/react';

import FilmPromo from './film-promo';
import { films } from '../../mocks/films';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { makeFakeStore } from '../../test-utils/mocks';

jest.mock('../logo/logo', () => () => <div>Component Logo</div>);
jest.mock('../header-user-block/header-user-block', () => () => <div>Component HeaderUserBlock</div>);
jest.mock('../favorite-button/favorite-button', () => () => <div>Component FavoriteButton</div>);

describe('Component: FilmPromo', () => {
  it('should be rendered correctly', () => {
    const promo = films[0];
    const { name, posterImage, backgroundImage, genre, released } = promo;
    const { withStoreComponent } = withStore(<FilmPromo promo={promo} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(genre)).toBeInTheDocument();
    expect(screen.getByText(released)).toBeInTheDocument();
    expect(screen.getByTestId('background-image')).toBeInTheDocument();
    expect(screen.getByTestId('background-image')).toHaveAttribute('src', backgroundImage);
    expect(screen.getByTestId('poster')).toBeInTheDocument();
    expect(screen.getByTestId('poster')).toHaveAttribute('src', posterImage);
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Component Logo')).toBeInTheDocument();
    expect(screen.getByText('Component HeaderUserBlock')).toBeInTheDocument();
    expect(screen.getByText('Component FavoriteButton')).toBeInTheDocument();
  });
});
