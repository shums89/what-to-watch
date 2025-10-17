import { createAction } from '@reduxjs/toolkit';

import type { Film } from '../types/film';

const Action = {
  film: {
    SET_GENRE: 'film/setFilterGenre',
    SET_COUNT_FILMS: 'film/setCountDisplayedFilms',
  },
  data: {
    LOAD_FILMS: 'data/loadFilms',
    LOAD_PROMO: 'data/loadPromo',
    SET_FILMS_DATA_LOADING_STATUS: 'data/setFilmsDataLoadingStatus',
  },
} as const;

export const setFilterGenre = createAction<string>(Action.film.SET_GENRE);
export const setCountDisplayedFilms = createAction(Action.film.SET_COUNT_FILMS);

export const loadFilms = createAction<Film[]>(Action.data.LOAD_FILMS);
export const loadPromo = createAction<Film>(Action.data.LOAD_PROMO);
export const setFilmsDataLoadingStatus = createAction<boolean>(
  Action.data.SET_FILMS_DATA_LOADING_STATUS
);
