import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { cmsQueries, fetchFromSanity, localize, sanityImageUrl, type CmsMentor } from './cms'

const clownHeroImage = '/mentors/randy-christensen.jpg'
const clownStageImage = '/mentors/watt-de-clown.jpg'
const clownDuoImage = '/mentors/jackie-newton.jpg'
const clownShowImage = '/mentors/chagy.jpg'
const biccLogo = '/bicc-logo.png'
const foundationPassPaymentLink = 'https://buy.stripe.com/6oUdR22tqekU9Siaun24006'
const masteryPassPaymentLink = 'https://buy.stripe.com/28EeV69VS3Ggd4uaun24007'
const visitTawauPartnerLink = 'https://linktr.ee/jwvnow'
const delegateFormStorageKey = 'bicc2026-delegate-details-draft'
const mentorPosterImage = '/mentors/uncle-sunday-poster.png'
const mentorPortraitUncleSunday = '/mentors/uncle-sunday.png'
const mentorPortraitChagy = '/mentors/chagy.jpg'
const mentorPortraitUncleButton = '/mentors/uncle-button.jpg'
const mentorPortraitMrJohn = '/mentors/mr-john.jpg'
const mentorPortraitWatt = '/mentors/watt-de-clown.jpg'
const mentorPortraitZipper = '/mentors/zipper.jpg'
const mentorPortraitRandy = '/mentors/randy-christensen.jpg'
const mentorPortraitEdmund = '/mentors/edmund-khong.png'
const mentorPortraitKosuke = '/mentors/kosuke-omune.png'
const mentorPortraitTony = '/mentors/tony-lee.jpg'
const mentorPortraitJackie = '/mentors/jackie-newton.jpg'
const mentorPortraitKakYogi = '/mentors/kak-yogi.jpg'
const mentorPortraitPayaCocos = '/mentors/paya-cocos.png'
const mentorPortraitFrankie = '/mentors/frankie-malachi.jpg'
const calvaryCrownAerialImage = '/calvary-scene.png'
const calvaryCrownPlanImage = '/tawau-town-map.jpg'
const visitSeafoodImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/MakananLaut.jpg?width=1200'
const visitKopitiamImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Coffee%20shop%20zz.jpg?width=900'
const visitNasiKuningImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Nasi%20Kuning%20Tawau.jpg?width=900'
const visitPasarTanjungImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Tawau%20Sabah%20Pasar-Tanjung-Tawau-01.jpg?width=1400'
const visitTawauHillsImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Table%20Waterfall%20at%20Tawau%20Hills%20Park%20-%20panoramio.jpg?width=900'
const visitCocoaVillageImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Teck%20Guan%20Cocoa%20Village%20Columnar%20Basalt.jpg?width=1000'
const visitWaterfrontImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Tawau%20-%20The%20City%20%2848869140708%29.jpg?width=1600'
const hotelBorneoRoyaleImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Eastern%20Plaza%20Tawau.jpg?width=1400'
const hotelShervintonImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Tawau%20Sabah%20Shervinton-Executive-Boutique-Hotel-01.jpg?width=1200'
const hotelLaImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Tawau%20Sabah%20LA-Hotel-01.jpg?width=900'
const hotelDanlopImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Tawau%20Sabah%20Danlop-Hotel-02.jpg?width=1200'

type ProgrammeFilterKey =
  | 'all'
  | 'foundation'
  | 'mastery'
  | 'exchange'
  | 'showcase'
  | 'community'
  | 'delegate-info'

type ProgrammeSessionType = Exclude<ProgrammeFilterKey, 'all'>
type ProgrammeSessionStatus = 'confirmed' | 'coming-soon' | 'limited-capacity'

type ProgrammeSession = {
  time: string
  title: string
  type: ProgrammeSessionType
  track: string
  venue: string
  description: string
  facilitator?: string
  status: ProgrammeSessionStatus
  icon: string
  image?: string
}

type ProgrammeDay = {
  id: string
  day: string
  date: string
  title: string
  description: string
  focus: string
  accent: 'arrival' | 'training' | 'showcase'
  chipLabels: string[]
  image: string
  sessions: ProgrammeSession[]
}

type MentorProfile = {
  id: string
  name: string
  country: string
  region: string
  role: string
  shortIntro: string
  specialties: string[]
  image: string | null
  featured: boolean
}

type PassTrackId = 'foundation' | 'mastery'
type SiteLanguage = 'en' | 'zh' | 'ms'

type DelegateRole =
  | 'Performer'
  | 'Educator'
  | 'Student'
  | 'Community Worker'
  | 'Family Entertainer'
  | 'Other'

type DelegateFormState = {
  fullName: string
  email: string
  paymentEmail: string
  whatsapp: string
  country: string
  organisation: string
  track: PassTrackId
  role: DelegateRole
  notes: string
}

const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Programme', path: '/programme' },
  { label: 'Workshops', path: '/workshops' },
  { label: 'Mentors', path: '/mentors' },
  { label: 'Passes', path: '/passes' },
  { label: 'Venue', path: '/venue' },
  { label: 'Visit Tawau', path: '/visit-tawau' },
  { label: 'Sponsors', path: '/sponsors' },
]

const languageOptions: { code: SiteLanguage; label: string; shortLabel: string }[] = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'zh', label: '简体中文', shortLabel: '中文' },
  { code: 'ms', label: 'Bahasa Melayu', shortLabel: 'BM' },
]

const translations: Record<Exclude<SiteLanguage, 'en'>, Record<string, string>> = {
  zh: {
    'Official Site': '官方网站',
    About: '关于',
    Programme: '日程',
    Workshops: '工作坊',
    Mentors: '导师',
    Passes: '通行证',
    Venue: '场地',
    'Visit Tawau': '探索斗湖',
    Sponsors: '赞助伙伴',
    FAQ: '常见问题',
    Contact: '联系',
    'Get Pass': '购买通行证',
    'Get Your Pass': '购买通行证',
    'Choose Your Pass': '选择通行证',
    'Compare Tracks': '比较课程',
    'View Programme': '查看日程',
    'View BICC Programme': '查看 BICC 日程',
    'View Workshops': '查看工作坊',
    'Back to Home': '返回首页',
    'Plan Your Visit': '规划行程',
    'Contact BICC': '联系 BICC',
    'Email BICC Team': '电邮 BICC 团队',
    'View FAQ': '查看常见问题',
    'Foundation Pass': 'Foundation 通行证',
    'Mastery Pass': 'Mastery 通行证',
    'Foundation Track Pass': 'Foundation 课程通行证',
    'Mastery Track Pass': 'Mastery 课程通行证',
    'Borneo International Clown Convention 2026': '婆罗洲国际小丑大会 2026',
    'Where Laughter Becomes Legacy': '让欢笑成为传承',
    'A 3-day international gathering for clown artists, performers, educators and communities in Borneo.':
      '一场为小丑艺术家、表演者、教育工作者与社区而设的三天国际大会。',
    'Aug 3-5, 2026': '2026年8月3日至5日',
    'Aug 3–5, 2026': '2026年8月3日至5日',
    'Tawau, Sabah': '沙巴斗湖',
    '2 Workshop Tracks': '两大工作坊课程',
    'US$130 Pass': 'US$130 通行证',
    'Choose Your Track': '选择你的课程',
    'Two Paths. One Price. Different Professional Needs.': '两条路径，同一价格，满足不同专业需求。',
    'Foundation Track': 'Foundation 课程',
    'Mastery Track': 'Mastery 课程',
    'Professional Workshops': '专业工作坊',
    'Performance Showcase': '演出展示',
    'Community & Cultural Exchange': '社区与文化交流',
    '3 Days. One Shared Journey.': '三天，一段共同旅程。',
    'Day 1': '第一天',
    'Day 2': '第二天',
    'Day 3': '第三天',
    'Arrival & Opening': '抵达与开幕',
    'Workshops & Exchange': '工作坊与交流',
    'Showcase & Celebration': '展示与庆祝',
    'Mentors & Guest Artists': '导师与嘉宾艺术家',
    'Learn From Artists Who Live the Stage.': '向真正活在舞台上的艺术家学习。',
    'Passes & Registration': '通行证与报名',
    'Choose Your Pass. Start Your BICC Journey.': '选择通行证，开启你的 BICC 旅程。',
    'What Your Pass Gives You': '通行证包含什么',
    'Before You Register': '报名之前',
    'Which Pass Is Right for You?': '哪一种通行证适合你？',
    'How Registration Works': '报名流程',
    'Why Join BICC 2026?': '为什么参加 BICC 2026？',
    'Ready to Choose Your Pass?': '准备好选择通行证了吗？',
    'Venue & Visitor Guide': '场地与访客指南',
    'Gather in Borneo. Find Your Way With Ease.': '相聚婆罗洲，轻松找到方向。',
    'Venue at a Glance': '场地重点',
    'Navigate the Experience': '大会区域导览',
    'Getting to Tawau': '如何前往斗湖',
    'Where to Stay': '住宿选择',
    'Make Tawau Part of the Convention Experience.': '让斗湖成为大会体验的一部分。',
    'Come for BICC. Stay for Tawau.': '为 BICC 而来，为斗湖而停留。',
    'Food That Feels Like Tawau': '斗湖的味道',
    'Getting Around Tawau': '斗湖交通',
    'Things To Do in Tawau': '斗湖景点与体验',
    'Make BICC 2026 Your Borneo Experience': '让 BICC 2026 成为你的婆罗洲体验',
    'Contact BICC 2026': '联系 BICC 2026',
    'Need help with passes, travel, sponsorship or the convention?': '需要通行证、旅行、赞助或大会协助？',
    'Send your question to the right place.': '把问题发送到正确的团队。',
    'Delegate Support': '参与者支持',
    'Sponsors & Partnerships': '赞助与合作',
    'Travel & Visitor Help': '旅行与访客协助',
    'Media & General': '媒体与一般询问',
    'BICC FAQ': 'BICC 常见问题',
    'Quick answers before you join BICC 2026.': '参加 BICC 2026 前的快速解答。',
    General: '一般',
    'Passes & Registration questions': '通行证与报名问题',
    'Workshops questions': '工作坊问题',
    'Programme questions': '日程问题',
    'Venue & Visit questions': '场地与旅行问题',
  },
  ms: {
    'Official Site': 'Laman Rasmi',
    About: 'Tentang',
    Programme: 'Program',
    Workshops: 'Bengkel',
    Mentors: 'Mentor',
    Passes: 'Pas',
    Venue: 'Lokasi',
    'Visit Tawau': 'Lawati Tawau',
    Sponsors: 'Penaja',
    FAQ: 'Soalan Lazim',
    Contact: 'Hubungi',
    'Get Pass': 'Dapatkan Pas',
    'Get Your Pass': 'Dapatkan Pas',
    'Choose Your Pass': 'Pilih Pas',
    'Compare Tracks': 'Bandingkan Trek',
    'View Programme': 'Lihat Program',
    'View BICC Programme': 'Lihat Program BICC',
    'View Workshops': 'Lihat Bengkel',
    'Back to Home': 'Kembali ke Laman Utama',
    'Plan Your Visit': 'Rancang Lawatan',
    'Contact BICC': 'Hubungi BICC',
    'Email BICC Team': 'E-mel Pasukan BICC',
    'View FAQ': 'Lihat Soalan Lazim',
    'Foundation Pass': 'Pas Foundation',
    'Mastery Pass': 'Pas Mastery',
    'Foundation Track Pass': 'Pas Trek Foundation',
    'Mastery Track Pass': 'Pas Trek Mastery',
    'Borneo International Clown Convention 2026': 'Konvensyen Badut Antarabangsa Borneo 2026',
    'Where Laughter Becomes Legacy': 'Di Mana Tawa Menjadi Legasi',
    'A 3-day international gathering for clown artists, performers, educators and communities in Borneo.':
      'Perhimpunan antarabangsa tiga hari untuk artis badut, penghibur, pendidik dan komuniti di Borneo.',
    'Aug 3-5, 2026': '3-5 Ogos 2026',
    'Aug 3–5, 2026': '3-5 Ogos 2026',
    'Tawau, Sabah': 'Tawau, Sabah',
    '2 Workshop Tracks': '2 Trek Bengkel',
    'US$130 Pass': 'Pas US$130',
    'Choose Your Track': 'Pilih Trek Anda',
    'Two Paths. One Price. Different Professional Needs.': 'Dua laluan. Satu harga. Keperluan profesional berbeza.',
    'Foundation Track': 'Trek Foundation',
    'Mastery Track': 'Trek Mastery',
    'Professional Workshops': 'Bengkel Profesional',
    'Performance Showcase': 'Persembahan Showcase',
    'Community & Cultural Exchange': 'Komuniti & Pertukaran Budaya',
    '3 Days. One Shared Journey.': '3 Hari. Satu Perjalanan Bersama.',
    'Day 1': 'Hari 1',
    'Day 2': 'Hari 2',
    'Day 3': 'Hari 3',
    'Arrival & Opening': 'Ketibaan & Pembukaan',
    'Workshops & Exchange': 'Bengkel & Pertukaran',
    'Showcase & Celebration': 'Showcase & Sambutan',
    'Mentors & Guest Artists': 'Mentor & Artis Jemputan',
    'Learn From Artists Who Live the Stage.': 'Belajar daripada artis yang hidup di pentas.',
    'Passes & Registration': 'Pas & Pendaftaran',
    'Choose Your Pass. Start Your BICC Journey.': 'Pilih pas anda. Mulakan perjalanan BICC.',
    'What Your Pass Gives You': 'Apa Yang Termasuk Dalam Pas',
    'Before You Register': 'Sebelum Mendaftar',
    'Which Pass Is Right for You?': 'Pas Mana Yang Sesuai?',
    'How Registration Works': 'Cara Pendaftaran',
    'Why Join BICC 2026?': 'Mengapa Sertai BICC 2026?',
    'Ready to Choose Your Pass?': 'Sedia Memilih Pas?',
    'Venue & Visitor Guide': 'Panduan Lokasi & Pelawat',
    'Gather in Borneo. Find Your Way With Ease.': 'Berkumpul di Borneo. Bergerak dengan mudah.',
    'Venue at a Glance': 'Lokasi Sepintas Lalu',
    'Navigate the Experience': 'Panduan Kawasan Konvensyen',
    'Getting to Tawau': 'Menuju ke Tawau',
    'Where to Stay': 'Tempat Menginap',
    'Make Tawau Part of the Convention Experience.': 'Jadikan Tawau sebahagian pengalaman konvensyen.',
    'Come for BICC. Stay for Tawau.': 'Datang untuk BICC. Tinggal untuk Tawau.',
    'Food That Feels Like Tawau': 'Rasa Makanan Tawau',
    'Getting Around Tawau': 'Bergerak di Tawau',
    'Things To Do in Tawau': 'Aktiviti di Tawau',
    'Make BICC 2026 Your Borneo Experience': 'Jadikan BICC 2026 Pengalaman Borneo Anda',
    'Contact BICC 2026': 'Hubungi BICC 2026',
    'Need help with passes, travel, sponsorship or the convention?': 'Perlukan bantuan pas, perjalanan, penajaan atau konvensyen?',
    'Send your question to the right place.': 'Hantar soalan anda ke saluran yang betul.',
    'Delegate Support': 'Sokongan Delegat',
    'Sponsors & Partnerships': 'Penaja & Kerjasama',
    'Travel & Visitor Help': 'Bantuan Perjalanan & Pelawat',
    'Media & General': 'Media & Umum',
    'BICC FAQ': 'Soalan Lazim BICC',
    'Quick answers before you join BICC 2026.': 'Jawapan ringkas sebelum menyertai BICC 2026.',
    General: 'Umum',
    'Passes & Registration questions': 'Soalan Pas & Pendaftaran',
    'Workshops questions': 'Soalan Bengkel',
    'Programme questions': 'Soalan Program',
    'Venue & Visit questions': 'Soalan Lokasi & Lawatan',
  },
}

const values = [
  { title: 'Joyful', body: 'Joy that connects.' },
  { title: 'Cultural', body: 'Rooted in Borneo.' },
  { title: 'Inspiring', body: 'Creative growth.' },
  { title: 'International', body: 'Global exchange.' },
  { title: 'Community', body: 'Hope through service.' },
]

const passes = [
  {
    id: 'foundation',
    name: 'Foundation Track Pass',
    shortName: 'Foundation Pass',
    price: 'US$130',
    badge: 'Best for beginners and emerging performers',
    label: 'Foundation Workshop Pass',
    headline: 'Build Your Professional Foundation',
    body:
      'For beginners, educators and emerging performers who want clear fundamentals, playful tools and confidence in front of an audience.',
    badges: ['No prior experience required', 'Certificate of Participation awarded'],
    includes: [
      'Physical Comedy Fundamentals',
      'Character & Persona Building',
      'Balloon Sculpting',
      'Interactive Storytelling',
      'Magic & Visual Illusions',
      'Puppetry Performance',
    ],
    bestFor: [
      'New clown performers',
      'Educators and school performers',
      'Family entertainers',
      'Artists building confidence',
    ],
    decisionBullets: [
      'Are new to clowning or still building confidence',
      'Want practical tools you can use right away',
      'Work with children, schools, family audiences or community groups',
      'Prefer a supportive introduction to clown craft',
    ],
    learningStyle: 'Practical basics, guided introduction and confidence-building',
    performanceLevel: 'Beginner to emerging',
    creativeOutcome: 'Build a strong starting toolkit',
    accent: 'foundation',
    cta: 'Get Foundation Pass',
    ctaHref: foundationPassPaymentLink,
    workshopHref: '/workshops',
  },
  {
    id: 'mastery',
    name: 'Mastery Track Pass',
    shortName: 'Mastery Pass',
    price: 'US$130',
    badge: 'Best for experienced performers',
    label: 'Mastery Workshop Pass',
    headline: 'Elevate Your Stage Performance',
    body:
      'For working performers who want stronger stage choices, sharper timing and more confident professional performance.',
    badges: ['Prior stage experience recommended', 'Certificate of Completion awarded'],
    includes: [
      'Advanced Stage Craft',
      'Signature Performance',
      'Showcase & Mentorship',
      'Advanced Comedy Timing & Acting',
      'Professional Magic & Variety Integration',
      'Career Positioning & Stage Command',
    ],
    bestFor: [
      'Experienced clowns',
      'Stage performers',
      'Working entertainers',
      'Performers seeking critique',
      'Artists building signature acts',
    ],
    decisionBullets: [
      'Already perform or have stage experience',
      'Want direct critique and deeper artistic development',
      'Are building a signature act or professional identity',
      'Want to strengthen timing, stage command and audience control',
    ],
    learningStyle: 'Advanced practice, critique, refinement and stage command',
    performanceLevel: 'Intermediate to advanced',
    creativeOutcome: 'Sharpen your professional stage identity',
    accent: 'mastery',
    cta: 'Get Mastery Pass',
    ctaHref: masteryPassPaymentLink,
    workshopHref: '/workshops',
  },
] as const

const passIncludedItems = [
  {
    title: '3-Day Convention Access',
    description: 'Join the full BICC journey across opening, training, exchange and closing moments.',
    icon: 'C',
    tone: 'soft-aqua',
  },
  {
    title: 'Selected Workshop Track',
    description: 'Access sessions matched to your Foundation or Mastery path.',
    icon: 'T',
    tone: 'soft-coral',
  },
  {
    title: 'Mentor-Led Learning',
    description: 'Learn through demonstration, practice and guided feedback.',
    icon: 'M',
    tone: 'soft-yellow',
  },
  {
    title: 'Shared Convention Moments',
    description: 'Join orientation, exchange sessions and selected community moments.',
    icon: 'P',
    tone: 'soft-green',
  },
] as const

const passRegistrationSteps = [
  {
    title: 'Choose Your Track',
    description: 'Select Foundation or Mastery based on your experience and learning goals.',
    icon: 'T',
  },
  {
    title: 'Register Your Details',
    description: 'Complete your checkout through the official BICC Stripe payment link for your selected pass.',
    icon: 'F',
  },
  {
    title: 'Receive Organizer Confirmation',
    description: 'Watch for official confirmation, updates and next steps from the BICC team.',
    icon: 'E',
  },
  {
    title: 'Prepare for BICC',
    description: 'Review programme updates, venue details, what to bring and final session information before arriving in Tawau.',
    icon: 'B',
  },
] as const

const passFaqItems = [
  {
    question: 'What is the price of each pass?',
    answer: 'Both Foundation and Mastery passes are listed at US$130, unless the organizer updates the official pricing.',
  },
  {
    question: 'What is the difference between Foundation and Mastery?',
    answer:
      'Foundation is designed for beginners and emerging performers who want essential clown craft. Mastery is designed for experienced performers who want deeper critique, stage presence and professional development.',
  },
  {
    question: 'Are workshops included in the pass?',
    answer:
      'Workshop access follows your selected pass and track. Final session access and capacity details are subject to organizer confirmation.',
  },
  {
    question: 'Can I change tracks after registering?',
    answer: 'Track changes are subject to availability and organizer confirmation.',
  },
  {
    question: 'Are accommodation, meals or transport included?',
    answer: 'These should not be assumed included unless the organizer confirms them separately.',
  },
  {
    question: 'Will I receive a certificate?',
    answer: 'Certificate details, if available, will be shared by the organizer.',
  },
  {
    question: 'What happens after I register?',
    answer: 'After checkout, follow the official BICC updates and organizer communication for programme, venue and next-step details.',
  },
  {
    question: 'What if the programme changes?',
    answer: 'Final programme details, venue information and room assignments may be updated closer to the convention.',
  },
] as const

const programme = [
  {
    day: 'Day 1',
    title: 'Arrival & Opening',
    body: 'Registration, welcome reception, orientation, opening ceremony and creative connections.',
  },
  {
    day: 'Day 2',
    title: 'Workshops & Exchange',
    body: 'Full-day training, mentorship, workshop tracks, creative exchange and performance activity.',
  },
  {
    day: 'Day 3',
    title: 'Showcase & Community',
    body: 'Final sessions, community sharing, showcase preparation and closing celebration.',
  },
]

const workshopHighlights = [
  {
    track: 'Foundation',
    title: 'Physical Comedy Fundamentals',
    body: 'Build movement clarity, rhythm and body awareness for live performance.',
    accent: 'foundation',
  },
  {
    track: 'Foundation',
    title: 'Character & Persona Building',
    body: 'Develop a stage identity that feels clear, warm and memorable.',
    accent: 'foundation',
  },
  {
    track: 'Foundation',
    title: 'Balloon Sculpting',
    body: 'Learn interactive crowd-friendly skills that add playfulness to performance.',
    accent: 'foundation',
  },
  {
    track: 'Mastery',
    title: 'Advanced Stage Craft',
    body: 'Sharpen timing, transitions and stronger performance structure.',
    accent: 'mastery',
  },
  {
    track: 'Mastery',
    title: 'Signature Performance',
    body: 'Refine material that better represents your professional performance voice.',
    accent: 'mastery',
  },
  {
    track: 'Mastery',
    title: 'Showcase & Mentorship',
    body: 'Receive critique, direction and support shaped for experienced performers.',
    accent: 'mastery',
  },
]

const workshopCards = [
  {
    id: 'stage-work',
    title: 'Stage Work, Character, and Presence',
    track: 'Mastery',
    trackType: 'mastery' as ProgrammeSessionType,
    description:
      'Strengthen the performer’s body, rhythm, character choices and connection with an audience.',
    forWhom: 'Stage performers, experienced clowns, actors and variety artists.',
    outcomes: ['Stage presence', 'Character clarity', 'Movement and rhythm', 'Performance structure', 'Audience timing'],
    image: clownHeroImage,
    featured: true,
  },
  {
    id: 'balloon-art',
    title: 'Balloon Art & Visual Play',
    track: 'Foundation',
    trackType: 'foundation' as ProgrammeSessionType,
    description:
      'Learn how balloons, shape, colour and physical play can become tools for storytelling, audience connection and instant visual comedy.',
    forWhom: 'Beginners, family entertainers, teaching artists and event performers.',
    outcomes: ['Simple balloon forms', 'Visual storytelling', 'Audience participation', 'Prop-based comedy', 'Safe playful handling'],
    image: clownStageImage,
    featured: false,
  },
  {
    id: 'magic-interaction',
    title: 'Magic, Interaction, and Wonder',
    track: 'Foundation / Mastery',
    trackType: 'exchange' as ProgrammeSessionType,
    description:
      'Build small moments of surprise that invite children, families and audiences into shared wonder.',
    forWhom: 'Clowns, magicians, family performers and educators.',
    outcomes: ['Simple magic structure', 'Audience interaction', 'Comic timing', 'Volunteer handling', 'Personal wonder'],
    image: clownShowImage,
    featured: false,
  },
  {
    id: 'hospital-clowning',
    title: 'Hospital Clowning in Practice',
    track: 'Outreach / Community',
    trackType: 'community' as ProgrammeSessionType,
    description:
      'Explore the sensitivity, presence and emotional awareness needed for meaningful clowning in care and outreach environments.',
    forWhom: 'Community clowns, outreach teams, volunteers and performers interested in humanitarian clowning.',
    outcomes: ['Gentle presence', 'Reading the room', 'Consent and sensitivity', 'Emotional safety', 'Human connection'],
    image: clownDuoImage,
    featured: false,
  },
  {
    id: 'kids-safety-show',
    title: 'Kids Safety Show & Educational Performance',
    track: 'Education / Community',
    trackType: 'foundation' as ProgrammeSessionType,
    description:
      'Learn how clowning can make educational messages more memorable, engaging and audience-friendly.',
    forWhom: 'Educators, school performers, community workers and family entertainers.',
    outcomes: ['Educational storytelling', 'Safety show structure', 'Child-friendly communication', 'Participation formats', 'Message retention'],
    image: clownStageImage,
    featured: false,
  },
] as const

const workshopSchedulePreview = [
  {
    day: 'Day 1',
    title: 'Arrival, Opening & Orientation',
    body: 'Registration, welcome session, creative connection and track introduction.',
  },
  {
    day: 'Day 2',
    title: 'Workshops & Exchange',
    body: 'Full-day training, mentor-led sessions, track-based learning and creative exchange.',
  },
  {
    day: 'Day 3',
    title: 'Showcase, Feedback & Community',
    body: 'Final sessions, performance sharing, community reflection and closing celebration.',
  },
] as const

const workshopFaqItems = [
  {
    question: 'Do I need prior clowning experience?',
    answer:
      'No. Foundation sessions are suitable for beginners and emerging performers. Mastery sessions are designed for experienced performers who want sharper feedback and deeper practice.',
  },
  {
    question: 'Are workshops included in the pass?',
    answer:
      'Workshop access follows the selected pass and track structure. Some sessions may have capacity limits or organizer confirmation.',
  },
  {
    question: 'Can I switch tracks?',
    answer: 'Track switching is subject to availability and organizer confirmation.',
  },
  {
    question: 'Will there be a full workshop schedule?',
    answer: 'Yes. The full workshop schedule and room assignments will be announced closer to the convention.',
  },
  {
    question: 'Are the workshops suitable for educators?',
    answer:
      'Yes. Several sessions are relevant for educators, school performers, family entertainers and community-based creative practitioners.',
  },
  {
    question: 'Are materials provided?',
    answer: 'Workshop material requirements, if any, will be announced by the organizer.',
  },
  {
    question: 'Will I receive a certificate?',
    answer: 'Certificate details, if available, will be announced by the organizer.',
  },
] as const

const mentorCards = [
  {
    title: 'International Guest Mentors',
    body: 'Official mentor announcements will be released as the faculty line-up is confirmed.',
  },
  {
    title: 'Performance-Led Teaching',
    body: 'The mentor team is being curated around clowning, stage craft, education and creative leadership.',
  },
  {
    title: 'Regional & Global Exchange',
    body: 'BICC will bring together voices from Borneo, Malaysia and the wider international clown community.',
  },
]

const mentorPreviewCards = [
  {
    title: 'International Mentor',
    meta: 'Physical Comedy, Stage Presence & Live Performance Craft',
    track: 'Foundation Track',
    note: 'Faculty Announcement Wave 1',
    image: clownHeroImage,
  },
  {
    title: 'Regional Teaching Artist',
    meta: 'Character Building, Teaching Practice & Community Performance',
    track: 'Foundation Track',
    note: 'Regional Artist-Educator',
    image: clownStageImage,
  },
  {
    title: 'Creative Exchange Mentor',
    meta: 'Audience Connection, Exchange Practice & Cultural Collaboration',
    track: 'Exchange Lab',
    note: 'International Exchange Faculty',
    image: clownDuoImage,
  },
  {
    title: 'Showcase Development Mentor',
    meta: 'Act Refinement, Showcase Direction & Professional Feedback',
    track: 'Mastery Track',
    note: 'Mastery Track Faculty',
    image: clownShowImage,
  },
]

type MentorFilterKey = 'all' | 'malaysia' | 'asia' | 'usa' | 'workshop-mentors' | 'guest-artists'

const mentorFilterItems: Array<{ key: MentorFilterKey; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'malaysia', label: 'Malaysia' },
  { key: 'asia', label: 'Asia' },
  { key: 'usa', label: 'USA' },
  { key: 'workshop-mentors', label: 'Workshop Mentors' },
  { key: 'guest-artists', label: 'Guest Artists' },
]

const mentorLineup: MentorProfile[] = [
  {
    id: 'uncle-sunday',
    name: 'Uncle Sunday',
    country: 'Malaysia',
    region: 'Malaysia',
    role: 'Guest Artist / Mentor',
    shortIntro: 'A guest artist joining BICC 2026 to share clown craft, performance experience and creative exchange with delegates.',
    specialties: ['Clown Craft', 'Performance', 'Creative Exchange'],
    image: mentorPortraitUncleSunday,
    featured: true,
  },
  {
    id: 'paya-cocos',
    name: 'Paya Cocos',
    country: 'Mexico',
    region: 'International',
    role: 'Guest Artist',
    shortIntro: 'A guest artist joining the BICC 2026 line-up to bring colorful stage presence, international exchange and live performance energy to delegates.',
    specialties: ['Guest Artist', 'Stage Performance', 'International Line-up'],
    image: mentorPortraitPayaCocos,
    featured: true,
  },
  {
    id: 'chagy',
    name: 'Chagy',
    country: 'USA',
    region: 'USA',
    role: 'Guest Artist / Mentor',
    shortIntro: 'A guest artist joining BICC 2026 to share clown craft, stage experience and creative exchange with delegates.',
    specialties: ['Stage Performance', 'Audience Interaction', 'Character Work'],
    image: mentorPortraitChagy,
    featured: true,
  },
  {
    id: 'uncle-button',
    name: 'Uncle Button',
    country: 'Malaysia',
    region: 'Malaysia',
    role: 'Workshop Mentor',
    shortIntro: 'A workshop mentor joining BICC 2026 to support practical learning, playful performance and warm audience connection.',
    specialties: ['Workshop Mentor', 'Family Entertainment', 'Audience Connection'],
    image: mentorPortraitUncleButton,
    featured: true,
  },
  {
    id: 'randy-christensen',
    name: 'Randy Christensen',
    country: 'USA',
    region: 'USA',
    role: 'Performance Mentor',
    shortIntro: 'A performance mentor joining BICC 2026 to share stage practice, showcase energy and live audience experience.',
    specialties: ['Performance Mentor', 'Stage Presence', 'Showcase'],
    image: mentorPortraitRandy,
    featured: true,
  },
  {
    id: 'mr-john',
    name: 'Mr. John',
    country: 'Malaysia',
    region: 'Malaysia',
    role: 'Teaching Artist',
    shortIntro: 'A teaching artist joining BICC 2026 to share practical performance methods, workshop teaching and creative exchange.',
    specialties: ['Teaching Artist', 'Workshop Mentor', 'Creative Exchange'],
    image: mentorPortraitMrJohn,
    featured: true,
  },
  {
    id: 'kak-yogi',
    name: 'Kak Yogi',
    country: 'Indonesia',
    region: 'Asia',
    role: 'Community Mentor',
    shortIntro: 'A community mentor joining the BICC line-up to contribute regional perspective, creative exchange and performance conversation.',
    specialties: ['Community Clowning', 'Guest Artist', 'Details Coming Soon'],
    image: mentorPortraitKakYogi,
    featured: false,
  },
  {
    id: 'watt-de-clown',
    name: 'Watt De Clown',
    country: 'Malaysia',
    region: 'Malaysia',
    role: 'Performance Mentor',
    shortIntro: 'A performance mentor joining BICC 2026 to share audience connection, comic presence and live convention energy.',
    specialties: ['Performance Mentor', 'Character Work', 'Audience Interaction'],
    image: mentorPortraitWatt,
    featured: false,
  },
  {
    id: 'kosuke-omune',
    name: 'Kosuke Omune',
    country: 'Japan',
    region: 'Asia',
    role: 'Guest Artist',
    shortIntro: 'A guest artist in the BICC 2026 line-up, bringing a distinct performance perspective to the convention exchange.',
    specialties: ['Guest Artist', 'Puppetry', 'Performance'],
    image: mentorPortraitKosuke,
    featured: false,
  },
  {
    id: 'jackie-newton',
    name: 'Jackie Newton',
    country: 'USA',
    region: 'USA',
    role: 'Workshop Mentor',
    shortIntro: 'A workshop mentor joining the BICC 2026 line-up to bring audience experience, guest artist presence and practical convention exchange.',
    specialties: ['Workshop Mentor', 'Guest Artist', 'Audience Experience'],
    image: mentorPortraitJackie,
    featured: false,
  },
  {
    id: 'frankie-malachi',
    name: 'Frankie Malachi',
    country: 'Singapore',
    region: 'Asia',
    role: 'Guest Artist',
    shortIntro: 'A guest artist joining BICC 2026 to bring live performance craft, visual storytelling and regional exchange to the mentor line-up.',
    specialties: ['Guest Artist', 'Visual Storytelling', 'Performance'],
    image: mentorPortraitFrankie,
    featured: false,
  },
  {
    id: 'tony-lee',
    name: 'Tony Lee',
    country: 'Hong Kong',
    region: 'Asia',
    role: 'Showcase Artist',
    shortIntro: 'A showcase artist joining BICC 2026 to bring live performance presence and international exchange to the mentor line-up.',
    specialties: ['Showcase Artist', 'Stage Performance', 'Guest Artist'],
    image: mentorPortraitTony,
    featured: false,
  },
  {
    id: 'edmund-khong',
    name: 'Edmund Khong',
    country: 'Singapore',
    region: 'Asia',
    role: 'Teaching Artist',
    shortIntro: 'A teaching artist joining BICC 2026 to contribute practical performance guidance and convention exchange.',
    specialties: ['Teaching Artist', 'Puppetry', 'Workshop Mentor'],
    image: mentorPortraitEdmund,
    featured: false,
  },
  {
    id: 'zipper',
    name: 'Zipper',
    country: 'Thailand',
    region: 'Asia',
    role: 'Guest Artist',
    shortIntro: 'A guest artist joining BICC 2026 to bring live audience energy, character work and performance exchange.',
    specialties: ['Stage Performance', 'Character Work', 'Audience Interaction'],
    image: mentorPortraitZipper,
    featured: false,
  },
] as const

const storyFeatures = [
  {
    title: 'Learn The Craft',
    body: 'Train inside clear Foundation and Mastery pathways built for real progress.',
  },
  {
    title: 'Share The Stage',
    body: 'Develop work for the stage, not just for the classroom.',
  },
  {
    title: 'Serve The Community',
    body: 'Exchange ideas, methods and cultural perspectives with artists from different contexts.',
  },
]

const sponsorSupportGroups = [
  {
    title: 'Organiser',
    items: ['CDesign Production Sdn. Bhd.'],
  },
  {
    title: 'Collaboration Partners',
    items: ['Rotary Club of Tawau', 'Sabah Convention Bureau'],
  },
  {
    title: 'Supported By',
    items: ['Sabah Tourism Board', 'Explore Sabah', 'Visit Malaysia 2026'],
  },
  {
    title: 'Association & Business Partners',
    items: ['World Clown Association', 'Tawau Chinese Chamber of Commerce'],
  },
] as const

const sponsorValueCards = [
  {
    title: 'Brand Visibility',
    body: 'Reach families, educators, performers, tourism partners and international delegates.',
    tone: 'soft-coral',
    icon: 'V',
  },
  {
    title: 'CSR & Community Impact',
    body: 'Support outreach, children’s joy, learning and meaningful social connection.',
    tone: 'soft-green',
    icon: 'C',
  },
  {
    title: 'Tourism & Local Business',
    body: 'Connect your brand with Tawau, Sabah and destination-event audiences.',
    tone: 'soft-yellow',
    icon: 'T',
  },
  {
    title: 'Cultural Partnership',
    body: 'Be part of a warm international convention built around creativity and hope.',
    tone: 'soft-aqua',
    icon: 'P',
  },
] as const

const sponsorOpportunityCards = [
  {
    title: 'Main Stage Partner',
    body: 'Logo on stage backdrop, opening moments and performance highlights.',
  },
  {
    title: 'Workshop Partner',
    body: 'Support balloon art, magic, hospital clowning or children’s education workshops.',
  },
  {
    title: 'Red Nose CSR Partner',
    body: 'Sponsor hospital, orphanage or community outreach programmes.',
  },
  {
    title: 'Delegate Experience Partner',
    body: 'Brand presence on passes, lanyards, welcome kits or delegate materials.',
  },
  {
    title: 'Travel & Hospitality Partner',
    body: 'Support hotels, transport, food, local tours or Tawau visitor experience.',
  },
  {
    title: 'Official Magazine / Media Partner',
    body: 'Feature your brand in the official convention magazine, website and social content.',
  },
] as const

const sponsorPackageCards = [
  {
    title: 'Legacy Partner',
    body: 'For brands seeking maximum official visibility.',
    points: ['Top-tier official visibility', 'Stage and media prominence', 'Priority branding placement', 'High-level partner recognition'],
  },
  {
    title: 'Signature Partner',
    body: 'For brands supporting key convention experiences.',
    points: ['Named experience association', 'Workshop or showcase presence', 'Strong digital visibility', 'Premium delegate touchpoints'],
  },
  {
    title: 'Impact Partner',
    body: 'For CSR, education, healthcare and community sponsors.',
    points: ['Outreach alignment', 'Community storytelling value', 'Education and care visibility', 'Meaningful impact positioning'],
  },
  {
    title: 'Community Partner',
    body: 'For local businesses and supporters who want to be part of BICC.',
    points: ['Accessible local partnership', 'On-site visibility', 'Supporter recognition', 'Warm community alignment'],
  },
] as const

const sponsorInquiryFields = ['Name', 'Company', 'Sponsorship Interest', 'Budget Range / Partnership Type', 'Contact'] as const

const programmeLegendItems = [
  {
    key: 'foundation',
    label: 'Foundation Track',
    description: 'Beginner-friendly training and essential clown craft.',
  },
  {
    key: 'mastery',
    label: 'Mastery Track',
    description: 'Advanced practice, critique, stage command and professional development.',
  },
  {
    key: 'exchange',
    label: 'Exchange Lab',
    description: 'Cultural exchange, creative sharing and cross-border collaboration.',
  },
  {
    key: 'showcase',
    label: 'Showcase',
    description: 'Performance preparation, stage moments and audience-facing sessions.',
  },
  {
    key: 'community',
    label: 'Community',
    description: 'Outreach, connection, reflection and shared celebration.',
  },
  {
    key: 'delegate-info',
    label: 'Delegate Info',
    description: 'Registration, orientation, breaks, meals and practical updates.',
  },
] as const

const programmeFilterItems: Array<{ key: ProgrammeFilterKey; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'foundation', label: 'Foundation' },
  { key: 'mastery', label: 'Mastery' },
  { key: 'exchange', label: 'Exchange' },
  { key: 'showcase', label: 'Showcase' },
  { key: 'community', label: 'Community' },
  { key: 'delegate-info', label: 'Delegate Info' },
]

const programmeStatusLabels: Record<ProgrammeSessionStatus, string> = {
  confirmed: 'Confirmed',
  'coming-soon': 'Coming Soon',
  'limited-capacity': 'Limited Capacity',
}

const programmeDays: ProgrammeDay[] = [
  {
    id: 'day-1',
    day: 'Day 1',
    date: 'Aug 3, 2026',
    title: 'Arrival & Opening',
    description:
      'A welcoming first day built around arrival, orientation, shared energy and clear entry into the convention.',
    focus:
      'Registration, welcome reception, orientation, opening ceremony, creative connection and track introduction.',
    accent: 'arrival',
    chipLabels: [
      'Delegate Registration',
      'Welcome & Orientation',
      'Opening Ceremony',
      'Creative Connection Session',
      'Track Briefing',
    ],
    image: clownHeroImage,
    sessions: [
      {
        time: 'Schedule to be announced',
        title: 'Delegate Registration',
        type: 'delegate-info',
        track: 'All Delegates',
        venue: 'Venue to be announced',
        description: 'Check in, collect materials and settle into the convention with the latest programme updates.',
        status: 'coming-soon',
        icon: 'R',
      },
      {
        time: 'Schedule to be announced',
        title: 'Welcome & Orientation',
        type: 'delegate-info',
        track: 'All Delegates',
        venue: 'Main welcome zone to be announced',
        description: 'Get oriented to the 3-day flow, practical info, venue rhythm and delegate experience.',
        status: 'coming-soon',
        icon: 'I',
      },
      {
        time: 'Schedule to be announced',
        title: 'Opening Ceremony',
        type: 'showcase',
        track: 'All Delegates',
        venue: 'Main stage to be announced',
        description: 'A shared opening moment for delegates, mentors, organisers and guests from different communities.',
        status: 'coming-soon',
        icon: 'S',
        image: clownShowImage,
      },
      {
        time: 'Schedule to be announced',
        title: 'Creative Connection Session',
        type: 'exchange',
        track: 'All Delegates',
        venue: 'Exchange area to be announced',
        description: 'A first gathering for introductions, creative exchange and warm cross-border conversation.',
        status: 'coming-soon',
        icon: 'E',
      },
      {
        time: 'Schedule to be announced',
        title: 'Track Briefing',
        type: 'delegate-info',
        track: 'Foundation & Mastery',
        venue: 'Programme zone to be announced',
        description: 'Understand how the Foundation and Mastery journeys will move across the convention.',
        status: 'coming-soon',
        icon: 'T',
      },
      {
        time: 'Schedule to be announced',
        title: 'Evening Welcome & Networking Moment',
        type: 'community',
        track: 'All Delegates',
        venue: 'Gathering space to be announced',
        description: 'Close the first day with informal connection, shared stories and a gentle community rhythm.',
        status: 'coming-soon',
        icon: 'C',
      },
    ],
  },
  {
    id: 'day-2',
    day: 'Day 2',
    date: 'Aug 4, 2026',
    title: 'Workshops & Exchange',
    description:
      'The most active training day, combining parallel track learning, exchange moments and performance practice.',
    focus:
      'Full-day training, mentorship, workshop tracks, creative exchange and performance practice.',
    accent: 'training',
    chipLabels: [
      'Foundation Workshops',
      'Mastery Workshops',
      'Mentor Sessions',
      'Exchange Lab',
      'Practice / Rehearsal Blocks',
    ],
    image: clownStageImage,
    sessions: [
      {
        time: 'Detailed session times will be announced closer to the convention.',
        title: 'Foundation Track Workshop Block',
        type: 'foundation',
        track: 'Foundation Track',
        venue: 'Workshop room to be announced',
        description: 'Beginner-friendly practical sessions focused on physical clarity, interaction and confidence.',
        status: 'coming-soon',
        icon: 'F',
      },
      {
        time: 'Detailed session times will be announced closer to the convention.',
        title: 'Mastery Track Workshop Block',
        type: 'mastery',
        track: 'Mastery Track',
        venue: 'Workshop room to be announced',
        description: 'Advanced sessions built around critique, structure, stage command and professional growth.',
        status: 'coming-soon',
        icon: 'M',
      },
      {
        time: 'Schedule to be announced',
        title: 'Mentor-Led Practice',
        type: 'mastery',
        track: 'Selected workshop groups',
        venue: 'Practice zone to be announced',
        description: 'Guided practice moments where participants test material and receive direct feedback.',
        status: 'limited-capacity',
        icon: 'P',
        image: clownDuoImage,
      },
      {
        time: 'Schedule to be announced',
        title: 'Exchange Lab',
        type: 'exchange',
        track: 'All Delegates / invited participation',
        venue: 'Exchange area to be announced',
        description: 'A space for local and international artists to share methods, perspectives and cultural context.',
        status: 'coming-soon',
        icon: 'E',
      },
      {
        time: 'Schedule to be announced',
        title: 'Performance Practice & Rehearsal',
        type: 'showcase',
        track: 'Foundation & Mastery',
        venue: 'Rehearsal area to be announced',
        description: 'A working block for rehearsal, act shaping and showcase preparation.',
        status: 'coming-soon',
        icon: 'S',
      },
      {
        time: 'Schedule to be announced',
        title: 'Informal Community Gathering',
        type: 'community',
        track: 'All Delegates',
        venue: 'Community space to be announced',
        description: 'An informal gathering to reflect, connect and carry the energy of the day into the evening.',
        status: 'coming-soon',
        icon: 'C',
      },
    ],
  },
  {
    id: 'day-3',
    day: 'Day 3',
    date: 'Aug 5, 2026',
    title: 'Showcase & Community',
    description:
      'A closing day that brings learning, sharing and performance into one joyful final convention rhythm.',
    focus:
      'Final sessions, showcase preparation, performance sharing, community moments and closing celebration.',
    accent: 'showcase',
    chipLabels: [
      'Final Workshop Blocks',
      'Showcase Preparation',
      'Community Sharing',
      'Performance Showcase',
      'Closing Celebration',
    ],
    image: clownShowImage,
    sessions: [
      {
        time: 'Schedule to be announced',
        title: 'Final Foundation Session',
        type: 'foundation',
        track: 'Foundation Track',
        venue: 'Workshop room to be announced',
        description: 'A final practical session to consolidate skills and confidence before the convention closes.',
        status: 'coming-soon',
        icon: 'F',
      },
      {
        time: 'Schedule to be announced',
        title: 'Final Mastery Session',
        type: 'mastery',
        track: 'Mastery Track',
        venue: 'Workshop room to be announced',
        description: 'A last advanced working block focused on refinement, notes and performance readiness.',
        status: 'coming-soon',
        icon: 'M',
      },
      {
        time: 'Schedule to be announced',
        title: 'Showcase Preparation',
        type: 'showcase',
        track: 'Selected delegates / showcase flow',
        venue: 'Stage zone to be announced',
        description: 'Preparation time for transitions, stage confidence and readiness for shared performance moments.',
        status: 'coming-soon',
        icon: 'S',
      },
      {
        time: 'Schedule to be announced',
        title: 'Community Sharing Session',
        type: 'community',
        track: 'All Delegates',
        venue: 'Community circle to be announced',
        description: 'A space to reflect on learning, joy, connection and the wider meaning of the convention.',
        status: 'coming-soon',
        icon: 'C',
      },
      {
        time: 'Schedule to be announced',
        title: 'Performance Showcase',
        type: 'showcase',
        track: 'Showcase delegates & audience',
        venue: 'Main stage to be announced',
        description: 'A shared performance moment where work, practice and celebration meet the audience.',
        status: 'coming-soon',
        icon: 'S',
        image: clownHeroImage,
      },
      {
        time: 'Schedule to be announced',
        title: 'Closing Celebration',
        type: 'community',
        track: 'All Delegates',
        venue: 'Closing zone to be announced',
        description: 'A joyful final gathering to celebrate learning, exchange and the convention community.',
        status: 'coming-soon',
        icon: 'C',
      },
    ],
  },
]

const programmeTrackConnection = [
  {
    title: 'Foundation Track Pass',
    copy:
      'Best for beginners, emerging performers, educators, family entertainers and artists building confidence in clown craft.',
    focus: [
      'Foundation workshops',
      'Creative practice',
      'Character and interaction basics',
      'Community connection',
      'Showcase observation or participation depending on programme flow',
    ],
    accent: 'foundation',
    cta: 'Get Foundation Pass',
    ctaHref: foundationPassPaymentLink,
  },
  {
    title: 'Mastery Track Pass',
    copy:
      'Best for experienced performers and working artists who want sharper critique, stage presence and professional development.',
    focus: [
      'Advanced workshops',
      'Mentor feedback',
      'Signature performance refinement',
      'Showcase preparation',
      'Professional exchange',
    ],
    accent: 'mastery',
    cta: 'Get Mastery Pass',
    ctaHref: masteryPassPaymentLink,
  },
] as const

const programmeFaqItems = [
  {
    question: 'Is the full programme confirmed?',
    answer:
      'The programme flow is available as a preview. Final times, rooms and mentor assignments will be announced closer to the convention.',
  },
  {
    question: 'Do I need to choose a track before attending?',
    answer:
      'Yes. Delegates should select the pass or track that best fits their current experience and learning goals.',
  },
  {
    question: 'Are all workshops included?',
    answer:
      'Workshop access follows the selected pass and track structure. Some sessions may have capacity limits or organiser confirmation.',
  },
  {
    question: 'Can I attend both Foundation and Mastery sessions?',
    answer:
      'Track access is subject to pass type, availability and organiser confirmation.',
  },
  {
    question: 'Will there be showcase opportunities?',
    answer:
      'The programme includes showcase and community-sharing moments. Specific participation details will be confirmed in the final schedule.',
  },
  {
    question: 'Where will the sessions happen?',
    answer:
      'Venue zones and room assignments will be announced closer to the convention.',
  },
] as const

const venueInfo = {
  city: 'Tawau',
  region: 'Sabah',
  country: 'Malaysia',
  venueName: 'Calvary Crown',
  address: 'TB14846 Taman Setia, Mile 3, Jalan Chong Thien Vun, 91000 Tawau, Sabah, Malaysia',
  mapUrl: null,
  mapAsset: null,
  isConfirmed: true,
  mapConfirmed: false,
  roomAssignmentsConfirmed: false,
  buildingStoreys: 10,
  completedYear: 2014,
} as const

const venueQuickFacts = [
  {
    title: 'Location',
    copy: venueInfo.venueName,
    note: venueInfo.address,
    icon: 'P',
    tone: 'soft-aqua',
    comingSoon: false,
  },
  {
    title: 'Convention Dates',
    copy: 'Aug 3–5, 2026',
    note: 'Three shared days of workshops, performance, exchange and connection.',
    icon: 'D',
    tone: 'soft-coral',
    comingSoon: false,
  },
  {
    title: 'Main Activities',
    copy: 'Workshops, mentorship, exchange sessions, showcase moments and community gathering.',
    note: `Hosted inside a ${venueInfo.buildingStoreys}-storey multi-use building designed for worship, learning, gathering and support.`,
    icon: 'A',
    tone: 'soft-yellow',
    comingSoon: false,
  },
  {
    title: 'Delegate Flow',
    copy: 'Registration, orientation, learning floors, showcase spaces and visitor support.',
    note: 'Expect a vertical convention flow across reception, hall, learning levels and shared gathering spaces.',
    icon: 'F',
    tone: 'soft-green',
    comingSoon: false,
  },
  {
    title: 'Updates',
    copy: 'Delegate map overlays and final room assignments will be announced closer to the convention.',
    note: 'Use official BICC updates for the most current visitor information.',
    icon: 'U',
    tone: 'soft-aqua',
    comingSoon: true,
  },
] as const

const calvaryCrownLevels = [
  {
    level: 'Level 1',
    title: 'Cafe / Reception',
    copy: 'Arrival, reception energy and first-point delegate flow.',
    use: 'Arrival & support',
    type: 'delegate-info' as ProgrammeSessionType,
  },
  {
    level: 'Level 2',
    title: 'Worship Hall',
    copy: 'A likely shared-space anchor for opening or gathered moments.',
    use: 'Shared hall',
    type: 'showcase' as ProgrammeSessionType,
  },
  {
    level: 'Level 3',
    title: 'Gym',
    copy: 'A movement-friendly level that supports active practice and rehearsal energy.',
    use: 'Movement practice',
    type: 'foundation' as ProgrammeSessionType,
  },
  {
    level: 'Level 4',
    title: 'School',
    copy: 'Learning-oriented space that aligns naturally with structured workshops.',
    use: 'Workshop rooms',
    type: 'foundation' as ProgrammeSessionType,
  },
  {
    level: 'Level 5',
    title: 'Library / Exhibition Rooms',
    copy: 'Useful for quieter sessions, displays and reflective exchange.',
    use: 'Exchange & display',
    type: 'exchange' as ProgrammeSessionType,
  },
  {
    level: 'Level 6',
    title: 'Bible Training School',
    copy: 'A teaching floor that supports classroom-style convention use.',
    use: 'Training floor',
    type: 'foundation' as ProgrammeSessionType,
  },
  {
    level: 'Level 7',
    title: 'Accommodation',
    copy: 'Internal stay capacity within the wider building mix.',
    use: 'Support stay',
    type: 'community' as ProgrammeSessionType,
  },
  {
    level: 'Level 8',
    title: 'Office',
    copy: 'Operational and support functions within the venue stack.',
    use: 'Operations',
    type: 'delegate-info' as ProgrammeSessionType,
  },
  {
    level: 'Level 9',
    title: 'Office',
    copy: 'Additional admin and organisational support floors.',
    use: 'Operations',
    type: 'delegate-info' as ProgrammeSessionType,
  },
  {
    level: 'Level 10',
    title: 'Function Hall',
    copy: 'A strong upper-level venue for large sessions, celebration or showcase flow.',
    use: 'Showcase potential',
    type: 'showcase' as ProgrammeSessionType,
  },
] as const

const venueMapPins = [
  { label: 'L1 Cafe / Reception', type: 'delegate-info' as ProgrammeSessionType, top: '18%', left: '16%' },
  { label: 'L2 Worship Hall', type: 'showcase' as ProgrammeSessionType, top: '34%', left: '49%' },
  { label: 'L3-6 Learning Floors', type: 'foundation' as ProgrammeSessionType, top: '56%', left: '28%' },
  { label: 'Exchange Points', type: 'exchange' as ProgrammeSessionType, top: '52%', left: '66%' },
  { label: 'L10 Function Hall', type: 'showcase' as ProgrammeSessionType, top: '76%', left: '52%' },
  { label: 'Rest & Photo Moments', type: 'community' as ProgrammeSessionType, top: '78%', left: '18%' },
]

const arrivalSteps = [
  {
    title: 'Arrive in Tawau',
    copy: 'Plan your travel to Tawau, Sabah and check the latest organiser updates before the convention.',
    icon: 'A',
  },
  {
    title: 'Find Calvary Crown',
    copy: `Head to ${venueInfo.venueName}, ${venueInfo.address}. The final delegate map overlay will still be shared before the event.`,
    icon: 'P',
  },
  {
    title: 'Check In',
    copy: 'Collect your delegate materials, confirm your pass or track and receive any programme updates.',
    icon: 'B',
  },
  {
    title: 'Join the Opening Flow',
    copy: 'Move into orientation, welcome activities, workshop track briefings and the shared convention journey.',
    icon: 'J',
  },
] as const

const practicalGuideCards = [
  {
    title: 'By Air',
    copy: 'If you are coming from outside Tawau, plan flights early and check updates before departure.',
    icon: 'A',
    note: 'Travel planning',
  },
  {
    title: 'Stay Nearby',
    copy: 'Choose a stay that makes morning arrival and evening departure easy.',
    icon: 'H',
    note: 'Accommodation',
  },
  {
    title: 'Start at Reception',
    copy: 'Head to the reception level first for check-in, materials and room directions.',
    icon: 'R',
    note: 'Arrival',
  },
  {
    title: 'What to Bring',
    copy: 'Comfortable clothing, a notebook, a water bottle and any small workshop props.',
    icon: 'B',
    note: 'Delegate essentials',
  },
  {
    title: 'Comfort & Access',
    copy: 'Break areas, support points and accessibility guidance will be included in the final delegate guide.',
    icon: 'C',
    note: 'Support',
  },
  {
    title: 'Follow Updates',
    copy: 'Final map overlays, room assignments and arrival notes will be shared closer to the convention.',
    icon: 'U',
    note: 'Official updates',
  },
] as const

const visitTawauHeroFacts = [
  {
    title: 'Tawau, Sabah',
    copy: 'A coastal city in Malaysian Borneo.',
    tone: 'soft-aqua',
  },
  {
    title: 'Event Destination',
    copy: 'Home of BICC 2026.',
    tone: 'soft-coral',
  },
  {
    title: 'Local Experience',
    copy: 'Food, nature, culture and warm hospitality.',
    tone: 'soft-yellow',
  },
] as const

const tawauFoodCards = [
  {
    id: 'seafood',
    title: 'Seafood & Local Dining',
    copy: 'Fresh coastal flavours, shared meals and easy delegate dinners after programme days.',
    tone: 'seafood',
    meta: 'Dinner / group meals',
    image: visitSeafoodImage,
    credit: 'Wikimedia Commons',
    guideTitle: 'Start with Tawau seafood',
    guideCopy:
      'Tawau is widely known for fresh seafood, especially around waterfront and town-centre dining areas. This is the easiest dinner plan for groups after convention sessions.',
    bestTime: 'Evening meals',
    whereToStart: 'Look around Sabindo / waterfront seafood areas and established local seafood restaurants.',
    highlights: ['Butter prawns', 'Fresh fish', 'Crab and shellfish', 'Vegetable seafood dishes'],
  },
  {
    id: 'kopitiam',
    title: 'Kopitiam Breakfast',
    copy: 'Simple morning stops for coffee, toast, noodles and local breakfast rhythm.',
    tone: 'kopitiam',
    meta: 'Morning / quick start',
    image: visitKopitiamImage,
    credit: 'Chensiyuan / Wikimedia Commons',
    guideTitle: 'Begin the day like a local',
    guideCopy:
      'A Tawau morning can be simple and satisfying: coffee, noodles, toast or a quick rice dish before heading to the venue.',
    bestTime: 'Breakfast / early lunch',
    whereToStart: 'Choose kopitiams near your hotel or along your hotel-to-venue route.',
    highlights: ['Mee Tauhu', 'Local coffee', 'Toast and eggs', 'Noodle or rice plates'],
  },
  {
    id: 'street-food',
    title: 'Street Food & Local Snacks',
    copy: 'Casual bites between sessions, markets or evening walks around town.',
    tone: 'street',
    meta: 'Evening / local flavour',
    image: visitNasiKuningImage,
    credit: 'Maslight / Wikimedia Commons',
    guideTitle: 'Try local snacks and Tawau favourites',
    guideCopy:
      'Street food is where Tawau feels casual and alive. It is good for light meals, market stops or relaxed food hunting with friends.',
    bestTime: 'Late afternoon / evening',
    whereToStart: 'Pasar Tanjung Tawau, hawker areas and local food stalls around town.',
    highlights: ['Nasi Kuning Tawau', 'Amplang', 'Keropok', 'Soto and local rice dishes'],
  },
  {
    id: 'cafe',
    title: 'Cafe Stops',
    copy: 'Slow moments for delegates, families and guests to recharge between convention plans.',
    tone: 'cafe',
    meta: 'Breaks / casual meetings',
    image: visitWaterfrontImage,
    credit: 'Adznee Abas / Wikimedia Commons',
    guideTitle: 'Use cafes as reset points',
    guideCopy:
      'Cafes are useful between travel, workshops and evening plans. They give delegates a calmer place to rest, talk and plan the next move.',
    bestTime: 'Afternoon / between sessions',
    whereToStart: 'Look near city-centre hotels, shopping areas and routes back from the venue.',
    highlights: ['Coffee breaks', 'Cocoa drinks', 'Light meals', 'Delegate meetups'],
  },
] as const

const firstTimeTawauFoodPicks = [
  'Seafood dinner',
  'Nasi Kuning Tawau',
  'Kopitiam breakfast',
  'Amplang snack',
  'Local coffee or cocoa',
] as const

const tawauFoodDirectory = [
  {
    name: 'Nasi Kuning Tawau',
    category: 'Street Food',
    image: visitNasiKuningImage,
    description: 'A signature Tawau rice dish often served with sambal and rich local flavours.',
    bestFor: 'First-time local food',
  },
  {
    name: 'Fresh Seafood Dinner',
    category: 'Seafood',
    image: visitSeafoodImage,
    description: 'A relaxed group dinner option after workshops, especially around town or waterfront dining areas.',
    bestFor: 'Delegate groups',
  },
  {
    name: 'Mee Tauhu',
    category: 'Kopitiam',
    image: visitKopitiamImage,
    description: 'A local breakfast or lunch idea to look for in kopitiams and casual food shops.',
    bestFor: 'Morning meal',
  },
  {
    name: 'Amplang',
    category: 'Local Snack',
    image: visitNasiKuningImage,
    description: 'A crunchy Sabah snack that is easy to bring back or share with friends.',
    bestFor: 'Souvenir snack',
  },
  {
    name: 'Local Coffee',
    category: 'Cafe / Kopitiam',
    image: visitKopitiamImage,
    description: 'A simple way to start the day or reset between programme blocks.',
    bestFor: 'Coffee break',
  },
  {
    name: 'Cocoa Drinks',
    category: 'Cafe / Cocoa',
    image: visitCocoaVillageImage,
    description: 'A nice Tawau-themed drink idea, especially if you plan to explore cocoa heritage stops.',
    bestFor: 'Afternoon stop',
  },
  {
    name: 'Market Snacks',
    category: 'Market',
    image: visitPasarTanjungImage,
    description: 'Small bites and everyday local flavours around Pasar Tanjung and town food areas.',
    bestFor: 'Short walks',
  },
  {
    name: 'Toast & Eggs',
    category: 'Kopitiam',
    image: visitKopitiamImage,
    description: 'A familiar kopitiam breakfast option before heading to the convention venue.',
    bestFor: 'Quick breakfast',
  },
  {
    name: 'Soto',
    category: 'Street Food',
    image: visitNasiKuningImage,
    description: 'A warm local bowl option for delegates who want something simple and comforting.',
    bestFor: 'Light meal',
  },
  {
    name: 'Satay',
    category: 'Street Food',
    image: visitPasarTanjungImage,
    description: 'A casual sharing food idea for evening walks, markets or group food hunting.',
    bestFor: 'Group snack',
  },
  {
    name: 'Coconut Drink',
    category: 'Drinks',
    image: visitWaterfrontImage,
    description: 'A refreshing tropical drink to look for after a warm day around town.',
    bestFor: 'Hot afternoon',
  },
  {
    name: 'Grilled Fish',
    category: 'Seafood',
    image: visitSeafoodImage,
    description: 'A straightforward seafood dinner choice for visitors who want something familiar and local.',
    bestFor: 'Dinner',
  },
  {
    name: 'Prawn Dishes',
    category: 'Seafood',
    image: visitSeafoodImage,
    description: 'Tawau seafood meals often work well for shared tables and group dining.',
    bestFor: 'Shared meal',
  },
  {
    name: 'Curry Mee',
    category: 'Kopitiam',
    image: visitKopitiamImage,
    description: 'A richer noodle option for visitors who enjoy stronger breakfast or lunch flavours.',
    bestFor: 'Lunch',
  },
  {
    name: 'Local Cakes',
    category: 'Cafe / Kopitiam',
    image: visitKopitiamImage,
    description: 'Small sweet bites for coffee breaks, casual meetups or after-session resets.',
    bestFor: 'Tea break',
  },
  {
    name: 'Seafood Noodles',
    category: 'Seafood',
    image: visitSeafoodImage,
    description: 'A practical middle ground between seafood dinner and casual noodle meals.',
    bestFor: 'Casual meal',
  },
  {
    name: 'Market Fruit',
    category: 'Market',
    image: visitPasarTanjungImage,
    description: 'Fresh fruit is an easy market stop for families, guests and delegates between plans.',
    bestFor: 'Market walk',
  },
] as const

const tawauFoodFilterItems = ['All', 'Seafood', 'Kopitiam', 'Street Food', 'Market', 'Cafe / Kopitiam', 'Drinks'] as const

const tawauStayCards = [
  {
    title: 'Near the Convention Venue',
    copy: 'Best for delegates who want the simplest morning arrival and evening return.',
    icon: 'V',
  },
  {
    title: 'City Centre Hotels',
    copy: 'Useful for food access, town walks and a wider Tawau experience.',
    icon: 'C',
  },
  {
    title: 'Group-Friendly Stays',
    copy: 'Good for teams, families, schools or travelling performer groups.',
    icon: 'G',
  },
  {
    title: 'Simple & Practical Options',
    copy: 'Clean, convenient stays for delegates focused on programme days.',
    icon: 'S',
  },
] as const

const tawauHotelSamples = [
  {
    name: 'Borneo Royale Hotel',
    area: 'Eastern Plaza / Jalan Kuhara',
    fit: 'Larger hotel option',
    tag: 'Venue access',
    note: 'Useful for delegates who prefer a full-service hotel environment with mall-area convenience.',
    image: hotelBorneoRoyaleImage,
    link: 'https://www.google.com/maps/search/?api=1&query=Borneo%20Royale%20Hotel%20Tawau',
    credit: 'CEphoto, Uwe Aranas / Wikimedia Commons',
  },
  {
    name: 'Shervinton Executive Boutique Hotel',
    area: 'Fajar Complex / Jalan Bunga',
    fit: 'Boutique city stay',
    tag: 'City centre',
    note: 'A central option for delegates who want food, town access and a more business-hotel rhythm.',
    image: hotelShervintonImage,
    link: 'https://www.google.com/maps/search/?api=1&query=Shervinton%20Executive%20Boutique%20Hotel%20Tawau',
    credit: 'CEphoto, Uwe Aranas / Wikimedia Commons',
  },
  {
    name: 'LA Hotel',
    area: 'Bandar Tawau / town centre',
    fit: 'Central city stay',
    tag: 'City centre',
    note: 'A familiar town hotel reference for delegates who want city access and easy local movement.',
    image: hotelLaImage,
    link: 'https://www.google.com/maps/search/?api=1&query=LA%20Hotel%20Tawau',
    credit: 'CEphoto, Uwe Aranas / Wikimedia Commons',
  },
  {
    name: 'Danlop Hotel',
    area: 'Jalan Dunlop',
    fit: 'Simple town option',
    tag: 'Practical stay',
    note: 'A practical city hotel reference for short stays and easy food access around town.',
    image: hotelDanlopImage,
    link: 'https://www.google.com/maps/search/?api=1&query=Danlop%20Hotel%20Tawau',
    credit: 'CEphoto, Uwe Aranas / Wikimedia Commons',
  },
  {
    name: 'Marco Polo Hotel - Tawau',
    area: 'Jalan Clinic',
    fit: 'Classic town hotel',
    tag: 'Classic hotel',
    note: 'A familiar Tawau hotel name for visitors who want a straightforward city stay.',
    image: visitWaterfrontImage,
    link: 'https://www.google.com/maps/search/?api=1&query=Marco%20Polo%20Hotel%20Tawau',
    credit: 'City reference image / Wikimedia Commons',
  },
  {
    name: 'Heritage Hotel',
    area: 'Jalan Bunga / Fajar Complex',
    fit: 'City centre convenience',
    tag: 'City centre',
    note: 'Good for delegates who want to stay near restaurants, shops and town movement.',
    image: visitPasarTanjungImage,
    link: 'https://www.google.com/maps/search/?api=1&query=Heritage%20Hotel%20Tawau',
    credit: 'City reference image / Wikimedia Commons',
  },
] as const

const tawauTransportCards = [
  {
    title: 'By Air',
    copy: 'Plan flights to Tawau early and check travel updates before departure.',
    icon: 'A',
  },
  {
    title: 'Airport to City / Venue',
    copy: 'Arrange transfer or local ride options before arrival for a smoother first day.',
    icon: 'T',
  },
  {
    title: 'Around Town',
    copy: 'Group rides, taxis or local transport are easiest when planned around meals and sessions.',
    icon: 'R',
  },
  {
    title: 'Convention Days',
    copy: 'Leave extra time for check-in, workshop transitions and evening programme moments.',
    icon: 'D',
  },
] as const

const tawauRouteSteps = ['Airport', 'Hotel', 'Venue', 'Food', 'Attractions'] as const

const tawauDelegateTips = [
  'Book accommodation early around the convention dates.',
  'Keep your first evening flexible for registration and settling in.',
  'Plan food stops near your hotel or venue route.',
  'Save extra time for airport, hotel and venue transfers.',
] as const

const tawauThingsToDoCards = [
  {
    title: 'Tawau Hills Park',
    copy: 'A nature escape with forest, fresh air and a different side of Tawau beyond the convention hall.',
    tone: 'hills',
    tag: 'Nature',
    image: visitTawauHillsImage,
    credit: 'Annette Teng / Wikimedia Commons',
  },
  {
    title: 'Teck Guan Cocoa Museum & Cocoa Village',
    copy: 'A local heritage stop for visitors curious about Tawau cocoa, flavour and place.',
    tone: 'cocoa',
    tag: 'Cocoa heritage',
    image: visitCocoaVillageImage,
    credit: 'ChunXingWong / Wikimedia Commons',
  },
  {
    title: 'Pasar Tanjung Tawau',
    copy: 'A lively market experience for food, local colour and everyday city rhythm.',
    tone: 'market',
    tag: 'Market',
    image: visitPasarTanjungImage,
    credit: 'CEphoto, Uwe Aranas / Wikimedia Commons',
  },
  {
    title: 'Batu Bersusun',
    copy: 'A natural coastal formation that gives visitors a quieter Tawau landmark to explore.',
    tone: 'stone',
    tag: 'Coastal landmark',
    image: visitCocoaVillageImage,
    credit: 'ChunXingWong / Wikimedia Commons',
  },
  {
    title: 'Waterfront & City Walks',
    copy: 'Easy low-pressure moments for delegates who want to stretch, snack and see the city.',
    tone: 'waterfront',
    tag: 'Easy walk',
    image: visitWaterfrontImage,
    credit: 'Adznee Abas / Wikimedia Commons',
  },
] as const

const venueFaqItems = [
  {
    question: 'Where is BICC 2026 held?',
    answer:
      `BICC 2026 is currently presented as taking place at ${venueInfo.venueName}, ${venueInfo.city}, ${venueInfo.region}.`,
  },
  {
    question: 'Is the full venue address confirmed?',
    answer: venueInfo.address,
  },
  {
    question: 'Will there be a venue map?',
    answer:
      'Yes. The official venue map will be shared before the convention and will include key zones such as registration, workshop rooms, main hall, photo spots and food or rest areas.',
  },
  {
    question: 'Where do I register when I arrive?',
    answer: 'Delegate registration details will be included in the final venue guide and programme update.',
  },
  {
    question: 'Are workshop rooms assigned already?',
    answer:
      'Room assignments will be confirmed closer to the convention and may depend on track, session type and final venue layout.',
  },
  {
    question: 'Will there be food areas?',
    answer: 'Food and rest area information will be included in the official venue guide once confirmed.',
  },
  {
    question: 'Is accommodation included in the pass?',
    answer: 'Accommodation is not listed as included unless specifically stated by the organiser.',
  },
  {
    question: 'How do I receive venue updates?',
    answer: 'Follow the official BICC website or organiser updates for confirmed venue, programme and delegate information.',
  },
] as const

const routeContent = {
  '/about': {
    eyebrow: 'About BICC 2026',
    title: 'A convention built around laughter, craft, culture and human connection.',
    intro:
      'BICC 2026 is designed as a professional clowning convention with a warm festival spirit, bringing together performance training, cultural exchange and meaningful community engagement in Borneo.',
    cards: [
      {
        title: 'Professional Convention',
        body: 'Structured learning, clear workshop tracks and international performance standards.',
      },
      {
        title: 'Cultural Gathering',
        body: 'A joyful event rooted in Tawau and Sabah, with room for local identity and international dialogue.',
      },
      {
        title: 'Human Impact',
        body: 'Clowning here is treated as both an art form and a tool for connection, hope and care.',
      },
    ],
    asideTitle: 'Why it matters',
    asideBody:
      'BICC is not meant to feel like a generic entertainment event. It is positioned as an official gathering where performers, educators and communities can grow together.',
    primaryCta: { label: 'View Passes', href: '/passes' },
    secondaryCta: { label: 'Explore Programme', href: '/programme' },
  },
  '/programme': {
    eyebrow: 'Programme',
    title: 'A three-day convention journey with space for arrival, training and celebration.',
    intro:
      'The programme is being shaped to balance workshops, orientation, community exchange and showcase moments so delegates can learn, connect and perform with purpose.',
    cards: programme,
    asideTitle: 'Programme note',
    asideBody:
      'Detailed timeslots, sessions and featured moments will be announced in the full programme release.',
    primaryCta: { label: 'View Passes', href: '/passes' },
    secondaryCta: { label: 'About BICC', href: '/about' },
  },
  '/workshops': {
    eyebrow: 'Workshops',
    title: 'Training designed for real performance growth at two different experience levels.',
    intro:
      'BICC separates its workshop offer into two clear tracks so participants can choose a path that fits their current experience and learning goals.',
    cards: workshopHighlights.map((item) => ({
      title: `${item.track}: ${item.title}`,
      body: item.body,
    })),
    asideTitle: 'Track structure',
    asideBody:
      'Foundation is for confidence and fundamentals. Mastery is for experienced performers seeking stronger critique, craft and stage direction.',
    primaryCta: { label: 'Compare Passes', href: '/passes' },
    secondaryCta: { label: 'View Programme', href: '/programme' },
  },
  '/mentors': {
    eyebrow: 'Mentors',
    title: 'Learning shaped by international artists, educators and performance mentors.',
    intro:
      'The BICC faculty is being built to support both artistic excellence and approachable teaching, with space for international exchange and regional leadership.',
    cards: mentorCards,
    asideTitle: 'Announcement status',
    asideBody:
      'Confirmed mentor names, countries and specialties will be published as soon as invitations and schedules are finalized.',
    primaryCta: { label: 'Explore Workshops', href: '/workshops' },
    secondaryCta: { label: 'Get Pass', href: '/passes' },
  },
  '/passes': {
    eyebrow: 'Passes',
    title: 'Two tracks. One price. A clearer way to choose your growth path.',
    intro:
      'BICC keeps the pass structure simple on purpose. Visitors should be able to decide quickly whether they need a foundation-building experience or a more advanced performance path.',
    cards: [
      {
        title: 'Foundation Track Pass — US$130',
        body: 'Best for beginners, emerging performers and educators building confidence, technique and core clowning fundamentals.',
      },
      {
        title: 'Mastery Track Pass — US$130',
        body: 'Best for experienced performers who want stronger stage craft, sharper structure and more professional critique.',
      },
      {
        title: 'Simple Registration Decision',
        body: 'No crowded ticket menu, no confusing tiers. Just two focused learning paths designed around actual participant needs.',
      },
    ],
    asideTitle: 'Pass note',
    asideBody:
      'Both passes include access to your selected workshop track and a certificate aligned with that learning path.',
    primaryCta: { label: 'Get Foundation Pass', href: foundationPassPaymentLink },
    secondaryCta: { label: 'Get Mastery Pass', href: masteryPassPaymentLink },
  },
  '/venue': {
    eyebrow: 'Venue & Travel',
    title: 'Gather in Tawau, Sabah and experience Borneo as part of the convention story.',
    intro:
      'The venue page will help delegates understand where BICC takes place, how to plan travel and why the local setting matters to the convention atmosphere.',
    cards: [
      {
        title: 'Tawau, Sabah, Malaysia',
        body: 'A host city that brings together cultural warmth, local hospitality and access to distinctive Borneo experiences.',
      },
      {
        title: 'Travel Planning',
        body: 'Guidance for arrival, accommodation and practical venue logistics will be published here.',
      },
      {
        title: 'Local Experience',
        body: 'Food, nature, community and regional identity are intended to be part of the delegate journey, not just background.',
      },
    ],
    asideTitle: 'Travel note',
    asideBody:
      'Venue details, maps and partner hotel information will be added as the event logistics are finalized.',
    primaryCta: { label: 'View Programme', href: '/programme' },
    secondaryCta: { label: 'Get Pass', href: '/passes' },
  },
  '/sponsors': {
    eyebrow: 'Sponsors & Partners',
    title: 'Partner with a joyful international movement rooted in performance, culture and community.',
    intro:
      'BICC offers sponsors and cultural partners a meaningful platform connected to education, tourism, live performance and social impact.',
    cards: [
      {
        title: 'Brand Visibility',
        body: 'Reach performers, educators, families, creative leaders and international delegates in one official event platform.',
      },
      {
        title: 'Cultural Alignment',
        body: 'Support an event that celebrates creativity, cross-cultural connection and hopeful community storytelling.',
      },
      {
        title: 'Meaningful Partnership',
        body: 'Build association with a convention that is warm enough for families and professional enough for serious collaborators.',
      },
    ],
    asideTitle: 'Sponsorship deck',
    asideBody:
      'Detailed sponsor packages, benefits and deck downloads will be added here once the official partnership materials are ready.',
    primaryCta: { label: 'Contact BICC', href: 'mailto:hello@bicc2026.com' },
    secondaryCta: { label: 'View Venue', href: '/venue' },
  },
} as const

type RouteKey = keyof typeof routeContent

function RedNoseIcon({ large = false }: { large?: boolean }) {
  return (
    <span aria-hidden="true" className={`red-nose-icon${large ? ' large' : ''}`}>
      <span className="red-nose-dot" />
    </span>
  )
}

function SmileDoodle() {
  return (
    <div aria-hidden="true" className="smile-doodle">
      <span className="smile-eye left" />
      <span className="smile-eye right" />
      <RedNoseIcon />
      <span className="smile-mouth" />
    </div>
  )
}

function PatternCorner({ side }: { side: 'left' | 'right' }) {
  return (
    <div aria-hidden="true" className={`pattern-corner ${side}`}>
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '')
}

function getTrackFromSearch(search: string): PassTrackId {
  const track = new URLSearchParams(search).get('track')
  return track === 'mastery' ? 'mastery' : 'foundation'
}

function getPassByTrack(track: PassTrackId) {
  return passes.find((pass) => pass.id === track) ?? passes[0]
}

function mapCmsMentors(cmsMentors: CmsMentor[], language: SiteLanguage): MentorProfile[] {
  return cmsMentors.map((mentor) => ({
    id: mentor._id,
    name: mentor.name,
    country: mentor.country || 'International',
    region: mentor.country === 'USA' ? 'USA' : mentor.country === 'Malaysia' ? 'Malaysia' : 'Asia',
    role: localize(mentor.role, language) || 'Guest Artist',
    shortIntro:
      localize(mentor.shortIntro, language) ||
      'A guest artist joining BICC 2026 to share clown craft, performance experience and creative exchange with delegates.',
    specialties: mentor.specialties?.map((specialty) => localize(specialty, language)).filter(Boolean).slice(0, 3) || [
      'Guest Artist',
      'Performance',
      'Creative Exchange',
    ],
    image: sanityImageUrl(mentor.portrait) || null,
    featured: Boolean(mentor.isFeatured),
  }))
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function isSiteLanguage(value: string | null): value is SiteLanguage {
  return value === 'en' || value === 'zh' || value === 'ms'
}

function getInitialLanguage(): SiteLanguage {
  const urlLanguage = new URLSearchParams(window.location.search).get('lang')
  if (isSiteLanguage(urlLanguage)) return urlLanguage

  const savedLanguage = window.localStorage.getItem('bicc-site-language')
  if (isSiteLanguage(savedLanguage)) return savedLanguage

  return 'en'
}

function normalizeTranslationKey(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function applyPageTranslations(language: SiteLanguage) {
  document.documentElement.lang = language === 'zh' ? 'zh-Hans' : language === 'ms' ? 'ms' : 'en'
  document.documentElement.dataset.siteLanguage = language

  if (language === 'en') return

  const dictionary = translations[language]
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (parent.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT
      return normalizeTranslationKey(node.textContent || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })

  const nodes: Text[] = []
  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text)
  }

  nodes.forEach((node) => {
    const original = node.textContent || ''
    const key = normalizeTranslationKey(original)
    const translated = dictionary[key]
    if (!translated) return

    const leading = original.match(/^\s*/)?.[0] ?? ''
    const trailing = original.match(/\s*$/)?.[0] ?? ''
    node.textContent = `${leading}${translated}${trailing}`
  })

  document.querySelectorAll<HTMLElement>('[placeholder], [aria-label], [title]').forEach((element) => {
    if (element.closest('[data-no-translate]')) return
    ;(['placeholder', 'aria-label', 'title'] as const).forEach((attribute) => {
      const value = element.getAttribute(attribute)
      if (!value) return
      const translated = dictionary[normalizeTranslationKey(value)]
      if (translated) element.setAttribute(attribute, translated)
    })
  })
}

function buildDelegateSummary(form: DelegateFormState) {
  const pass = getPassByTrack(form.track)
  return [
    'BICC 2026 Delegate Details',
    '',
    `Full Name: ${form.fullName}`,
    `Email: ${form.email}`,
    `Stripe Receipt / Payment Email: ${form.paymentEmail || form.email}`,
    `WhatsApp / Phone: ${form.whatsapp || '-'}`,
    `Country: ${form.country}`,
    `Organisation / Group: ${form.organisation || '-'}`,
    `Selected Track: ${pass.name}`,
    `Role: ${form.role}`,
    '',
    'Notes:',
    form.notes || '-',
  ].join('\n')
}

function buildDelegateMailto(form: DelegateFormState) {
  const pass = getPassByTrack(form.track)
  const subject = `BICC 2026 Delegate Details - ${pass.shortName}`
  const body = buildDelegateSummary(form)

  const query = new URLSearchParams({
    subject,
    body,
  })

  return `mailto:hello@bicc2026.com?${query.toString()}`
}

function renderPassCards() {
  return (
    <div className="passes-grid">
      {passes.map((pass) => (
        <article className={`pass-card ${pass.accent}`} key={pass.name}>
          <span className={`track-label ${pass.accent}`}>{pass.label}</span>
          <h3>{pass.name}</h3>
          <p className="pass-price">{pass.price}</p>
          <strong className="pass-headline">{pass.headline}</strong>
          <p className="pass-description">{pass.body}</p>
          <div className="pass-badges">
            {pass.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          <ul className="feature-list">
            {pass.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
              <a className="primary-btn wide-btn" href={pass.ctaHref} rel="noreferrer" target="_blank">
                {pass.cta}
              </a>
        </article>
      ))}
    </div>
  )
}

function renderProgrammeCards() {
  return (
    <div className="programme-grid">
      {programme.map((item) => (
        <article className="programme-card" key={item.day}>
          <span className="track-label red">{item.day}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  )
}

function ProgrammeTypeDot({ type }: { type: ProgrammeSessionType | ProgrammeFilterKey }) {
  return <span aria-hidden="true" className={`programme-type-dot ${type}`} />
}

function ProgrammeTypePill({
  label,
  type,
}: {
  label: string
  type: ProgrammeSessionType | ProgrammeFilterKey
}) {
  return (
    <span className={`programme-type-pill ${type}`}>
      <ProgrammeTypeDot type={type} />
      {label}
    </span>
  )
}

function ProgrammeHero() {
  return (
    <section className="programme-hero section-shell">
      <div aria-hidden="true" className="spotlight-glow programme-spotlight" />
      <div aria-hidden="true" className="confetti-field programme-confetti" />
      <div className="programme-hero-copy">
        <p className="section-kicker">Programme</p>
        <div className="programme-hero-title-row">
          <h1>See the 3-Day BICC Journey.</h1>
          <span className="programme-ticket-badge">Official Convention Programme</span>
        </div>
        <p className="programme-hero-intro">
          A clear 3-day journey through arrival, workshops, exchange, showcase and community moments.
        </p>
        <div className="event-badges programme-hero-badges">
          <span>Aug 3–5, 2026</span>
          <span>Tawau, Sabah</span>
          <span>2 Workshop Tracks</span>
          <span>Showcase Journey</span>
        </div>
        <div className="hero-actions programme-hero-actions">
          <a className="primary-btn" href="/passes">
            Get Your Pass
          </a>
          <a className="secondary-btn" href="/passes">
            Compare Tracks
          </a>
        </div>
      </div>

      <div className="programme-hero-visual">
        <div className="programme-hero-main image-frame">
          <img alt="Convention workshop and stage energy" src={clownHeroImage} />
          <div className="programme-hero-caption">
            <strong>Programme opening spread</strong>
            <span>Workshop, stage, audience and community moments.</span>
          </div>
        </div>
        <article className="programme-floating-card top">
          <img alt="Workshop moment" src={clownStageImage} />
          <span>Workshop energy</span>
        </article>
      </div>
    </section>
  )
}

function ProgramAtAGlance() {
  return (
    <section className="editorial-section section-shell programme-glance">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Convention at a Glance</p>
          <h2>A simple rhythm before the detailed schedule.</h2>
        </div>
      </div>

      <div className="programme-glance-grid">
        {programmeDays.map((day) => (
          <article className={`programme-day-card ${day.accent}`} key={day.id}>
            <span className="programme-day-node" />
            <p className="programme-day-meta">
              {day.day}
              <span>{day.date}</span>
            </p>
            <h3>{day.title}</h3>
            <p className="programme-day-focus">{day.focus}</p>
            <div className="programme-day-chip-row">
              {day.chipLabels.map((chip) => (
                <span className="programme-mini-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
            <a className="text-link" href={`#${day.id}`}>
              View Day Details
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

function DayTabs() {
  return (
    <div className="programme-sticky-strip">
      <div className="programme-day-tabs" role="navigation" aria-label="Programme day navigation">
        {programmeDays.map((day) => (
          <a className="programme-day-tab" href={`#${day.id}`} key={day.id}>
            <ProgrammeTypeDot type="showcase" />
            {day.day}
          </a>
        ))}
      </div>
    </div>
  )
}

function ProgramFilters({
  activeFilter,
  onChange,
}: {
  activeFilter: ProgrammeFilterKey
  onChange: (key: ProgrammeFilterKey) => void
}) {
  return (
    <div className="programme-filter-row" role="toolbar" aria-label="Programme filters">
      {programmeFilterItems.map((item) => (
        <button
          className={`programme-filter-pill${activeFilter === item.key ? ' active' : ''}`}
          key={item.key}
          onClick={() => onChange(item.key)}
          type="button"
        >
          <ProgrammeTypeDot type={item.key} />
          {item.label}
        </button>
      ))}
    </div>
  )
}

function ProgramSessionCard({ session }: { session: ProgrammeSession }) {
  return (
    <article className={`programme-session-card ${session.type}`}>
      <div className="programme-session-time">
        <span className="programme-session-icon">{session.icon}</span>
        <div>
          <strong>{session.time}</strong>
          <span>{session.venue}</span>
        </div>
      </div>
      <div className="programme-session-body">
        <div className="programme-session-topline">
          <ProgrammeTypePill
            label={programmeLegendItems.find((item) => item.key === session.type)?.label ?? session.track}
            type={session.type}
          />
          <span className={`programme-status-badge ${session.status}`}>{programmeStatusLabels[session.status]}</span>
        </div>
        <h3>{session.title}</h3>
        <div className="programme-session-meta">
          <span>{session.track}</span>
          {session.facilitator ? <span>{session.facilitator}</span> : null}
        </div>
        <p>{session.description}</p>
        {session.image ? (
          <div className="programme-session-thumb">
            <img alt={session.title} src={session.image} />
          </div>
        ) : null}
      </div>
    </article>
  )
}

function ProgramTimeline({
  day,
  activeFilter,
}: {
  day: ProgrammeDay
  activeFilter: ProgrammeFilterKey
}) {
  const visibleSessions =
    activeFilter === 'all' ? day.sessions : day.sessions.filter((session) => session.type === activeFilter)

  return (
    <section className={`programme-day-section ${day.accent}`} id={day.id}>
      <div className="programme-day-section-head">
        <div>
          <p className="programme-day-label">
            {day.day}
            <span>{day.date}</span>
          </p>
          <h3>{day.title}</h3>
        </div>
        <p>{day.description}</p>
      </div>

      <div className="programme-session-list">
        {visibleSessions.length > 0 ? (
          visibleSessions.map((session) => <ProgramSessionCard key={`${day.id}-${session.title}`} session={session} />)
        ) : (
          <div className="programme-empty-state">
            <ProgrammeTypePill
              label={programmeFilterItems.find((item) => item.key === activeFilter)?.label ?? 'All'}
              type={activeFilter}
            />
            <p>No highlighted sessions in this filter for {day.day}. View all to see the full programme preview.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function ProgramTrackConnection() {
  return (
    <section className="editorial-section section-shell programme-track-connection">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">How the Programme Connects to Your Pass</p>
          <h2>Your pass shapes the workshop focus inside the wider convention journey.</h2>
        </div>
      </div>

      <div className="track-comparison">
        {programmeTrackConnection.map((item) => (
          <article className={`track-card ticket-card ${item.accent}`} key={item.title}>
            <div className="track-card-copy">
              <span className={`track-label ${item.accent} sticker-badge`}>{item.title}</span>
              <p className="pass-price">US$130</p>
              <p className="track-summary">{item.copy}</p>
              <div className="track-chip-list">
                {item.focus.map((focus) => (
                  <span className="track-chip" key={focus}>
                    {focus}
                  </span>
                ))}
              </div>
              <a className="primary-btn wide-btn" href={item.ctaHref} rel="noreferrer" target="_blank">
                {item.cta}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProgramFAQ() {
  return (
    <section className="editorial-section section-shell programme-faq">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Programme FAQ</p>
          <h2>Quick answers before the full schedule is released.</h2>
        </div>
      </div>

      <div className="programme-faq-list">
        {programmeFaqItems.map((item) => (
          <details className="programme-faq-item" key={item.question}>
            <summary>
              <span className="programme-faq-dot" />
              {item.question}
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function ProgramCTA() {
  return (
    <section className="programme-final-cta">
      <div aria-hidden="true" className="confetti-field programme-cta-confetti" />
      <div className="programme-final-copy">
        <p className="section-kicker">Final CTA</p>
        <h2>Plan Your 3-Day BICC Journey.</h2>
        <p>
          Choose your pass, follow the programme flow and prepare for three days of training, exchange, performance and community connection in Tawau, Sabah.
        </p>
      </div>
      <div className="final-cta-actions">
        <a className="primary-btn" href="/passes">
          Get Your Pass
        </a>
        <a className="secondary-btn" href="/workshops">
          View Workshops
        </a>
      </div>
    </section>
  )
}

function ProgrammePage() {
  const [activeFilter, setActiveFilter] = useState<ProgrammeFilterKey>('all')

  return (
    <main className="programme-page">
      <ProgrammeHero />
      <ProgramAtAGlance />

      <section className="editorial-section section-shell programme-dayflow">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Day-by-Day Programme</p>
            <h2>Explore the expected convention flow.</h2>
          </div>
          <p className="section-intro">
            Detailed times, rooms and final session assignments will be announced closer to the convention.
          </p>
        </div>

        <DayTabs />
        <ProgramFilters activeFilter={activeFilter} onChange={setActiveFilter} />

        <div className="programme-dayflow-list">
          {programmeDays.map((day) => (
            <ProgramTimeline activeFilter={activeFilter} day={day} key={day.id} />
          ))}
        </div>
      </section>

      <ProgramTrackConnection />
      <ProgramFAQ />
      <ProgramCTA />
    </main>
  )
}

function VenueHero() {
  return (
    <section className="venue-hero section-shell">
      <div aria-hidden="true" className="spotlight-glow venue-spotlight" />
      <div aria-hidden="true" className="confetti-field venue-confetti" />
      <div className="venue-hero-copy">
        <p className="section-kicker">Venue & Visitor Guide</p>
        <div className="venue-hero-title-row">
          <h1>Find Your Way in Borneo.</h1>
          <span className="programme-ticket-badge">Official Delegate Venue Guide</span>
        </div>
        <p className="venue-hero-intro">
          BICC 2026 gathers at {venueInfo.venueName} in {venueInfo.city}, {venueInfo.region}. This guide covers the building, arrival flow and essentials.
        </p>
        <div className="event-badges programme-hero-badges">
          <span>{venueInfo.city}, {venueInfo.region}</span>
          <span>Aug 3–5, 2026</span>
          <span>Delegate Registration</span>
          <span>Workshop Floors</span>
        </div>
        <div className="hero-actions programme-hero-actions">
          <a className="primary-btn" href="/passes">
            Get Your Pass
          </a>
          <a className="secondary-btn" href="/programme">
            View Programme
          </a>
        </div>
      </div>

      <div className="venue-hero-visual">
        <div className="venue-map-poster image-frame">
          <img alt="Calvary Crown aerial exterior view" className="venue-real-photo" src={calvaryCrownAerialImage} />
          <div className="venue-map-grid" />
          {venueMapPins.slice(0, 4).map((pin) => (
            <span
              className={`venue-map-pin ${pin.type}`}
              key={pin.label}
              style={{ top: pin.top, left: pin.left }}
            >
              <span className="venue-map-pin-dot" />
              <span>{pin.label}</span>
            </span>
          ))}
          <div className="venue-hero-card">
            <strong>{venueInfo.venueName}</strong>
            <span>{venueInfo.address}</span>
          </div>
          <article className="venue-blueprint-card">
            <img alt="Tawau town map reference" src={calvaryCrownPlanImage} />
            <span>Tawau town map</span>
          </article>
        </div>
        <article className="venue-floating-photo top">
          <img alt="Calvary Crown exterior and city context" src={calvaryCrownAerialImage} />
          <span>Calvary Crown exterior</span>
        </article>
      </div>
    </section>
  )
}

function VenueQuickFacts() {
  return (
    <section className="editorial-section section-shell venue-facts">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Venue at a Glance</p>
          <h2>The essentials most delegates want first.</h2>
        </div>
      </div>

      <div className="venue-facts-grid">
        {venueQuickFacts.map((item) => (
          <article className={`venue-fact-card ${item.tone}`} key={item.title}>
            <span className="venue-fact-icon">{item.icon}</span>
            <div className="venue-fact-copy">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <small>{item.note}</small>
            </div>
            {item.comingSoon ? <span className="venue-coming-soon">Coming Soon</span> : null}
          </article>
        ))}
      </div>
    </section>
  )
}

function VenueMap() {
  return (
    <section className="editorial-section section-shell venue-map-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Venue Map</p>
          <h2>Find registration, workshop rooms and key delegate zones at a glance.</h2>
        </div>
        <p className="section-intro">Reception, learning floors and shared halls in one view.</p>
      </div>

      <div className="venue-map-shell">
        <div className="venue-map-illustration">
          <img alt="Calvary Crown aerial site context" className="venue-real-photo" src={calvaryCrownAerialImage} />
          <div className="venue-map-grid large" />
          <div className="venue-building-spine" />
          <div className="venue-building-stack">
            {calvaryCrownLevels
              .slice()
              .reverse()
              .map((level) => (
                <div className={`venue-building-level ${level.type}`} key={`stack-${level.level}`}>
                  <span>{level.level.replace('Level ', 'L')}</span>
                </div>
              ))}
          </div>
          {venueMapPins.map((pin) => (
            <span
              className={`venue-map-pin ${pin.type}`}
              key={`${pin.label}-full`}
              style={{ top: pin.top, left: pin.left }}
            >
              <span className="venue-map-pin-dot" />
              <span>{pin.label}</span>
            </span>
          ))}
          <div className="venue-building-plaque">
            <span className="venue-building-plaque-kicker">Calvary Crown</span>
            <strong>{venueInfo.buildingStoreys}-storey venue guide</strong>
            <small>{venueInfo.city}, {venueInfo.region}</small>
          </div>
          <div className="venue-map-overlay-note">
            <strong>{venueInfo.venueName} delegate map coming soon</strong>
            <span>Room assignments, route overlays and BICC zone labels will be updated before the event.</span>
          </div>
          <article className="venue-blueprint-card map">
            <img alt="Tawau town map reference" src={calvaryCrownPlanImage} />
            <span>Tawau context map</span>
          </article>
        </div>

        <div className="venue-map-directory">
          <div className="venue-map-directory-head">
            <p className="section-kicker">Floor Directory</p>
            <h3>How the building is stacked.</h3>
            <p>
              A practical guide to the known floor mix. Final BICC room assignments will be layered onto this closer to the event.
            </p>
            <div className="venue-directory-meta">
              <span>{venueInfo.buildingStoreys} storeys</span>
              <span>Completed {venueInfo.completedYear}</span>
              <span>Taman Setia, Mile 3</span>
            </div>
          </div>

          <div className="venue-map-level-list">
            {calvaryCrownLevels
              .slice()
              .reverse()
              .map((level) => (
                <article className={`venue-map-level-card ${level.type}`} key={`directory-${level.level}`}>
                  <div className="venue-map-level-top">
                    <div className="venue-map-level-identity">
                      <span className="venue-map-level-number">{level.level.replace('Level ', 'L')}</span>
                      <span className="calvary-level-label">{level.level}</span>
                    </div>
                    <ProgrammeTypePill label={level.use} type={level.type} />
                  </div>
                  <h4>{level.title}</h4>
                  <p>{level.copy}</p>
                </article>
              ))}
          </div>

          <div className="section-cta venue-map-cta">
            <span className="secondary-btn">Official Map Coming Soon</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function DelegateArrivalFlow() {
  return (
    <section className="editorial-section section-shell venue-arrival">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">How to Arrive and Check In</p>
          <h2>A simple step-by-step guide for the delegate arrival experience.</h2>
        </div>
      </div>

      <div className="venue-arrival-flow">
        {arrivalSteps.map((step, index) => (
          <article className="venue-arrival-step" key={step.title}>
            <span className="venue-arrival-number">{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function GettingToTawau() {
  return (
    <section className="editorial-section section-shell venue-practical-guide">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Plan Your Visit</p>
          <h2>The practical details people actually need before arriving.</h2>
        </div>
      </div>

      <div className="venue-practical-grid">
        {practicalGuideCards.map((card) => (
          <article className="venue-travel-card" key={card.title}>
            <span className="venue-fact-icon">{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
            <span className="venue-coming-soon neutral">{card.note}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function VenueFAQ() {
  return (
    <section className="editorial-section section-shell programme-faq">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Venue FAQ</p>
          <h2>Short answers for first-time delegates.</h2>
        </div>
      </div>

      <div className="programme-faq-list">
        {venueFaqItems.map((item) => (
          <details className="programme-faq-item" key={item.question}>
            <summary>
              <span className="programme-faq-dot" />
              {item.question}
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function VenueCTA() {
  return (
    <section className="venue-final-cta">
      <div aria-hidden="true" className="confetti-field venue-cta-confetti" />
      <div className="programme-final-copy">
        <p className="section-kicker">Final CTA</p>
        <h2>Ready to Gather in Borneo?</h2>
        <p>
          Plan your arrival, choose your pass and prepare for three days of workshops, exchange, performance and community connection in Tawau, Sabah.
        </p>
      </div>
      <div className="final-cta-actions">
        <a className="primary-btn" href="/passes">
          Get Your Pass
        </a>
        <a className="secondary-btn" href="/programme">
          View Programme
        </a>
        <a className="secondary-btn" href="/visit-tawau">
          Visit Tawau
        </a>
      </div>
    </section>
  )
}

function VenuePage() {
  return (
    <main className="venue-page">
      <VenueHero />
      <VenueQuickFacts />
      <VenueMap />
      <DelegateArrivalFlow />
      <GettingToTawau />
      <VenueFAQ />
      <VenueCTA />
    </main>
  )
}

function VisitTawauHero() {
  return (
    <section className="visit-hero section-shell">
      <div aria-hidden="true" className="confetti-field visit-confetti" />
      <div className="visit-hero-copy">
        <p className="section-kicker">Visit Tawau</p>
        <h1>Come for BICC. Stay for Tawau.</h1>
        <p>
          Discover the food, nature, culture and local warmth of Tawau, a coastal city in Sabah where your convention journey becomes a true Borneo experience.
        </p>
        <div className="hero-actions">
          <a className="primary-btn" href={visitTawauPartnerLink} rel="noreferrer" target="_blank">
            Plan Your Visit
          </a>
          <a className="secondary-btn" href="/programme">
            View BICC Programme
          </a>
        </div>
      </div>

      <div className="visit-hero-visual image-frame">
        <img alt="Tawau city and Borneo destination atmosphere" src={calvaryCrownAerialImage} />
        <div className="visit-brand-overlay">
          <span>BICC 2026 Destination Guide</span>
          <strong>Tawau, Sabah</strong>
        </div>
      </div>

      <div className="visit-hero-facts">
        {visitTawauHeroFacts.map((fact) => (
          <article className={`visit-fact-card ${fact.tone}`} key={fact.title}>
            <h3>{fact.title}</h3>
            <p>{fact.copy}</p>
          </article>
        ))}
      </div>

      <nav className="visit-jump-bar" aria-label="Visit Tawau guide sections">
        <a href="#visit-food">Food</a>
        <a href="#visit-stay">Stay</a>
        <a href="#visit-transport">Transport</a>
        <a href="#visit-things">Things To Do</a>
        <a href={visitTawauPartnerLink} rel="noreferrer" target="_blank">
          Travel Partner
        </a>
      </nav>

      <p className="visit-official-note">
        Visitor information is provided as a planning guide. Hotel, tour and transport bookings are managed directly by delegates or appointed travel partners unless BICC announces an official arrangement.
      </p>
    </section>
  )
}

function VisitFoodSection() {
  return (
    <section className="editorial-section section-shell visit-section" id="visit-food">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Food</p>
          <h2>Food That Feels Like Tawau</h2>
        </div>
        <p className="section-intro">
          Tawau is known for local flavours, seafood, kopitiam culture and comforting street food. Between workshops and convention sessions, enjoy the city through its food.
        </p>
      </div>

      <div className="visit-food-picks">
        <strong>First-time Tawau food picks</strong>
        <div className="pass-focus-chips">
          {firstTimeTawauFoodPicks.map((pick) => (
            <span key={pick}>{pick}</span>
          ))}
        </div>
      </div>

      <div className="visit-food-grid">
        {tawauFoodCards.map((card) => (
          <a className="visit-photo-card visit-food-link-card" href={`#food-${card.id}`} key={card.title}>
            <div className={`visit-photo-media ${card.tone}`}>
              <img alt={card.title} src={card.image} />
              <small>{card.meta}</small>
              <span>{card.title}</span>
            </div>
            <div className="visit-card-copy">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <strong>View food ideas</strong>
              <small>{card.credit}</small>
            </div>
          </a>
        ))}
      </div>

      <div className="visit-food-guide">
        <div className="visit-food-guide-head">
          <p className="section-kicker">Tawau Food Guide</p>
          <h3>A scalable food directory for delegates</h3>
          <p>
            Start with these food ideas, then expand the guide as more local recommendations are confirmed. Exact restaurant choices can be checked with your hotel, local hosts or the BICC travel partner.
          </p>
        </div>

        <div className="visit-food-category-grid">
          {tawauFoodCards.map((card) => (
            <article className="visit-food-category-card" id={`food-${card.id}`} key={`guide-${card.id}`}>
              <strong>{card.title}</strong>
              <span>{card.bestTime}</span>
              <p>{card.whereToStart}</p>
            </article>
          ))}
        </div>

        <div className="visit-food-filter-row" aria-label="Food directory filters">
          {tawauFoodFilterItems.map((filter) => (
            <a href={`#food-directory-${slugify(filter)}`} key={filter}>
              {filter}
            </a>
          ))}
        </div>

        <div className="visit-food-directory-grid">
          {tawauFoodDirectory.map((item) => (
            <article
              className="visit-food-directory-card"
              id={`food-directory-${slugify(item.category)}`}
              key={item.name}
            >
              <img alt={item.name} src={item.image} />
              <div>
                <span>{item.category}</span>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <small>{item.bestFor}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function VisitStaySection() {
  return (
    <section className="editorial-section section-shell visit-section" id="visit-stay">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Stay</p>
          <h2>Where to Stay</h2>
        </div>
        <p className="section-intro">
          Choose a stay that fits your convention rhythm: close to the venue, easy for transport and comfortable after a full day of learning, performance and networking.
        </p>
      </div>

      <div className="visit-info-grid">
        {tawauStayCards.map((card) => (
          <article className="venue-fact-card soft-aqua" key={card.title}>
            <span className="venue-fact-icon">{card.icon}</span>
            <div className="venue-fact-copy">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="visit-note">
        Official hotel partners and recommended delegate options will be updated once confirmed. BICC does not manage hotel bookings unless official hotel partners are announced.
      </p>

      <div className="visit-hotel-panel">
        <div className="visit-hotel-panel-head">
          <p className="section-kicker">Tawau Hotel Samples</p>
          <h3>Popular names to start your accommodation search.</h3>
          <p>
            These are sample Tawau hotel references for planning only. They are not listed as official BICC hotel partners unless confirmed by the organizer.
          </p>
        </div>

        <div className="visit-hotel-grid">
          {tawauHotelSamples.map((hotel) => (
            <a className="visit-hotel-card" href={hotel.link} key={hotel.name} rel="noreferrer" target="_blank">
              <div className="visit-hotel-image">
                <img alt={`${hotel.name} in Tawau`} src={hotel.image} />
                <span>{hotel.tag}</span>
              </div>
              <div className="visit-hotel-copy">
                <span>{hotel.fit}</span>
                <h4>{hotel.name}</h4>
                <p>{hotel.area}</p>
                <small>{hotel.note}</small>
                <strong>View on map</strong>
                <em>{hotel.credit}</em>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="visit-tip-strip">
        {tawauDelegateTips.map((tip) => (
          <span key={tip}>{tip}</span>
        ))}
      </div>
    </section>
  )
}

function VisitGettingAroundSection() {
  return (
    <section className="visit-route-band section-shell" id="visit-transport">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Getting Around</p>
          <h2>Getting Around Tawau</h2>
        </div>
        <p className="section-intro">
          Tawau is easy to navigate with proper planning. Arrange airport transfers, hotel transport or local ride options before arrival.
        </p>
      </div>

      <div className="visit-route-line" aria-label="Suggested visitor route">
        {tawauRouteSteps.map((step, index) => (
          <div className="visit-route-step" key={step}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>

      <p className="visit-route-note">
        International delegates should check flight connections into Tawau before booking hotels. Final BICC travel notes will be updated closer to the convention.
      </p>

      <div className="visit-info-grid">
        {tawauTransportCards.map((card) => (
          <article className="venue-fact-card soft-yellow" key={card.title}>
            <span className="venue-fact-icon">{card.icon}</span>
            <div className="venue-fact-copy">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="section-cta">
        <a className="primary-btn" href="mailto:hello@bicc2026.com?subject=BICC%202026%20Travel%20Help">
          Need Travel Help? Contact BICC Team
        </a>
      </div>
    </section>
  )
}

function VisitThingsToDoSection() {
  return (
    <section className="editorial-section section-shell visit-section" id="visit-things">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Things To Do</p>
          <h2>Things To Do in Tawau</h2>
        </div>
        <p className="section-intro">
          Beyond the convention, Tawau offers nature, food, local markets, cocoa heritage and quiet Borneo charm.
        </p>
      </div>

      <div className="visit-things-grid">
        {tawauThingsToDoCards.map((card) => (
          <article className="visit-photo-card" key={card.title}>
            <div className={`visit-photo-media ${card.tone}`}>
              <img alt={card.title} src={card.image} />
              <small>{card.tag}</small>
              <span>{card.title}</span>
            </div>
            <div className="visit-card-copy">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <small>{card.credit}</small>
            </div>
          </article>
        ))}
      </div>

      <div className="section-cta">
        <a className="secondary-btn" href="/programme">
          Explore Tawau Between Sessions
        </a>
      </div>
    </section>
  )
}

function VisitTawauCTA() {
  return (
    <section className="visit-final-cta">
      <div className="programme-final-copy">
        <p className="section-kicker">Borneo Experience</p>
        <h2>Make BICC 2026 Your Borneo Experience</h2>
        <p>Join us in Tawau for learning, laughter, connection and a journey beyond the convention hall.</p>
      </div>
      <div className="final-cta-actions">
        <a className="primary-btn" href={visitTawauPartnerLink} rel="noreferrer" target="_blank">
          Plan with Travel Partner
        </a>
        <a className="primary-btn" href="/passes">
          Get Your Pass
        </a>
        <a className="secondary-btn" href="/programme">
          View Programme
        </a>
      </div>
    </section>
  )
}

function VisitTawauPage() {
  return (
    <main className="visit-page">
      <VisitTawauHero />
      <VisitFoodSection />
      <VisitStaySection />
      <VisitGettingAroundSection />
      <VisitThingsToDoSection />
      <VisitTawauCTA />
    </main>
  )
}

function ContactPage() {
  const contactCards = [
    {
      title: 'Delegate Support',
      copy: 'Passes, track selection, payment follow-up and arrival questions.',
      cta: 'Email Delegate Support',
      href: 'mailto:hello@bicc2026.com?subject=BICC%202026%20Delegate%20Support',
      tone: 'soft-aqua',
      external: false,
    },
    {
      title: 'Sponsors & Partnerships',
      copy: 'Sponsorship deck, CSR ideas, tourism partnerships and brand visibility.',
      cta: 'Request Partnership Info',
      href: 'mailto:hello@bicc2026.com?subject=BICC%202026%20Partnership%20Inquiry',
      tone: 'soft-coral',
      external: false,
    },
    {
      title: 'Travel & Visitor Help',
      copy: 'Tawau planning, travel partner support and visitor guide questions.',
      cta: 'Plan With Travel Partner',
      href: visitTawauPartnerLink,
      tone: 'soft-yellow',
      external: true,
    },
    {
      title: 'Media & General',
      copy: 'Official questions, media requests and general convention enquiries.',
      cta: 'Contact BICC',
      href: 'mailto:hello@bicc2026.com?subject=BICC%202026%20General%20Inquiry',
      tone: 'soft-green',
      external: false,
    },
  ] as const

  return (
    <main className="contact-page">
      <section className="contact-hero section-shell">
        <div className="contact-hero-copy">
          <p className="section-kicker">Contact BICC 2026</p>
          <h1>Need help with passes, travel, sponsorship or the convention?</h1>
          <p>
            Reach the BICC team through the right channel so your question can move quickly to the people handling registration, partnerships or visitor planning.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="mailto:hello@bicc2026.com?subject=BICC%202026%20Inquiry">
              Email BICC Team
            </a>
            <a className="secondary-btn" href="/faq">
              View FAQ
            </a>
          </div>
        </div>

        <aside className="contact-official-card">
          <span className="programme-ticket-badge">Official Contact</span>
          <h2>hello@bicc2026.com</h2>
          <p>Use official BICC links and channels for pass updates, programme changes and venue information.</p>
        </aside>
      </section>

      <section className="editorial-section section-shell contact-grid-section">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Choose the right desk</p>
            <h2>Send your question to the right place.</h2>
          </div>
          <p>Short, direct routes for delegates, international visitors, partners and media.</p>
        </div>
        <div className="contact-card-grid">
          {contactCards.map((card) => (
            <article className={`contact-card ${card.tone}`} key={card.title}>
              <span className="red-nose-dot" aria-hidden="true" />
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <a href={card.href} rel={card.external ? 'noreferrer' : undefined} target={card.external ? '_blank' : undefined}>
                {card.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-notice section-shell">
        <div>
          <p className="section-kicker">Before you write</p>
          <h2>Include the details that help us answer faster.</h2>
        </div>
        <div className="contact-check-grid">
          <span>Full name</span>
          <span>Pass or track</span>
          <span>Country / organisation</span>
          <span>Payment email if purchased</span>
        </div>
      </section>
    </main>
  )
}

const generalFaqItems = [
  {
    question: 'Where should I ask general questions?',
    answer: 'Email hello@bicc2026.com or use the Contact page so the BICC team can route your enquiry.',
  },
  {
    question: 'How do I match my Stripe payment with my delegate details?',
    answer:
      'After payment, submit your delegate details and include the email used for your Stripe receipt so the organiser can match the purchase with your selected pass.',
  },
  {
    question: 'Will there be a programme PDF?',
    answer:
      'The programme preview is available on the website. An official PDF can be added once final times, rooms and mentor allocations are confirmed.',
  },
  {
    question: 'Are hotel and travel bookings handled by BICC?',
    answer:
      'Delegates should arrange hotels, flights and local travel directly unless BICC announces an official partner arrangement.',
  },
] as const

const faqGroups = [
  { title: 'General', items: generalFaqItems },
  { title: 'Passes & Registration', items: passFaqItems },
  { title: 'Workshops', items: workshopFaqItems },
  { title: 'Programme', items: programmeFaqItems },
  { title: 'Venue & Visit', items: venueFaqItems },
] as const

function FAQPage() {
  return (
    <main className="faq-page">
      <section className="faq-hero section-shell">
        <div>
          <p className="section-kicker">BICC FAQ</p>
          <h1>Quick answers before you join BICC 2026.</h1>
          <p>
            A practical guide for delegates, international visitors, mentors, sponsors and families planning for Tawau, Sabah.
          </p>
        </div>
        <div className="hero-actions">
          <a className="primary-btn" href="/passes">
            Get Your Pass
          </a>
          <a className="secondary-btn" href="/contact">
            Contact BICC
          </a>
        </div>
      </section>

      <section className="editorial-section section-shell faq-index">
        {faqGroups.map((group) => (
          <a href={`#faq-${slugify(group.title)}`} key={`faq-link-${group.title}`}>
            {group.title}
          </a>
        ))}
      </section>

      {faqGroups.map((group) => (
        <section className="editorial-section section-shell faq-group" id={`faq-${slugify(group.title)}`} key={group.title}>
          <div className="section-head single">
            <div>
              <p className="section-kicker">{group.title}</p>
              <h2>{group.title} questions</h2>
            </div>
          </div>
          <div className="programme-faq-list">
            {group.items.map((item) => (
              <details className="programme-faq-item" key={`${group.title}-${item.question}`}>
                <summary>
                  <span className="programme-faq-dot" />
                  {item.question}
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

function LanguagesPage() {
  const languageGuides = [
    {
      id: 'english',
      label: 'English',
      title: 'Main Site Language',
      headline: 'BICC 2026 is presented primarily in English.',
      copy:
        'The full website, pass information, programme preview and visitor guide are maintained in English for international delegates and partners.',
      points: ['Official website language', 'International delegate information', 'Programme and pass details'],
      cta: 'Back to Home',
      href: '/',
      tone: 'soft-aqua',
    },
    {
      id: 'chinese',
      label: '简体中文',
      title: '中文速览',
      headline: '婆罗洲国际小丑大会 2026 将在沙巴斗湖举行。',
      copy:
        '这是一个为小丑演员、教育工作者、舞台表演者、家庭娱乐者和国际参与者而设的三天大会，内容包括工作坊、导师交流、演出展示、社区连接和斗湖体验。',
      points: ['日期：2026年8月3日至5日', '地点：马来西亚沙巴斗湖', '通行证：Foundation / Mastery，US$130'],
      cta: '查看通行证',
      href: '/passes',
      tone: 'soft-coral',
    },
    {
      id: 'malay',
      label: 'Bahasa Melayu',
      title: 'Ringkasan BM',
      headline: 'BICC 2026 berlangsung di Tawau, Sabah.',
      copy:
        'Konvensyen tiga hari ini menghimpunkan artis badut, penghibur, pendidik dan komuniti melalui bengkel, persembahan, pertukaran budaya dan pengalaman destinasi Borneo.',
      points: ['Tarikh: 3-5 Ogos 2026', 'Lokasi: Tawau, Sabah, Malaysia', 'Pas: Foundation / Mastery, US$130'],
      cta: 'Lihat Pas',
      href: '/passes',
      tone: 'soft-yellow',
    },
  ] as const

  return (
    <main className="languages-page">
      <section className="languages-hero section-shell">
        <div>
          <p className="section-kicker">Language Support</p>
          <h1>English main site, with Chinese and Malay quick guides.</h1>
          <p>
            BICC is an international convention rooted in Sabah. These quick guides help delegates, families, local partners and visitors understand the essentials before they explore the full English site.
          </p>
        </div>
        <div className="language-quick-links" aria-label="Language quick links">
          {languageGuides.map((guide) => (
            <a href={`#${guide.id}`} key={`language-link-${guide.id}`}>
              {guide.label}
            </a>
          ))}
        </div>
      </section>

      <section className="editorial-section section-shell language-grid-section">
        <div className="language-guide-grid">
          {languageGuides.map((guide) => (
            <article className={`language-guide-card ${guide.tone}`} id={guide.id} key={guide.id}>
              <span className="language-label">{guide.label}</span>
              <p className="section-kicker">{guide.title}</p>
              <h2>{guide.headline}</h2>
              <p>{guide.copy}</p>
              <div className="language-point-list">
                {guide.points.map((point) => (
                  <span key={`${guide.id}-${point}`}>{point}</span>
                ))}
              </div>
              <a className="secondary-btn" href={guide.href}>
                {guide.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-notice section-shell language-notice">
        <div>
          <p className="section-kicker">Translation Roadmap</p>
          <h2>Next step: translate the highest-conversion pages first.</h2>
        </div>
        <div className="contact-check-grid">
          <span>Passes</span>
          <span>Programme</span>
          <span>Visit Tawau</span>
          <span>Contact & FAQ</span>
        </div>
      </section>
    </main>
  )
}

function AdminPage() {
  return (
    <main className="admin-page">
      <section className="contact-hero section-shell">
        <div className="contact-hero-copy">
          <p className="section-kicker">Content Admin</p>
          <h1>Manage BICC content through Sanity Studio.</h1>
          <p>
            Sanity will become the editing dashboard for page content, images, mentors, sponsors, FAQ, workshops and Visit Tawau listings.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="http://localhost:3333" rel="noreferrer" target="_blank">
              Open Local Studio
            </a>
            <a className="secondary-btn" href="https://www.sanity.io/manage" rel="noreferrer" target="_blank">
              Manage Sanity Project
            </a>
          </div>
        </div>

        <aside className="contact-official-card">
          <span className="programme-ticket-badge">CMS Setup</span>
          <h2>Run npm run studio</h2>
          <p>After adding your Sanity project ID in `.env.local`, this command opens the content dashboard locally.</p>
        </aside>
      </section>

      <section className="editorial-section section-shell contact-grid-section">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Editable Content</p>
            <h2>What the backend will manage.</h2>
          </div>
          <p>The content models are ready for multilingual editing and image uploads.</p>
        </div>
        <div className="contact-card-grid">
          {[
            ['Page Content', 'Hero text, section text, CTA labels and page images.'],
            ['Mentors', 'Profile photo, country, role, bio, specialties and featured status.'],
            ['Visit Tawau', 'Food, hotels, transport, attractions, links, maps and photos.'],
            ['Sponsors & FAQ', 'Partner logos, sponsor groups, questions and answers.'],
          ].map(([title, copy]) => (
            <article className="contact-card soft-aqua" key={title}>
              <span className="red-nose-dot" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-notice section-shell">
        <div>
          <p className="section-kicker">Before Launch</p>
          <h2>Connect the Sanity project ID, then publish the Studio.</h2>
        </div>
        <div className="contact-check-grid">
          <span>Create Sanity project</span>
          <span>Fill `.env.local`</span>
          <span>Run `npm run studio`</span>
          <span>Deploy Studio</span>
        </div>
      </section>
    </main>
  )
}

function SponsorHero() {
  return (
    <section className="sponsors-hero section-shell">
      <div aria-hidden="true" className="spotlight-glow passes-spotlight" />
      <div aria-hidden="true" className="confetti-field passes-confetti" />
      <div className="passes-hero-copy sponsor-hero-copy">
        <p className="section-kicker">Sponsors & Partnerships</p>
        <div className="passes-hero-title-row">
          <h1>Partner with BICC 2026.</h1>
          <span className="programme-ticket-badge">Official Partnership Opportunities</span>
        </div>
        <p className="passes-hero-intro">
          Put your brand at the heart of performance, culture, tourism and community impact.
        </p>
        <div className="event-badges programme-hero-badges">
          <span>International Convention</span>
          <span>Family & Community Reach</span>
          <span>Sabah / Tawau Destination Event</span>
        </div>
        <div className="hero-actions programme-hero-actions">
          <a className="primary-btn" href="mailto:hello@bicc2026.com?subject=BICC%202026%20Sponsorship%20Deck%20Request">
            Request Sponsorship Deck
          </a>
          <a className="secondary-btn" href="mailto:hello@bicc2026.com?subject=BICC%202026%20Partnership%20Inquiry">
            Talk to Partnership Team
          </a>
        </div>
      </div>

      <div className="sponsors-hero-visual">
        <div className="sponsors-hero-main image-frame">
          <img alt="BICC performance and audience engagement" src={clownDuoImage} />
        </div>
        <article className="programme-floating-card top">
          <img alt="Interactive clown performance" src={clownShowImage} />
          <span>Stage visibility</span>
        </article>
        <article className="programme-floating-card bottom">
          <img alt="Hands-on workshop" src={clownStageImage} />
          <span>Workshop engagement</span>
        </article>
      </div>
    </section>
  )
}

function SponsorTrustStrip() {
  return (
    <section className="editorial-section section-shell sponsor-trust-strip">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Official Support & Current Partners</p>
          <h2>Official support, visible from the start.</h2>
        </div>
      </div>

      <div className="sponsor-support-groups">
        {sponsorSupportGroups.map((group) => (
          <article className="sponsor-support-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="sponsor-support-grid">
              {group.items.map((item) => (
                <span className="sponsor-logo-card" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function SponsorWhySection() {
  return (
    <section className="editorial-section section-shell sponsor-why-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Why Sponsor BICC?</p>
          <h2>Clear reasons a sponsor can understand quickly.</h2>
        </div>
      </div>

      <div className="sponsor-value-grid">
        {sponsorValueCards.map((card) => (
          <article className={`venue-fact-card ${card.tone}`} key={card.title}>
            <span className="venue-fact-icon">{card.icon}</span>
            <div className="venue-fact-copy">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function SponsorOpportunities() {
  return (
    <section className="editorial-section section-shell sponsor-opportunities-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Sponsorship Opportunities</p>
          <h2>Clear ways different brands can participate.</h2>
        </div>
        <p className="section-intro">Different partners should be able to spot where they fit right away.</p>
      </div>

      <div className="sponsor-opportunity-grid">
        {sponsorOpportunityCards.map((card, index) => (
          <article className="sponsor-opportunity-card" key={card.title}>
            <span className="sponsor-opportunity-index">0{index + 1}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function SponsorPackages() {
  return (
    <section className="editorial-section section-shell sponsor-packages-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Sponsorship Packages</p>
          <h2>Simple tiers that invite inquiry.</h2>
        </div>
      </div>

      <div className="sponsor-package-grid">
        {sponsorPackageCards.map((card) => (
          <article className="sponsor-package-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <ul className="pass-mini-list">
              {card.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <a className="secondary-btn wide-btn" href="mailto:hello@bicc2026.com?subject=BICC%202026%20Package%20Details%20Request">
              Request Package Details
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

function SponsorCTA() {
  return (
    <section className="sponsor-final-cta">
      <div aria-hidden="true" className="confetti-field venue-cta-confetti" />
      <div className="programme-final-copy">
        <p className="section-kicker">Final CTA</p>
        <h2>Let’s build a joyful partnership.</h2>
        <p>
          Whether your goal is brand visibility, CSR impact, tourism promotion or community engagement, BICC 2026 offers meaningful partnership opportunities.
        </p>
      </div>
      <div className="sponsor-final-grid">
        <div className="final-cta-actions sponsor-cta-actions">
          <a className="primary-btn" href="mailto:hello@bicc2026.com?subject=BICC%202026%20Sponsorship%20Deck%20Request">
            Request Sponsorship Deck
          </a>
          <a className="secondary-btn" href="mailto:hello@bicc2026.com?subject=BICC%202026%20Partnership%20Call%20Request">
            Schedule a Partnership Call
          </a>
        </div>

        <div className="sponsor-contact-panel">
          <div className="sponsor-contact-card">
            <strong>Email</strong>
            <span>hello@bicc2026.com</span>
          </div>
          <div className="sponsor-contact-card muted">
            <strong>WhatsApp</strong>
            <span>Official number can be added here</span>
          </div>
          <div className="sponsor-contact-card muted">
            <strong>Sponsorship Form</strong>
            <span>QR and online form can be added here</span>
          </div>
          <div className="sponsor-inquiry-checklist">
            <strong>Include these details in your inquiry:</strong>
            <div className="pass-focus-chips">
              {sponsorInquiryFields.map((field) => (
                <span key={field}>{field}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SponsorsPage() {
  return (
    <main className="sponsors-page">
      <SponsorHero />
      <SponsorTrustStrip />
      <SponsorWhySection />
      <SponsorOpportunities />
      <SponsorPackages />
      <SponsorCTA />
    </main>
  )
}

function DecorativeBarcode() {
  return (
    <div aria-hidden="true" className="decorative-barcode">
      {Array.from({ length: 18 }).map((_, index) => (
        <span key={index} style={{ height: `${50 + (index % 5) * 10}%` }} />
      ))}
    </div>
  )
}

function PassHero() {
  return (
    <section className="passes-hero section-shell">
      <div aria-hidden="true" className="spotlight-glow passes-spotlight" />
      <div aria-hidden="true" className="confetti-field passes-confetti" />
      <div className="passes-hero-copy">
        <p className="section-kicker">Passes & Registration</p>
        <div className="passes-hero-title-row">
          <h1>Choose the Pass That Fits You.</h1>
          <span className="programme-ticket-badge">Official Convention Registration</span>
        </div>
        <p className="passes-hero-intro">
          Foundation is for newer performers building confidence. Mastery is for experienced performers ready for sharper stage work and critique.
        </p>
        <div className="event-badges programme-hero-badges">
          <span>Aug 3–5, 2026</span>
          <span>Tawau, Sabah</span>
          <span>2 Workshop Tracks</span>
          <span>US$130</span>
        </div>
        <div className="hero-actions programme-hero-actions">
          <a className="primary-btn" href="#choose-pass">
            Choose Your Pass
          </a>
          <a className="secondary-btn" href="#pass-compare">
            Compare Tracks
          </a>
        </div>
      </div>

      <div className="passes-hero-visual">
        {passes.map((pass) => (
          <article className={`pass-badge-mockup ${pass.accent}`} key={`hero-${pass.id}`}>
            <div className="pass-badge-top">
              <span className={`track-label ${pass.accent}`}>{pass.shortName}</span>
              <span className="pass-badge-city">Tawau, Sabah</span>
            </div>
            <h3>BICC 2026</h3>
            <p>{pass.label}</p>
            <div className="pass-badge-meta">
              <span>Delegate</span>
              <span>Aug 3–5, 2026</span>
            </div>
            <DecorativeBarcode />
            <RedNoseIcon />
          </article>
        ))}
      </div>
    </section>
  )
}

function PassComparisonCards() {
  return (
    <section className="editorial-section section-shell pass-comparison-section" id="choose-pass">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Two Passes. One Shared Convention.</p>
          <h2>Choose the pass that fits where you are right now.</h2>
        </div>
        <p className="section-intro">Same convention. Different training level.</p>
      </div>

      <div className="pass-ticket-grid">
        {passes.map((pass) => (
          <article className={`pass-ticket-card ${pass.accent}`} id={`${pass.id}-pass`} key={pass.id}>
            <div className="ticket-perforation" />
            <div className="pass-ticket-media">
              <img
                alt={pass.name}
                src={pass.accent === 'foundation' ? clownStageImage : clownShowImage}
              />
            </div>
            <div className="pass-ticket-body">
              <div className="pass-ticket-head">
                <span className={`track-label ${pass.accent}`}>{pass.shortName}</span>
                <span className="pass-ticket-badge">{pass.badge}</span>
              </div>
              <h3>{pass.shortName}</h3>
              <p className="pass-price">{pass.price}</p>
              <p className="pass-ticket-description">{pass.body}</p>
              <p className="pass-ticket-audience">
                <strong>Best for:</strong> {pass.bestFor.join(', ')}.
              </p>
              <div className="pass-focus-chips">
                {pass.includes.slice(0, 4).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="pass-ticket-actions">
                <a className="primary-btn wide-btn" href={pass.ctaHref} rel="noreferrer" target="_blank">
                  {pass.cta}
                </a>
                <a className="text-link" href={pass.workshopHref}>
                  View {pass.shortName.replace(' Pass', '')} Workshops
                </a>
              </div>
              <small className="pass-ticket-note">Track access subject to organizer confirmation.</small>
            </div>
          </article>
        ))}
      </div>

      <div className="pass-unsure-note compact">
        <strong>Quick guide:</strong>
        <p>Choose Foundation if you are newer to clowning. Choose Mastery if you already perform and want stronger critique.</p>
        <a className="text-link" href="/workshops">
          View Workshop Tracks
        </a>
      </div>
    </section>
  )
}

function PassIncludedSection() {
  return (
    <section className="editorial-section section-shell pass-included-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">What Your Pass Gives You</p>
          <h2>The essentials most delegates want to know.</h2>
        </div>
        <p className="section-intro">
          This is the expected BICC pass structure, with final details shared by the organizer closer to the convention.
        </p>
      </div>

      <div className="pass-included-grid">
        {passIncludedItems.map((item) => (
          <article className={`venue-fact-card ${item.tone}`} key={item.title}>
            <span className="venue-fact-icon">{item.icon}</span>
            <div className="venue-fact-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PassDecisionGuide() {
  return (
    <section className="editorial-section section-shell pass-decision-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Which Pass Is Right for You?</p>
          <h2>Pick the path that matches your current level.</h2>
        </div>
      </div>

      <div className="pass-decision-grid">
        {passes.map((pass) => (
          <article className={`pass-decision-card ${pass.accent}`} key={`decision-${pass.id}`}>
            <div className="pass-decision-head">
              <span className={`track-label ${pass.accent}`}>{pass.shortName}</span>
              <h3>{pass.accent === 'foundation' ? 'Choose Foundation if you…' : 'Choose Mastery if you…'}</h3>
            </div>
            <ul className="pass-mini-list">
              {pass.decisionBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="pass-unsure-note">
        <strong>Still unsure?</strong>
        <p>
          If this is your first BICC or your first serious clown training, start with Foundation. If you already perform regularly, Mastery is usually the better fit.
        </p>
        <a className="text-link" href="/programme">
          See the 3-day flow
        </a>
      </div>
    </section>
  )
}

function PassRegistrationFlow() {
  return (
    <section className="editorial-section section-shell pass-registration-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">How Registration Works</p>
          <h2>A simple path from choosing to arriving.</h2>
        </div>
      </div>

      <div className="pass-registration-flow">
        {passRegistrationSteps.map((step, index) => (
          <article className="venue-arrival-step" key={step.title}>
            <span className="venue-arrival-number">{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="section-cta left">
        <a className="text-link" href="/delegate-details?track=foundation">
          Already paid? Complete Delegate Details
        </a>
      </div>
    </section>
  )
}

function PassFAQ() {
  return (
    <section className="editorial-section section-shell programme-faq">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Pass FAQ</p>
          <h2>Short answers before you register.</h2>
        </div>
      </div>

      <div className="programme-faq-list">
        {passFaqItems.map((item) => (
          <details className="programme-faq-item" key={item.question}>
            <summary>
              <span className="programme-faq-dot" />
              {item.question}
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function PassCTA() {
  return (
    <section className="pass-final-cta">
      <div aria-hidden="true" className="confetti-field venue-cta-confetti" />
      <div className="programme-final-copy">
        <p className="section-kicker">Final CTA</p>
        <h2>Ready to Choose Your Pass?</h2>
        <p>
          Join BICC 2026 in Tawau, Sabah for three days of training, exchange and live performance growth.
        </p>
      </div>
      <div className="final-cta-actions">
        <a className="primary-btn" href={passes[0].ctaHref} rel="noreferrer" target="_blank">
          Get Foundation Pass
        </a>
        <a className="primary-btn" href={passes[1].ctaHref} rel="noreferrer" target="_blank">
          Get Mastery Pass
        </a>
        <a className="secondary-btn" href="/programme">
          View Programme
        </a>
      </div>
    </section>
  )
}

function PassesPage() {
  return (
    <main className="passes-page">
      <PassHero />
      <PassIncludedSection />
      <PassComparisonCards />
      <PassDecisionGuide />
      <PassRegistrationFlow />
      <PassFAQ />
      <PassCTA />
    </main>
  )
}

function RegistrationConfirmedPage() {
  const track = getTrackFromSearch(window.location.search)
  const pass = getPassByTrack(track)

  return (
    <main className="registration-page">
      <section className="registration-hero section-shell">
        <div aria-hidden="true" className="spotlight-glow venue-spotlight" />
        <div aria-hidden="true" className="confetti-field venue-confetti" />
        <div className="registration-hero-copy">
          <p className="section-kicker">Registration Confirmed</p>
          <h1>Thank you for securing your BICC pass.</h1>
          <p className="page-intro">
            Your payment step is complete. The next thing we need is your delegate details so the BICC team can match your payment, selected track and future programme updates.
          </p>
          <div className="event-badges">
            <span>{pass.shortName}</span>
            <span>{pass.price}</span>
            <span>Aug 3–5, 2026</span>
            <span>Tawau, Sabah</span>
          </div>
          <div className="hero-actions">
            <a className="primary-btn" href={`/delegate-details?track=${track}`}>
              Complete Delegate Details
            </a>
            <a className="secondary-btn" href="/programme">
              View Programme
            </a>
          </div>
        </div>

        <aside className="registration-status-card">
          <span className={`track-label ${pass.accent}`}>{pass.shortName}</span>
          <h2>What to do next</h2>
          <ol className="registration-checklist">
            <li>Save your Stripe receipt or payment confirmation.</li>
            <li>Complete your delegate details form for BICC.</li>
            <li>Watch for official updates about programme, venue and check-in.</li>
          </ol>
          <p className="registration-note">
            If you reached this page after payment, you are on the right track. If your Stripe link currently returns elsewhere, update its success URL in Stripe to this page later.
          </p>
        </aside>
      </section>

      <section className="editorial-section section-shell registration-steps-panel">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Delegate Flow</p>
            <h2>The post-payment steps are simple.</h2>
          </div>
        </div>

        <div className="registration-steps-grid">
          <article className="venue-fact-card soft-aqua">
            <span className="venue-fact-icon">1</span>
            <div className="venue-fact-copy">
              <h3>Payment complete</h3>
              <p>Your pass purchase is done through Stripe.</p>
            </div>
          </article>
          <article className="venue-fact-card soft-coral">
            <span className="venue-fact-icon">2</span>
            <div className="venue-fact-copy">
              <h3>Send delegate details</h3>
              <p>Tell BICC who you are, which track you selected and how to reach you.</p>
            </div>
          </article>
          <article className="venue-fact-card soft-yellow">
            <span className="venue-fact-icon">3</span>
            <div className="venue-fact-copy">
              <h3>Receive updates</h3>
              <p>Programme, venue and arrival details will follow through official communication.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

function DelegateDetailsPage() {
  const track = getTrackFromSearch(window.location.search)
  const [form, setForm] = useState<DelegateFormState>({
    fullName: '',
    email: '',
    paymentEmail: '',
    whatsapp: '',
    country: '',
    organisation: '',
    track,
    role: 'Performer',
    notes: '',
  })
  const [isDraftReady, setIsDraftReady] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem(delegateFormStorageKey)
      if (!savedDraft) {
        setIsDraftReady(true)
        return
      }

      const parsed = JSON.parse(savedDraft) as Partial<DelegateFormState>
      setForm((current) => ({
        ...current,
        ...parsed,
        track,
      }))
    } catch {
      window.localStorage.removeItem(delegateFormStorageKey)
    } finally {
      setIsDraftReady(true)
    }
  }, [track])

  useEffect(() => {
    if (!isDraftReady) return
    window.localStorage.setItem(delegateFormStorageKey, JSON.stringify(form))
  }, [form, isDraftReady])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setStatusMessage(null)
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatusMessage('Your email app should open with the delegate details prepared for hello@bicc2026.com.')
    window.location.href = buildDelegateMailto(form)
  }

  const handleCopyDetails = async () => {
    try {
      await navigator.clipboard.writeText(buildDelegateSummary(form))
      setStatusMessage('Delegate details copied. You can paste them into an email to hello@bicc2026.com if needed.')
    } catch {
      setStatusMessage('Copy was not available in this browser. You can still use “Send Details to BICC” to open your email app.')
    }
  }

  const handleClearDraft = () => {
    window.localStorage.removeItem(delegateFormStorageKey)
    setForm({
      fullName: '',
      email: '',
      paymentEmail: '',
      whatsapp: '',
      country: '',
      organisation: '',
      track,
      role: 'Performer',
      notes: '',
    })
    setStatusMessage('Saved draft cleared.')
  }

  const selectedPass = getPassByTrack(form.track)

  return (
    <main className="registration-page">
      <section className="registration-hero section-shell delegate-form-shell">
        <div className="registration-hero-copy">
          <p className="section-kicker">Delegate Details</p>
          <h1>Complete your BICC delegate details.</h1>
          <p className="page-intro">
            Use this simple form so the BICC team can match your payment with your selected track and send you the right updates before the convention.
          </p>
          <div className="event-badges">
            <span>{selectedPass.shortName}</span>
            <span>{selectedPass.price}</span>
            <span>International Delegate</span>
            <span>Official BICC Contact Flow</span>
          </div>
        </div>

        <aside className="registration-status-card delegate-aside">
          <span className={`track-label ${selectedPass.accent}`}>{selectedPass.shortName}</span>
          <h2>What this form covers</h2>
          <ul className="registration-checklist bullets">
            <li>Your name and contact details</li>
            <li>Your selected Foundation or Mastery track</li>
            <li>Your role or practice background</li>
            <li>Any note the organizer should know before arrival</li>
          </ul>
          <p className="registration-note">
            Submitting this form opens your email app with the details prepared for the BICC team.
          </p>
          <div className="registration-helper-box">
            <strong>Organizer email</strong>
            <span>hello@bicc2026.com</span>
          </div>
        </aside>
      </section>

      <section className="editorial-section section-shell delegate-form-section">
        <form className="delegate-form" onSubmit={handleSubmit}>
          <div className="delegate-form-grid">
            <label className="delegate-field">
              <span>Full Name</span>
              <input name="fullName" onChange={handleChange} required type="text" value={form.fullName} />
            </label>

            <label className="delegate-field">
              <span>Email</span>
              <input name="email" onChange={handleChange} required type="email" value={form.email} />
            </label>

            <label className="delegate-field">
              <span>Stripe Receipt / Payment Email</span>
              <input
                name="paymentEmail"
                onChange={handleChange}
                placeholder="If different from your main email"
                type="email"
                value={form.paymentEmail}
              />
            </label>

            <label className="delegate-field">
              <span>WhatsApp / Phone</span>
              <input name="whatsapp" onChange={handleChange} type="text" value={form.whatsapp} />
            </label>

            <label className="delegate-field">
              <span>Country</span>
              <input name="country" onChange={handleChange} required type="text" value={form.country} />
            </label>

            <label className="delegate-field">
              <span>Organisation / Group</span>
              <input name="organisation" onChange={handleChange} type="text" value={form.organisation} />
            </label>

            <label className="delegate-field">
              <span>Selected Track</span>
              <select name="track" onChange={handleChange} value={form.track}>
                <option value="foundation">Foundation Pass</option>
                <option value="mastery">Mastery Pass</option>
              </select>
            </label>

            <label className="delegate-field">
              <span>Your Role</span>
              <select name="role" onChange={handleChange} value={form.role}>
                <option value="Performer">Performer</option>
                <option value="Educator">Educator</option>
                <option value="Student">Student</option>
                <option value="Community Worker">Community Worker</option>
                <option value="Family Entertainer">Family Entertainer</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="delegate-field full-width">
              <span>Notes</span>
              <textarea
                name="notes"
                onChange={handleChange}
                placeholder="Anything the organizer should know before BICC 2026."
                rows={5}
                value={form.notes}
              />
            </label>
          </div>

          {statusMessage ? <p className="delegate-form-status">{statusMessage}</p> : null}

          <div className="delegate-form-actions">
            <button className="primary-btn" type="submit">
              Send Details to BICC
            </button>
            <button className="secondary-btn" onClick={handleCopyDetails} type="button">
              Copy Details
            </button>
            <button className="text-button" onClick={handleClearDraft} type="button">
              Clear Saved Draft
            </button>
            <a className="secondary-btn" href="/passes">
              Back to Passes
            </a>
          </div>
        </form>
      </section>
    </main>
  )
}

function WorkshopHero() {
  return (
    <section className="workshops-hero section-shell">
      <div aria-hidden="true" className="spotlight-glow passes-spotlight" />
      <div aria-hidden="true" className="confetti-field passes-confetti" />
      <div className="passes-hero-copy">
        <p className="section-kicker">Workshops & Training</p>
        <div className="passes-hero-title-row">
          <h1>Build Real Clown Practice.</h1>
          <span className="programme-ticket-badge">Focused Workshop Learning</span>
        </div>
        <p className="passes-hero-intro">
          Build stronger clown technique through practical training in performance, character, visual play and audience connection.
        </p>
        <div className="event-badges programme-hero-badges">
          <span>3 Days</span>
          <span>2 Workshop Tracks</span>
          <span>Practical Training</span>
          <span>Tawau, Sabah</span>
        </div>
        <div className="hero-actions programme-hero-actions">
          <a className="primary-btn" href="/passes">
            Get Your Pass
          </a>
          <a className="secondary-btn" href="/passes#pass-compare">
            Compare Tracks
          </a>
        </div>
      </div>

      <div className="workshops-hero-visual">
        <div className="workshop-collage-main image-frame">
          <img alt="Hands-on clown workshop training" src={clownHeroImage} />
        </div>
        <article className="workshop-hero-sidecard">
          <span className="workshop-hero-sidecard-label">Training Focus</span>
          <strong>Stage craft, visual play, outreach and live audience connection.</strong>
        </article>
        <article className="programme-floating-card top">
          <img alt="Workshop practice" src={clownStageImage} />
          <span>Practice & props</span>
        </article>
      </div>
    </section>
  )
}

function TrackSelector() {
  return (
    <section className="editorial-section section-shell workshop-track-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Choose the Workshop Path That Fits Your Stage.</p>
          <h2>Choose the path that fits your current stage.</h2>
        </div>
      </div>

      <div className="pass-ticket-grid">
        {passes.map((pass) => (
          <article className={`pass-ticket-card workshop-track-ticket ${pass.accent}`} key={`workshop-track-${pass.id}`}>
            <div className="ticket-perforation" />
            <div className="pass-ticket-media">
              <img alt={pass.name} src={pass.accent === 'foundation' ? clownStageImage : clownShowImage} />
            </div>
            <div className="pass-ticket-body">
              <div className="pass-ticket-head">
                <span className={`track-label ${pass.accent}`}>{pass.accent === 'foundation' ? 'Foundation' : 'Mastery'}</span>
                <span className="pass-ticket-badge">{pass.badge}</span>
              </div>
              <h3>{pass.accent === 'foundation' ? 'Foundation Track' : 'Mastery Track'}</h3>
              <p className="pass-price">{pass.price}</p>
              <p className="pass-ticket-description">{pass.body}</p>
              <div className="workshop-track-note">
                <strong>{pass.accent === 'foundation' ? 'Training feel' : 'Advanced focus'}</strong>
                <span>{pass.learningStyle}</span>
              </div>
              <div>
                <strong>Best for</strong>
                <ul className="pass-mini-list">
                  {pass.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="pass-focus-chips">
                {pass.includes.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="workshop-track-footer">
                <span>3-day convention track</span>
                <span>{pass.accent === 'foundation' ? 'Build core craft' : 'Sharpen stage identity'}</span>
              </div>
              <a className="primary-btn wide-btn" href={pass.ctaHref} rel="noreferrer" target="_blank">
                {pass.cta}
              </a>
            </div>
          </article>
        ))}
      </div>

      <a className="text-link" href="/passes#pass-compare">
        Compare Foundation & Mastery Tracks
      </a>
    </section>
  )
}

function WorkshopCatalogue() {
  return (
    <section className="editorial-section section-shell workshop-catalogue-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Workshop Catalogue</p>
          <h2>Hands-on sessions designed to help you create, connect, perform and serve.</h2>
        </div>
      </div>

      <div className="workshop-catalogue-grid">
        {workshopCards.map((workshop) => (
          <article className={`workshop-card ${workshop.featured ? 'featured' : ''} ${workshop.trackType}`} key={workshop.id}>
            <div className="workshop-card-media">
              <img alt={workshop.title} src={workshop.image} />
            </div>
            <div className="workshop-card-copy">
              <div className="workshop-card-top">
                <ProgrammeTypePill label={workshop.track} type={workshop.trackType} />
                <span className="workshop-included-label">Included in Pass</span>
              </div>
              {workshop.featured ? <p className="workshop-feature-kicker">Featured hands-on session</p> : null}
              <h3>{workshop.title}</h3>
              <p>{workshop.description}</p>
              <strong>Who it is for</strong>
              <p>{workshop.forWhom}</p>
              <div className="pass-focus-chips">
                {workshop.outcomes.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function WorkshopSchedulePreview() {
  return (
    <section className="editorial-section section-shell workshop-rhythm-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Workshop Rhythm</p>
          <h2>Workshops sit inside the wider 3-day BICC journey.</h2>
        </div>
        <p className="section-intro">Training, exchange and showcase moments across three days.</p>
      </div>

      <div className="programme-journey-grid">
        {workshopSchedulePreview.map((item) => (
          <article className="timeline-card" key={item.day}>
            <span className="track-label red">{item.day}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <a className="text-link" href="/programme">
        View Full Programme
      </a>
    </section>
  )
}

function WorkshopFAQ() {
  return (
    <section className="editorial-section section-shell programme-faq">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Workshop FAQ</p>
          <h2>Short answers before you choose your track.</h2>
        </div>
      </div>

      <div className="programme-faq-list">
        {workshopFaqItems.map((item) => (
          <details className="programme-faq-item" key={item.question}>
            <summary>
              <span className="programme-faq-dot" />
              {item.question}
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function WorkshopCTA() {
  return (
    <section className="workshop-final-cta">
      <div aria-hidden="true" className="confetti-field venue-cta-confetti" />
      <div className="programme-final-copy">
        <p className="section-kicker">Final CTA</p>
        <h2>Ready to Build Your Clown Practice?</h2>
        <p>
          Join BICC 2026 and train with artists who understand laughter as craft, connection and community impact.
        </p>
        <span className="workshop-cta-meta">3 Days · 2 Tracks · International Training · Tawau, Sabah</span>
      </div>
      <div className="workshop-cta-ticket">
        <span className="workshop-cta-ticket-label">Official workshop access</span>
        <strong>Foundation or Mastery</strong>
        <p>Choose the track that matches your current stage, then arrive ready to practice, receive feedback and perform with purpose.</p>
      </div>
      <div className="final-cta-actions">
        <a className="primary-btn foundation-btn" href={passes[0].ctaHref} rel="noreferrer" target="_blank">
          Get Foundation Pass
        </a>
        <a className="primary-btn" href={passes[1].ctaHref} rel="noreferrer" target="_blank">
          Get Mastery Pass
        </a>
        <a className="secondary-btn" href="/passes#pass-compare">
          Compare Tracks
        </a>
      </div>
    </section>
  )
}

function WorkshopsPage() {
  return (
    <main className="workshops-page">
      <WorkshopHero />
      <TrackSelector />
      <WorkshopCatalogue />
      <WorkshopSchedulePreview />
      <WorkshopFAQ />
      <WorkshopCTA />
    </main>
  )
}

function MentorPlaceholderArt({ label }: { label: string }) {
  const initials = label
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div aria-hidden="true" className="mentor-placeholder-art">
      <span>{initials}</span>
    </div>
  )
}

function MentorHero() {
  return (
    <section className="mentor-page-hero section-shell">
      <div className="mentor-hero-copy">
        <p className="section-kicker">Mentors & Guest Artists</p>
        <h1>Meet the Artists Leading BICC.</h1>
        <p className="passes-hero-intro">
          Meet the performers, teachers and guest artists joining BICC 2026 from Malaysia, Asia and beyond.
        </p>
        <div className="event-badges programme-hero-badges">
          <span>International Guest Artists</span>
          <span>Workshop Mentors</span>
          <span>Creative Exchange</span>
        </div>
        <div className="hero-actions programme-hero-actions">
          <a className="primary-btn" href="/workshops">
            View Workshops
          </a>
          <a className="secondary-btn" href="/passes">
            Get Your Pass
          </a>
        </div>
        <div className="mentor-hero-meta">
          <span>Malaysia • Asia • USA</span>
        </div>
      </div>

      <div className="mentor-hero-visual">
        <img alt="BICC mentor poster" className="mentor-hero-poster" src={mentorPosterImage} />
        <div aria-hidden="true" className="mentor-hero-overlay" />
        <span className="programme-ticket-badge mentor-hero-badge">International Mentor Line-up</span>
      </div>
    </section>
  )
}

function MentorCard({
  mentor,
  featured = false,
}: {
  mentor: MentorProfile
  featured?: boolean
}) {
  return (
    <article className={`mentor-lineup-card ${featured ? 'featured' : ''}`} data-mentor-id={mentor.id}>
      <div className="mentor-lineup-media">
        {mentor.image ? <img alt={`${mentor.name} portrait`} src={mentor.image} /> : <MentorPlaceholderArt label={mentor.name} />}
        <span className="mentor-card-flag">{featured ? 'Featured' : mentor.country}</span>
      </div>
      <div className="mentor-lineup-copy">
        <div className="mentor-lineup-badges">
          <span className="track-label red">{mentor.country}</span>
          <span className="mentor-role-pill">{mentor.role}</span>
        </div>
        <h3>{mentor.name}</h3>
        <p>{mentor.shortIntro}</p>
        <span className="mentor-lineup-region">{mentor.region}</span>
        <div className="pass-focus-chips">
          {mentor.specialties.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

function FeaturedMentors({ mentors }: { mentors: MentorProfile[] }) {
  const featuredMentors = mentors.filter((mentor) => mentor.featured).slice(0, 6)

  return (
    <section className="editorial-section section-shell mentor-featured-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Featured Mentors</p>
          <h2>A closer look at the artists helping shape the BICC 2026 learning and performance experience.</h2>
        </div>
        <p className="section-intro">Official bios and specialty details can be refined as materials are confirmed.</p>
      </div>

      <div className="mentor-featured-grid">
        {featuredMentors.map((mentor, index) => (
          <MentorCard featured={index === 0} key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </section>
  )
}

function MentorGrid({ mentors }: { mentors: MentorProfile[] }) {
  const [activeFilter, setActiveFilter] = useState<MentorFilterKey>('all')

  const filteredMentors = mentors.filter((mentor) => {
    if (mentor.featured) return false
    if (activeFilter === 'all') return true
    if (activeFilter === 'malaysia') return mentor.country === 'Malaysia'
    if (activeFilter === 'asia') return mentor.region === 'Asia' || mentor.country === 'Malaysia'
    if (activeFilter === 'usa') return mentor.country === 'USA'
    if (activeFilter === 'workshop-mentors') return mentor.role.includes('Workshop') || mentor.role.includes('Teaching')
    if (activeFilter === 'guest-artists') return mentor.role.includes('Guest Artist')
    return true
  })

  return (
    <section className="editorial-section section-shell mentor-grid-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Meet the Line-up</p>
          <h2>Explore more of the BICC 2026 mentors, performers and guest artists.</h2>
        </div>
      </div>

      <div className="mentor-filter-row" role="tablist" aria-label="Mentor filters">
        {mentorFilterItems.map((filter) => (
          <button
            aria-pressed={activeFilter === filter.key}
            className={`mentor-filter-pill ${activeFilter === filter.key ? 'active' : ''}`}
            key={filter.key}
            type="button"
            onClick={() => setActiveFilter(filter.key)}
          >
            <span className="mentor-filter-dot" />
            {filter.label}
          </button>
        ))}
      </div>
      <p className="mentor-directory-meta">{filteredMentors.length} mentors and guest artists shown.</p>

      <div className="mentor-directory-grid">
        {filteredMentors.map((mentor) => (
          <MentorCard key={`directory-${mentor.id}`} mentor={mentor} />
        ))}
      </div>
    </section>
  )
}

function MentorCTA() {
  return (
    <section className="mentor-page-cta">
      <div aria-hidden="true" className="confetti-field venue-cta-confetti" />
      <div className="programme-final-copy">
        <p className="section-kicker">Final CTA</p>
        <h2>Train With the BICC Mentors.</h2>
        <p>Join BICC 2026 and learn from artists who understand clowning as craft, connection, performance and community impact.</p>
      </div>
      <div className="final-cta-actions">
        <a className="primary-btn" href="/workshops">
          View Workshops
        </a>
        <a className="secondary-btn" href="/passes">
          Get Your Pass
        </a>
      </div>
    </section>
  )
}

function MentorsPage({ mentors = mentorLineup }: { mentors?: MentorProfile[] }) {
  return (
    <main className="mentors-page">
      <MentorHero />
      <FeaturedMentors mentors={mentors} />
      <MentorGrid mentors={mentors} />
      <MentorCTA />
    </main>
  )
}

function HomePage() {
  return (
    <main>
      <section className="hero-section section-shell hero-stage">
        <div aria-hidden="true" className="spotlight-glow" />
        <div aria-hidden="true" className="confetti-field hero-confetti" />
        <div aria-hidden="true" className="bunting-strip" />
        <div className="hero-copy">
          <div className="hero-eyebrow-row">
            <img alt="BICC 2026 official logo" className="hero-mini-logo" src={biccLogo} />
            <p className="hero-eyebrow">Borneo International Clown Convention 2026</p>
          </div>
          <div className="hero-title-block">
            <p className="hero-monogram">BICC 2026</p>
            <h1>
              Where Laughter Becomes <span className="hero-highlight">Legacy</span>.
            </h1>
          </div>
          <p className="hero-subheadline">
            A 3-day international clown convention in Borneo for performers, educators and creative communities seeking stronger craft and joyful live performance.
          </p>

          <div className="event-badges">
            <span>Aug 3–5, 2026</span>
            <span>Tawau, Sabah</span>
            <span>2 Workshop Tracks</span>
            <span>US$130</span>
          </div>

          <div className="hero-actions">
            <a className="primary-btn" href="/passes">
              Get Your Pass
            </a>
            <a className="secondary-btn" href="/programme">
              View Programme
            </a>
          </div>
          <a className="hero-compare-link text-link" href="/passes">
            Compare Foundation & Mastery Tracks
          </a>
        </div>

        <div className="hero-collage">
          <div className="hero-photo-frame hero-photo-main">
            <img alt="Joyful professional clown performer" src={clownHeroImage} />
            <SmileDoodle />
          </div>
          <article className="floating-photo training-shot">
            <img alt="Clown workshop training moment" src={clownStageImage} />
            <span>Workshop / Training</span>
          </article>
          <article className="floating-photo audience-shot">
            <img alt="Clown performance and audience moment" src={clownDuoImage} />
            <span>Performance / Audience</span>
          </article>
          <p className="hero-caption">Official Convention Magazine & Delegate Handbook</p>
        </div>
      </section>

      <section className="value-strip">
        {values.map((item, index) => (
          <article className={`value-card sticker-badge tone-${index + 1}`} key={item.title}>
            <RedNoseIcon />
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="editorial-section section-shell playful-band">
        <div className="story-layout">
          <div className="story-photo-frame">
            <img alt="Clown performer or mentor on stage" src={clownShowImage} />
            <span className="story-photo-tag">Performance / Culture / Connection</span>
          </div>

          <div className="story-copy">
            <p className="section-kicker">What Is BICC?</p>
            <h2>A convention for people who want practical growth, not just inspiration.</h2>
            <p className="section-intro">
              BICC brings together training, live performance, cultural exchange and community connection in one focused convention experience.
            </p>
            <div className="story-points">
              {storyFeatures.map((item) => (
                <article className="story-point" key={item.title}>
                  <RedNoseIcon />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="section-cta left">
              <a className="text-link" href="/about">
                Learn About BICC
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="passes-section editorial-section section-shell editorial-band ticket-band">
        <div aria-hidden="true" className="confetti-field pass-confetti" />
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Choose Your Track</p>
            <h2>Two Paths. One Price. Different Professional Needs.</h2>
          </div>
          <p className="section-intro">Foundation builds your base. Mastery sharpens a working act.</p>
        </div>

        <div className="track-comparison">
          {passes.map((pass, index) => (
            <article className={`track-card ticket-card ${pass.accent}`} key={pass.name}>
              <div className="track-card-media">
                <img
                  alt={pass.name}
                  src={index === 0 ? clownStageImage : clownDuoImage}
                />
              </div>
              <div className="track-card-copy">
                <span className={`track-label ${pass.accent} sticker-badge`}>{pass.name}</span>
                <p className="track-audience">{index === 0 ? 'For beginners, emerging performers, educators, students and teaching artists.' : 'For experienced performers, working clowns and stage artists ready for critique.'}</p>
                <p className="pass-price">{pass.price}</p>
                <p className="track-summary">{index === 0 ? 'Build confidence, character, timing and the physical clarity needed to hold an audience.' : 'Refine stage presence, strengthen your act and make sharper professional choices under real feedback.'}</p>
                <p className="track-value-line">{index === 0 ? 'Leave with stronger fundamentals, better audience connection and a more reliable performance base.' : 'Leave with sharper act structure, outside critique and a more polished professional identity.'}</p>
                <div className="track-chip-list">
                  {pass.includes.map((item) => (
                    <span className="track-chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <a className="primary-btn wide-btn" href="/passes">
                  {pass.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="pass-helper">
          <p>New to clowning or building confidence? Start with Foundation. Already performing for audiences? Choose Mastery.</p>
          <a className="text-link" href="/passes">
            Compare Tracks
          </a>
        </div>
      </section>

      <section className="editorial-section programme-strip section-shell patterned-band journey-band">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Programme Snapshot</p>
            <h2>3 Days. One Shared Journey.</h2>
          </div>
          <p className="section-intro">Fast to scan, easy to understand and built around a shared convention rhythm.</p>
        </div>

        <div className="timeline-strip">
          {programme.map((item) => (
            <article className="timeline-card" key={item.day}>
              <span className="timeline-dot" />
              <span className="track-label red">{item.day}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className="section-cta">
          <a className="secondary-btn" href="/programme">
            View Programme
          </a>
        </div>
      </section>

      <section className="editorial-section section-shell mentor-band">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Mentors & Performers</p>
            <h2>Learn From Artists Who Live The Stage.</h2>
          </div>
          <p className="section-intro">Mentors are selected for stage credibility, teaching clarity and real audience experience.</p>
        </div>

        <div className="mentor-preview-grid">
          {mentorPreviewCards.map((item, index) => (
            <article className={`mentor-preview-card ${index === 0 ? 'featured' : ''}`} key={item.title}>
              <div className="mentor-preview-image">
                <img alt={item.title} src={item.image} />
              </div>
              <div className="mentor-preview-copy">
                <span className="track-label red sticker-badge">{item.track}</span>
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
                <small>{item.note}</small>
              </div>
            </article>
          ))}
        </div>

        <div className="section-cta">
          <a className="secondary-btn" href="/mentors">
            View Mentors
          </a>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-copy">
          <p className="section-kicker">Final CTA</p>
          <h2>Ready To Join BICC 2026?</h2>
          <p>Choose the path that fits you and join a joyful international convention built for real growth, meaningful exchange and live performance in Borneo.</p>
          <div className="final-cta-actions">
            <a className="primary-btn" href={foundationPassPaymentLink} rel="noreferrer" target="_blank">
              Get Foundation Pass
            </a>
            <a className="secondary-btn" href={masteryPassPaymentLink} rel="noreferrer" target="_blank">
              Get Mastery Pass
            </a>
            <a className="secondary-btn" href="/programme">
              View Programme
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function InteriorPage({ path }: { path: RouteKey }) {
  const page = routeContent[path]

  return (
    <main className="interior-main">
      <section className="page-hero">
        <div className="page-hero-copy">
          <p className="section-kicker">{page.eyebrow}</p>
          <h1 className="page-title">{page.title}</h1>
          <p className="page-intro">{page.intro}</p>
          <div className="page-actions">
            <a className="primary-btn" href={page.primaryCta.href}>
              {page.primaryCta.label}
            </a>
            <a className="secondary-btn" href={page.secondaryCta.href}>
              {page.secondaryCta.label}
            </a>
          </div>
        </div>

        <aside className="page-aside">
          <SmileDoodle />
          <PatternCorner side="right" />
          <p className="page-aside-kicker">Editorial Note</p>
          <h2>{page.asideTitle}</h2>
          <p>{page.asideBody}</p>
        </aside>
      </section>

      <section className="editorial-section">
        <div className="section-head single">
          <div>
            <p className="section-kicker">Page Overview</p>
            <h2>Focused content for this part of the BICC site.</h2>
          </div>
        </div>

        <div className="page-card-grid">
          {page.cards.map((card) => (
            <article className="page-card" key={card.title}>
              <RedNoseIcon />
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      {path === '/passes' ? (
        <section className="editorial-section">
          <div className="section-head single">
            <div>
              <p className="section-kicker">Pass Comparison</p>
              <h2>The two pass options in full.</h2>
            </div>
          </div>
          {renderPassCards()}
        </section>
      ) : null}

      {path === '/programme' ? (
        <section className="editorial-section">
          <div className="section-head single">
            <div>
              <p className="section-kicker">Programme Flow</p>
              <h2>The convention journey at a glance.</h2>
            </div>
          </div>
          {renderProgrammeCards()}
        </section>
      ) : null}

      {path === '/workshops' ? (
        <section className="editorial-section">
          <div className="section-head single">
            <div>
              <p className="section-kicker">Workshop Preview</p>
              <h2>Examples of the learning focus across both tracks.</h2>
            </div>
          </div>
          <div className="page-card-grid workshop-page-grid">
            {workshopHighlights.map((item) => (
              <article className={`page-card accent-${item.accent}`} key={item.title}>
                <span className={`track-label ${item.accent}`}>{item.track}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="final-cta">
        <div className="final-cta-copy">
          <p className="section-kicker">Next Step</p>
          <h2>Return to the essentials or continue toward registration.</h2>
          <p>
            BICC 2026 is being shaped with a cleaner structure so each page can carry its own job while the homepage stays concise and conversion-focused.
          </p>
          <div className="final-cta-actions">
            <a className="secondary-btn" href="/">
              Back To Home
            </a>
            <a className="primary-btn" href="/passes">
              Get Pass
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <PatternCorner side="left" />
      <PatternCorner side="right" />

      <div className="footer-brand">
        <h3>
          Wear the <span>Red Nose.</span>
          <br />
          Share the Hope.
        </h3>
        <p>Official home of Borneo International Clown Convention 2026.</p>
        <SmileDoodle />
      </div>

      <div className="footer-column">
        <strong>BICC 2026</strong>
        <a href="/about">About</a>
        <a href="/programme">Programme</a>
        <a href="/workshops">Workshops</a>
      </div>

      <div className="footer-column">
        <strong>Passes</strong>
        <a href="/passes">Foundation Track Pass</a>
        <a href="/passes">Mastery Track Pass</a>
        <a href="/venue">Venue & Travel</a>
        <a href="/visit-tawau">Visit Tawau</a>
        <a href="/faq">FAQ</a>
        <a href="/admin">Admin</a>
      </div>

      <div className="footer-column">
        <strong>Sponsors</strong>
        <a href="/sponsors">Partners</a>
        <a href="/contact">Contact</a>
        <div className="social-row" aria-label="Social links">
          <span>f</span>
          <span>◎</span>
          <span>▶</span>
          <span>♪</span>
        </div>
      </div>

      <div className="footer-meta">
        <span>hello@bicc2026.com</span>
        <span>© 2026 Borneo International Clown Convention. All rights reserved.</span>
      </div>
    </footer>
  )
}

function App() {
  const currentPath = normalizePath(window.location.pathname)
  const [siteLanguage, setSiteLanguage] = useState<SiteLanguage>(getInitialLanguage)
  const [cmsMentors, setCmsMentors] = useState<MentorProfile[] | null>(null)
  const isHome = currentPath === '/'
  const isProgramme = currentPath === '/programme'
  const isWorkshops = currentPath === '/workshops'
  const isMentors = currentPath === '/mentors'
  const isPasses = currentPath === '/passes'
  const isVenue = currentPath === '/venue'
  const isVisitTawau = currentPath === '/visit-tawau'
  const isSponsors = currentPath === '/sponsors'
  const isContact = currentPath === '/contact'
  const isFaq = currentPath === '/faq'
  const isLanguages = currentPath === '/languages'
  const isAdmin = currentPath === '/admin'
  const isRegistrationConfirmed = currentPath === '/registration-confirmed'
  const isDelegateDetails = currentPath === '/delegate-details'
  const routePath = isHome ? null : (currentPath in routeContent ? (currentPath as RouteKey) : null)

  useEffect(() => {
    window.localStorage.setItem('bicc-site-language', siteLanguage)
    applyPageTranslations(siteLanguage)
  }, [siteLanguage, currentPath])

  useEffect(() => {
    let isActive = true

    async function loadCmsMentors() {
      try {
        const result = await fetchFromSanity<CmsMentor[]>(cmsQueries.mentors)
        if (!isActive || !result?.length) return
        setCmsMentors(mapCmsMentors(result, siteLanguage))
      } catch {
        if (isActive) setCmsMentors(null)
      }
    }

    loadCmsMentors()
    return () => {
      isActive = false
    }
  }, [siteLanguage])

  useEffect(() => {
    const handleInternalLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.origin)
      if (url.origin !== window.location.origin) return

      if (siteLanguage === 'en') {
        url.searchParams.delete('lang')
      } else {
        url.searchParams.set('lang', siteLanguage)
      }

      event.preventDefault()
      window.location.href = `${url.pathname}${url.search}${url.hash}`
    }

    document.addEventListener('click', handleInternalLinkClick)
    return () => document.removeEventListener('click', handleInternalLinkClick)
  }, [siteLanguage])

  const handleLanguageChange = (language: SiteLanguage) => {
    setSiteLanguage(language)
    const url = new URL(window.location.href)
    if (language === 'en') {
      url.searchParams.delete('lang')
    } else {
      url.searchParams.set('lang', language)
    }
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand-lockup" href="/">
          <img alt="BICC 2026 logo" className="brand-logo-image" src={biccLogo} />
          <div className="brand-text-lockup">
            <span className="brand-site-tag">Official Site</span>
            <div className="brand-logo-line">
              <span>BICC</span>
              <RedNoseIcon />
              <span>2026</span>
            </div>
            <small>Borneo International Clown Convention 2026</small>
          </div>
        </a>

        <nav className="main-nav">
          {navItems.map((item) => (
            <a className={currentPath === item.path ? 'active' : ''} href={item.path} key={item.path}>
              {item.label}
            </a>
          ))}
          <span className="language-switcher" data-no-translate>
            {languageOptions.map((option) => (
              <button
                aria-pressed={siteLanguage === option.code}
                className={siteLanguage === option.code ? 'active' : ''}
                key={option.code}
                onClick={() => handleLanguageChange(option.code)}
                type="button"
              >
                {option.shortLabel}
              </button>
            ))}
          </span>
        </nav>

        <a className="primary-btn header-cta" href="/passes">
          Get Pass
        </a>
      </header>

      {isHome ? (
        <HomePage />
      ) : isProgramme ? (
        <ProgrammePage />
      ) : isWorkshops ? (
        <WorkshopsPage />
      ) : isMentors ? (
        <MentorsPage mentors={cmsMentors || mentorLineup} />
      ) : isPasses ? (
        <PassesPage />
      ) : isVenue ? (
        <VenuePage />
      ) : isVisitTawau ? (
        <VisitTawauPage />
      ) : isSponsors ? (
        <SponsorsPage />
      ) : isContact ? (
        <ContactPage />
      ) : isFaq ? (
        <FAQPage />
      ) : isLanguages ? (
        <LanguagesPage />
      ) : isAdmin ? (
        <AdminPage />
      ) : isRegistrationConfirmed ? (
        <RegistrationConfirmedPage />
      ) : isDelegateDetails ? (
        <DelegateDetailsPage />
      ) : routePath ? (
        <InteriorPage path={routePath} />
      ) : (
        <InteriorPage path="/about" />
      )}

      <Footer />
    </div>
  )
}

export default App
