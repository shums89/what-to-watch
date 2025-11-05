export const FILM_COUNT_PER_STEP = 4;
export const DEFAULT_GENRE = 'All genres';
export const MAX_COUNT_GENRES = 10;
export const MAX_COUNT_SIMILAR_FILMS = 4;

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 400;

export const INVALID_LOGIN_MESSAGE = 'Please enter a valid email address';

export const INVALID_PASSWORD_MESSAGE = 'Password should contains at least one letter and digit';
export const VALID_PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

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
  Similar = 'similar',
  Favorite = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum StoreSlice {
  FilmData = 'FILM_DATA',
  FilmProcess = 'FILM_PROCESS',
  UserProcess = 'USER_PROCESS',
}

export enum SubmitStatus {
  Still = 'STILL',
  Pending = 'PENDING',
  Fullfilled = 'FULLFILLED',
  Rejected = 'REJECTED',
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
