import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID.')
  process.exit(1)
}

if (!token) {
  console.error('Missing SANITY_API_TOKEN. Create a Sanity write token and add it to .env.local or export it before running this script.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-14',
  token,
  useCdn: false,
})

const l = (en, zh = '', ms = '') => ({ en, zh, ms })

const mentors = [
  ['uncle-sunday', 'Uncle Sunday', 'Malaysia', 'Guest Artist / Mentor', 'A guest artist joining BICC 2026 to share clown craft, performance experience and creative exchange with delegates.', ['Stage Performance', 'Community', 'Clown Craft'], true],
  ['paya-cocos', 'Paya Cocos', 'Mexico', 'Guest Artist / Mentor', 'A guest artist joining BICC 2026 to share clown craft, visual play and creative exchange with delegates.', ['Guest Artist', 'Physical Comedy', 'Creative Exchange'], true],
  ['chagy', 'Chagy', 'USA', 'Guest Artist / Mentor', 'A guest artist joining BICC 2026 to share clown craft, stage experience and creative exchange with delegates.', ['Stage Performance', 'Audience Interaction', 'Character Work'], true],
  ['uncle-button', 'Uncle Button', 'Malaysia', 'Workshop Mentor', 'A workshop mentor joining BICC 2026 to support practical learning, playful performance and warm audience connection.', ['Workshop Mentor', 'Family Entertainment', 'Audience Connection'], true],
  ['randy-christensen', 'Randy Christensen', 'USA', 'Performance Mentor', 'A performance mentor joining BICC 2026 to share stage practice, showcase energy and live audience experience.', ['Performance Mentor', 'Stage Presence', 'Showcase'], true],
  ['mr-john', 'Mr. John', 'Malaysia', 'Teaching Artist', 'A teaching artist joining BICC 2026 to share practical performance methods, workshop teaching and creative exchange.', ['Teaching Artist', 'Workshop Mentor', 'Creative Exchange'], true],
  ['kak-yogi', 'Kak Yogi', 'Indonesia', 'Community Mentor', 'A community mentor joining the BICC line-up to contribute regional perspective, creative exchange and performance conversation.', ['Community Clowning', 'Guest Artist', 'Details Coming Soon'], false],
  ['watt-de-clown', 'Watt De Clown', 'Malaysia', 'Performance Mentor', 'A performance mentor joining BICC 2026 to share audience connection, comic presence and live convention energy.', ['Performance Mentor', 'Character Work', 'Audience Interaction'], false],
  ['kosuke-omune', 'Kosuke Omune', 'Japan', 'Guest Artist', 'A guest artist in the BICC 2026 line-up, bringing a distinct performance perspective to the convention exchange.', ['Guest Artist', 'Puppetry', 'Performance'], false],
  ['jackie-newton', 'Jackie Newton', 'USA', 'Workshop Mentor', 'A workshop mentor joining the BICC 2026 line-up to bring audience experience, guest artist presence and practical convention exchange.', ['Workshop Mentor', 'Guest Artist', 'Audience Experience'], false],
  ['frankie-malachi', 'Frankie Malachi', 'Singapore', 'Guest Artist', 'A guest artist joining BICC 2026 to bring live performance craft, visual storytelling and regional exchange to the mentor line-up.', ['Guest Artist', 'Visual Storytelling', 'Performance'], false],
  ['tony-lee', 'Tony Lee', 'Hong Kong', 'Showcase Artist', 'A showcase artist joining BICC 2026 to bring live performance presence and international exchange to the mentor line-up.', ['Showcase Artist', 'Stage Performance', 'Guest Artist'], false],
  ['edmund-khong', 'Edmund Khong', 'Singapore', 'Teaching Artist', 'A teaching artist joining BICC 2026 to contribute practical performance guidance and convention exchange.', ['Teaching Artist', 'Puppetry', 'Workshop Mentor'], false],
  ['zipper', 'Zipper', 'Thailand', 'Guest Artist', 'A guest artist joining BICC 2026 to bring live audience energy, character work and performance exchange.', ['Stage Performance', 'Character Work', 'Audience Interaction'], false],
]

const sponsors = [
  ['organiser-cdesign', 'CDesign Production Sdn. Bhd.', 'Organiser'],
  ['rotary-club-tawau', 'Rotary Club of Tawau', 'Collaboration Partner'],
  ['sabah-convention-bureau', 'Sabah Convention Bureau', 'Collaboration Partner'],
  ['sabah-tourism-board', 'Sabah Tourism Board', 'Tourism Supporter'],
  ['explore-sabah', 'Explore Sabah', 'Tourism Supporter'],
  ['visit-malaysia-2026', 'Visit Malaysia 2026', 'Tourism Supporter'],
  ['world-clown-association', 'World Clown Association', 'International Partner'],
  ['tawau-chinese-chamber', 'Tawau Chinese Chamber of Commerce', 'Business Partner'],
]

const visitItems = [
  ['food-seafood', 'Seafood & Local Dining', 'Food', 'Fresh coastal flavours, shared meals and easy delegate dinners after programme days.', 'Delegate dinners'],
  ['food-kopitiam', 'Kopitiam Breakfast', 'Food', 'Simple morning stops for coffee, toast, noodles and local breakfast rhythm.', 'Morning meals'],
  ['food-nasi-kuning', 'Nasi Kuning Tawau', 'Food', 'A signature Tawau rice dish often served with sambal and rich local flavours.', 'First-time local food'],
  ['hotel-borneo-royale', 'Borneo Royale Hotel', 'Hotel', 'A known Tawau hotel option useful for delegates who want a larger city hotel stay.', 'City hotel'],
  ['hotel-shervinton', 'Shervinton Executive Boutique Hotel', 'Hotel', 'A central Tawau hotel option for food access, town walks and practical convention days.', 'City centre'],
  ['attraction-tawau-hills', 'Tawau Hills Park', 'Attraction', 'A nature escape with forest, waterfalls and Borneo greenery beyond the convention hall.', 'Nature'],
  ['attraction-cocoa', 'Teck Guan Cocoa Museum & Cocoa Village', 'Attraction', 'A Tawau cocoa heritage stop for delegates interested in local stories and flavours.', 'Culture'],
  ['attraction-pasar-tanjung', 'Pasar Tanjung Tawau', 'Attraction', 'A lively market experience for food, local colour and everyday city rhythm.', 'Market'],
  ['attraction-waterfront', 'Waterfront & City Walks', 'Attraction', 'Easy low-pressure moments for delegates who want to stretch, snack and see the city.', 'Easy walk'],
]

const faqs = [
  ['faq-price', 'What is the price of each pass?', 'Both Foundation and Mastery passes are listed at US$130, unless the organizer updates the official pricing.', 'Passes & Registration'],
  ['faq-track-difference', 'What is the difference between Foundation and Mastery?', 'Foundation is for beginners and emerging performers. Mastery is for experienced performers who want deeper critique, stage presence and professional development.', 'Passes & Registration'],
  ['faq-programme-confirmed', 'Is the full programme confirmed?', 'The programme flow is available as a preview. Final times, rooms and mentor assignments will be announced closer to the convention.', 'Programme'],
  ['faq-venue', 'Where is BICC 2026 held?', 'BICC 2026 is currently presented as taking place at Calvary Crown, Tawau, Sabah.', 'Venue & Visit'],
]

const passes = [
  ['pass-foundation', 'Foundation Pass', 'US$130', 'https://buy.stripe.com/6oUdR22tqekU9Siaun24006', 'Best for beginners and emerging performers'],
  ['pass-mastery', 'Mastery Pass', 'US$130', 'https://buy.stripe.com/28EeV69VS3Ggd4uaun24007', 'Best for experienced performers'],
]

const pageContents = [
  ['page-content-home', '/', 'Home Page'],
  ['page-content-about', '/about', 'About Page'],
  ['page-content-programme', '/programme', 'Programme Page'],
  ['page-content-workshops', '/workshops', 'Workshops Page'],
  ['page-content-mentors', '/mentors', 'Mentors Page'],
  ['page-content-passes', '/passes', 'Passes Page'],
  ['page-content-venue', '/venue', 'Venue Page'],
  ['page-content-visit-tawau', '/visit-tawau', 'Visit Tawau Page'],
  ['page-content-sponsors', '/sponsors', 'Sponsors Page'],
  ['page-content-faq', '/faq', 'FAQ Page'],
  ['page-content-contact', '/contact', 'Contact Page'],
]

const textOverride = (label, text) => ({
  _key: label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80),
  label,
  sourceText: text,
  replacementText: l(text),
  isPublished: true,
})

const imageOverride = (label, matchText) => ({
  _key: label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80),
  label,
  matchText,
  isPublished: true,
})

const pageEditorDefaults = {
  '/': {
    textOverrides: [
      ['Header: official site tag', 'Official Site'],
      ['Header: Get Pass button', 'Get Pass'],
      ['Hero: eyebrow', 'Borneo International Clown Convention 2026'],
      ['Hero: monogram', 'BICC 2026'],
      ['Hero: headline', 'Where Laughter Becomes Legacy.'],
      [
        'Hero: subheadline',
        'A 3-day international clown convention in Borneo for performers, educators and creative communities seeking stronger craft and joyful live performance.',
      ],
      ['Hero: date badge', 'Aug 3–5, 2026'],
      ['Hero: location badge', 'Tawau, Sabah'],
      ['Hero: tracks badge', '2 Workshop Tracks'],
      ['Hero: price badge', 'US$130'],
      ['Hero: primary button', 'Get Your Pass'],
      ['Hero: secondary button', 'View Programme'],
      ['Hero: compare link', 'Compare Foundation & Mastery Tracks'],
      ['Hero visual: training label', 'Workshop / Training'],
      ['Hero visual: audience label', 'Performance / Audience'],
      ['Hero visual: caption', 'Official Convention Magazine & Delegate Handbook'],
      ['Value badge: Joyful title', 'Joyful'],
      ['Value badge: Joyful copy', 'Joy that connects.'],
      ['Value badge: Cultural title', 'Cultural'],
      ['Value badge: Cultural copy', 'Rooted in Borneo.'],
      ['Value badge: Inspiring title', 'Inspiring'],
      ['Value badge: Inspiring copy', 'Creative growth.'],
      ['Value badge: International title', 'International'],
      ['Value badge: International copy', 'Global exchange.'],
      ['Value badge: Community title', 'Community'],
      ['Value badge: Community copy', 'Hope through service.'],
      ['Story: image label', 'Performance / Culture / Connection'],
      ['Story: kicker', 'What Is BICC?'],
      ['Story: headline', 'A convention for people who want practical growth, not just inspiration.'],
      [
        'Story: intro',
        'BICC brings together training, live performance, cultural exchange and community connection in one focused convention experience.',
      ],
      ['Story point: Learn title', 'Learn The Craft'],
      ['Story point: Learn copy', 'Train inside clear Foundation and Mastery pathways built for real progress.'],
      ['Story point: Stage title', 'Share The Stage'],
      ['Story point: Stage copy', 'Develop work for the stage, not just for the classroom.'],
      ['Story point: Community title', 'Serve The Community'],
      ['Story point: Community copy', 'Exchange ideas, methods and cultural perspectives with artists from different contexts.'],
      ['Story: about link', 'Learn About BICC'],
      ['Tracks: kicker', 'Choose Your Track'],
      ['Tracks: headline', 'Two Paths. One Price. Different Professional Needs.'],
      ['Tracks: intro', 'Foundation builds your base. Mastery sharpens a working act.'],
      ['Tracks: helper copy', 'New to clowning or building confidence? Start with Foundation. Already performing for audiences? Choose Mastery.'],
      ['Tracks: helper link', 'Compare Tracks'],
      ['Programme: kicker', 'Programme Snapshot'],
      ['Programme: headline', '3 Days. One Shared Journey.'],
      ['Programme: intro', 'Fast to scan, easy to understand and built around a shared convention rhythm.'],
      ['Programme: button', 'View Programme'],
      ['Mentors preview: kicker', 'Mentors & Performers'],
      ['Mentors preview: headline', 'Learn From Artists Who Live The Stage.'],
      ['Mentors preview: intro', 'Mentors are selected for stage credibility, teaching clarity and real audience experience.'],
      ['Mentors preview: button', 'View Mentors'],
      ['Final CTA: kicker', 'Final CTA'],
      ['Final CTA: headline', 'Ready To Join BICC 2026?'],
      [
        'Final CTA: copy',
        'Choose the path that fits you and join a joyful international convention built for real growth, meaningful exchange and live performance in Borneo.',
      ],
      ['Final CTA: Foundation button', 'Get Foundation Pass'],
      ['Final CTA: Mastery button', 'Get Mastery Pass'],
    ].map(([label, text]) => textOverride(label, text)),
    imageOverrides: [
      ['Hero: main clown performer photo', 'Joyful professional clown performer'],
      ['Hero: workshop training photo', 'Clown workshop training moment'],
      ['Hero: performance audience photo', 'Clown performance and audience moment'],
      ['Story: performer / mentor photo', 'Clown performer or mentor on stage'],
      ['Track: Foundation card photo', 'Foundation Pass'],
      ['Track: Mastery card photo', 'Mastery Pass'],
    ].map(([label, matchText]) => imageOverride(label, matchText)),
  },
  '/mentors': {
    textOverrides: [
      ['Hero: kicker', 'Mentors & Guest Artists'],
      ['Hero: headline', 'Learn From Artists Who Live the Stage.'],
      ['Hero: subheadline', 'Meet the performers, teachers, storytellers and creative mentors joining BICC 2026 from Malaysia, Asia and beyond.'],
      ['Hero: primary button', 'View Workshops'],
      ['Hero: secondary button', 'Get Your Pass'],
      ['Featured: kicker', 'Featured Mentors'],
      ['Featured: headline', 'A closer look at the artists helping shape the BICC 2026 learning and performance experience.'],
      ['Featured: intro', 'Official bios and specialty details can be refined as materials are confirmed.'],
      ['Line-up: kicker', 'Meet the Line-up'],
      ['Line-up: headline', 'Explore more of the BICC 2026 mentors, performers and guest artists.'],
      ['Final CTA: headline', 'Train With the BICC Mentors.'],
      ['Final CTA: copy', 'Join BICC 2026 and learn from artists who understand clowning as craft, connection, performance and community impact.'],
    ].map(([label, text]) => textOverride(label, text)),
    imageOverrides: [['Hero: mentor poster image', 'BICC mentor poster']].map(([label, matchText]) => imageOverride(label, matchText)),
  },
  '/passes': {
    textOverrides: [
      ['Hero: kicker', 'Passes & Registration'],
      ['Hero: headline', 'Choose Your Pass. Start Your BICC Journey.'],
      [
        'Hero: subheadline',
        'Foundation is for newer performers building confidence. Mastery is for experienced performers ready for sharper stage work and critique. Good for first-time delegates, educators, family performers and international guests looking for a clear training path.',
      ],
      ['Hero: primary button', 'Choose Your Pass'],
      ['Hero: secondary button', 'Compare Tracks'],
      ['Comparison: headline', 'Choose the pass that fits where you are right now.'],
      ['Final CTA: headline', 'Ready to Choose Your Pass?'],
    ].map(([label, text]) => textOverride(label, text)),
  },
  '/programme': {
    textOverrides: [
      ['Hero: kicker', 'Programme'],
      ['Hero: headline', '3 Days. One Shared Journey.'],
      [
        'Hero: subheadline',
        'From arrival and opening moments to hands-on workshops, cultural exchange, showcase preparation and community celebration, the BICC programme is designed as a complete convention journey.',
      ],
      ['Hero: primary button', 'Get Your Pass'],
      ['Hero: secondary button', 'Compare Tracks'],
    ].map(([label, text]) => textOverride(label, text)),
  },
  '/workshops': {
    textOverrides: [
      ['Hero: kicker', 'Workshops & Training'],
      ['Hero: headline', 'Hands-On Learning, Real-World Impact.'],
      [
        'Hero: subheadline',
        'Build stronger clown technique through practical workshops in performance, character, visual play, audience interaction, educational shows and community-based clowning.',
      ],
      ['Hero: primary button', 'Get Your Pass'],
      ['Hero: secondary button', 'Compare Tracks'],
    ].map(([label, text]) => textOverride(label, text)),
    imageOverrides: [['Hero: workshop main image', 'Workshop training moment']].map(([label, matchText]) => imageOverride(label, matchText)),
  },
  '/venue': {
    textOverrides: [
      ['Hero: kicker', 'Venue & Visitor Guide'],
      ['Hero: headline', 'Gather in Borneo. Find Your Way With Ease.'],
      ['Hero: subheadline', 'BICC 2026 gathers delegates at Calvary Crown in Tawau, Sabah. Use this guide to understand the building, arrival flow and venue basics.'],
      ['Hero: primary button', 'Get Your Pass'],
      ['Hero: secondary button', 'View Programme'],
    ].map(([label, text]) => textOverride(label, text)),
    imageOverrides: [['Hero: venue visual image', 'Calvary Crown venue visual']].map(([label, matchText]) => imageOverride(label, matchText)),
  },
  '/visit-tawau': {
    textOverrides: [
      ['Hero: headline', 'Come for BICC. Stay for Tawau.'],
      [
        'Hero: subheadline',
        'Discover the food, nature, culture and local warmth of Tawau — a coastal city in Sabah where your convention journey becomes a true Borneo experience.',
      ],
      ['Hero: primary button', 'Plan Your Visit'],
      ['Hero: secondary button', 'View BICC Programme'],
      ['Food: headline', 'Food That Feels Like Tawau'],
      ['Stay: headline', 'Where to Stay'],
      ['Transport: headline', 'Getting Around Tawau'],
      ['Things To Do: headline', 'Things To Do in Tawau'],
    ].map(([label, text]) => textOverride(label, text)),
  },
  '/sponsors': {
    textOverrides: [
      ['Hero: kicker', 'Sponsors & Partnerships'],
      ['Hero: headline', 'Partner with BICC 2026.'],
      ['Hero: subheadline', 'Put your brand at the heart of performance, culture, tourism and community impact.'],
      ['Hero: primary button', 'Request Sponsorship Deck'],
      ['Hero: secondary button', 'Talk to Partnership Team'],
    ].map(([label, text]) => textOverride(label, text)),
  },
}

const transaction = client.transaction()

mentors.forEach(([id, name, country, role, intro, specialties, isFeatured], index) => {
  transaction.createIfNotExists({
    _id: id,
    _type: 'mentor',
    name,
    country,
    role: l(role),
    shortIntro: l(intro),
    specialties: specialties.map((specialty) => l(specialty)),
    isFeatured,
    sortOrder: index + 1,
    isPublished: true,
  })
})

sponsors.forEach(([id, name, category], index) => {
  transaction.createIfNotExists({
    _id: id,
    _type: 'sponsor',
    name,
    category,
    sortOrder: index + 1,
    isPublished: true,
  })
})

visitItems.forEach(([id, name, category, summary, bestFor], index) => {
  transaction.createIfNotExists({
    _id: id,
    _type: 'visitTawauItem',
    name: l(name),
    category,
    summary: l(summary),
    bestFor: l(bestFor),
    sortOrder: index + 1,
    isPublished: true,
  })
})

faqs.forEach(([id, question, answer, category], index) => {
  transaction.createIfNotExists({
    _id: id,
    _type: 'faqItem',
    question: l(question),
    answer: l(answer),
    category,
    sortOrder: index + 1,
    isPublished: true,
  })
})

passes.forEach(([id, name, price, stripePaymentLink, badge], index) => {
  transaction.createIfNotExists({
    _id: id,
    _type: 'pass',
    name: l(name),
    price,
    stripePaymentLink,
    badge: l(badge),
    sortOrder: index + 1,
    isPublished: true,
  })
})

pageContents.forEach(([id, route, title], index) => {
  transaction.createIfNotExists({
    _id: id,
    _type: 'pageContent',
    route,
    title,
    sortOrder: index + 1,
    isPublished: true,
  })
})

const result = await transaction.commit()

for (const [route, defaults] of Object.entries(pageEditorDefaults)) {
  const pageId = pageContents.find(([, pageRoute]) => pageRoute === route)?.[0]
  if (!pageId) continue
  await client.patch(pageId).setIfMissing(defaults).commit()
}

console.log(`Seeded ${result.results.length} Sanity documents and prepared editable page content defaults.`)
