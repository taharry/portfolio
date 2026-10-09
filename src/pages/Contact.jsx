import { useId, useRef, useState } from 'react';
import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';
import { SITE } from '../data/site';

const EMAIL = SITE.email;

const INFO = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Phone', value: SITE.phone, href: SITE.phoneHref },
  { label: 'Location', value: SITE.location, href: null },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  // idle -> submitting -> opened (best-effort, never claims confirmed delivery)
  const [status, setStatus] = useState('idle');
  const submitLock = useRef(false);
  const statusId = useId();

  function validate() {
    const next = {};
    if (!name.trim()) next.name = 'Enter your name.';
    if (!email.trim() || !EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address.';
    if (!message.trim()) next.message = 'Enter a message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (submitLock.current) return;
    if (!validate()) {
      setStatus('error');
      return;
    }
    submitLock.current = true;
    setStatus('submitting');
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    window.setTimeout(() => {
      setStatus('opened');
      submitLock.current = false;
    }, 500);
  }

  const isSubmitting = status === 'submitting';

  return (
    <Layout crumb="CONTACT">
      <header className="page-header page-header--split page-header--compact page-header--calling halftone">
        <SplatterBackground className="splatter-bg--header" seed={33} variant="split" />
        <span className="spiral-accent" aria-hidden="true"></span>
        <div className="page-eyebrow">// 05</div>
        <div className="page-title-wrap">
          <CutoutTitle text="Contact" />
        </div>
        <p className="page-sub">Questions, roles, or collaborations. Reach out however works best.</p>
      </header>

      <section className="contact-grid">
        <div className="contact-info">
          <p className="contact-invite">Let's build something.</p>

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

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="c-name">Name</label>
            <input
              id="c-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${statusId}-name-err` : undefined}
            />
            {errors.name && <span className="form-field-error" id={`${statusId}-name-err`}>{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="c-email">Email</label>
            <input
              id="c-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${statusId}-email-err` : undefined}
            />
            {errors.email && <span className="form-field-error" id={`${statusId}-email-err`}>{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="c-message">Message</label>
            <textarea
              id="c-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I want to collab/hire/reach out..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? `${statusId}-message-err` : undefined}
            />
            {errors.message && <span className="form-field-error" id={`${statusId}-message-err`}>{errors.message}</span>}
          </div>

          <button type="submit" className="cut-btn" disabled={isSubmitting} aria-describedby={statusId}>
            {isSubmitting ? 'Opening…' : 'Send Message →'}
          </button>

          <p className="form-status" id={statusId} role="status" aria-live="polite">
            {status === 'opened' &&
              "Your email app should now be open with the message drafted. I can't confirm delivery from this page. If nothing opened, email me directly at tazrianahsan148@gmail.com."}
            {status === 'error' && 'Fix the highlighted field(s) above, then send again.'}
          </p>
        </form>
      </section>
    </Layout>
  );
}
