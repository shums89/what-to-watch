import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';

import type { AuthData } from '../types/auth-data';
import type { Comment, CommentAuth, FavoriteAuth, Film } from '../types/film';
import type { AppDispatch, State } from '../types/state';
import type { UserData } from '../types/user-data';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './action';
import browserHistory from '../browser-history';

const Action = {
  data: {
    FETCH_PROMO: 'data/fetchPromo',
    FETCH_FILMS: 'data/fetchFilms',
    FETCH_FILM: 'data/fetchFilm',
    FETCH_SIMILAR_FILMS: 'data/fetchSimilarFilms',
    FETCH_FAVORITE_FILMS: 'data/fetchFavoriteFilms',
    POST_FAVORITE_STATUS: 'data/postFavoriteStatus',
    FETCH_COMMENTS: 'data/fetchComments',
    POST_COMMENT: 'data/postComment',
  },
  user: {
    CHECK_AUTH: 'user/checkAuth',
    LOGIN: 'user/login',
    LOGOUT: 'user/logout',
  },
} as const;

export const fetchPromoAction = createAsyncThunk<
  Film,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_PROMO, async (_arg, { extra: api }) => {
  const { data } = await api.get<Film>(APIRoute.Promo);
  return data;
});

export const fetchFilmsAction = createAsyncThunk<
  Film[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_FILMS, async (_arg, { extra: api }) => {
  const { data } = await api.get<Film[]>(APIRoute.Films);
  return data;
});

export const fetchFilmAction = createAsyncThunk<
  Film,
  Film['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_FILM, async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film>(`${APIRoute.Films}/${id}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === StatusCodes.NOT_FOUND) {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }

    return Promise.reject(error);
  }
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  Film[],
  Film['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_SIMILAR_FILMS, async (id, { extra: api }) => {
  const { data } = await api.get<Film[]>(`${APIRoute.Films}/${id}/${APIRoute.Similar}`);
  return data;
});

export const fetchFavoriteFilmsAction = createAsyncThunk<
  Film[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_FAVORITE_FILMS, async (_arg, { extra: api }) => {
  const { data } = await api.get<Film[]>(APIRoute.Favorite);
  return data;
});

export const postFavoriteStatusAction = createAsyncThunk<
  Film,
  FavoriteAuth,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.POST_FAVORITE_STATUS, async ({ id, status }, { extra: api }) => {
  const { data } = await api.post<Film>(`${APIRoute.Favorite}/${id}/${status}`);
  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  Comment[],
  Film['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_COMMENTS, async (id, { extra: api }) => {
  const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
  return data;
});

export const postCommentAction = createAsyncThunk<
  Comment[],
  CommentAuth,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.POST_COMMENT, async ({ id, comment, rating }, { dispatch, extra: api }) => {
  const { data } = await api.post<Comment[]>(`${APIRoute.Comments}/${id}`, {
    comment,
    rating,
  });
  dispatch(redirectToRoute(`${APIRoute.Films}/${id}`));
  return data;
});

export const fetchUserStatusAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.user.CHECK_AUTH, async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.user.LOGIN, async ({ login: email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, {
    email,
    password,
  });
  const { token } = data;

  saveToken(token);
  browserHistory.back();

  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.user.LOGOUT, async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
