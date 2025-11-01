import { Action } from 'redux';

import { months } from './const';

export const formatDate = (date: string) => {
  const dateParsed = new Date(date);

  return `${months[dateParsed.getMonth()]} ${dateParsed.getDate()}, ${dateParsed.getFullYear()}`;
};

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
