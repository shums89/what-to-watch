import { createSlice } from '@reduxjs/toolkit';

import type { FilmData } from '../../types/state';
import { StoreSlice, SubmitStatus } from '../../const';
import {
  fetchCommentsAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoAction,
  fetchSimilarFilmsAction,
  postCommentAction,
  postFavoriteStatusAction,
} from '../api-actions';

const initialState: FilmData = {
  promo: null,
  films: [],
  isFilmsDataLoading: false,
  film: null,
  isFilmDataLoading: false,
  similarFilms: [],
  favoriteFilms: [],
  isFavoriteFilmsLoading: false,
  comments: [],
  commentStatus: SubmitStatus.Still,
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
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmDataLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmDataLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isFavoriteFilmsLoading = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.isFavoriteFilmsLoading = false;
      })
      .addCase(postFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedFilm = action.payload;

        state.films = state.films.map((film) => (film.id === updatedFilm.id ? updatedFilm : film));

        if (updatedFilm.isFavorite) {
          state.favoriteFilms = [...state.favoriteFilms, updatedFilm];
        } else {
          state.favoriteFilms = state.favoriteFilms.filter((item) => item.id !== updatedFilm.id);
        }

        if (state.promo && state.promo.id === updatedFilm.id) {
          state.promo = updatedFilm;
        }

        if (state.film && state.film.id === updatedFilm.id) {
          state.film = updatedFilm;
        }
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.commentStatus = SubmitStatus.Pending;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentStatus = SubmitStatus.Fullfilled;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.commentStatus = SubmitStatus.Rejected;
      });
  },
});
