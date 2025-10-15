import { useAppDispatch, useAppSelector } from '../../hooks';
import { setGenre } from '../../store/action';
import Genre from '../genre/genre';

const GenresList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector((state) => state.genre);
  const genres = useAppSelector(
    (state) => [...new Set(state.films.reduce<string[]>((acc, cur) => [...acc, cur.genre], ['All genres']))]
  );

  const handleGenreClick = (genre: string) => {
    dispatch(setGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <Genre key={genre} name={genre} isActive={genre === activeGenre} onClick={handleGenreClick} />
      ))}
    </ul>
  );
};

export default GenresList;
