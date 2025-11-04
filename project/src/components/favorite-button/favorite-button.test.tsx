import { render, screen } from '@testing-library/react';

import { withHistory, withStore } from '../../test-utils/mock-component';
import FavoriteButton from './favorite-button';

describe('Component: FavoriteButton', () => {
  it('should render correctly when film is on the list', () => {
    const { withStoreComponent } = withStore(<FavoriteButton id={1} isFavorite />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('in-list')).toHaveAttribute('xlink:href', '#in-list');
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render correctly when film is not on the list', () => {
    const { withStoreComponent } = withStore(<FavoriteButton id={1} isFavorite={false} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('add-list')).toHaveAttribute('xlink:href', '#add');
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });
});

