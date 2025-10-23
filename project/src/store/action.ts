import { createAction } from '@reduxjs/toolkit';

import type { Film } from '../types/film';
import { AppRoute, AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';

export const Action = {
  film: {
    SET_GENRE: 'film/setFilterGenre',
    SET_COUNT_FILMS: 'film/setCountDisplayedFilms',
  },
  data: {
    LOAD_PROMO: 'data/loadPromo',
    LOAD_FILMS: 'data/loadFilms',
    LOAD_FILM: 'data/loadFilm',
    LOAD_SIMILAR_FILMS: 'data/loadSimilarFilms',
    SET_FILMS_DATA_LOADING_STATUS: 'data/setFilmsDataLoadingStatus',
    SET_FILM_DATA_LOADING_STATUS: 'data/setFilmDataLoadingStatus',
  },
  user: {
    REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
    LOGIN_USER: 'user/loginUser',
  },
  route: {
    REDIRECT_TO_ROUTE: 'route/redirectToRoute',
  },
} as const;

export const setFilterGenre = createAction<string>(Action.film.SET_GENRE);
export const setCountDisplayedFilms = createAction(Action.film.SET_COUNT_FILMS);

export const loadPromo = createAction<Film>(Action.data.LOAD_PROMO);
export const loadFilms = createAction<Film[]>(Action.data.LOAD_FILMS);
export const loadFilm = createAction<Film>(Action.data.LOAD_FILM);
export const setFilmsDataLoadingStatus = createAction<boolean>(
  Action.data.SET_FILMS_DATA_LOADING_STATUS
);
export const setFilmDataLoadingStatus = createAction<boolean>(
  Action.data.SET_FILM_DATA_LOADING_STATUS
);
export const loadSimilarFilms = createAction<Film[]>(
  Action.data.LOAD_SIMILAR_FILMS
);

export const requireAuthorization = createAction<AuthorizationStatus>(
  Action.user.REQUIRE_AUTHORIZATION
);
export const loginUser = createAction<UserData>(Action.user.LOGIN_USER);

export const redirectToRoute = createAction<AppRoute>(
  Action.route.REDIRECT_TO_ROUTE
);
