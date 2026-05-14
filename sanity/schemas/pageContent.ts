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
    defineField({ name: 'primaryCtaHref', title: 'Primary CTA Link', type: 'url' }),
    defineField({ name: 'secondaryCtaLabel', title: 'Secondary CTA Label', type: 'localizedString' }),
    defineField({ name: 'secondaryCtaHref', title: 'Secondary CTA Link', type: 'url' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
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
