import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';

const NotFoundScreen = (): JSX.Element => (
  <div className="user-page">
    <Helmet>
      <title>WTW. Page not found</title>
    </Helmet>
    <header className="page-header user-page__head">
      <Logo />
    </header>

    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        flexGrow: '1',
      }}
    >
      <h1 className='page-title'>404. Page not found</h1>
      <Link to={AppRoute.Root} style={{ color: '#d9cd8d' }}>Вернуться на главную</Link>
    </section>

    <Footer />
  </div>
);

export default NotFoundScreen;
