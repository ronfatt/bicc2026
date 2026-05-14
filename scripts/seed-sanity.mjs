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

const result = await transaction.commit()
console.log(`Seeded ${result.results.length} Sanity documents.`)
