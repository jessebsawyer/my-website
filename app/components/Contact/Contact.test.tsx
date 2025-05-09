import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from './Contact';

describe('Contact component', () => {
  it('renders heading, paragraph, form fields, and button', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument();
    expect(screen.getByText(/have a question, a project idea, or just want to connect/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/subject/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders social links with correct hrefs', () => {
    render(<Contact />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/jessebsawyer');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jessebsawyer');
  });
});
