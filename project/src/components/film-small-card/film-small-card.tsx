import { Link } from 'react-router-dom';
import { Film } from '../../types/film';
import { AppRoute } from '../../const';

type FilmSmallCardProps = Film & {
  onMouseOver?: (id: number) => void;
  onMouseOut?: () => void;
}

const FilmSmallCard = ({ id, name, previewImage, onMouseOver, onMouseOut }: FilmSmallCardProps): JSX.Element => (
  <article
    className="small-film-card catalog__films-card"
    onMouseOver={() => onMouseOver ? onMouseOver(id) : null}
    onMouseOut={() => onMouseOut ? onMouseOut() : null}
  >
    <div className="small-film-card__image">
      <img
        src={previewImage}
        alt={name}
        width="280"
        height="175"
      />
    </div>
    <h3 className="small-film-card__title">
      <Link to={`${AppRoute.Films}/${id}`} className="small-film-card__link">
        {name}
      </Link>
    </h3>
  </article>
);

export default FilmSmallCard;
