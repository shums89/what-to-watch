import { createSlice } from '@reduxjs/toolkit';

import type { UserProcess } from '../../types/state';
import { AuthorizationStatus, StoreSlice } from '../../const';
import { fetchUserStatusAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userProcess = createSlice({
  name: StoreSlice.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserStatusAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchUserStatusAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
