import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/footer';
import FilmPromo from '../../components/film-promo/film-promo';
import FilmsList from '../../components/films-list/films-list';
import { useAppSelector } from '../../hooks';
import { DEFAULT_GENRE, FILMS_COUNT } from '../../const';
import GenresList from '../../components/genres-list/genres-list';

const MainScreen = (): JSX.Element => {
  const films = useAppSelector((state) => state.films.filter((film) => film.genre === state.genre || state.genre === DEFAULT_GENRE).slice(0, FILMS_COUNT));

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>

      <FilmPromo />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <FilmsList films={films} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MainScreen;
