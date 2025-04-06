import { render, screen, fireEvent } from '@testing-library/react';
import CitieExplorer from './CitieExplorer';
import { describe, it, expect, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

describe('CitieExplorer', () => {
  const setup = () => {
    const onSearch = vi.fn();
    const onClose = vi.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <CitieExplorer onSearch={onSearch} onClose={onClose} />
      </I18nextProvider>
    );

    return { onSearch, onClose };
  };

  it('renders input and button (disabled by default)', () => {
    setup();

    const input = screen.getByLabelText(/city name/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('enables button when input is filled', () => {
    setup();

    const input = screen.getByLabelText(/city name/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Valencia' } });
    expect(button).toBeEnabled();
  });

  it('calls onSearch and onClose on submit', () => {
    const { onSearch, onClose } = setup();

    const input = screen.getByLabelText(/city name/i);
    fireEvent.change(input, { target: { value: '  Valencia  ' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('Valencia');
    expect(onClose).toHaveBeenCalled();
  });
});
