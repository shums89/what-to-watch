import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import type { Film } from '../types/film';
import type { AppDispatch, State } from '../types/state';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import {
  loadFilms,
  loadPromo,
  loginUser,
  redirectToRoute,
  requireAuthorization,
  setFilmsDataLoadingStatus,
} from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';

const Action = {
  data: {
    FETCH_FILMS: 'data/fetchFilms',
    FETCH_PROMO: 'data/fetchPromo',
  },
  user: {
    CHECK_AUTH: 'user/checkAuth',
    LOGIN: 'user/login',
    LOGOUT: 'user/logout',
  },
} as const;

export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_FILMS, async (_arg, { dispatch, extra: api }) => {
  dispatch(setFilmsDataLoadingStatus(true));
  const { data } = await api.get<Film[]>(APIRoute.Films);
  dispatch(setFilmsDataLoadingStatus(false));
  dispatch(loadFilms(data));
});

export const fetchPromoAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_PROMO, async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Film>(APIRoute.Promo);
  dispatch(loadPromo(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.user.CHECK_AUTH, async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  Action.user.LOGIN,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    const { token } = data;
    saveToken(token);
    dispatch(loginUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.user.LOGOUT, async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
