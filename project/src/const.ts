export const FILM_COUNT_PER_STEP = 4;
export const DEFAULT_GENRE = 'All genres';
export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 400;

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
  Comments = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
