import { useState } from 'react';

const heroImages = [
  { src: '/images/mela-mockup-crop-1.png', mobileSrc: '/images/mela-silk-1.jpg' },
  { src: '/images/mela-mockup-crop-2-v2.png', mobileSrc: '/images/mela-silk-4.jpg' },
  { src: '/images/mela-mockup-crop-3.png', mobileSrc: '/images/mela-silk-5.jpg' },
  { src: '/images/mela-mockup-crop-4.png', mobileSrc: '/images/mela-silk-4.jpg' },
  { src: '/images/mela-mockup-crop-5.png', mobileSrc: '/images/mela-silk-2.jpg' },
];

const Icon = ({ name, size = 28 }) => {
  const paths = {
    hanger: <><path d="M9.5 7.5a2.5 2.5 0 1 1 3.5 2.3c-.7.35-1 .75-1 1.45v.75"/><path d="m3 18 8-5.1a2 2 0 0 1 2 0l8 5.1H3Z"/></>,
    camera: <><path d="M14.5 5 16 7h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4l1.5-2h5Z"/><circle cx="12" cy="13" r="4"/></>,
    spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></>,
    pinterest: <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-1.6 0-3.4.4-4.8l1.3-5.4s-.3-.8-.3-1.9c0-1.8 1-3.1 2.4-3.1 1.1 0 1.7.8 1.7 1.9 0 1.1-.7 2.7-1.1 4.2-.3 1.3.7 2.4 2 2.4 2.4 0 4-3 4-6.5 0-2.7-2.2-4.8-5.5-4.8-4 0-6.5 3-6.5 6.3 0 1.2.4 2.4 1 3.1.1.1.1.2.1.4l-.4 1.5c-.1.5-.5.6-.9.4-2.1-.9-3.1-3.3-3.1-6 0-4.5 3.8-9.8 11.2-9.8 6 0 9.9 4.4 9.9 9.1 0 6.2-3.4 10.9-8.4 10.9-1.7 0-3.3-.9-3.8-1.9l-1 3.9c-.4 1.4-1.1 2.8-1.7 3.9.8.2 1.6.3 2.5.3A10 10 0 0 0 12 2Z"/>,
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
  function submit(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error'); setMessage('Please enter a valid email address.'); return;
    }
    // TODO: Replace this with a Flodesk/Mailchimp/ConvertKit/MailerLite API request or embedded form action.
    setStatus('success');
    setMessage('You’re on the list. The Mela Eliza experience is coming soon.');
    event.currentTarget.reset();
  }
  return <div className="form-wrap">
    <form className="signup" onSubmit={submit} noValidate>
      <label className="sr-only" htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="Enter your email" aria-describedby="form-message" aria-invalid={status === 'error'} />
      <button type="submit">Join the list <span aria-hidden="true">→</span></button>
    </form>
    <p id="form-message" className={`form-message ${status}`} aria-live="polite">{message}</p>
  </div>;
}

export function HeroSection() {
  return <section className="hero">
    <header className="header">
      <a className="brand" href="#top" aria-label="Mela Eliza home"><strong>Mela Eliza</strong><span>Editorial Muse</span></a>
      <div className="header-note"><span>Style. Beauty. Luxe.</span><i>✦</i></div>
    </header>
    <div className="hero-grid">
      <div className="copy">
        <h1>Coming Soon</h1>
        <div className="ornament"><span /><i>◆</i><span /></div>
        <p className="tagline">Style. Beauty. Luxe.</p>
        <p className="services-line">Wardrobe Styling <b>•</b> Image &amp; Identity Curation <b>•</b> Confidence Coaching</p>
        <p className="intro">A refined digital experience is on its way.<br/>Join the list for launch updates.</p>
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
      <a href="#instagram" aria-label="Instagram"><Icon name="instagram" size={16}/></a>
      <a href="#pinterest" aria-label="Pinterest"><Icon name="pinterest" size={16}/></a>
      <a href="mailto:hello@melaeliza.com" aria-label="Email"><Icon name="mail" size={16}/></a>
    </div>
  </footer>;
}

export default function ComingSoonPage() {
  return <main id="top"><HeroSection/><ServiceStrip/><Footer/></main>;
}
