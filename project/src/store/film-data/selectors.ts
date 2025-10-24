import type { Comment, Film } from '../../types/film';
import type { State } from '../../types/state';
import { StoreSlice } from '../../const';

export const getPromo = (state: State): Film | null => state[StoreSlice.FilmData].promo;

export const getFilms = (state: State): Film[] => state[StoreSlice.FilmData].films;
export const getIsFilmsLoading = (state: State): boolean => state[StoreSlice.FilmData].isFilmsDataLoading;

export const getFilm = (state: State): Film | null => state[StoreSlice.FilmData].film;
export const getIsFilmLoading = (state: State): boolean => state[StoreSlice.FilmData].isFilmDataLoading;

export const getSimilarFilms = (state: State): Film[] => state[StoreSlice.FilmData].similarFilms;

export const getComments = (state: State): Comment[] => state[StoreSlice.FilmData].comments;
