import { defineField, defineType } from 'sanity'

export const workshop = defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localizedString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.en' } }),
    defineField({
      name: 'track',
      title: 'Track',
      type: 'string',
      options: { list: ['Foundation', 'Mastery', 'Exchange', 'Community', 'All Delegates'] },
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'localizedText' }),
    defineField({ name: 'whoFor', title: 'Who It Is For', type: 'localizedText' }),
    defineField({ name: 'outcomes', title: 'Learning Outcomes', type: 'array', of: [{ type: 'localizedString' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 10 }),
    defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'track',
      media: 'image',
    },
  },
})
