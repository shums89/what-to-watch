import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './components/app/app';
import store from './store';
import { fetchUserStatusAction } from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

store.dispatch(fetchUserStatusAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
