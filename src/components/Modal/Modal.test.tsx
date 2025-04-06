import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { describe, it, expect, vi } from 'vitest';

describe('Modal component', () => {

  it('renders children when isOpen is true', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText(/Modal content/i)).toBeInTheDocument();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
