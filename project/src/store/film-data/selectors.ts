import type { Comment, Film } from '../../types/film';
import type { State } from '../../types/state';
import { StoreSlice, SubmitStatus } from '../../const';
import { createSelector } from '@reduxjs/toolkit';
import { getGenre } from '../film-process/selectors';

export const getPromo = (state: State): Film | null => state[StoreSlice.FilmData].promo;

export const getFilms = (state: State): Film[] => state[StoreSlice.FilmData].films;
export const getIsFilmsLoading = (state: State): boolean => state[StoreSlice.FilmData].isFilmsDataLoading;

export const getFilm = (state: State): Film | null => state[StoreSlice.FilmData].film;
export const getIsFilmLoading = (state: State): boolean => state[StoreSlice.FilmData].isFilmDataLoading;

export const getSimilarFilms = (state: State): Film[] => state[StoreSlice.FilmData].similarFilms;

export const getFavoriteFilms = (state: State): Film[] | null => state[StoreSlice.FilmData].favoriteFilms;
export const getIsFavoriteFilmsLoading = (state: State): boolean => state[StoreSlice.FilmData].isFavoriteFilmsLoading;

export const getComments = (state: State): Comment[] => state[StoreSlice.FilmData].comments;
export const getCommentStatus = (state: State): SubmitStatus => state[StoreSlice.FilmData].commentStatus;

export const selectFilms = createSelector([getFilms, getGenre], (films, genre) =>
  films.filter((film) => film.genre === genre || genre === 'All genres')
);
