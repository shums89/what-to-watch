import { months } from './const';

export const formatDate = (date: string) => {
  const dateParsed = new Date(date);

  return `${
    months[dateParsed.getMonth()]
  } ${dateParsed.getDate()}, ${dateParsed.getFullYear()}`;
};
