# RFAD Mods Frontend

A modern Website for exploring and managing RFAD mods and presets. It includes rich filtering, image handling, Boosty integration, and smooth UI transitions.

> Note: The commit history has been rewritten to follow Conventional Commits. If you previously cloned this repo, you may need to rebase or re-clone.

## Table of Contents
- Overview
- Images
- Features
- Tech Stack
- Getting Started
  - Prerequisites
  - Installation
  - Development
  - Build & Preview
- Configuration (Env Vars)
- NPM Scripts
- Project Structure
- Deployment
- License

## Overview
This is a Nuxt 3 frontend. In production, it targets to Cloudflare Pages.

## Images
![Mod Creation Page Showcase](https://github.com/Amirust/rfad-mods-frontend/blob/master/images/modcreationpageshowcase.png)<br>
![Mod Page Showcase](https://github.com/Amirust/rfad-mods-frontend/blob/master/images/modpageshowcase.png)<br>
![Mods Page Showcase](https://github.com/Amirust/rfad-mods-frontend/blob/master/images/modspageshowcase.png)

## Features
- Mods and presets browsing with categories and tags
- Powerful client-side filtering and search UX
- Image optimization via `@nuxt/image`
- Smooth page/layout transitions
- User auth flows (Discord OAuth entry points present)
- Pinia-based state management
- Tailwind CSS design system with extended theme

## Tech Stack
- Nuxt 3 (Vue 3, Vite, Nitro)
- Pinia for state management
- Tailwind CSS + PostCSS + Autoprefixer
- nuxt-lucide-icons for icons
- TypeScript
- Sass (dart-sass embedded)
- ESLint (Vue + TypeScript config)

## Getting Started
### Prerequisites
- Node.js 18.20+ or 20+ (LTS recommended)
- npm (or your preferred package manager, like Bun).

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
- Starts Nuxt in development mode with HMR.
- App runs at http://localhost:3000 by default.

### Build & Preview
```bash
npm run build
npm run preview
```
- Build produces a production bundle.
- Preview serves the built app locally for a quick smoke test.

## Configuration (Env Vars)
Public runtime config keys (defaults live in `nuxt.config.ts`):
- `NUXT_PUBLIC_API_URL` (default: `https://rfad-se-backend.rinisle.uk`)
- `NUXT_PUBLIC_DISCORD_OAUTH_URL`
- `NUXT_PUBLIC_CDN_URL` (default points to `.../images/`)
- `NUXT_PUBLIC_BOOSTY_URL`

Create a `.env` file to override as needed:
```bash
NUXT_PUBLIC_API_URL=https://api.example.com
NUXT_PUBLIC_DISCORD_OAUTH_URL=https://discord.com/oauth2/authorize?...
NUXT_PUBLIC_CDN_URL=https://images.example.com/images/
NUXT_PUBLIC_BOOSTY_URL=https://boosty.to/your_page
```
Notes:
- Keep the trailing slash for CDN if you mirror the default pattern.
- OAuth redirect URIs must match your deployment domain.

## NPM Scripts
- `dev` – start dev server
- `build` – production build
- `preview` – preview the built app
- `generate` – static generation
- `lint` – run ESLint with autofix
- `postinstall` – Nuxt prepare step

## Project Structure
A condensed view of key folders:
```
app.vue
nuxt.config.ts
package.json
assets/
  css/ (global.scss, typography.scss, skeleton.scss)
  images/
components/
  base/ (inputs, buttons, selectors, skeletons)
  mods/, presets/, boosty/, index/, filter/, user/
composables/ (API and helpers: use*Api.ts, resolve* utils)
layouts/ (default.vue)
pages/ (index.vue, oauth2/, mods/, presets/, users/ …)
public/ (fonts, favicon, robots)
store/ (Pinia stores)
types/ (enums, interfaces)
utils/ (resolvers, helpers)
```

## Deployment
- Static hosting is recommended. The production config uses Nitro preset `cloudflare-pages-static`.
- For Cloudflare Pages, set the build command to `npm run generate`. The output directory will be detected automatically by the preset (Nuxt’s static output under `.output/public`).
- Ensure environment variables are configured in your hosting provider (see Configuration above).

## License
No license file is present. If you intend to publish or open-source, add a `LICENSE` file and update this section.
