import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import Footer from '../../components/footer/footer';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import FilmsList from '../../components/films-list/films-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteFilms, getIsFavoriteFilmsLoading } from '../../store/film-data/selectors';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';

const UserListScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavoriteFilmsDataLoading = useAppSelector(getIsFavoriteFilmsLoading);

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, [dispatch]);

  if (isFavoriteFilmsDataLoading || !favoriteFilms) {
    return <Spinner />;
  }

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW. My list</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <HeaderUserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={favoriteFilms} />
      </section>

      <Footer />
    </div>
  );
};

export default UserListScreen;
