import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

const HeaderUserBlock = (): JSX.Element => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const avatarUrl = useAppSelector((state) => state.user?.avatarUrl);
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src={avatarUrl || 'img/avatar.jpg'} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link
            to={AppRoute.Root}
            className="user-block__link"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
          >
            Sign out
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="user-block">
      <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
    </div>
  );
};

export default HeaderUserBlock;
