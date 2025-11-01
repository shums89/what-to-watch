import type { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import type { Comment, CommentAuth, FavoriteAuth, Film } from '../types/film';
import type { UserData } from '../types/user-data';
import type { AuthData } from '../types/auth-data';
import type { State } from '../types/state';
import { APIRoute } from '../const';
import { createAPI } from '../services/api';
import {
  fetchCommentsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoAction,
  fetchSimilarFilmsAction,
  fetchUserStatusAction,
  loginAction,
  logoutAction,
  postCommentAction,
  postFavoriteStatusAction,
} from './api-actions';
import { films } from '../mocks/films';
import { extractActionsTypes } from '../utils';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];

  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, ReturnType<typeof createAPI>, Action>
  >(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ FILM_DATA: { films: [] } });
  });

  describe('fetchUserStatusAction', () => {
    it('fetchUserStatusAction should be fullfilled when server returns 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, {});

      await store.dispatch(fetchUserStatusAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchUserStatusAction.pending.type, fetchUserStatusAction.fulfilled.type]);
    });

    it('fetchUserStatusActionv should be rejected when server returns 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401, {});

      await store.dispatch(fetchUserStatusAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchUserStatusAction.pending.type, fetchUserStatusAction.rejected.type]);
    });
  });

  describe('fetchPromoAction', () => {
    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.fulfilled", when server response 200', async () => {
      const mockData: Film = films[0];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockData);

      await store.dispatch(fetchPromoAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchPromoAction.pending.type, fetchPromoAction.fulfilled.type]);
      expect(fetchPromoActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchPromoAction.pending.type, fetchPromoAction.rejected.type]);
    });
  });

  describe('fetchFilmsAction', () => {
    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.fulfilled", when server response 200', async () => {
      const mockData: Film[] = films;
      mockAxiosAdapter.onGet(APIRoute.Films).reply(200, mockData);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchFilmsAction.pending.type, fetchFilmsAction.fulfilled.type]);
      expect(fetchFilmsActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(400, []);

      await store.dispatch(fetchFilmsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchFilmsAction.pending.type, fetchFilmsAction.rejected.type]);
    });
  });

  describe('fetchFilmAction', () => {
    const id = 1;

    it('should dispatch "fetchFilmAction.pending", "fetchFilmAction.fulfilled", when server response 200', async () => {
      const mockData: Film = films.filter((item) => item.id === id)[0];
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}`).reply(200, mockData);

      await store.dispatch(fetchFilmAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchFilmAction.pending.type, fetchFilmAction.fulfilled.type]);
      expect(fetchFilmActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "fetchFilmAction.pending", "fetchFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}`).reply(400, []);

      await store.dispatch(fetchFilmAction(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchFilmAction.pending.type, fetchFilmAction.rejected.type]);
    });
  });

  describe('fetchSimilarFilmsAction', () => {
    const id = 1;
    const genre = 'comedy';

    it('should dispatch "fetchSimilarFilmsAction.pending", "fetchSimilarFilmsAction.fulfilled", when server response 200', async () => {
      const mockData: Film[] = films.filter((item) => item.genre === genre);
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}/${APIRoute.Similar}`).reply(200, mockData);

      await store.dispatch(fetchSimilarFilmsAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarFilmsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchSimilarFilmsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type,
      ]);
      expect(fetchSimilarFilmsActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "fetchSimilarFilmsAction.pending", "fetchSimilarFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}/${APIRoute.Similar}`).reply(400, []);

      await store.dispatch(fetchSimilarFilmsAction(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchSimilarFilmsAction.pending.type, fetchSimilarFilmsAction.rejected.type]);
    });
  });

  describe('postFavoriteStatusAction', () => {
    const id = 1;
    const status = 1;
    const favoriteAuth: FavoriteAuth = { id, status };

    it('should dispatch "postFavoriteStatusAction.pending", "postFavoriteStatusAction.fulfilled", when server response 200', async () => {
      const mockData: Film = films.filter((item) => item.id === id)[0];
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${status}`).reply(200, mockData);

      await store.dispatch(postFavoriteStatusAction(favoriteAuth));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postFavoriteStatusActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof postFavoriteStatusAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        postFavoriteStatusAction.pending.type,
        postFavoriteStatusAction.fulfilled.type,
      ]);
      expect(postFavoriteStatusActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "postFavoriteStatusAction.pending", "postFavoriteStatusAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${status}`).reply(400, []);

      await store.dispatch(postFavoriteStatusAction(favoriteAuth));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([postFavoriteStatusAction.pending.type, postFavoriteStatusAction.rejected.type]);
    });
  });

  describe('fetchCommentsAction', () => {
    const id = 1;

    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.fulfilled", when server response 200', async () => {
      const user: Omit<UserData, 'token'> = {
        id: 1,
        name: 'Peter',
        email: 'peter@gmail.com',
        avatarUrl: 'img/user-1.jpg',
      };
      const mockData: Comment[] = [
        {
          id,
          user,
          rating: 2.1,
          comment: 'This is great!',
          date: '2025-10-16T13:16:51.359Z',
        },
      ];

      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(200, mockData);

      await store.dispatch(fetchCommentsAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCommentsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchCommentsAction.pending.type, fetchCommentsAction.fulfilled.type]);
      expect(fetchCommentsActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(400, []);

      await store.dispatch(fetchCommentsAction(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchCommentsAction.pending.type, fetchCommentsAction.rejected.type]);
    });
  });

  describe('postCommentAction', () => {
    const id = 1;
    const commentAuth: CommentAuth = {
      id,
      comment: 'Good!',
      rating: 10,
    };

    it('should dispatch "postCommentAction.pending","redirectToRoute", "postCommentAction.fulfilled", when server response 200', async () => {
      const user: Omit<UserData, 'token'> = {
        id: 1,
        name: 'Peter',
        email: 'peter@gmail.com',
        avatarUrl: 'img/user-1.jpg',
      };
      const mockData: Comment[] = [
        {
          id,
          user,
          rating: 2.1,
          comment: 'This is great!',
          date: '2025-10-16T13:16:51.359Z',
        },
      ];

      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${id}`).reply(200, mockData);

      await store.dispatch(postCommentAction(commentAuth));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postCommentActionFulfilled = emittedActions.at(2) as ReturnType<typeof postCommentAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postCommentAction.pending.type,
        redirectToRoute.type,
        postCommentAction.fulfilled.type,
      ]);
      expect(postCommentActionFulfilled.payload).toEqual(mockData);
    });

    it('should dispatch "postCommentAction.pending", "postCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${id}`).reply(400, []);

      await store.dispatch(postCommentAction(commentAuth));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([postCommentAction.pending.type, postCommentAction.rejected.type]);
    });
  });

  describe('loginAction', () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
    const fakeServerReplay = { token: 'secret' };

    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([loginAction.pending.type, loginAction.fulfilled.type]);
    });

    it('should call "saveToken" once with the received token', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = jest.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([logoutAction.pending.type, logoutAction.fulfilled.type]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = jest.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toHaveBeenCalledTimes(1);
    });
  });
});
