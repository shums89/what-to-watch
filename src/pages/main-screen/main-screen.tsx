import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import Footer from '../../components/footer/footer';
import FilmPromo from '../../components/film-promo/film-promo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmsAction, fetchPromoAction } from '../../store/api-actions';
import { getPromo } from '../../store/film-data/selectors';
import FilmsCatalog from '../../components/films-catalog/films-catalog';

const MainScreen = (): JSX.Element => {
  const promo = useAppSelector(getPromo);
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
        <FilmsCatalog />

        <Footer />
      </div>
    </>
  );
};

export default MainScreen;
