import { memo } from 'react';

import Logo from '../logo/logo';

const Footer = (): JSX.Element => (
  <footer className="page-footer" data-testid="footer-container">
    <Logo isLight />

    <div className="copyright" data-testid="copyright">
      <p>© 2019 What to watch Ltd.</p>
    </div>
  </footer>
);

export default memo(Footer);
