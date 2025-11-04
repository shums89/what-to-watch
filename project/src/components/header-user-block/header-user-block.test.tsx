import { render, screen } from '@testing-library/react';

import HeaderUserBlock from './header-user-block';
import { withHistory, withStore } from '../../test-utils/mock-component';
import { makeFakeStore } from '../../test-utils/mocks';
import { AuthorizationStatus } from '../../const';

describe('Component: HeaderUserBlock', () => {
  it('should be rendered correctly, when user not authorized', () => {
    const { withStoreComponent } = withStore(<HeaderUserBlock />, makeFakeStore({
      USER_PROCESS: { authorizationStatus: AuthorizationStatus.NoAuth, user: null, }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('user-block-no-auth')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should be rendered correctly, when user authorized', () => {
    const { withStoreComponent } = withStore(<HeaderUserBlock />, makeFakeStore({
      USER_PROCESS: { authorizationStatus: AuthorizationStatus.Auth, user: null, }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('user-block-auth')).toBeInTheDocument();
    expect(screen.getByTestId('user-block-avatar')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
