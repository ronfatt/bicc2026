import { defineField, defineType } from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'zh', title: '简体中文', type: 'string' }),
    defineField({ name: 'ms', title: 'Bahasa Melayu', type: 'string' }),
  ],
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Long Text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
    defineField({ name: 'zh', title: '简体中文', type: 'text', rows: 4 }),
    defineField({ name: 'ms', title: 'Bahasa Melayu', type: 'text', rows: 4 }),
  ],
})
