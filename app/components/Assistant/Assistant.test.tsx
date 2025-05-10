import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Assistant from './Assistant';

// Mock framer-motion to render children immediately (no animation)
jest.mock('framer-motion', () => {
  // List of framer-motion props to filter out
  const motionProps = [
    'initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'layout', 'mode'
  ];
  return {
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: new Proxy({}, {
      get: () => {
        return ({ children, ...props }: any) => {
          // Remove framer-motion props
          const filteredProps = Object.fromEntries(
            Object.entries(props).filter(([key]) => !motionProps.includes(key))
          );
          return <div {...filteredProps}>{children}</div>;
        };
      }
    }),
  };
});

describe('Assistant component', () => {
  it('renders intro and flips to chat UI on button click', () => {
    render(<Assistant />);
    // Initial state
    expect(screen.getByRole('heading', { name: /hello, i'm jesse's ai assistant/i })).toBeInTheDocument();
    const letsChat = screen.getByText(/let's chat/i);
    expect(letsChat).toBeInTheDocument();

    // Flip to chat UI
    fireEvent.click(letsChat);
    // After flipping, check for chat UI elements (not the assistant message here)
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('shows initial assistant message in chat UI', () => {
    render(<Assistant />);
    const letsChat = screen.getByText(/let's chat/i);
    fireEvent.click(letsChat);
    // The assistant message is rendered as "AI: ..." with <strong>AI:</strong>
    const allMatches = screen.getAllByText(
      (content, node) =>
        Boolean(
          node?.textContent
            ?.toLowerCase()
            .includes("ai: hi there! i'm jesse's personal assistant. ask me anything about his work, experience, or skills.")
        )
    );
    expect(allMatches.length).toBeGreaterThan(0);
  });

  it('allows user to send a message and displays assistant reply', async () => {
    // Ensure global.fetch exists
    if (!global.fetch) {
      global.fetch = jest.fn();
    }
    // Mock fetch to return a fake assistant reply
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ reply: "This is a mock reply from the assistant." }),
    } as any);

    render(<Assistant />);
    const letsChat = screen.getByText(/let's chat/i);
    fireEvent.click(letsChat);

    // Type a message and send it
    const textarea = screen.getByPlaceholderText(/type your message/i);
    fireEvent.change(textarea, { target: { value: 'Hello AI!' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    // User message should appear
    const userMessages = await screen.findAllByText(
      (content, node) =>
        Boolean(node?.textContent?.toLowerCase().includes("you: hello ai!"))
    );
    expect(userMessages.length).toBeGreaterThan(0);

    // Loading indicator should appear
    expect(screen.getByText(/ai is typing/i)).toBeInTheDocument();

    // Assistant reply should appear after fetch resolves
    const aiReplies = await screen.findAllByText(
      (content, node) =>
        Boolean(
          node?.textContent
            ?.toLowerCase()
            .includes("ai: this is a mock reply from the assistant.")
        )
    );
    expect(aiReplies.length).toBeGreaterThan(0);

    // Input should be cleared
    expect(screen.getByPlaceholderText(/type your message/i)).toHaveValue('');

    // Clean up fetch mock
    fetchSpy.mockRestore();
  });
});
