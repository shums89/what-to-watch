import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/footer';
import FilmPromo from '../../components/film-promo/film-promo';
import FilmsList from '../../components/films-list/films-list';
import { useAppSelector } from '../../hooks';
import GenresList from '../../components/genres-list/genres-list';
import FilmsShowMore from '../../components/films-show-more/films-show-more';

const MainScreen = (): JSX.Element => {
  const films = useAppSelector((state) => state.films.filter((film) => film.genre === state.genre || state.genre === 'All genres'));
  const countFilms = useAppSelector((state) => state.count);
  const isVisible: boolean = films.length > countFilms;

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

          <FilmsList films={films.slice(0, countFilms)} />

          {isVisible && <FilmsShowMore />}
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MainScreen;
