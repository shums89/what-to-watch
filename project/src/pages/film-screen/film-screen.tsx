import { Link, useParams } from 'react-router-dom';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import { films } from '../../mocks/films';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { Film } from '../../types/film';
import SimilarFilms from '../../components/similar-films/similar-films';

const getRatingText = (rating: number) => {
  if (!rating || rating < 0) { return ''; }
  if (rating < 3) { return 'Bad'; }
  if (rating < 5) { return 'Normal'; }
  if (rating < 8) { return 'Good'; }
  if (rating < 10) { return 'Very good'; }
  if (rating === 10) { return 'Awesome'; }
};

const FilmScreen = (): JSX.Element => {
  const params = useParams();
  const paramsId = params.id || 0;
  const id: number = Number.isInteger(+paramsId) ? +paramsId : 0;
  const film: Film = films.filter((el) => el.id === +id)[0];

  if (!film) {
    return <NotFoundScreen />;
  }

  const {
    name,
    posterImage,
    backgroundImage,
    backgroundColor,
    description,
    rating,
    scoresCount,
    director,
    starring,
    genre,
    released,
  } = film;

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

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{rating}</div>
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
            </div>
          </div>
        </div>
      </section>

      <SimilarFilms />
    </>
  );
};

export default FilmScreen;
