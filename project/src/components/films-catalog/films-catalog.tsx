import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsFilmsLoading, selectFilms } from '../../store/film-data/selectors';
import { setCountDisplayedFilms } from '../../store/film-process/film-process';
import { getCount } from '../../store/film-process/selectors';
import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';
import Spinner from '../spinner/spinner';

const FilmsCatalog = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isFilmsDataLoading: boolean = useAppSelector(getIsFilmsLoading);
  const filteredFilms = useAppSelector(selectFilms);
  const countFilms = useAppSelector(getCount);
  const isVisibleButton: boolean = filteredFilms.length > countFilms;

  const handleShowMoreClick = useCallback(() => {
    dispatch(setCountDisplayedFilms());
  }, [dispatch]);

  if (isFilmsDataLoading) {
    return <Spinner />;
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenresList />

      <FilmsList films={filteredFilms.slice(0, countFilms)} />

      {isVisibleButton && (
        <div className="catalog__more">
          <button className="catalog__button" type="button" onClick={handleShowMoreClick}>Show more</button>
        </div>
      )}
    </section>
  );
};

export default FilmsCatalog;
