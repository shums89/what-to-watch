import { createSlice } from '@reduxjs/toolkit';

import type { FilmData } from '../../types/state';
import { StoreSlice } from '../../const';
import {
  fetchCommentsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoAction,
  fetchSimilarFilmsAction,
} from '../api-actions';

const initialState: FilmData = {
  promo: null,
  films: [],
  isFilmsDataLoading: false,
  film: null,
  isFilmDataLoading: false,
  similarFilms: [],
  comments: [],
};

export const filmData = createSlice({
  name: StoreSlice.FilmData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchFilmsAction.pending, (state, action) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(fetchFilmAction.pending, (state, action) => {
        state.isFilmDataLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmDataLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});
