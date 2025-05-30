import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import FilmSmallCard from '../../components/film-small-card/film-small-card';
import { Film } from '../../types/film';

type UserListScreenProps = {
  films: Film[];
};

const UserListScreen = ({ films }: UserListScreenProps): JSX.Element => {
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

        <div className="catalog__films-list">
          {userList.map((film) => (
            <FilmSmallCard
              key={film.id}
              {...film}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UserListScreen;
