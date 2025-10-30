import type { FilmProcess } from '../../types/state';
import { DEFAULT_GENRE, FILM_COUNT_PER_STEP } from '../../const';
import { filmProcess, setCountDisplayedFilms, setFilterGenre } from './film-process';

const initialState: FilmProcess = {
  genre: DEFAULT_GENRE,
  count: FILM_COUNT_PER_STEP,
};
const state = {
  genre: 'drama',
  count: 10,
};

describe('Reducer: filmProcess', () => {
  it('should return initial state without additional parameters', () => {
    expect(filmProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should return initial state with empty action', () => {
    expect(filmProcess.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should set filter genre', () => {
    expect(filmProcess.reducer(state, { type: setFilterGenre, payload: 'comedy' })).toEqual({
      genre: 'comedy',
      count: FILM_COUNT_PER_STEP,
    });
  });

  it('should set count delayed films', () => {
    const incrementCount = state.count + FILM_COUNT_PER_STEP;

    expect(filmProcess.reducer(state, { type: setCountDisplayedFilms })).toEqual({
      ...state,
      count: incrementCount,
    });
  });
});
