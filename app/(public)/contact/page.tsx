'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const serviceOptions = [
  { value: '', label: 'Select a service' },
  { value: 'foundational', label: 'Foundational Coaching' },
  { value: 'advanced', label: 'Advanced Coaching' },
  { value: 'performance', label: 'Performance Coaching' },
  { value: 'elite', label: 'Elite Coaching' },
  { value: 'speaking', label: 'Speaking & Media' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', service: '', goals: '', source: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 bg-card border border-border rounded-lg text-white placeholder-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors';

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-black text-5xl lg:text-6xl text-white mb-4">Contact</h1>
          <p className="text-secondary text-xl">Let&apos;s start a conversation. Choose the option that fits your needs.</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-8">Quick Actions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-card border border-border rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl text-white mb-3">Speaking & Media</h3>
              <p className="text-secondary text-sm mb-5">For keynotes, workshops, podcast interviews, and media inquiries.</p>
              <a
                href="#contact-form"
                className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 transition-opacity"
              >
                Speaking Inquiry
              </a>
            </div>
            <div className="bg-card border border-border rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl text-white mb-3">Partnerships</h3>
              <p className="text-secondary text-sm mb-5">For collaborations, brand partnerships, or consulting opportunities.</p>
              <a
                href="#contact-form"
                className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 transition-opacity"
              >
                Partner With Us
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6" id="contact-form">
            Contact Form
          </p>

          {submitted ? (
            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-10 text-center">
              <p className="text-accent text-xl font-bold mb-2">Message Sent!</p>
              <p className="text-secondary">Thank you for reaching out. We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Name</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Service Interest</label>
                <select name="service" value={form.service} onChange={handleChange} required className={inputClass}>
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">What are your health and performance goals?</label>
                <textarea name="goals" value={form.goals} onChange={handleChange} required rows={6} placeholder="Tell us about your goals..." className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">How did you hear about us?</label>
                <input name="source" type="text" value={form.source} onChange={handleChange} placeholder="Instagram, referral, podcast, etc." className={inputClass} />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">General Inquiries</p>
            <a href="mailto:hello@blueprxnt.com" className="text-white hover:text-accent transition-colors">
              hello@blueprxnt.com
            </a>
          </div>
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Connect on Social</p>
            <div className="space-y-2">
              <p className="text-secondary text-sm">Instagram: <a href="https://instagram.com/pratikxpatel" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">@pratikxpatel</a></p>
              <p className="text-secondary text-sm">LinkedIn: <a href="https://linkedin.com/in/pratikxpatel" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">@pratikxpatel</a></p>
              <p className="text-secondary text-sm">Twitter: <a href="https://twitter.com/pratikxpatel" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">@pratikxpatel</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
