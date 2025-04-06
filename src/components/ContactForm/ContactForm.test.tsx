import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const setup = () =>
    render(
      <I18nextProvider i18n={i18n}>
        <ContactForm />
      </I18nextProvider>
    );

  it('renders all fields and the submit button (disabled initially)', () => {
    setup();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile/i)).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /send/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button only when all fields are filled and valid', () => {
    setup();

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Julian' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Valencia' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'julian@test.com' } });
    fireEvent.change(screen.getByLabelText(/mobile/i), { target: { value: 'abc123' } });
    fireEvent.change(screen.getByLabelText(/date of birth/i), {
      target: { value: '2000-01-01' },
    });

    const phoneInput = screen.getByLabelText(/mobile/i);
    expect(phoneInput).toHaveValue('123'); 

    const submitButton = screen.getByRole('button', { name: /send/i });
    expect(submitButton).toBeEnabled();
  });

  it('shows error when date of birth is in the future', () => {
    setup();

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureString = futureDate.toISOString().split('T')[0];

    fireEvent.change(screen.getByLabelText(/date of birth/i), {
      target: { value: futureString },
    });

    expect(screen.getByText(/fecha anterior a hoy/i)).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: /send/i });
    expect(submitButton).toBeDisabled();
  });

  it('calls alert on valid form submission', () => {
    setup();

    vi.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Julian' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Valencia' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'julian@test.com' } });
    fireEvent.change(screen.getByLabelText(/mobile/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/date of birth/i), {
      target: { value: '1990-12-12' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(window.alert).toHaveBeenCalledWith('Enviado correctamente');
  });
});
