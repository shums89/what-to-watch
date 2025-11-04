import { render, screen } from '@testing-library/react';

import Rating from './rating';
import { withHistory, withStore } from '../../test-utils/mock-component';

describe('Component: Rating', () => {
  it('should be rendered correctly', () => {
    const onChange = jest.fn();
    const { withStoreComponent } = withStore(<Rating onChange={onChange} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('rating')).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp('Rating', 'i'))).toHaveLength(10);
  });
});
