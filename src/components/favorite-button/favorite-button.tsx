import { memo } from 'react';

import type { Film } from '../../types/film';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postFavoriteStatusAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { redirectToRoute } from '../../store/action';
import { getFavoriteFilms } from '../../store/film-data/selectors';

type FavoriteButtonProps = {
  id: Film['id'];
  isFavorite: boolean;
}

const FavoriteButton = ({ id, isFavorite }: FavoriteButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  const handleButtonClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    dispatch(postFavoriteStatusAction({
      id,
      status: isFavorite ? 0 : 1
    }));
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleButtonClick}>
      {isFavorite
        ? (<svg viewBox="0 0 18 14" width="18" height="14"><use xlinkHref="#in-list" data-testid="in-list"></use></svg>)
        : (<svg viewBox="0 0 19 20" width="19" height="20"><use xlinkHref="#add" data-testid="add-list"></use></svg>)}
      <span>My list {favoriteFilms && authorizationStatus === AuthorizationStatus.Auth ? `| ${favoriteFilms?.length}` : ''}</span>
    </button>
  );
};

export default memo(FavoriteButton, (prevProps, nextProps) => prevProps.isFavorite === nextProps.isFavorite);
