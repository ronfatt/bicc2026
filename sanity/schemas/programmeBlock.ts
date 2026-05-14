import { defineField, defineType } from 'sanity'

export const programmeBlock = defineType({
  name: 'programmeBlock',
  title: 'Programme Block',
  type: 'document',
  fields: [
    defineField({ name: 'day', title: 'Day', type: 'string', options: { list: ['Day 1', 'Day 2', 'Day 3'] } }),
    defineField({ name: 'dateLabel', title: 'Date Label', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'localizedString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: ['Foundation', 'Mastery', 'Exchange', 'Showcase', 'Community', 'Delegate Info'] },
    }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['Confirmed', 'Coming Soon', 'To Be Announced'] } }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 10 }),
    defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'day',
    },
  },
})
