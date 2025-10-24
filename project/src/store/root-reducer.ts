import { combineReducers } from '@reduxjs/toolkit';

import { StoreSlice } from '../const';
import { filmData } from './film-data/film-data';
import { filmProcess } from './film-process/film-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [StoreSlice.FilmData]: filmData.reducer,
  [StoreSlice.FilmProcess]: filmProcess.reducer,
  [StoreSlice.UserProcess]: userProcess.reducer,
});
