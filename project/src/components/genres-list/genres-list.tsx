import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilterGenre } from '../../store/action';
import Genre from '../genre/genre';

const GenresList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isFilmsDataLoading: boolean = useAppSelector((state) => state.isFilmsDataLoading);
  const activeGenre: string = useAppSelector((state) => state.genre);
  const genres: string[] = useAppSelector(
    (state) => [...new Set(state.films.reduce<string[]>((acc, cur) => [...acc, cur.genre], ['All genres']))]
  );

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
