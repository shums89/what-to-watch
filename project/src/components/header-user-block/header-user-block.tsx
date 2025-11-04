import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';
import { memo } from 'react';

const HeaderUserBlock = (): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const avatarUrl = useAppSelector(getUser)?.avatarUrl;
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block" data-testid="user-block-auth">
        <li className="user-block__item">
          <Link to={AppRoute.UserList} className="user-block__avatar" type='button' data-testid="user-block-avatar">
            <img src={avatarUrl || 'img/avatar.jpg'} alt="User avatar" width="63" height="63" />
          </Link>
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
    <div className="user-block" data-testid="user-block-no-auth">
      <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
    </div>
  );
};

export default memo(HeaderUserBlock);
