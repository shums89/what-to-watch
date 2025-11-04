import { Link } from 'react-router-dom';

import type { Film } from '../../types/film';
import HeaderUserBlock from '../header-user-block/header-user-block';
import Logo from '../logo/logo';
import { AppRoute } from '../../const';
import FavoriteButton from '../favorite-button/favorite-button';

type PromoProps = {
  promo: Film;
}

const FilmPromo = ({ promo }: PromoProps): JSX.Element => {
  const { id, name, posterImage, backgroundImage, genre, released, isFavorite } = promo;

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name} data-testid="background-image" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo />

        <HeaderUserBlock />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt="{name} poster" width="218" height="327" data-testid="poster" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <div className="film-card__buttons">
              <Link to={`${AppRoute.Player}/${id}`} className="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>
              <FavoriteButton id={id} isFavorite={isFavorite} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmPromo;
