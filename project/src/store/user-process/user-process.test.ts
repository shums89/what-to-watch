import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { UserData } from '../../types/user-data';
import { fetchUserStatusAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};
const user: UserData = {
  id: 1,
  name: 'Peter',
  email: 'peter@gmail.com',
  avatarUrl: 'img/user-1.jpg',
  token: 'sdfsefsjjjojMjjjn',
};

describe('Reducer: userProcess', () => {
  it('should return initial state without additional parameters', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should return initial state with empty action', () => {
    expect(userProcess.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should fetch authorization status', () => {
    expect(userProcess.reducer(undefined, { type: fetchUserStatusAction.fulfilled, payload: user })).toEqual({
      ...initialState,
      user,
      authorizationStatus: AuthorizationStatus.Auth,
    });

    expect(userProcess.reducer(undefined, { type: fetchUserStatusAction.rejected })).toEqual({
      ...initialState,
      authorizationStatus: AuthorizationStatus.NoAuth,
    });
  });

  it('should login user', () => {
    expect(userProcess.reducer(undefined, { type: loginAction.fulfilled, payload: user })).toEqual({
      ...initialState,
      user,
      authorizationStatus: AuthorizationStatus.Auth,
    });
  });

  it('should logout user', () => {
    expect(userProcess.reducer(undefined, { type: logoutAction.fulfilled })).toEqual({
      ...initialState,
      user: null,
      authorizationStatus: AuthorizationStatus.NoAuth,
    });
  });
});
