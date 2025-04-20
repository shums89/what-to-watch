import { Film } from '../../types/film';
import FilmSmallCard from '../film-small-card/film-small-card';
import Footer from '../footer/footer';

type SimilarFilmsProps = {
  films: Film[];
};

const SimilarFilms = ({ films }: SimilarFilmsProps): JSX.Element => (
  <div className="page-content">
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__films-list">
        {films.map((film) => (
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

export default SimilarFilms;
