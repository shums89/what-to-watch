import { Action } from 'redux';

import { months } from './const';

export const formatDate = (date: string) => {
  const dateParsed = new Date(date);

  return `${months[dateParsed.getMonth()]} ${dateParsed.getDate()}, ${dateParsed.getFullYear()}`;
};

export const formatTime = (totalSeconds: number) => {
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor((totalSeconds / 60) % 24);

  return `${hours > 0 ? `0${hours}:`.slice(-3) : ''}${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`;
};

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
