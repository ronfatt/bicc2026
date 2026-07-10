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
  ['uncle-sunday', 'Uncle Sunday', 'Malaysia', 'Guest Artist / Convention Organiser', 'A Malaysia-based clown performer and BICC organiser known for heartwarming outreach in schools, churches and charity programmes, using humour as a bridge for connection and healing.', ['Community Outreach', 'Faith-Driven Clowning', 'Connection'], true],
  ['paya-cocos', 'Paya Cocos', 'Mexico', 'Guest Artist / Instructor', 'A guest artist joining BICC 2026 to share clown craft, visual play and creative exchange with delegates.', ['Guest Artist', 'Physical Comedy', 'Creative Exchange'], true],
  ['chagy', 'Chagy', 'USA', 'Comedy Clown / Global Family Entertainer', 'Eugenio “Chagy” Adorno is a high-energy comedy clown and bilingual family entertainer whose work blends magic, mime, juggling, storytelling and heart-led audience connection across international stages.', ['Magic & Mime', 'Family Entertainment', 'Storytelling'], true, { sourceUrl: 'https://texasclownassociation.com/tca-convention/headliner/' }],
  ['uncle-button', 'Uncle Button', 'Malaysia', 'Workshop Instructor / Community Clown', 'One of Malaysia’s well-known clowns, Sam Tee began with balloons at children’s parties, trained in the U.S. and has brought clowning into charity, missions and community work.', ['Family Entertainment', 'Balloon Art', 'Community Clowning'], true],
  ['randy-christensen', 'Randy Christensen', 'USA', 'Master Clown / Performance Instructor', 'An award-winning Master Clown, entertainer and speaker with 40+ years of experience across 32 U.S. states and 9 countries, bringing variety arts, storytelling and physical comedy to BICC.', ['Master Clown', 'Variety Arts', 'Storytelling'], true],
  ['mr-john', 'Mr. John', 'Malaysia', 'Contemporary Clown / Teaching Artist', 'A contemporary clown and performance artist with 20+ years across commercial events, theatre and street festivals worldwide, blending puppetry, mime, physical comedy and heartfelt interactive storytelling.', ['Contemporary Performance', 'Puppetry & Mime', 'Physical Comedy'], true],
  ['kak-yogi', 'Kak Yogi', 'Indonesia', 'Community Instructor', 'A community instructor joining the BICC line-up to contribute regional perspective, creative exchange and performance conversation.', ['Community Clowning', 'Guest Artist', 'Details Coming Soon'], false],
  ['watt-de-clown', 'Watt De Clown', 'Malaysia', 'Magical Clown / Community Performer', 'Noor Hidawati Mohd Juki, known as Watt De Clown, is a Malaysian performer active in clowning, arts activities and community events, bringing magical clown shows and approachable family entertainment to public audiences.', ['Magical Clowning', 'Community Events', 'Family Shows'], false, { sourceUrl: 'https://kitareporters.com/insan/WPe9r50ZaL' }],
  ['kosuke-omune', 'Kosuke Omune', 'Japan', 'Hospital Clown / Guest Artist', 'Kosuke Omune is a pioneering Japanese hospital clown and president of the Japan Hospital Clown Association, recognised internationally for bringing laughter and care into children’s hospitals.', ['Hospital Clowning', 'Community Care', 'International Artist'], false, { sourceUrl: 'https://www.asahi.com/ajw/articles/14380177' }],
  ['jackie-newton', 'Jackie Newton', 'USA', 'WCA Leader / Workshop Instructor', 'Jackie Newton, also known as Sparky Malarkey, is a World Clown Association leader and teaching artist whose work focuses on movement, timing, character choices and approachable clowning for modern audiences.', ['Clown Education', 'Movement & Timing', 'WCA Leadership'], false, { sourceUrl: 'https://worldclown.com/past-presidents/' }],
  ['frankie-malachi', 'Frankie Malachi', 'Singapore', 'Puppeteer / Visual Storyteller', 'Frankie Malachi is a Singapore-based puppeteer and maker whose work spans marionettes, mascots, theatre, children’s productions and regional puppetry exchange across Asia.', ['Puppetry', 'Mascot Making', 'Visual Storytelling'], false, { sourceUrl: 'https://www.todayonline.com/business/sme/pulling-strings-work' }],
  ['tony-lee', 'Tony Lee', 'Hong Kong', 'Showcase Artist', 'A showcase artist joining BICC 2026 to bring live performance presence and international exchange to the instructor line-up.', ['Showcase Artist', 'Stage Performance', 'Guest Artist'], false],
  ['edmund-khong', 'Edmund Khong', 'Singapore', 'Master Clown / Family Entertainer', 'Edmund Khong, known for Captain Dazzle and Captain Bubbles, is an award-winning Singapore performer whose shows combine magic, comedy, bubbles, juggling, balloons and strong audience interaction.', ['Magic & Comedy', 'Bubbles & Balloons', 'Audience Interaction'], false, { officialBioUrl: 'https://www.captaindazzle.com/' }],
  ['zipper', 'Zipper', 'Thailand', 'Guest Artist / Circus Director', 'The creative force behind Zipper Circus, bringing clown and mime performance, juggling, visual acts, audience interaction and full-scale circus production experience to BICC.', ['Clown & Mime', 'Circus Production', 'Audience Interaction'], false],
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
  ['food-cc-cafe', 'CC Café', 'Food', 'A convenient cafe stop connected to the Calvary Crown venue flow for delegates.', 'Venue cafe'],
  ['food-pate-grill-house', 'Pate Grill House', 'Food', 'A practical grill-house option for dinner plans, groups and relaxed post-session meals.', 'Group dinner'],
  ['food-calvary-canteen', 'Calvary Canteen', 'Food', 'Simple canteen-style food option for delegates around the Calvary Crown venue.', 'Convenient meals'],
  ['food-hapi-cafe', 'Hapi Café', 'Food', 'Cafe stop for coffee, light meals and easy meetups between convention plans.', 'Coffee break'],
  ['food-dojo', 'Dojo', 'Food', 'Casual dining option to add to delegate food planning around Tawau.', 'Casual meal'],
  ['food-seafood', 'Seafood & Local Dining', 'Food', 'Fresh coastal flavours, shared meals and easy delegate dinners after programme days.', 'Delegate dinners'],
  ['food-kopitiam', 'Kopitiam Breakfast', 'Food', 'Simple morning stops for coffee, toast, noodles and local breakfast rhythm.', 'Morning meals'],
  ['food-nasi-kuning', 'Nasi Kuning Tawau', 'Food', 'A signature Tawau rice dish often served with sambal and rich local flavours.', 'First-time local food'],
  ['hotel-umii', 'UMii Hotel', 'Hotel', 'A cozy modern hotel stay with Wi-Fi, coffee and tea facilities, toiletries and air conditioning for simple delegate comfort.', 'Modern hotel'],
  ['hotel-umii-homestay', 'UMii Homestay', 'Hotel', 'A clean and cozy Tawau homestay option for families, friends and small groups planning Tawau or Semporna travel.', 'Family and group stay'],
  ['hotel-borneo-royale', 'Borneo Royale Hotel', 'Hotel', 'A known Tawau hotel option useful for delegates who want a larger city hotel stay.', 'City hotel'],
  ['hotel-shervinton', 'Shervinton Executive Boutique Hotel', 'Hotel', 'A central Tawau hotel option for food access, town walks and practical convention days.', 'City centre'],
  ['attraction-pasar-tanjung', 'Pasar Tanjung Tawau', 'Attraction', 'Malaysia’s largest indoor market, with food, dried seafood, craft and souvenir floors.', 'Market & souvenirs'],
  ['attraction-balung-cocos', 'Balung Cocos Columnar Basalt', 'Attraction', 'A rare natural formation of hexagonal basalt columns less than an hour from Tawau town.', 'Geological wonder'],
  ['attraction-tawau-hills', 'Tawau Hills Park', 'Attraction', 'A forest escape known for giant tropical trees, waterfalls, hot springs and hiking routes.', 'Nature & hiking'],
  ['attraction-pasar-malam-chester', 'Pasar Malam Chester', 'Attraction', 'A lively night market with food, busker stages, children’s play corners and local craft activity.', 'Night market'],
  ['attraction-cocoa', 'Teck Guan Cocoa Village & Museum', 'Attraction', 'A Tawau cocoa heritage experience covering production, village activities and museum context.', 'Cocoa heritage'],
  ['attraction-waterfront', 'Waterfront & City Walks', 'Attraction', 'Easy low-pressure moments for delegates who want to stretch, snack and see the city.', 'Easy walk'],
]

const faqs = [
  ['faq-price', 'What is the price of each pass?', 'Both Foundation and Mastery passes are listed at US$190, unless the organizer updates the official pricing.', 'Passes & Registration'],
  ['faq-track-difference', 'What is the difference between Foundation and Mastery?', 'Foundation is for beginners and emerging performers. Mastery is for experienced performers who want deeper critique, stage presence and professional development.', 'Passes & Registration'],
  ['faq-programme-confirmed', 'Is the full programme confirmed?', 'The programme flow is available as a preview. Final times, rooms and instructor assignments will be announced closer to the convention.', 'Programme'],
  ['faq-venue', 'Where is BICC 2026 held?', 'BICC 2026 is currently presented as taking place at Calvary Crown, Tawau, Sabah.', 'Venue & Visit'],
]

const passes = [
  ['pass-foundation', 'Foundation Pass', 'US$190', 'https://buy.stripe.com/bJe4gsec890A2pQ6e72400d', 'Best for beginners and emerging performers'],
  ['pass-mastery', 'Mastery Pass', 'US$190', 'https://buy.stripe.com/4gMcMYec84Kk0hIcCv2400c', 'Best for experienced performers'],
]

const pageContents = [
  ['page-content-home', '/', 'Home Page'],
  ['page-content-about', '/about', 'About Page'],
  ['page-content-programme', '/programme', 'Programme Page'],
  ['page-content-workshops', '/workshops', 'Workshops Page'],
  ['page-content-mentors', '/mentors', 'Instructors Page'],
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
      ['Hero: price badge', 'US$190'],
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
      ['Instructors preview: kicker', 'Instructors & Performers'],
      ['Instructors preview: headline', 'Learn From Artists Who Live The Stage.'],
      ['Instructors preview: intro', 'Instructors are selected for stage credibility, teaching clarity and real audience experience.'],
      ['Instructors preview: button', 'View Instructors'],
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
      ['Story: performer / instructor photo', 'Clown performer or instructor on stage'],
      ['Track: Foundation card photo', 'Foundation Pass'],
      ['Track: Mastery card photo', 'Mastery Pass'],
    ].map(([label, matchText]) => imageOverride(label, matchText)),
  },
  '/mentors': {
    textOverrides: [
      ['Hero: kicker', 'Instructors & Guest Artists'],
      ['Hero: headline', 'Learn From Artists Who Live the Stage.'],
      ['Hero: subheadline', 'Meet the performers, teachers, storytellers and creative instructors joining BICC 2026 from Malaysia, Asia and beyond.'],
      ['Hero: primary button', 'View Workshops'],
      ['Hero: secondary button', 'Get Your Pass'],
      ['Featured: kicker', 'Featured Instructors'],
      ['Featured: headline', 'A closer look at the artists helping shape the BICC 2026 learning and performance experience.'],
      ['Featured: intro', 'Official bios and specialty details can be refined as materials are confirmed.'],
      ['Line-up: kicker', 'Meet the Line-up'],
      ['Line-up: headline', 'Explore more of the BICC 2026 instructors, performers and guest artists.'],
      ['Final CTA: headline', 'Train With the BICC Instructors.'],
      ['Final CTA: copy', 'Join BICC 2026 and learn from artists who understand clowning as craft, connection, performance and community impact.'],
    ].map(([label, text]) => textOverride(label, text)),
    imageOverrides: [['Hero: instructor poster image', 'BICC instructor poster']].map(([label, matchText]) => imageOverride(label, matchText)),
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

mentors.forEach(([id, name, country, role, intro, specialties, isFeatured, links = {}], index) => {
  transaction.createIfNotExists({
    _id: id,
    _type: 'mentor',
    name,
    country,
    role: l(role),
    shortIntro: l(intro),
    specialties: specialties.map((specialty) => l(specialty)),
    ...links,
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

for (const [id, , , role, intro, specialties, isFeatured, links = {}] of mentors) {
  await client.patch(id).set({
    role: l(role),
    shortIntro: l(intro),
    specialties: specialties.map((specialty) => l(specialty)),
    ...links,
    isFeatured,
  }).commit()
}

for (const [route, defaults] of Object.entries(pageEditorDefaults)) {
  const pageId = pageContents.find(([, pageRoute]) => pageRoute === route)?.[0]
  if (!pageId) continue
  await client.patch(pageId).setIfMissing(defaults).commit()
}

console.log(`Seeded ${result.results.length} Sanity documents and prepared editable page content defaults.`)
