import { AuthorizationStatus } from '../const';
import store from '../store';
import { Comment, Film } from './film';
import { UserData } from './user-data';

export type FilmData = {
  promo: Film | null;
  films: Film[];
  isFilmsDataLoading: boolean;
  film: Film | null;
  isFilmDataLoading: boolean;
  similarFilms: Film[];
  favoriteFilms: Film[];
  isFavoriteFilmsLoading: boolean;
  comments: Comment[];
};

export type FilmProcess = {
  genre: string;
  count: number;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
