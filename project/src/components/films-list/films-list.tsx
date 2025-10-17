import { useState } from 'react';

import type { Film } from '../../types/film';

import FilmSmallCard from '../film-small-card/film-small-card';
import { useAppSelector } from '../../hooks';
import Spinner from '../../spinner/spinner';

type FilmsListProps = {
  films: Film[];
}

const FilmsList = ({ films }: FilmsListProps): JSX.Element => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmSmallCard
          key={film.id}
          {...film}
          onMouseOver={() => setActiveId(film.id)}
          onMouseOut={() => setActiveId(null)}
          isActive={activeId === film.id}
        />
      ))}
    </div>
  );
};

export default FilmsList;
