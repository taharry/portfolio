import { useState } from 'react';
import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';

const EMAIL = 'tazrianahsan148@gmail.com';
const PHONE = '(929) 339-7044';
const LOCATION = 'Atlanta, GA';

const INFO = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Phone', value: PHONE, href: `tel:+19293397044` },
  { label: 'Location', value: LOCATION, href: null },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const subject = `Portfolio contact from ${name || 'someone'}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Layout crumb="CONTACT">
      <header className="page-header page-header--split halftone">
        <SplatterBackground className="splatter-bg--header" seed={33} variant="split" />
        <div className="page-eyebrow">// 04</div>
        <div className="page-title-wrap">
          <CutoutTitle text="Contact" />
        </div>
        <p className="page-sub">Questions, roles, or collaborations. Reach out however works best.</p>
      </header>

      <section className="contact-grid">
        <div className="contact-info">
          {INFO.map((row, i) => (
            <div
              className="contact-info-row"
              data-num={String(i + 1).padStart(2, '0')}
              key={row.label}
            >
              <span className="contact-info-label">{row.label}</span>
              {row.href ? (
                <a className="contact-info-value" href={row.href}>{row.value}</a>
              ) : (
                <span className="contact-info-value">{row.value}</span>
              )}
            </div>
          ))}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="c-name">Name</label>
            <input
              id="c-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="c-email">Email</label>
            <input
              id="c-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="c-message">Message</label>
            <textarea
              id="c-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I want to collab/hire/reach out..."
              required
            />
          </div>

          <button type="submit" className="cut-btn">Send Message &rarr;</button>
          <p className="form-note">
            Submitting opens a draft in your email app addressed to me. It doesn't send anything automatically.
          </p>
        </form>
      </section>
    </Layout>
  );
}
