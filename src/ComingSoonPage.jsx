import { useState } from 'react';

const heroImages = [
  { src: '/images/mela-mockup-crop-1.png', mobileSrc: '/images/mela-silk-1.jpg' },
  { src: '/images/mela-mockup-crop-2-v2.png', mobileSrc: '/images/mela-silk-4.jpg' },
  { src: '/images/mela-mockup-crop-3.png', mobileSrc: '/images/mela-silk-5.jpg' },
  { src: '/images/mela-mockup-crop-4.png', mobileSrc: '/images/mela-mobile-hero-4.png' },
  { src: '/images/mela-mockup-crop-5.png', mobileSrc: '/images/mela-mobile-hero-5.png' },
  { src: '/images/mela-mockup-crop-red.png', mobileSrc: '/images/mela-mobile-hero-red.jpg' },
];

const Icon = ({ name, size = 28 }) => {
  const paths = {
    hanger: <><path d="M9.5 7.5a2.5 2.5 0 1 1 3.5 2.3c-.7.35-1 .75-1 1.45v.75"/><path d="m3 18 8-5.1a2 2 0 0 1 2 0l8 5.1H3Z"/></>,
    camera: <><path d="M14.5 5 16 7h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4l1.5-2h5Z"/><circle cx="12" cy="13" r="4"/></>,
    spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></>,
    tiktok: <><path d="M14 3v10.3a4.2 4.2 0 1 1-3.5-4.1"/><path d="M14 5.8c1.2 2.4 3 3.8 5.5 4"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};

export function RandomHeroImage() {
  const [current] = useState(() => {
    const preview = Number(new URLSearchParams(window.location.search).get('hero'));
    return preview >= 1 && preview <= heroImages.length
      ? preview - 1
      : Math.floor(Math.random() * heroImages.length);
  });
  const image = heroImages[current];

  return <div className="portrait" data-hero={current + 1} role="img" aria-label="Editorial portrait for Mela Eliza, wardrobe stylist and image curator.">
    <picture>
      <source media="(max-width: 700px)" srcSet={image.mobileSrc} />
      <img className="active" src={image.src} alt="" aria-hidden="true" loading="eager" fetchPriority="high" />
    </picture>
    <div className="portrait-wash" />
  </div>;
}

export function EmailSignupForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get('entry.88646790').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error'); setMessage('Please enter a valid email address.'); return;
    }

    setIsSubmitting(true);
    setStatus('');
    setMessage('');

    HTMLFormElement.prototype.submit.call(form);
    window.setTimeout(() => {
      setStatus('success');
      setMessage('You’re on the list. The Mela Eliza experience is coming soon.');
      form.reset();
      setIsSubmitting(false);
    }, 700);
  }
  return <div className="form-wrap">
    <iframe className="sr-only" title="Mela Eliza waitlist submission" name="mela-waitlist-submission" />
    <form
      className="signup"
      action="https://docs.google.com/forms/d/e/1FAIpQLSd9rfWyFfyNc3YnY_v5buk6RMqfo9uWNskmhB0dZaBLQayA1g/formResponse"
      method="POST"
      target="mela-waitlist-submission"
      onSubmit={submit}
      noValidate
    >
      <label className="sr-only" htmlFor="email">Email address</label>
      <input id="email" name="entry.88646790" type="email" autoComplete="email" placeholder="Enter your email" aria-describedby="form-message" aria-invalid={status === 'error'} />
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Joining…' : 'Join the list'} <span aria-hidden="true">→</span></button>
    </form>
    <p id="form-message" className={`form-message ${status}`} aria-live="polite">{message}</p>
  </div>;
}

export function HeroSection() {
  return <section className="hero">
    <header className="header">
      <a className="brand" href="#top" aria-label="Mela Eliza home">
        <img className="brand-logo" src="/images/mela-eliza-logo.png" alt="Mela Eliza" />
        <span>Editorial Muse</span>
      </a>
      <div className="header-note"><span>Style. Beauty. Luxe.</span><i>✦</i></div>
    </header>
    <div className="hero-grid">
      <div className="copy">
        <h1>Coming Soon</h1>
        <div className="ornament"><span /><i>◆</i><span /></div>
        <p className="tagline">Style. Beauty. Luxe.</p>
        <p className="services-line">Wardrobe Styling <b>•</b> Image &amp; Identity Curation <b>•</b> Confidence Coaching</p>
        <p className="intro">Something beautiful is taking shape.<br/>Be the first to know when we arrive.</p>
        <EmailSignupForm />
      </div>
      <RandomHeroImage />
    </div>
  </section>;
}

const services = [
  ['hanger', 'Wardrobe Styling'],
  ['camera', 'Image & Identity Curation'],
  ['spark', 'Confidence Coaching'],
];

export function ServiceStrip() {
  return <section className="service-strip" aria-label="Mela Eliza services">
    {services.map(([icon, label]) => <div className={`service ${icon}`} key={label}><Icon name={icon}/><span>{label}</span></div>)}
    <div className="service monogram"><strong>ME</strong><span>Effortless. Elevated. You.</span></div>
  </section>;
}

export function Footer() {
  return <footer className="footer">
    <span>Launching Soon</span><i aria-hidden="true">◆</i>
    <div className="socials"><span>Stay Connected</span>
      <a href="https://www.instagram.com/themelaeliza" aria-label="Instagram" target="_blank" rel="noreferrer"><Icon name="instagram" size={16}/></a>
      <a href="https://www.tiktok.com/@themelaeliza" aria-label="TikTok" target="_blank" rel="noreferrer"><Icon name="tiktok" size={16}/></a>
      <a href="mailto:inquiries@melaeliza.com" aria-label="Email"><Icon name="mail" size={16}/></a>
    </div>
  </footer>;
}

export default function ComingSoonPage() {
  return <main id="top"><HeroSection/><ServiceStrip/><Footer/></main>;
}
