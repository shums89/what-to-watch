import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { FILMS_COUNT } from './const';
import { films } from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App films={films.slice().sort(() => Math.random() - 0.5).slice(0, FILMS_COUNT)} />
  </React.StrictMode>,
);
