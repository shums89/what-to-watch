import type { Film } from '../../types/types';

type FilmTabsOverviewProps = Film;

const getRatingText = (rating: number) => {
  if (!rating || rating < 0) { return ''; }
  if (rating < 3) { return 'Bad'; }
  if (rating < 5) { return 'Normal'; }
  if (rating < 8) { return 'Good'; }
  if (rating < 10) { return 'Very good'; }
  if (rating === 10) { return 'Awesome'; }
};

const FilmTabsOverview = ({ description, rating, scoresCount, director, starring }: FilmTabsOverviewProps): JSX.Element => (
  <>
    <div className="film-rating">
      <div className="film-rating__score">{rating.toFixed(1)}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{getRatingText(rating)}</span>
        <span className="film-rating__count">{scoresCount} ratings</span>
      </p>
    </div>

    <div className="film-card__text">
      <p>{description}</p>
      <p className="film-card__director"><strong>Director: {director}</strong></p>
      <p className="film-card__starring"><strong>Starring: {starring.join(', ')} and other</strong></p>
    </div>
  </>
);

export default FilmTabsOverview;
