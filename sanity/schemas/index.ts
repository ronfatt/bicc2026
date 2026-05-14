import { localizedString, localizedText } from './localized'
import { faqItem } from './faqItem'
import { mentor } from './mentor'
import { pageContent } from './pageContent'
import { pass } from './pass'
import { programmeBlock } from './programmeBlock'
import { sponsor } from './sponsor'
import { visitTawauItem } from './visitTawauItem'
import { workshop } from './workshop'

export const schemaTypes = [
  localizedString,
  localizedText,
  pageContent,
  mentor,
  sponsor,
  visitTawauItem,
  faqItem,
  workshop,
  programmeBlock,
  pass,
]
