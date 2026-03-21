# Feepost Software & Development Corporation

Production-ready cinematic website for Feepost, built to feel like a premium technology product rather than a static brochure.

The site combines a Next.js 14 App Router frontend, a persistent 3D cyber-infrastructure environment, premium motion and interaction systems, and an OpenAI-powered "Ask Feepost" assistant for service and contracting questions.

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js with `@react-three/fiber` and `@react-three/drei`
- Lenis smooth scrolling
- OpenAI JavaScript SDK
- Vercel deployment target

## Experience Features

- Cinematic hero with 3D Feepost mark, particles, circuitry, and motion-timed reveal
- Full-page 3D background system behind all sections
- Shared motion system with staggered section reveals, glow pulses, and light sweeps
- Custom cursor, premium hover states, tilt interactions, and magnetic buttons
- Floating "Ask Feepost" assistant with a real backend API route
- Product-style loader, route transition layer, and optional interface sound
- Accessibility support including skip link, focus-visible states, reduced motion handling, and keyboard-friendly assistant controls

## Project Structure

```text
app/
  api/ask-feepost/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  assistant/
  experience/
  graphics/
  layout/
  motion/
  sections/
  ui/
lib/
  content.ts
  feepost-assistant.ts
public/
  favicon.svg
  fs-mark.svg
  logo.png
```

## Local Setup

### Requirements

- Node.js 18.18+ or Node.js 20+
- npm

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Copy `.env.example` into `.env.local` and fill in the values.

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Notes:

- `OPENAI_API_KEY` is required for the Ask Feepost assistant.
- `OPENAI_MODEL` is optional. If omitted, the assistant falls back to `gpt-4.1-mini`.

### Run The Site

```bash
npm run dev
```

Open `http://localhost:3000`.

### Verification Commands

```bash
npm run lint
npm run build
```

## Vercel Deployment

### 1. Import The Repository

- Create a new project in Vercel
- Import `FeeTheDeveloper/feepostsoftware-site`
- Keep the framework preset as `Next.js`

### 2. Build Settings

Use the default Vercel settings:

- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `.next`

### 3. Environment Variables

In Vercel Project Settings -> Environment Variables, add:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`

Recommended production value:

- `OPENAI_MODEL=gpt-4.1-mini`

### 4. Deploy

- Trigger the first production deployment
- Wait for the build to complete successfully
- Open the production URL and verify all major sections render and animate correctly

### 5. Add The Production Domain

If Feepost is using a custom domain:

- Add the custom domain in Vercel Project Settings -> Domains
- Update DNS records to the Vercel target
- Confirm the site resolves over HTTPS

If the final production domain is not `https://www.feepostsoftware.com`, update `metadataBase` in [app/layout.tsx](/c:/Users/uveav/OneDrive/Documents/GitHub/feepostsoftware-site/app/layout.tsx).

## OpenAI Assistant

The site includes a floating "Ask Feepost" assistant.

Implementation:

- Frontend UI: [components/assistant/ask-feepost-assistant.tsx](/c:/Users/uveav/OneDrive/Documents/GitHub/feepostsoftware-site/components/assistant/ask-feepost-assistant.tsx)
- Backend route: [app/api/ask-feepost/route.ts](/c:/Users/uveav/OneDrive/Documents/GitHub/feepostsoftware-site/app/api/ask-feepost/route.ts)
- Shared prompt context: [lib/feepost-assistant.ts](/c:/Users/uveav/OneDrive/Documents/GitHub/feepostsoftware-site/lib/feepost-assistant.ts)

Behavior:

- Answers questions about services
- Explains Feepost government and enterprise positioning
- Recommends the right service or engagement track
- Fails gracefully if `OPENAI_API_KEY` is missing

## Sound System

The site includes a user-controlled sound toggle.

Behavior:

- Ambient hum ramps in only after user interaction
- Interaction clicks are subtle and only fire on interactive controls
- Audio is optional and can be toggled off
- Browser autoplay restrictions are respected

Implementation:

- [components/experience/sound-control.tsx](/c:/Users/uveav/OneDrive/Documents/GitHub/feepostsoftware-site/components/experience/sound-control.tsx)

## Performance Notes

- The 3D background, assistant UI, cursor, smooth scroll, and sound layer are lazy-loaded client-side
- Next.js image optimization is used for logo assets
- The persistent background is GPU-oriented and uses performance-aware rendering choices
- The assistant route is server-side only and does not expose the OpenAI API key to the browser

## Accessibility Notes

- High-contrast text and glow styling are preserved against the dark background
- Global `focus-visible` styling is enabled
- Skip link is available for keyboard users
- The assistant response area uses `aria-live`
- Reduced-motion users are respected across motion-heavy sections

## Final Launch Checklist

Before marking the deployment complete, confirm:

- `npm run lint` passes
- `npm run build` passes
- Vercel production deployment succeeds
- `OPENAI_API_KEY` is set in Vercel
- The Ask Feepost assistant returns real responses
- Contact email displays as `contact@feepostsoftware.com`
- Custom domain is connected if applicable
- 3D background performs smoothly on desktop and remains usable on mobile
- Keyboard navigation works through header, CTA, assistant, and footer links
- Sound toggle works and can be muted
- Metadata preview is correct for social sharing

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```
