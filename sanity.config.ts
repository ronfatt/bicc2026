import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'bicc2026',
  title: process.env.SANITY_STUDIO_TITLE || 'BICC 2026 Content Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'bicc2026-placeholder',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
