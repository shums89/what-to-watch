import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';

const NotFoundScreen = (): JSX.Element => (
  <div className="user-page">
    <header className="page-header user-page__head">
      <Logo />
    </header>

    <section>
      <h1 className='page-title'>404. Page not found</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </section>

    <Footer />
  </div>
);

export default NotFoundScreen;
