'use client';
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const Assistant = () => {
  const [flipped, setFlipped] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi there! I'm Jesse's personal assistant. Ask me anything about his work, experience, or skills."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'assistant', content: 'Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!flipped ? (
        <motion.section
          key="assistant"
          id="assistant"
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white flex flex-col items-center justify-center px-6 py-20 text-center"
        >
          <div className="max-w-3xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Hello, I'm Jesse's AI assistant</h2>
            <p className="text-xl mb-8">
              I've been designed to help you explore Jesse's work, get insights into his skills, and discover how he thinks through problems; all through a simple conversation.
            </p>
            <motion.button
              onClick={() => setFlipped(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 text-lg bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-800 hover:text-white transition cursor-pointer"
            >
              Let's chat
            </motion.button>
          </div>
        </motion.section>
      ) : (
        <motion.section
          key="chat"
          id="chat"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white flex flex-col items-center justify-center px-6 py-20 text-center"
        >
          <div className="max-w-2xl w-full space-y-6 bg-gray-800/40 backdrop-blur-md p-8 rounded-xl border border-gray-700">
            <h2 className="text-3xl font-bold">Start chatting with my AI assistant</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-left p-4 rounded-lg shadow text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
                </div>
              ))}
              {loading && (
                <div className="italic text-sm text-gray-400">AI is typing...</div>
              )}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={4}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={sendMessage}
              className="px-8 py-4 text-lg bg-white text-black rounded-lg shadow-lg hover:bg-gray-800 hover:text-white transition cursor-pointer"
            >
              Send
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Assistant;
