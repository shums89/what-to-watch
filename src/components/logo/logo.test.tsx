import { withHistory } from '../../test-utils/mock-component';
import Logo from './logo';
import { render, screen } from '@testing-library/react';

describe('Component: Logo', () => {
  const logoTestId = 'logo';
  const logoLinkTestId = 'logo-link';

  it('should render correctly without props', () => {
    render(withHistory(<Logo />));

    const logo = screen.getByTestId(logoTestId);
    const logoLink = screen.getByTestId(logoLinkTestId);

    expect(logo).toBeInTheDocument();
    expect(logoLink).toBeInTheDocument();
  });

  it('should render correctly with props isLight', () => {
    render(withHistory(<Logo isLight />));

    const logo = screen.getByTestId(logoTestId);
    const logoLink = screen.getByTestId(logoLinkTestId);

    expect(logo).toBeInTheDocument();
    expect(logoLink).toBeInTheDocument();
    expect(logoLink.classList.contains('logo__link--light')).toBe(true);
  });
});
