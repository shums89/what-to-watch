import { createReducer } from '@reduxjs/toolkit';

import type { Film } from '../types/types';

import { setFilms, setGenre } from './action';
import { DEFAULT_GENRE } from '../const';

type State = {
  genre: string;
  films: Film[];
};

const initialState: State = {
  genre: DEFAULT_GENRE,
  films: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    });
});
