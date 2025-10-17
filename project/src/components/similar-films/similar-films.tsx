import type { Film } from '../../types/film';

import Footer from '../footer/footer';
import FilmsList from '../films-list/films-list';

type SimilarFilmsProps = {
  films: Film[];
};

const SimilarFilms = ({ films }: SimilarFilmsProps): JSX.Element => (
  <div className="page-content">
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <FilmsList films={films} />
    </section>

    <Footer />
  </div>
);


export default SimilarFilms;
