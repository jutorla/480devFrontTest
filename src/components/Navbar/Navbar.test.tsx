import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { describe, it, expect, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

describe('Navbar', () => {
  it('renders and changes language', () => {
    const mockLogout = vi.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <Navbar login={true} setLogin={mockLogout} />
      </I18nextProvider>
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(i18n.language);

    fireEvent.change(select, { target: { value: 'es' } });
    expect(i18n.language).toBe('es');
  });

  it('shows logout button and is clickable', () => {
    const mockLogout = vi.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <Navbar login={true} setLogin={mockLogout} />
      </I18nextProvider>
    );

    const button = screen.getByRole('button', { name: /logout/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockLogout).toHaveBeenCalled();
  });

  it(' doesnt show logout button', () => {
    const mockLogout = vi.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <Navbar login={false} setLogin={mockLogout} />
      </I18nextProvider>
    );

    const button = screen.queryByRole('button', { name: /logout/i });
    expect(button).not.toBeInTheDocument();
  });
});
