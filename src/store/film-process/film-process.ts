import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { FilmProcess } from '../../types/state';
import { DEFAULT_GENRE, FILM_COUNT_PER_STEP, StoreSlice } from '../../const';

const initialState: FilmProcess = {
  genre: DEFAULT_GENRE,
  count: FILM_COUNT_PER_STEP,
};

export const filmProcess = createSlice({
  name: StoreSlice.FilmProcess,
  initialState,
  reducers: {
    setFilterGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
      state.count = FILM_COUNT_PER_STEP;
    },
    setCountDisplayedFilms: (state) => {
      state.count = state.count + FILM_COUNT_PER_STEP;
    },
  },
});

export const { setFilterGenre, setCountDisplayedFilms } = filmProcess.actions;
