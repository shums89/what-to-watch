import { createAction } from '@reduxjs/toolkit';

import type { Film } from '../types/types';

export const Action = {
  SET_GENRE: 'genre/set',
  SET_FILMS: 'films/set',
};

export const setGenre = createAction<string>(Action.SET_GENRE);
export const setFilms = createAction<Film[]>(Action.SET_FILMS);
