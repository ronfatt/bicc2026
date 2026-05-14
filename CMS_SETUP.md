# BICC 2026 Sanity CMS Setup

This project is now prepared for Sanity CMS content editing.

## What the CMS Can Manage

- Page hero content, section text, CTA labels and images
- Page-level text overrides without changing the website layout
- Page-level image overrides by matching image alt text or filename
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

## Editing Page Text Without Code

Open `Page Content` in Sanity Studio, then choose the page you want to edit.

Use the top hero fields for simple hero edits:

- `Kicker`
- `Hero Headline`
- `Hero Subheadline`
- `Primary CTA Label`
- `Primary CTA Link`
- `Secondary CTA Label`
- `Secondary CTA Link`
- `Hero Image`

Use `Text Overrides` when you want to change any existing sentence on that page without changing the layout. The seed script prepares common page text items for the main pages, so you can usually edit the `New Text` field directly:

1. Find the item label, for example `Hero: headline` or `Value badge: Joyful copy`.
2. Leave `Current Website Text` unchanged.
3. Enter the new wording in English, 简体中文 or Bahasa Melayu.
4. Publish the page content document.

Use `Image Overrides` when you want to replace a page image:

1. Find the item label, for example `Hero: main clown performer photo`.
2. Upload the replacement image.
3. Add replacement alt text if needed.
4. Publish the page content document.

## Deploying The Studio

After the project ID is configured, deploy the Studio with:

```bash
npm run studio:deploy
```

Sanity will give you a hosted Studio URL where the team can log in and edit content.

## Current Status

The content models are ready and the public website reads Sanity content when available. Existing website content remains as fallback, so the site still works even if a CMS field is empty.
