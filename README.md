# Feepost Software & Development Corporation

High-end cinematic marketing site for Feepost, built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and `react-three-fiber`.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js with `@react-three/fiber` and `@react-three/drei`
- OpenAI API for the "Ask Feepost" assistant
- Optimized for Vercel deployment

## Highlights

- Full-screen cinematic hero with 3D logo scene
- Persistent 3D cyber-infrastructure background
- Premium micro-interactions, custom cursor, smooth scrolling, and shared motion system
- Floating "Ask Feepost" AI assistant
- Accessibility improvements including skip link, keyboard focus states, and reduced-motion support
- Product-style loading screen, route transitions, metadata, and structured data

## Local Development

### Prerequisites

- Node.js 18.18+ or Node.js 20+
- npm

### Install

```bash
npm install
```

### Environment Variables

Create a local `.env.local` file from `.env.example`.

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Notes:

- `OPENAI_API_KEY` is required to enable the Ask Feepost assistant.
- `OPENAI_MODEL` is optional. If omitted, the app defaults to `gpt-4.1-mini`.

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Quality Checks

```bash
npm run lint
npm run build
```

## Deploying To Vercel

### 1. Import The Repository

- Create a new Vercel project
- Import this GitHub repository
- Keep the framework preset as `Next.js`

### 2. Configure Build Settings

Use the default Vercel settings:

- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3. Add Environment Variables

In Vercel Project Settings -> Environment Variables, add:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`

Recommended:

- `OPENAI_MODEL=gpt-4.1-mini`

### 4. Deploy

- Trigger the first production deployment
- After deploy, verify the `/api/ask-feepost` route works through the site assistant

## Production Notes

### Ask Feepost Assistant

- The assistant runs on `app/api/ask-feepost/route.ts`
- It uses the official OpenAI JavaScript SDK and the Responses API
- If `OPENAI_API_KEY` is missing, the assistant returns a controlled configuration message instead of failing silently

### Sound

- Ambient sound and interaction clicks are optional and user-controllable from the on-screen sound toggle
- Audio starts only after user interaction, which is required by browser autoplay restrictions
- Reduced-motion users are respected and do not get the animated sound-led experience by default

### Performance

- Heavy 3D client features are lazy-loaded with dynamic imports
- Next.js `Image` is used for optimized image delivery
- The site background and assistant UI are mounted client-side to keep the initial server payload focused

### Accessibility

- Skip link is included for keyboard users
- Focus-visible styles are enabled globally
- Reduced-motion handling is built into the motion system
- The assistant message log is announced with `aria-live`

## Deployment Checklist

Before calling the deployment complete, confirm:

- `npm run lint` passes
- `npm run build` passes
- Vercel environment variables are set
- The Ask Feepost assistant returns live responses
- Contact email renders as `contact@feepostsoftware.com`
- Sound toggle works and can be muted
- Keyboard navigation works through header, CTA, and assistant UI
- Mobile and desktop layouts both render correctly

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

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```
