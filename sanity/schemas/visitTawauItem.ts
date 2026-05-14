import { defineField, defineType } from 'sanity'

export const visitTawauItem = defineType({
  name: 'visitTawauItem',
  title: 'Visit Tawau Item',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'localizedString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name.en' } }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Food', 'Hotel', 'Transport', 'Attraction', 'Cafe', 'Market', 'Travel Partner'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'localizedText' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({ name: 'website', title: 'Website / Booking Link', type: 'url' }),
    defineField({ name: 'mapLink', title: 'Map Link', type: 'url' }),
    defineField({ name: 'bestFor', title: 'Best For', type: 'localizedString' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'localizedString' }] }),
    defineField({ name: 'credit', title: 'Image Credit', type: 'string' }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 10 }),
    defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'category',
      media: 'image',
    },
  },
})
