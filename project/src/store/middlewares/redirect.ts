import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import { reducer } from '../reducer';
import { Action } from '../action';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === Action.route.REDIRECT_TO_ROUTE) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
