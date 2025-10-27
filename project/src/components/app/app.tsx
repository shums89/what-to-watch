import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import MainScreen from '../../pages/main-screen/main-screen';
import { AppRoute } from '../../const';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import UserListScreen from '../../pages/user-list-screen/user-list-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import ReviewScreen from '../../pages/review-screen/review-screen';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

const App = (): JSX.Element => (
  <HelmetProvider>
    <HistoryRouter history={browserHistory} >
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainScreen />} />
          <Route path={AppRoute.Login} element={<AuthScreen />} />
          <Route
            path={AppRoute.UserList}
            element={
              <PrivateRoute>
                <UserListScreen />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route index element={<NotFoundScreen />} />
            <Route path=":id">
              <Route index element={<FilmScreen />} />
              <Route path="review" element={<ReviewScreen />} />
            </Route>
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<PlayerScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </HistoryRouter>
  </HelmetProvider>
);

export default App;
