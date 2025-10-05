import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import FilmSmallCard from '../../components/film-small-card/film-small-card';
import { Film } from '../../types/film';
import FilmPromo from '../../components/film-promo/film-promo';
import { useState } from 'react';

type MainScreenProps = {
  films: Film[];
};

const MainScreen = ({ films }: MainScreenProps): JSX.Element => {
  const promoFilm = films[0];
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>

      <FilmPromo film={promoFilm} />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="#" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          <div className="catalog__films-list">
            {films.map((film) => (
              <FilmSmallCard
                key={film.id}
                {...film}
                onMouseOver={() => setActiveId(film.id)}
                onMouseOut={() => setActiveId(null)}
                isActive={activeId === film.id}
              />
            ))}
          </div>

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
