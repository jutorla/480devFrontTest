import { render, screen, fireEvent } from '@testing-library/react';
import LoginView from './LoginView';
import { describe, it, expect, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

describe('LoginView', () => {
  const setup = (propsOverride = {}) => {
    const defaultProps = {
      email: 'test@example.com',
      password: 'password123',
      onEmailChange: vi.fn(),
      onPasswordChange: vi.fn(),
      onSubmit: vi.fn((e) => e.preventDefault()),
      error: false,
    };

    const props = { ...defaultProps, ...propsOverride };

    render(
      <I18nextProvider i18n={i18n}>
        <LoginView {...props} />
      </I18nextProvider>
    );

    return props;
  };

  it('renders email and password inputs and submit button', () => {
    setup();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls onEmailChange and onPasswordChange on input change', () => {
    const { onEmailChange, onPasswordChange } = setup();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'new@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'newpass' },
    });

    expect(onEmailChange).toHaveBeenCalled();
    expect(onPasswordChange).toHaveBeenCalled();
  });

  it('shows error message when error is true', () => {
    setup({ error: true });

    expect(screen.getByText(/please enter valid email and password/i)).toBeInTheDocument();
  });
});
