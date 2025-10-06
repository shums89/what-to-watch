import { Film } from '../../types/film';

type FilmTabsDetailsProps = Film;

const getTimeFormat = (time: number) => {
  const minutes: number = Math.floor(time % 60);
  const hours: number = Math.floor((time / 60) % 24);

  return `${(hours > 0) ? `${hours}h`.slice(-3) : ''} ${(minutes > 0) ? `0${minutes}m`.slice(-3) : ''}`;
};

const FilmTabsDetails = ({ director, starring, runTime, genre, released }: FilmTabsDetailsProps): JSX.Element => (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        <span className="film-card__details-value">{director}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span className="film-card__details-value">{starring}</span>
      </p>
    </div>

    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        <span className="film-card__details-value">{getTimeFormat(runTime)}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        <span className="film-card__details-value">{released}</span>
      </p>
    </div>
  </div>
);

export default FilmTabsDetails;
