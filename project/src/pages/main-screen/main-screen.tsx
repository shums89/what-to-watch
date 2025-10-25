import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import Footer from '../../components/footer/footer';
import FilmPromo from '../../components/film-promo/film-promo';
import FilmsList from '../../components/films-list/films-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import GenresList from '../../components/genres-list/genres-list';
import FilmsShowMore from '../../components/films-show-more/films-show-more';
import { fetchFilmsAction, fetchPromoAction } from '../../store/api-actions';
import { getPromo, selectFilms } from '../../store/film-data/selectors';
import { getCount } from '../../store/film-process/selectors';

const MainScreen = (): JSX.Element => {
  const promo = useAppSelector(getPromo);
  const films = useAppSelector(selectFilms);
  const countFilms = useAppSelector(getCount);
  const isVisible: boolean = films.length > countFilms;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromoAction());
    dispatch(fetchFilmsAction());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>

      {promo && (<FilmPromo promo={promo} />)}

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
