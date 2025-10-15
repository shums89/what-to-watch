import { createAction } from '@reduxjs/toolkit';

import type { Film } from '../types/types';

export const Action = {
  SET_GENRE: 'genre/set',
  SET_FILMS: 'films/set',
  SET_COUNT_FILMS: 'films/setCount',
};

export const setGenre = createAction<string>(Action.SET_GENRE);
export const setFilms = createAction<Film[]>(Action.SET_FILMS);
export const setCountFilms = createAction(Action.SET_COUNT_FILMS);
