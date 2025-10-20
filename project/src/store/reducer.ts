import { createReducer } from '@reduxjs/toolkit';

import type { Film } from '../types/film';

import {
  loadFilm,
  loadFilms,
  loadPromo,
  loginUser,
  requireAuthorization,
  setCountDisplayedFilms,
  setFilmDataLoadingStatus,
  setFilmsDataLoadingStatus,
  setFilterGenre,
} from './action';
import {
  AuthorizationStatus,
  DEFAULT_GENRE,
  FILM_COUNT_PER_STEP,
} from '../const';
import { UserData } from '../types/user-data';

type State = {
  genre: string;
  promo: Film | null;
  films: Film[];
  isFilmsDataLoading: boolean;
  film: Film | null;
  isFilmDataLoading: boolean;
  count: number;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

const initialState: State = {
  genre: DEFAULT_GENRE,
  promo: null,
  films: [],
  isFilmsDataLoading: false,
  film: null,
  isFilmDataLoading: false,
  count: FILM_COUNT_PER_STEP,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilterGenre, (state, action) => {
      state.genre = action.payload;
      state.count = FILM_COUNT_PER_STEP;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.count = FILM_COUNT_PER_STEP;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(setFilmDataLoadingStatus, (state, action) => {
      state.isFilmDataLoading = action.payload;
    })
    .addCase(setCountDisplayedFilms, (state) => {
      state.count = state.count + FILM_COUNT_PER_STEP;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loginUser, (state, action) => {
      state.user = action.payload;
    });
});
