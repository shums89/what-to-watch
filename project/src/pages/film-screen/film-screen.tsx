import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import type { Film } from '../../types/film';

import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import SimilarFilms from '../../components/similar-films/similar-films';
import FilmTabs from '../../components/film-tabs/film-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction, fetchFilmAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getFilm, getIsFilmLoading } from '../../store/film-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import Spinner from '../../components/spinner/spinner';

const FilmScreen = (): JSX.Element | null => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const film: Film | null = useAppSelector(getFilm);
  const isFilmDataLoading: boolean = useAppSelector(getIsFilmLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    const { id } = params;
    if (id) {
      const parsedId = Number(id);
      dispatch(fetchFilmAction(parsedId));
      dispatch(fetchCommentsAction(parsedId));
    }
  }, [params, dispatch]);

  if (isFilmDataLoading || !film) {
    return <Spinner />;
  }

  const { id, name, posterImage, backgroundImage, backgroundColor, genre, released, isFavorite } = film;

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
                <Link to={`${AppRoute.Player}/${id}`} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <FavoriteButton id={id} isFavorite={isFavorite} />
                {authorizationStatus === AuthorizationStatus.Auth &&
                  (<Link to="review" className="btn film-card__button">Add review</Link>)}
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

      <SimilarFilms id={film.id} />
    </>
  );
};

export default FilmScreen;
