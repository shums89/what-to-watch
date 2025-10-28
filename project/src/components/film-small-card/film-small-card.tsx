import { Link } from 'react-router-dom';

import type { Film } from '../../types/film';

import { AppRoute } from '../../const';
import VideoPlayer from '../video-player/video-player';

type FilmSmallCardProps = Film & {
  onMouseOver?: (id: number) => void;
  onMouseOut?: () => void;
  isActive?: boolean;
}

const FilmSmallCard = ({ onMouseOver, onMouseOut, isActive, ...film }: FilmSmallCardProps): JSX.Element => (
  <article
    className="small-film-card catalog__films-card"
    onMouseOver={() => onMouseOver ? onMouseOver(film.id) : null}
    onMouseOut={() => onMouseOut ? onMouseOut() : null}
  >
    <Link to={`${AppRoute.Films}/${film.id}`} className="small-film-card__image">
      <VideoPlayer isPlaying={isActive || false} {...film} />
    </Link>
    <h3 className="small-film-card__title">
      <Link to={`${AppRoute.Films}/${film.id}`} className="small-film-card__link">
        {film.name}
      </Link>
    </h3>
  </article >
);

export default FilmSmallCard;
