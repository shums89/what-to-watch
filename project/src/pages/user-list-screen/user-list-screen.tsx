import { Helmet } from 'react-helmet-async';

import type { Film } from '../../types/film';

import Footer from '../../components/footer/footer';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import FilmsList from '../../components/films-list/films-list';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/film-data/selectors';

const UserListScreen = (): JSX.Element => {
  const films: Film[] = useAppSelector(getFilms);
  const userList = films.slice().filter((el) => el.isFavorite);

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

        <FilmsList films={userList} />
      </section>

      <Footer />
    </div>
  );
};

export default UserListScreen;
