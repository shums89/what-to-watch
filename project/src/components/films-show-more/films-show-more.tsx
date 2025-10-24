import { useAppDispatch } from '../../hooks';
import { setCountDisplayedFilms } from '../../store/film-process/film-process';

const FilmsShowMore = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleShowMoreClick = () => {
    dispatch(setCountDisplayedFilms());
  };

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={handleShowMoreClick}>Show more</button>
    </div>
  );
};

export default FilmsShowMore;
