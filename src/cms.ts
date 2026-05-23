export type CmsLanguage = 'en' | 'zh' | 'ms'

export type LocalizedValue = {
  en?: string
  zh?: string
  ms?: string
}

export type CmsImage = {
  url?: string
  alt?: string
}

export type CmsMentor = {
  _id: string
  name: string
  country?: string
  role?: LocalizedValue
  shortIntro?: LocalizedValue
  officialBioUrl?: string
  sourceUrl?: string
  socialUrl?: string
  portrait?: CmsImage
  posterImage?: CmsImage
  specialties?: LocalizedValue[]
  isFeatured?: boolean
  sortOrder?: number
}

export type CmsVisitTawauItem = {
  _id: string
  name?: LocalizedValue
  category?: string
  summary?: LocalizedValue
  image?: CmsImage
  address?: string
  website?: string
  mapLink?: string
  bestFor?: LocalizedValue
  tags?: LocalizedValue[]
  sortOrder?: number
}

export type CmsTextOverride = {
  sourceText?: string
  replacementText?: LocalizedValue
  isPublished?: boolean
}

export type CmsImageOverride = {
  matchText?: string
  image?: CmsImage
  alt?: LocalizedValue
  isPublished?: boolean
}

export type CmsPageSection = {
  sectionKey?: string
  title?: LocalizedValue
  body?: LocalizedValue
  image?: CmsImage
  isPublished?: boolean
}

export type CmsPageContent = {
  _id: string
  route: string
  title?: string
  kicker?: LocalizedValue
  headline?: LocalizedValue
  subheadline?: LocalizedValue
  primaryCtaLabel?: LocalizedValue
  primaryCtaHref?: string
  secondaryCtaLabel?: LocalizedValue
  secondaryCtaHref?: string
  heroImage?: CmsImage
  textOverrides?: CmsTextOverride[]
  imageOverrides?: CmsImageOverride[]
  sections?: CmsPageSection[]
}

const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const sanityDataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'
const sanityApiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) || '2026-05-14'

export function isSanityConfigured() {
  return Boolean(sanityProjectId && sanityProjectId !== 'your-project-id')
}

export function localize(value: LocalizedValue | undefined, language: CmsLanguage) {
  if (!value) return ''
  return value[language] || value.en || value.zh || value.ms || ''
}

export function sanityImageUrl(image: CmsImage | undefined) {
  return image?.url || ''
}

export async function fetchFromSanity<T>(query: string, params: Record<string, string | number | boolean> = {}) {
  if (!isSanityConfigured()) return null

  const url = new URL(`https://${sanityProjectId}.api.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}`)
  url.searchParams.set('query', query)
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(`$${key}`, JSON.stringify(value)))

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`Sanity request failed: ${response.status}`)
  }

  const payload = (await response.json()) as { result: T }
  return payload.result
}

export const cmsQueries = {
  pageContent: `*[_type == "pageContent" && route == $route && isPublished == true][0] {
    _id,
    route,
    title,
    kicker,
    headline,
    subheadline,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    textOverrides,
    sections[] {
      sectionKey,
      title,
      body,
      isPublished,
      "image": {
        "url": image.asset->url,
        "alt": image.alt
      }
    },
    imageOverrides[] {
      matchText,
      alt,
      isPublished,
      "image": {
        "url": image.asset->url,
        "alt": image.alt
      }
    },
    "heroImage": {
      "url": heroImage.asset->url,
      "alt": heroImage.alt
    }
  }`,
  mentors: `*[_type == "mentor" && isPublished == true] | order(sortOrder asc, name asc) {
    _id,
    name,
    country,
    role,
    shortIntro,
    officialBioUrl,
    sourceUrl,
    socialUrl,
    specialties,
    isFeatured,
    sortOrder,
    "portrait": {
      "url": portrait.asset->url,
      "alt": portrait.alt
    },
    "posterImage": {
      "url": posterImage.asset->url,
      "alt": posterImage.alt
    }
  }`,
  visitTawauItems: `*[_type == "visitTawauItem" && isPublished == true] | order(category asc, sortOrder asc) {
    _id,
    name,
    category,
    summary,
    address,
    website,
    mapLink,
    bestFor,
    tags,
    sortOrder,
    "image": {
      "url": image.asset->url,
      "alt": image.alt
    }
  }`,
  faqItems: `*[_type == "faqItem" && isPublished == true] | order(category asc, sortOrder asc) {
    _id,
    question,
    answer,
    category,
    sortOrder
  }`,
}
