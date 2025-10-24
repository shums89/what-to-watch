import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilms, getIsFilmsLoading } from '../../store/film-data/selectors';
import { setFilterGenre } from '../../store/film-process/film-process';
import { getGenre } from '../../store/film-process/selectors';
import Genre from '../genre/genre';

const GenresList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isFilmsDataLoading: boolean = useAppSelector(getIsFilmsLoading);
  const activeGenre: string = useAppSelector(getGenre);
  const films = useAppSelector(getFilms);
  const genres: string[] = [...new Set(films.reduce<string[]>((acc, cur) => [...acc, cur.genre], ['All genres']))];

  const handleGenreClick = (genre: string) => {
    dispatch(setFilterGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      {!isFilmsDataLoading && genres.map((genre) => (
        <Genre key={genre} name={genre} isActive={genre === activeGenre} onClick={handleGenreClick} />
      ))}
    </ul>
  );
};

export default GenresList;
