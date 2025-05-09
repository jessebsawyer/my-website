import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';
import { scrollToSection } from '../../utils/scroll';

// Mock the scrollToSection utility
jest.mock('../utils/scroll', () => ({
  scrollToSection: jest.fn(),
}));

describe('About component', () => {
  it('renders heading, paragraph, and button', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();
    expect(screen.getByText(/I’m a self-taught, full-stack developer/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /meet my assistant/i })).toBeInTheDocument();
  });

  it('calls scrollToSection when button is clicked', () => {
    render(<About />);
    const button = screen.getByRole('button', { name: /meet my assistant/i });
    fireEvent.click(button);
    expect(scrollToSection).toHaveBeenCalled();
  });
});
