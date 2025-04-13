import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

const NotFoundScreen = (): JSX.Element => (
  <section>
    <h1 className='page-title'>404. Page not found</h1>
    <Link to={AppRoute.Root}>Вернуться на главную</Link>
  </section>
);

export default NotFoundScreen;
