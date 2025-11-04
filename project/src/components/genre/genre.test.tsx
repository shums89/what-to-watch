import { fireEvent, render, screen } from '@testing-library/react';

import Genre from './genre';
import { withHistory, withStore } from '../../test-utils/mock-component';

describe('Component: Genre', () => {
  const onClick = jest.fn();
  const genre = 'drama';

  const { withStoreComponent } = withStore(<Genre name={genre} isActive onClick={onClick} />, {});
  const preparedComponent = withHistory(withStoreComponent);

  it('should be rendered correctly', () => {
    render(preparedComponent);

    expect(screen.getByTestId('catalog-genres-item')).toBeInTheDocument();
    expect(screen.getByTestId('catalog-genres-item')).toHaveClass('catalog__genres-item--active');
    expect(screen.getByText(new RegExp(genre, 'i'))).toBeInTheDocument();
  });

  it('onClick should be called when user has chosen genre', () => {
    render(preparedComponent);

    fireEvent.click(screen.getByTestId('catalog-genres-item'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
