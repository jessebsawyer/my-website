import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type ContactFormData = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
      reset();
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
    setLoading(false);
  };
  return (
    <>
      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl w-full"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-8">
            Have a question, a project idea, or just want to connect? I’d love to hear from you.
          </p>
          {status === 'success' && (
            <p className="text-green-600 mt-4">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 mt-4">
              There was an error sending your message. Please try again.
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 text-left">
            <div>
              <input
                type="text"
                placeholder="Your Name *"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email *"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Subject"
                {...register('subject')}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <textarea
                rows={5}
                placeholder="Your Message *"
                {...register('message', { required: 'Message is required' })}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-6 py-3 bg-black text-white rounded-md shadow hover:bg-gray-800 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {/* Social Icons */}
          <div className="mt-10 flex justify-center gap-6">
<a
  href="https://github.com/jessebsawyer"
  target="_blank"
  rel="noopener noreferrer"
  className="text-black hover:text-gray-700"
  aria-label="GitHub"
>
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12 0a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.75.08-.74.08-.74 1.21.08 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.64.25 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0012 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
<a
  href="https://www.linkedin.com/in/jessebsawyer"
  target="_blank"
  rel="noopener noreferrer"
  className="text-black hover:text-gray-700"
  aria-label="LinkedIn"
>
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.46-1.5-2.46s-1.73 1.17-1.73 2.38v4.58h-3v-9h2.88v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Contact;
