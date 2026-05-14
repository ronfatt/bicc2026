import { defineField, defineType } from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'localizedString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'localizedText', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['General', 'Passes & Registration', 'Workshops', 'Programme', 'Venue & Visit', 'Sponsors'],
      },
      initialValue: 'General',
    }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 10 }),
    defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: {
      title: 'question.en',
      subtitle: 'category',
    },
  },
})
