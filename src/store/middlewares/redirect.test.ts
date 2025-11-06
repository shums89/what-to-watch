import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';

import type { State } from '../../types/state';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';

const fakeHistory = {
  location: { pathname: '' },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should not redirect to "/login" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Login };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Login);
  });
});
