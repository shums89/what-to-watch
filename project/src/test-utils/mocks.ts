import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { FilmData, State } from '../types/state';
import { createAPI } from '../services/api';
import { AuthorizationStatus } from '../const';
import { films } from '../mocks/films';
import { UserData } from '../types/user-data';
import { Comment } from '../types/film';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

const user: Omit<UserData, 'token'> = {
  id: 1,
  name: 'Peter',
  email: 'peter@gmail.com',
  avatarUrl: 'img/user-1.jpg',
};
const comments: Comment[] = [
  {
    id: 1,
    user,
    rating: 2.1,
    comment: 'This is great!',
    date: '2025-10-16T13:16:51.359Z',
  },
];

export const fakeFilmData: FilmData = {
  promo: films[0],
  films,
  isFilmsDataLoading: false,
  film: films[1],
  isFilmDataLoading: false,
  similarFilms: films.filter((item) => item.genre === films[1].genre),
  favoriteFilms: films.filter((item) => item.isFavorite),
  isFavoriteFilmsLoading: false,
  comments,
};

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  FILM_DATA: fakeFilmData,
  FILM_PROCESS: {
    genre: 'All genres',
    count: 4,
  },
  USER_PROCESS: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
  },
  ...(initialState ?? {}),
});
