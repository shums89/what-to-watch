import type { Comment } from '../../types/film';
import { formatDate } from '../../utils';

type FilmTabsReviewsProps = {
  comments: Comment[];
};

const FilmTabsReviews = ({ comments }: FilmTabsReviewsProps): JSX.Element => (
  <div className="film-card__reviews film-card__row">
    <div className="film-card__reviews-col">
      {comments && comments.map((comment) => (
        <div className="review" key={comment.id} data-testid="review">
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

export default FilmTabsReviews;
