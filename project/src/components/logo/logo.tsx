import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import classNames from 'classnames';

type LogoProps = {
  isLight?: boolean;
}

const Logo = ({ isLight }: LogoProps): JSX.Element => (
  <div className="logo">
    <Link
      to={AppRoute.Root}
      className={classNames(
        'logo__link',
        { 'logo__link--light': isLight },
      )}
    >
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);

export default Logo;
