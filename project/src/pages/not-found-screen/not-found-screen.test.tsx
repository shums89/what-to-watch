import { render, screen } from '@testing-library/react';

import { withHistory } from '../../test-utils/mock-component';
import NotFoundScreen from './not-found-screen';

jest.mock('../../components/logo/logo', () => () => <div>Component Logo</div>);
jest.mock('../../components/footer/footer', () => () => <div>Component Footer</div>);

describe('Component: NotFoundScreen', () => {
  it('should render correct', () => {
    const expectedHeaderText = /404. Page not found/i;
    const expectedLinkText = /Вернуться на главную/i;

    render(withHistory(<NotFoundScreen />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
    expect(screen.getByText('Component Logo')).toBeInTheDocument();
    expect(screen.getByText('Component Footer')).toBeInTheDocument();
  });
});
