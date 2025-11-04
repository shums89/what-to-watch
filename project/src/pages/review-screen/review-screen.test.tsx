import { render, screen } from '@testing-library/react';

import ReviewScreen from './review-screen';
import { films } from '../../mocks/films';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { fakeFilmData, makeFakeStore } from '../../test-utils/mocks';

jest.mock('../../components/logo/logo', () => () => <div>Component Logo</div>);
jest.mock('../../components/header-user-block/header-user-block', () => () => <div>Component HeaderUserBlock</div>);
jest.mock('../../components/rating/rating', () => () => <div>Component Rating</div>);
jest.mock('../not-found-screen/not-found-screen', () => () => <div>Component NotFoundScreen</div>);

describe('Component: ReviewScreen', () => {
  it('should be rendered correctly', () => {
    const film = films[0];
    const { name, posterImage, backgroundImage } = film;
    const { withStoreComponent } = withStore(<ReviewScreen />, makeFakeStore({
      FILM_DATA: { ...fakeFilmData, film: film },
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('background-image')).toBeInTheDocument();
    expect(screen.getByTestId('background-image')).toHaveAttribute('src', backgroundImage);
    expect(screen.getByTestId('poster')).toBeInTheDocument();
    expect(screen.getByTestId('poster')).toHaveAttribute('src', posterImage);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Post');
    expect(screen.getByText('Component Logo')).toBeInTheDocument();
    expect(screen.getByText('Component HeaderUserBlock')).toBeInTheDocument();
    expect(screen.getByText('Component Rating')).toBeInTheDocument();
  });

  it('should be rendered correctly when film is not found or has not loaded', () => {
    const { withStoreComponent } = withStore(<ReviewScreen />, makeFakeStore({
      FILM_DATA: { ...fakeFilmData, film: null },
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Component NotFoundScreen')).toBeInTheDocument();
  });
});
