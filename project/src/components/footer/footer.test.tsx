import { render, screen } from '@testing-library/react';

import Footer from './footer';
import { withHistory } from '../../test-utils/mock-component';

jest.mock('../logo/logo', () => () => <div>Component Logo</div>);

describe('Component: Footer', () => {
  it('should render correct', () => {
    const footerContainerTestId = 'footer-container';
    const copyrightTestId = 'copyright';

    render(withHistory(<Footer />));
    const footerContainer = screen.getByTestId(footerContainerTestId);
    const copyright = screen.getByTestId(copyrightTestId);

    expect(footerContainer).toBeInTheDocument();
    expect(copyright).toBeInTheDocument();
    expect(screen.getByText('Component Logo')).toBeInTheDocument();
  });
});
