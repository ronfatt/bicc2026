# BICC 2026 Sanity CMS Setup

This project is now prepared for Sanity CMS content editing.

## What the CMS Can Manage

- Page hero content, section text, CTA labels and images
- Mentors and guest artists
- Sponsor / partner logos
- Visit Tawau food, hotels, transport and attractions
- Workshops
- Programme blocks
- Passes and Stripe payment links
- FAQ items
- English, 简体中文 and Bahasa Melayu content fields

## First-Time Setup

1. Create a free Sanity project at `https://www.sanity.io/manage`.
2. Copy `.env.example` to `.env.local`.
3. Add your Sanity project ID:

```bash
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=BICC 2026 Content Studio

VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-05-14
```

4. Start the content studio:

```bash
npm run studio
```

5. Open `http://localhost:3333`.

## Deploying The Studio

After the project ID is configured, deploy the Studio with:

```bash
npm run studio:deploy
```

Sanity will give you a hosted Studio URL where the team can log in and edit content.

## Current Status

The content models are ready. The public website still uses the existing hardcoded content as fallback while the Sanity project is connected and filled. The next implementation step is to wire the frontend pages to read Sanity content first and use existing content only when CMS data is missing.
