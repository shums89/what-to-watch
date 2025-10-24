import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';

import type { Comment, CommentAuth, Film } from '../types/film';
import type { AppDispatch, State } from '../types/state';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import {
  loadComments,
  loadFilm,
  loadFilms,
  loadPromo,
  loadSimilarFilms,
  loginUser,
  redirectToRoute,
  requireAuthorization,
  setFilmDataLoadingStatus,
  setFilmsDataLoadingStatus,
} from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';

const Action = {
  data: {
    FETCH_PROMO: 'data/fetchPromo',
    FETCH_FILMS: 'data/fetchFilms',
    FETCH_FILM: 'data/fetchFilm',
    FETCH_SIMILAR_FILM: 'data/fetchSimilarFilms',
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

export const fetchFilmAction = createAsyncThunk<
  void,
  Film['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_FILM, async (id, { dispatch, extra: api }) => {
  try {
    dispatch(setFilmDataLoadingStatus(true));
    const { data } = await api.get<Film>(`${APIRoute.Films}/${id}`);
    dispatch(setFilmDataLoadingStatus(false));
    dispatch(loadFilm(data));
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === StatusCodes.NOT_FOUND) {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  void,
  Film['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_SIMILAR_FILM, async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
  dispatch(loadSimilarFilms(data));
});

export const fetchCommentsAction = createAsyncThunk<
  void,
  Film['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_COMMENTS, async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
  dispatch(loadComments(data));
});

export const postCommentAction = createAsyncThunk<
  void,
  CommentAuth,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  Action.data.POST_COMMENT,
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<Comment[]>(`${APIRoute.Comments}/${id}`, {
      comment,
      rating,
    });

    dispatch(loadComments(data));
    dispatch(redirectToRoute(`${APIRoute.Films}/${id}`));
  }
);

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
