import { render, screen } from '@testing-library/react';

import GenresList from './genres-list';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { makeFakeStore } from '../../test-utils/mocks';

jest.mock('../genre/genre', () => () => <div>Component Genre</div>);

describe('Component: GenresList', () => {
  it('should be rendered correctly', () => {
    const { withStoreComponent } = withStore(<GenresList />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByTestId('catalog-genres-list')).toBeInTheDocument();
    expect(screen.getAllByText('Component Genre')).not.toBeNull();
  });
});
