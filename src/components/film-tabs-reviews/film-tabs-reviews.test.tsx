import { render, screen } from '@testing-library/react';

import type { Comment } from '../../types/film';
import type { UserData } from '../../types/user-data';
import FilmTabsReviews from './film-tabs-reviews';

const user: Omit<UserData, 'token'> = {
  id: 1,
  name: 'Peter',
  email: 'peter@gmail.com',
  avatarUrl: 'img/user-1.jpg',
};
const comments: Comment[] = [
  {
    id: 1,
    user,
    rating: 2.1,
    comment: 'This is great!',
    date: '2025-10-16T13:16:51.359Z',
  },
];

describe('Component: FilmTabsReviews', () => {
  it('should be rendered correctly', () => {
    render(<FilmTabsReviews comments={comments} />);

    expect(screen.getAllByText(new RegExp(comments[0].rating.toString(), 'i'))).not.toBeNull();
    expect(screen.getAllByText(new RegExp(comments[0].user.name.toString(), 'i'))).not.toBeNull();
    expect(screen.getAllByTestId('review')).toHaveLength(comments.length);
  });
});
