import type { Comment, Film } from '../../types/film';
import type { FilmData } from '../../types/state';
import type { UserData } from '../../types/user-data';
import { films as fakeFilms } from '../../mocks/films';
import {
  fetchCommentsAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoAction,
  fetchSimilarFilmsAction,
  postCommentAction,
  postFavoriteStatusAction,
} from '../api-actions';
import { filmData } from './film-data';
import { SubmitStatus } from '../../const';

const film: Film = fakeFilms[1];
const films: Film[] = fakeFilms;
const initialState: FilmData = {
  promo: null,
  films: [],
  isFilmsDataLoading: false,
  film: null,
  isFilmDataLoading: false,
  similarFilms: [],
  favoriteFilms: [],
  isFavoriteFilmsLoading: false,
  comments: [],
  commentStatus: SubmitStatus.Still,
};

describe('Reducer: filmData', () => {
  it('should return initial state without additional parameters', () => {
    expect(filmData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should return initial state with empty action', () => {
    expect(filmData.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should fetch promo', () => {
    expect(filmData.reducer(undefined, { type: fetchPromoAction.fulfilled, payload: film })).toEqual({
      ...initialState,
      promo: film,
    });
  });

  it('should fetch films', () => {
    expect(filmData.reducer(undefined, fetchFilmsAction.pending)).toEqual({
      ...initialState,
      isFilmsDataLoading: true,
    });

    expect(filmData.reducer(undefined, { type: fetchFilmsAction.fulfilled, payload: films })).toEqual({
      ...initialState,
      films,
      isFilmsDataLoading: false,
    });
  });

  it('should fetch film', () => {
    expect(filmData.reducer(undefined, fetchFilmAction.pending)).toEqual({
      ...initialState,
      isFilmDataLoading: true,
    });

    expect(filmData.reducer(undefined, { type: fetchFilmAction.fulfilled, payload: film })).toEqual({
      ...initialState,
      film,
      isFilmDataLoading: false,
    });
  });

  it('should fetch similar films', () => {
    expect(filmData.reducer(undefined, { type: fetchSimilarFilmsAction.fulfilled, payload: films })).toEqual({
      ...initialState,
      similarFilms: films,
    });
  });

  it('should fetch favorite films', () => {
    expect(filmData.reducer(undefined, fetchFavoriteFilmsAction.pending)).toEqual({
      ...initialState,
      isFavoriteFilmsLoading: true,
    });

    expect(filmData.reducer(undefined, { type: fetchFavoriteFilmsAction.fulfilled, payload: films })).toEqual({
      ...initialState,
      favoriteFilms: films,
      isFavoriteFilmsLoading: false,
    });
  });

  it('should post favorite status', () => {
    const favoriteFilm: Film = { ...fakeFilms[2], isFavorite: true };
    const state: FilmData = {
      ...initialState,
      promo: films[2],
      films: films,
      film: films[2],
    };

    expect(filmData.reducer(state, { type: postFavoriteStatusAction.fulfilled, payload: favoriteFilm })).toEqual({
      ...state,
      films: films.map((item) => (item.id === favoriteFilm.id ? favoriteFilm : item)),
      promo: favoriteFilm,
      film: favoriteFilm,
      favoriteFilms: [favoriteFilm],
    });
  });

  it('should fetch comments', () => {
    const user: Omit<UserData, 'token'> = {
      id: 1,
      name: 'Peter',
      email: 'peter@gmail.com',
      avatarUrl: 'img/user-1.jpg',
    };
    const comments: Comment[] = [
      {
        id: 1,
        user,
        rating: 2.1,
        comment: 'This is great!',
        date: '2025-10-16T13:16:51.359Z',
      },
    ];

    expect(filmData.reducer(undefined, { type: fetchCommentsAction.fulfilled, payload: comments })).toEqual({
      ...initialState,
      comments,
    });
  });

  it('should post comment', () => {
    const user: Omit<UserData, 'token'> = {
      id: 1,
      name: 'Peter',
      email: 'peter@gmail.com',
      avatarUrl: 'img/user-1.jpg',
    };
    const comments: Comment[] = [
      {
        id: 1,
        user,
        rating: 2.1,
        comment: 'This is great!',
        date: '2025-10-16T13:16:51.359Z',
      },
    ];

    expect(filmData.reducer(undefined, { type: postCommentAction.pending })).toEqual({
      ...initialState,
      commentStatus: SubmitStatus.Pending,
    });

    expect(filmData.reducer(undefined, { type: postCommentAction.fulfilled, payload: comments })).toEqual({
      ...initialState,
      comments,
      commentStatus: SubmitStatus.Fullfilled,
    });

    expect(filmData.reducer(undefined, { type: postCommentAction.rejected })).toEqual({
      ...initialState,
      commentStatus: SubmitStatus.Rejected,
    });
  });
});
