import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { FILMS, FILMS_COUNT } from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App films={FILMS.slice(0, FILMS_COUNT)} />
  </React.StrictMode>,
);
