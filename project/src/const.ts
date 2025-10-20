export const FILM_COUNT_PER_STEP = 4;
export const DEFAULT_GENRE = 'All genres';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  UserList = '/mylist',
  Films = '/films',
  Review = '/review',
  Player = '/player',
  NotFound = '/404',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
