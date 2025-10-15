import { createReducer } from '@reduxjs/toolkit';

import type { Film } from '../types/types';

import { setCountFilms, setFilms, setGenre } from './action';
import { DEFAULT_GENRE, FILM_COUNT_PER_STEP } from '../const';

type State = {
  genre: string;
  films: Film[];
  count: number;
};

const initialState: State = {
  genre: DEFAULT_GENRE,
  films: [],
  count: FILM_COUNT_PER_STEP,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
      state.count = FILM_COUNT_PER_STEP;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
      state.count = FILM_COUNT_PER_STEP;
    })
    .addCase(setCountFilms, (state) => {
      state.count = state.count + FILM_COUNT_PER_STEP;
    });
});
