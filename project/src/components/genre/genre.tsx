import { MouseEvent } from 'react';

type GenreProps = {
  name: string;
  isActive: boolean;
  onClick: (name: string) => void;
}

const Genre = ({ name, isActive, onClick }: GenreProps): JSX.Element => {
  const handleItemClick = (evt: MouseEvent) => {
    evt.preventDefault();
    onClick(name);
  };

  return (
    <li
      className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}
      onClick={handleItemClick}
      data-testid="catalog-genres-item"
    >
      <a href='#' className="catalog__genres-link" >{name}</a>
    </li>
  );
};

export default Genre;
