import { useEffect } from 'react';

import type { Comment } from '../../types/film';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction } from '../../store/api-actions';
import { formatDate } from '../../utils';
import { getComments } from '../../store/film-data/selectors';

type FilmTabsReviewsProps = {
  id: number;
};

const FilmTabsReviews = ({ id }: FilmTabsReviewsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const comments: Comment[] = useAppSelector(getComments);

  useEffect(() => {
    dispatch(fetchCommentsAction(id));
  }, [id, dispatch]);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments && comments.map((comment) => (
          <div className="review" key={comment.id}>
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>
              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime={comment.date}>{formatDate(comment.date)}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmTabsReviews;
