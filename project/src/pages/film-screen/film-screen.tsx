import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import type { Film } from '../../types/types';

import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import SimilarFilms from '../../components/similar-films/similar-films';
import FilmTabs from '../../components/film-tabs/film-tabs';
import { useAppSelector } from '../../hooks';

const FilmScreen = (): JSX.Element => {
  const params = useParams();
  const films: Film[] = useAppSelector((state) => state.films);
  const film: Film | null = (Number.isInteger(Number(params.id)) && films.filter((el) => el.id === Number(params.id))[0]) || null;

  if (!film) {
    return <NotFoundScreen />;
  }

  const { name, posterImage, backgroundImage, backgroundColor, genre, released } = film;
  const similarFilms: Film[] = films.filter((el) => el.genre === genre && el.id !== film.id).slice(0, 4);

  return (
    <>
      <Helmet>
        <title>WTW. {name}</title>
      </Helmet>

      <section className="film-card film-card--full" style={{ backgroundColor: backgroundColor }}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <HeaderUserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to="review" className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <FilmTabs film={film} />
          </div>
        </div>
      </section>

      <SimilarFilms films={similarFilms} />
    </>
  );
};

export default FilmScreen;
