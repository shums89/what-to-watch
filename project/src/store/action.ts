import { createAction } from '@reduxjs/toolkit';

export const Action = {
  REDIRECT_TO_ROUTE: 'route/redirectToRoute',
} as const;

export const redirectToRoute = createAction<string>(Action.REDIRECT_TO_ROUTE);
