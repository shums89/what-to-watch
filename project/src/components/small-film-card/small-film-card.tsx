import { Link } from 'react-router-dom';

type SmallFilmCardProps = {
  name: string;
  posterImage: string;
}

const SmallFilmCard = ({ name, posterImage }: SmallFilmCardProps): JSX.Element => (
  <article className="small-film-card catalog__films-card">
    <div className="small-film-card__image">
      <img
        src={posterImage}
        alt={name}
        width="280"
        height="175"
      />
    </div>
    <h3 className="small-film-card__title">
      <Link to="/films/1" className="small-film-card__link">
        {name}
      </Link>
    </h3>
  </article>
);

export default SmallFilmCard;
