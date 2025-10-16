import { createReducer } from '@reduxjs/toolkit';

import type { Film } from '../types/types';

import { fetchFilms, fetchPromo, setCountFilms, setGenre } from './action';
import { DEFAULT_GENRE, FILM_COUNT_PER_STEP } from '../const';

type State = {
  genre: string;
  promo: Film | null;
  films: Film[];
  isOffersLoading: boolean;
  count: number;
};

const initialState: State = {
  genre: DEFAULT_GENRE,
  promo: null,
  films: [],
  isOffersLoading: false,
  count: FILM_COUNT_PER_STEP,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
      state.count = FILM_COUNT_PER_STEP;
    })
    .addCase(fetchPromo.fulfilled, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(fetchFilms.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.count = FILM_COUNT_PER_STEP;
      state.isOffersLoading = false;
    })
    .addCase(setCountFilms, (state) => {
      state.count = state.count + FILM_COUNT_PER_STEP;
    });
});
