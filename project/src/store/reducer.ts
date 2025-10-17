import { createReducer } from '@reduxjs/toolkit';

import type { Film } from '../types/film';

import {
  loadFilms,
  loadPromo,
  setCountDisplayedFilms,
  setFilmsDataLoadingStatus,
  setFilterGenre,
} from './action';
import { DEFAULT_GENRE, FILM_COUNT_PER_STEP } from '../const';

type State = {
  genre: string;
  promo: Film | null;
  films: Film[];
  isFilmsDataLoading: boolean;
  count: number;
};

const initialState: State = {
  genre: DEFAULT_GENRE,
  promo: null,
  films: [],
  isFilmsDataLoading: false,
  count: FILM_COUNT_PER_STEP,
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
    .addCase(setCountDisplayedFilms, (state) => {
      state.count = state.count + FILM_COUNT_PER_STEP;
    });
});
