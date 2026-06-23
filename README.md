# Mela Eliza — Coming Soon

A responsive React/Vite landing page with a randomized still hero portrait, working client-side email validation, a responsive service grid, and SEO/Open Graph metadata. One portrait is selected when the page loads and remains still; a refresh or new visit may select another.

## Preview locally

1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Run `npm run dev` and open the local address shown in the terminal.
4. Run `npm run build` to verify a production build.

## Replace the hero images

Place portrait files in `public/images/`, then update `heroImages` near the top of `src/ComingSoonPage.jsx`. Each entry supports its own `object-position`, which helps keep the subject’s face in frame on responsive crops. The page currently uses five identity-preserving editorial composites with olive-silk backgrounds; the original supplied photographs remain alongside them as untouched source assets.

## Connect the signup form

The integration point is marked with a `TODO` inside `EmailSignupForm` in `src/ComingSoonPage.jsx`.

- Flodesk or MailerLite: paste the provider’s embedded form action into the form, map the email field name, and remove the placeholder submit handler.
- Mailchimp: use the audience embed form action and required hidden anti-bot field, or call a serverless function that talks to Mailchimp securely.
- ConvertKit: submit to a ConvertKit form endpoint or use a serverless function.
- Custom API: replace the placeholder success branch with `fetch('/api/subscribe', { method: 'POST', ... })` and handle loading/API errors.

Do not place private provider API keys in browser code. Keep secrets in a Vercel/Netlify serverless function and store them as environment variables.

## Deploy

### Vercel

Import the repository, choose **Vite**, set the build command to `npm run build`, and the output directory to `dist`.

### Netlify

Import the repository, set the build command to `npm run build`, and the publish directory to `dist`. Drag-and-drop deployment also works with the locally generated `dist` folder.

## Mobile notes

Below 700px, the portrait moves above the copy, the form becomes full-width, services use a two-column grid, and the footer stacks. A 320px breakpoint tightens spacing and label tracking. Reduced-motion preferences stop the slideshow and shorten transitions.
