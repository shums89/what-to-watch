import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { AppRoute } from '../../const';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';

const NotFoundScreen = (): JSX.Element => (
  <>
    <Helmet>
      <title>WTW. Page not found</title>
    </Helmet>

    <div className="user-page">
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
        data-testid="not-found-screen"
      >
        <h1 className='page-title'>404. Page not found</h1>
        <Link to={AppRoute.Root} style={{ color: '#d9cd8d' }}>Вернуться на главную</Link>
      </section>

      <Footer />
    </div>
  </>
);

export default NotFoundScreen;
