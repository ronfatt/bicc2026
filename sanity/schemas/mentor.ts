import { defineField, defineType } from 'sanity'

export const mentor = defineType({
  name: 'mentor',
  title: 'Mentor / Guest Artist',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'country', title: 'Country / Region', type: 'string' }),
    defineField({ name: 'role', title: 'Role Label', type: 'localizedString' }),
    defineField({ name: 'shortIntro', title: 'Short Intro', type: 'localizedText' }),
    defineField({ name: 'bio', title: 'Full Bio', type: 'localizedText' }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      description: 'Best for website mentor cards. Upload a clean portrait here when available.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster / Feature Image',
      description: 'Best for feature visuals and posters. The website will also use this if Portrait is empty.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'specialties', title: 'Specialties', type: 'array', of: [{ type: 'localizedString' }] }),
    defineField({ name: 'trackLabels', title: 'Track Labels', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'isFeatured', title: 'Featured Mentor', type: 'boolean', initialValue: false }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 10 }),
    defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
      portrait: 'portrait',
      posterImage: 'posterImage',
    },
    prepare({ title, subtitle, portrait, posterImage }) {
      return {
        title,
        subtitle,
        media: portrait || posterImage,
      }
    },
  },
})
