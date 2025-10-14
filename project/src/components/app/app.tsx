import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import type { Film } from '../../types/types';

import MainScreen from '../../pages/main-screen/main-screen';
import { AppRoute, AuthorizationStatus, FILMS_COUNT } from '../../const';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import UserListScreen from '../../pages/user-list-screen/user-list-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import ReviewScreen from '../../pages/review-screen/review-screen';
import PrivateRoute from '../private-route/private-route';


type AppProps = {
  films: Film[];
};

const App = ({ films }: AppProps): JSX.Element => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainScreen films={films.slice().sort(() => Math.random() - 0.5).slice(0, FILMS_COUNT)} />} />
          <Route path={AppRoute.Login} element={<AuthScreen />} />
          <Route
            path={AppRoute.UserList}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <UserListScreen films={films} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route index element={<NotFoundScreen />} />
            <Route path=":id">
              <Route index element={<FilmScreen films={films} />} />
              <Route path="review" element={<ReviewScreen films={films} />} />
            </Route>
          </Route>
          <Route path={AppRoute.Player} element={<PlayerScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
