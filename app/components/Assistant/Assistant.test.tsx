import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Assistant from './Assistant';

describe('Assistant component', () => {
  it('renders intro and flips to chat UI on button click', () => {
    render(<Assistant />);
    // Initial state
    expect(screen.getByRole('heading', { name: /jesse's ai assistant/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /let's chat/i })).toBeInTheDocument();

    // Flip to chat UI
    fireEvent.click(screen.getByRole('button', { name: /let's chat/i }));
    expect(
      screen.getByRole('heading', { name: /start chatting with my ai assistant/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('shows initial assistant message in chat UI', () => {
    render(<Assistant />);
    fireEvent.click(screen.getByRole('button', { name: /let's chat/i }));
    expect(screen.getByText(/hi there! i'm jesse's personal assistant/i)).toBeInTheDocument();
  });
});
