import type { AxiosInstance } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { Film } from '../types/film';
import { ApiRoute } from '../const';

export const Action = {
  SET_GENRE: 'genre/set',
  FETCH_PROMO: 'promo/fetch',
  FETCH_FILMS: 'films/fetch',
  SET_COUNT_FILMS: 'films/setCount',
};

export const setGenre = createAction<string>(Action.SET_GENRE);
export const setFilms = createAction<Film[]>(Action.FETCH_FILMS);
export const setCountFilms = createAction(Action.SET_COUNT_FILMS);

export const fetchPromo = createAsyncThunk(
  Action.FETCH_PROMO,
  async (_, thunkAPI) => {
    const axios = thunkAPI.extra as AxiosInstance;
    const { data } = await axios.get<Film>(ApiRoute.Promo);

    return data;
  }
);
export const fetchFilms = createAsyncThunk(
  Action.FETCH_FILMS,
  async (_, thunkAPI) => {
    const axios = thunkAPI.extra as AxiosInstance;
    const { data } = await axios.get<Film[]>(ApiRoute.Films);

    return data;
  }
);
