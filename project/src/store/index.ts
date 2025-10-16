import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './reducer';
import { fetchFilms, fetchPromo } from './action';
import { createAPI } from '../services/api';

export const api = createAPI();
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(fetchPromo());
store.dispatch(fetchFilms());

export default store;
