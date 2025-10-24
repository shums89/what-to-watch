import type { Film } from '../../types/film';

import Footer from '../footer/footer';
import FilmsList from '../films-list/films-list';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSimilarFilmsAction } from '../../store/api-actions';
import { getSimilarFilms } from '../../store/film-data/selectors';

type SimilarFilmsProps = {
  id: number;
};

const SimilarFilms = ({ id }: SimilarFilmsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const films: Film[] = useAppSelector(getSimilarFilms);

  useEffect(() => {
    dispatch(fetchSimilarFilmsAction(id));
  }, [id, dispatch]);

  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <FilmsList films={films} />
      </section>

      <Footer />
    </div>
  );
};


export default SimilarFilms;
