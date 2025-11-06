import type { State } from '../../types/state';
import { StoreSlice } from '../../const';

export const getGenre = (state: State): string => state[StoreSlice.FilmProcess].genre;
export const getCount = (state: State): number => state[StoreSlice.FilmProcess].count;
