import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilms } from '../../store/film-data/selectors';
import { setFilterGenre } from '../../store/film-process/film-process';
import { getGenre } from '../../store/film-process/selectors';
import Genre from '../genre/genre';
import { MAX_COUNT_GENRES } from '../../const';

const GenresList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeGenre: string = useAppSelector(getGenre);
  const films = useAppSelector(getFilms);
  const genres: string[] = [...new Set(films.reduce<string[]>((acc, cur) => [...acc, cur.genre], ['All genres']))];

  const handleGenreClick = useCallback((genre: string) => {
    dispatch(setFilterGenre(genre));
  }, [dispatch]);

  useEffect(() => () => {
    dispatch(setFilterGenre('All genres'));
  }, [dispatch]);

  return (
    <ul className="catalog__genres-list" data-testid="catalog-genres-list">
      {genres.slice(0, MAX_COUNT_GENRES).map((genre) => (
        <Genre key={genre} name={genre} isActive={genre === activeGenre} onClick={handleGenreClick} />
      ))}
    </ul>
  );
};

export default GenresList;
