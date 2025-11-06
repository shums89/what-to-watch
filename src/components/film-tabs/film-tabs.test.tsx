import { fireEvent, render, screen } from '@testing-library/react';

import FilmTabs from './film-tabs';
import { films } from '../../mocks/films';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { makeFakeStore } from '../../test-utils/mocks';

jest.mock('../film-tabs-overview/film-tabs-overview', () => () => <div>Component FilmTabsOverview</div>);
jest.mock('../film-tabs-details/film-tabs-details', () => () => <div>Component FilmTabsDetails</div>);
jest.mock('../film-tabs-reviews/film-tabs-reviews', () => () => <div>Component FilmTabsReviews</div>);

describe('Component: FilmTabs', () => {
  const film = films[0];
  const { withStoreComponent } = withStore(<FilmTabs film={film} />, makeFakeStore());
  const preparedComponent = withHistory(withStoreComponent);

  it('should be rendered correctly', () => {
    render(preparedComponent);

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByTestId('item-tab-overview')).toHaveClass('film-nav__item--active');
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  it('onClick should be called when user has chosen a tab', () => {
    render(preparedComponent);

    fireEvent.click(screen.getByTestId('button-tab-details'));
    expect(screen.getByTestId('item-tab-details')).toHaveClass('film-nav__item--active');
    expect(screen.getByText('Component FilmTabsDetails')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('button-tab-reviews'));
    expect(screen.getByTestId('item-tab-reviews')).toHaveClass('film-nav__item--active');
    expect(screen.getByText('Component FilmTabsReviews')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('button-tab-overview'));
    expect(screen.getByTestId('item-tab-overview')).toHaveClass('film-nav__item--active');
    expect(screen.getByText('Component FilmTabsOverview')).toBeInTheDocument();
  });
});
