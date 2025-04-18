import { Link } from 'react-router-dom';
import { Film } from '../../types/film';
import { AppRoute } from '../../const';

type FilmSmallCardProps = {
  film: Film;
}

const FilmSmallCard = ({ film }: FilmSmallCardProps): JSX.Element => {
  const { id, name, previewImage } = film;
  const link = `${AppRoute.Films}/${id}`;

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img
          src={previewImage}
          alt={name}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link to={link} className="small-film-card__link">
          {name}
        </Link>
      </h3>
    </article>
  );
};

export default FilmSmallCard;
