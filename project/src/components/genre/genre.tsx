// import { FormEvent } from 'react';

type GenreProps = {
  name: string;
  isActive: boolean;
  onClick: (name: string) => void;
}

const Genre = ({ name, isActive, onClick }: GenreProps): JSX.Element => {
  const handleGenreClick = () => {
    onClick(name);
  };

  // const handleLinkClick = (evt: FormEvent<HTMLFormElement>) => {
  //   evt.preventDefault();
  // };

  return (
    <li className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`} onClick={handleGenreClick}>
      <a className="catalog__genres-link">{name}</a>
    </li>
  );
};

export default Genre;
