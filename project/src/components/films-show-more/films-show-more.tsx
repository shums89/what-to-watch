import { useAppDispatch } from '../../hooks';
import { setCountFilms } from '../../store/action';

const FilmsShowMore = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleShowMoreClick = () => {
    dispatch(setCountFilms());
  };

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={handleShowMoreClick}>Show more</button>
    </div>
  );
};

export default FilmsShowMore;
