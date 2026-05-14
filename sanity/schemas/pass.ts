import { defineField, defineType } from 'sanity'

export const pass = defineType({
  name: 'pass',
  title: 'Pass',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'localizedString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'price', title: 'Price', type: 'string' }),
    defineField({ name: 'stripePaymentLink', title: 'Stripe Payment Link', type: 'url' }),
    defineField({ name: 'badge', title: 'Badge', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
    defineField({ name: 'bestFor', title: 'Best For', type: 'array', of: [{ type: 'localizedString' }] }),
    defineField({ name: 'includes', title: 'Includes', type: 'array', of: [{ type: 'localizedString' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 10 }),
    defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'price',
      media: 'image',
    },
  },
})
