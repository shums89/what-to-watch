import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthScreen from './auth-screen';
import { withHistory, withStore } from '../../test-utils/mock-component';

jest.mock('../../components/logo/logo', () => () => <div>Component Logo</div>);
jest.mock('../../components/footer/footer', () => () => <div>Component Footer</div>);

describe('Component: AuthScreen', () => {
  const { withStoreComponent } = withStore(<AuthScreen />, {});
  const preparedComponent = withHistory(withStoreComponent);

  it('should render correctly', () => {
    const expectedLoginPlaceholderText = 'Email address';
    const expectedPasswordPlaceholderText = 'Password';

    render(preparedComponent);

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
    expect(screen.getByPlaceholderText(expectedLoginPlaceholderText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedPasswordPlaceholderText)).toBeInTheDocument();
    expect(screen.getByText('Component Logo')).toBeInTheDocument();
    expect(screen.getByText('Component Footer')).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginTestId = 'login';
    const passwordTestId = 'password';
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
