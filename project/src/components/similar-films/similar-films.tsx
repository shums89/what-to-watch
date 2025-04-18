import { films } from '../../mocks/films';
import FilmSmallCard from '../film-small-card/film-small-card';
import Footer from '../footer/footer';

const SimilarFilms = (): JSX.Element => {
  const similarFilms = films.slice().sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__films-list">
          {similarFilms.map((el) => <FilmSmallCard key={el.id} film={el} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SimilarFilms;
