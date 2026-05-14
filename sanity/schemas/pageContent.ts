import { defineField, defineType } from 'sanity'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'route',
      title: 'Page Route',
      type: 'string',
      description: 'Example: /, /programme, /workshops, /mentors, /passes, /venue, /visit-tawau, /sponsors',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', title: 'Internal Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'kicker', title: 'Kicker', type: 'localizedString' }),
    defineField({ name: 'headline', title: 'Hero Headline', type: 'localizedString' }),
    defineField({ name: 'subheadline', title: 'Hero Subheadline', type: 'localizedText' }),
    defineField({ name: 'primaryCtaLabel', title: 'Primary CTA Label', type: 'localizedString' }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary CTA Link',
      description: 'Use an internal path like /passes or a full URL like https://example.com.',
      type: 'string',
    }),
    defineField({ name: 'secondaryCtaLabel', title: 'Secondary CTA Label', type: 'localizedString' }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary CTA Link',
      description: 'Use an internal path like /programme or a full URL like https://example.com.',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      description: 'Optional. Replaces the first/main image in the page hero where possible.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'textOverrides',
      title: 'Text Overrides',
      description:
        'Use this to change any existing sentence without changing the page design. Copy the current website text into "Current Website Text", then enter the new wording.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Internal Label', type: 'string' }),
            defineField({
              name: 'sourceText',
              title: 'Current Website Text',
              description: 'Paste the exact current text from the website. The frontend will replace matching text.',
              type: 'text',
              rows: 2,
              readOnly: true,
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'replacementText', title: 'New Text', type: 'localizedText' }),
            defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'sourceText',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Text override',
                subtitle,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'imageOverrides',
      title: 'Image Overrides',
      description:
        'Use this to replace page images. Match by image alt text, image filename, or a src fragment such as "randy-christensen.jpg".',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Internal Label', type: 'string' }),
            defineField({
              name: 'matchText',
              title: 'Image Match Text',
              description: 'Use the image alt text or part of the current image URL/filename.',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'image', title: 'Replacement Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'alt', title: 'Replacement Alt Text', type: 'localizedString' }),
            defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'matchText',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Image override',
                subtitle,
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Editable Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'sectionKey', title: 'Section Key', type: 'string' }),
            defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
            defineField({ name: 'body', title: 'Section Body', type: 'localizedText' }),
            defineField({ name: 'image', title: 'Section Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
          ],
        },
      ],
    }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 10 }),
    defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'route',
      media: 'heroImage',
    },
  },
})
