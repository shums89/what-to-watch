export const FILMS_COUNT = 8;
export const DEFAULT_GENRE = 'All genres';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  UserList = '/mylist',
  Films = '/films',
  Review = '/review',
  Player = '/player',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
