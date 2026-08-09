import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { cmsQueries, fetchFromSanity, localize, sanityImageUrl, type CmsMentor, type CmsPageContent } from './cms'
import { siteConfig } from './siteConfig'

const landingHeroPerformerImage = '/landing/home-hero-performer.jpg'
const landingWorkshopTrainingImage = '/landing/home-workshop-training.jpg'
const landingPerformanceAudienceImage = '/landing/home-performance-audience.jpg'
const landingStoryConnectionImage = '/landing/home-story-connection.jpg'
const landingFoundationTrackImage = '/landing/home-foundation-track.jpg'
const landingMasteryTrackImage = '/landing/home-mastery-track.jpg'
const landingProgrammeOpeningImage = '/landing/programme-opening-journey.jpg'
const landingWorkshopMagicImage = '/landing/workshop-magic-wonder.jpg'
const landingWorkshopOutreachImage = '/landing/workshop-community-outreach.jpg'
const landingWorkshopEducationImage = '/landing/workshop-educational-show.jpg'
const landingSponsorImpactImage = '/landing/sponsors-impact-story.jpg'
const passesRegistrationMomentImage = '/landing/passes-registration-moment.jpg'
const passesFoundationWorkshopImage = '/landing/passes-foundation-workshop.jpg'
const passesMasteryStageImage = '/landing/passes-mastery-stage.jpg'
const venueArrivalDelegatesImage = '/landing/venue-arrival-delegates.jpg'
const biccLogo = '/bicc-logo.webp'
const foundationPassPaymentLink = siteConfig.links.foundationPassPayment
const masteryPassPaymentLink = siteConfig.links.masteryPassPayment
const visitTawauPartnerLink = siteConfig.links.visitTawauPartner
const delegateFormStorageKey = siteConfig.storageKeys.delegateDetailsDraft
const publicBaseUrl = siteConfig.publicBaseUrl.replace(/\/+$/, '')
const defaultOgImage = `${publicBaseUrl}/og-image.jpg`

const heroParticipationCountries = [
  'Hong Kong',
  'Taiwan',
  'Japan',
  'India',
  'Singapore',
  'Indonesia',
  'Mexico',
  'USA',
  'Thailand',
  'China',
  'Myanmar',
] as const
const mentorPortraitUncleSunday = '/mentors/uncle-sunday.webp'
const mentorPortraitChagy = '/mentors/chagy.jpg'
const mentorPortraitUncleButton = '/mentors/uncle-button.jpg'
const mentorPortraitMrJohn = '/mentors/mr-john.jpg'
const mentorPortraitWatt = '/mentors/watt-de-clown.jpg'
const mentorPortraitZipper = '/mentors/zipper.jpg'
const mentorPortraitRandy = '/mentors/randy-christensen.jpg'
const mentorPortraitEdmund = '/mentors/edmund-khong.webp'
const mentorPortraitKosuke = '/mentors/kosuke-omune.webp'
const mentorPortraitTony = '/mentors/tony-lee.jpg'
const mentorPortraitJackie = '/mentors/jackie-newton.jpg'
const mentorPortraitKakYogi = '/mentors/kak-yogi-clown.webp'
const mentorPortraitPayaCocos = '/mentors/paya-cocos.webp'
const mentorPortraitFrankie = '/mentors/frankie-malachi.jpg'
const calvaryCrownAerialImage = '/calvary-scene.webp'
const calvaryCrownPlanImage = '/tawau-town-map.jpg'
const visitSeafoodImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/MakananLaut.jpg?width=1200'
const visitKopitiamImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Coffee%20shop%20zz.jpg?width=900'
const visitNasiKuningImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Nasi%20Kuning%20Tawau.jpg?width=900'
const visitWaterfrontImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Tawau%20-%20The%20City%20%2848869140708%29.jpg?width=1600'
const visitFoodCcCafeImage = '/visit-tawau/food-partners/cc-cafe.webp'
const visitFoodCalvaryCanteenImage = '/visit-tawau/food-partners/calvary-canteen.webp'
const visitFoodPateGrillImage = '/visit-tawau/food-partners/pate-grill.webp'
const visitFoodDojoImage = '/visit-tawau/food-partners/dojo.webp'
const visitFoodHansKopitiamImage = '/visit-tawau/food-partners/hans-kopitiam.webp'
const tawauGuidePasarTanjungImage = '/visit-tawau/things/tawau-guide-000.jpg'
const tawauGuideBalungCocosImage = '/visit-tawau/things/tawau-guide-002.jpg'
const tawauGuideForestImage = '/visit-tawau/things/tawau-guide-003.jpg'
const tawauGuideChesterMarketImage = '/visit-tawau/things/chester-night-market.webp'
const tawauGuideCocoaVillageImage = '/visit-tawau/things/teck-guan-cocoa-village.jpg'
const tawauGuideCocoaWaterfallImage = '/visit-tawau/things/teck-guan-waterfall.jpg'
const tawauGuideWaterfrontImage = '/visit-tawau/things/tawau-jawi-waterfront.webp'
const travelChanlivingImage = '/visit-tawau/travel/chanliving-smart-living.webp'
const travelBergosongImage = '/visit-tawau/travel/bergosong-eco-travel.webp'
const hotelAeroHomeSuiteImage = '/visit-tawau/hotels/aero-home-suite.jpg'
const hotelBluSentralImage = '/visit-tawau/hotels/blu-sentral-hotel.jpg'
const hotelBorneoRoyaleImage = '/visit-tawau/hotels/borneo-royale-hotel.jpg'
const hotelGraceHomestayImage = '/visit-tawau/hotels/grace-homestay.jpg'
const hotelUmiiImage = '/visit-tawau/hotels/umii-hotel.png'
const hotelUmiiHomestayImage = '/visit-tawau/hotels/umii-homestay.png'
const hotelEmasImage = '/visit-tawau/hotels/hotel-emas-tawau.jpg'

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
  officialBioUrl?: string
  sourceUrl?: string
  socialUrl?: string
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

const navGroups = [
  {
    label: 'Attend',
    items: [
      { label: 'Programme', path: '/programme' },
      { label: 'Workshops', path: '/workshops' },
      { label: 'Instructors', path: '/mentors' },
      { label: 'Passes', path: '/passes' },
    ],
  },
  {
    label: 'Visit',
    items: [
      { label: 'Venue', path: '/venue' },
      { label: 'Visit Tawau', path: '/visit-tawau' },
    ],
  },
  {
    label: 'Partner',
    items: [
      { label: 'Sponsors', path: '/sponsors' },
      { label: 'Contact', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
    ],
  },
] as const

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
    Instructors: '导师',
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
    'Travel Help': '旅行协助',
    All: '全部',
    Homestay: '民宿',
    'City Centre': '市中心',
    'Group-Friendly': '适合团队',
    Markets: '市集',
    Nature: '自然',
    Culture: '文化',
    'Easy Walks': '轻松步行',
    'Cafe / Group Dining': '咖啡馆 / 团体餐饮',
    'Venue / Local Food': '场地 / 本地美食',
    'Dinner / Group Meals': '晚餐 / 团体餐',
    'Casual Dining': '休闲餐饮',
    'Kopitiam / Breakfast': '咖啡店 / 早餐',
    Attend: '参加',
    Visit: '到访',
    Partner: '合作',
    'Travel Agencies': '旅行社',
    'Travel Agency': '旅行社',
    'Hotel / Homestay': '酒店 / 民宿',
    'Visitor Support': '访客支援',
    'Travel Support Partners': '旅行协助伙伴',
    'Plan with local travel support.': '通过本地旅行支援规划行程。',
    'Choose the support that fits your trip.': '选择适合你行程的旅行协助。',
    'Use this section to compare travel agencies and visitor support options for airport transfers, tours, hotels and group travel.':
      '在这里比较旅行社与访客支援选项，安排机场接送、旅游、酒店与团队行程。',
    'Compare confirmed visitor support partners for airport transfers, stays, local tours and convention-day questions.':
      '比较已确认的访客支援伙伴，安排机场接送、住宿、本地行程与大会期间问题。',
    'Find the right travel partner for your BICC trip.': '为你的 BICC 行程找到合适的旅行伙伴。',
    'Compare by support type, language and service.': '按协助类型、语言和服务比较。',
    'Planning route': '规划路线',
    'Travel partner directory': '旅行伙伴目录',
    Showing: '显示',
    partners: '个伙伴',
    'Agency directory': '旅行社目录',
    'Related visitor support': '相关访客支援',
    'Travel agency partners can be added here as they are confirmed.': '已确认的旅行社伙伴可以继续加在这里。',
    'Travel route support': '旅行路线支援',
    'Airport to hotel, venue and Tawau moments.': '从机场、酒店、会场到斗湖体验。',
    'A simple planning path for participants who want help beyond the convention venue.':
      '给需要大会场地以外协助的参与者，一个简单的行程规划路径。',
    'Choose the support that fits your arrival plan.': '选择适合你抵达计划的协助方式。',
    'Choose local support.': '选择本地协助。',
    'All partners are listed at the same level.': '所有伙伴以同等级目录呈现。',
    'All partners are listed at the same level. Please confirm pricing, availability and booking details directly with each provider.':
      '所有伙伴以同等级目录呈现。价格、名额与预订详情请直接向各服务方确认。',
    'Use the filters to find travel agency, stay support or official routing help.':
      '使用筛选找到旅行社、住宿协助或官方行程咨询。',
    'Compare confirmed visitor support partners in one clean directory.': '在一个清晰目录里比较已确认的访客支援伙伴。',
    'Travel partners are listed for visitor convenience. Please confirm pricing, availability and booking details directly with each provider.':
      '旅行伙伴资料仅供访客规划参考。价格、名额与预订详情请直接向各服务方确认。',
    'Mini travel desk': '旅行服务台',
    'Airport': '机场',
    'Hotel': '酒店',
    'Attractions': '景点',
    'Best for': '适合',
    'Languages': '语言',
    'Open JWV Now': '打开 JWV Now',
    'Open Chanliving': '打开 Chanliving',
    'Travel agency': '旅行社',
    'Travel partner': '旅行伙伴',
    'HotelHomestay': '酒店民宿',
    'Visitor support': '访客支援',
    'Convention visitor help': '大会访客协助',
    'Hotel / Homestay partner': '酒店 / 民宿伙伴',
    'Local Tawau travel planning before or after BICC.': 'BICC 前后斗湖本地行程规划。',
    'Airport transfers, day tours, hotel guidance and group arrivals.': '机场接送、一日游、酒店建议与团队抵达。',
    'Hotel and homestay booking option for extended Borneo routes.': '延伸婆罗洲路线的酒店与民宿预订选择。',
    'Visitors arranging stays around Semporna or regional travel.': '安排仙本那或周边行程住宿的访客。',
    'Smart Living Inn stay option in Semporna with simple booking support for extended Borneo routes.':
      '位于仙本那的 Smart Living Inn 住宿选择，适合延伸婆罗洲行程的简单预订安排。',
    'Delegates adding Semporna stays, island trips or family travel around BICC.':
      '适合在 BICC 前后安排仙本那住宿、岛屿行程或家庭旅行的参与者。',
    'Eco travel partner for Sebatik Island, mangrove routes, dolphin spotting and nature-based visitor experiences.':
      '生态旅行伙伴，提供 Sebatik Island、红树林路线、观海豚与自然体验行程。',
    'Delegates who want eco day trips, river cruises, overnight packages or a nature extension after BICC.':
      '适合想在 BICC 后安排生态一日游、河流巡游、过夜配套或自然延伸行程的参与者。',
    'Official routing help for convention visitor questions.': '大会访客问题的官方咨询入口。',
    'Participants unsure which travel partner to contact first.': '不确定应先联系哪位旅行伙伴的参与者。',
    'Visitor planning, local Tawau arrangements, day tours, transfers and group travel help.':
      '适合访客行程规划、斗湖本地安排、一日游、接送与团队旅行协助。',
    'Hotel and homestay booking support for delegates extending their Borneo trip around Semporna or regional stays.':
      '适合想延伸婆罗洲旅程、安排仙本那或周边住宿的参与者。',
    'Airport transfer': '机场接送',
    'Tawau day tours': '斗湖一日游',
    'Hotel guidance': '酒店建议',
    'Group travel': '团队旅行',
    'Homestay booking': '民宿预订',
    'Semporna stays': '仙本那住宿',
    'Room booking': '房间预订',
    'Family travel': '家庭旅行',
    'Island trip add-on': '岛屿行程加购',
    'Sebatik Island': 'Sebatik Island',
    'Eco day tours': '生态一日游',
    'Mangrove cruise': '红树林巡游',
    'Dolphin spotting': '观海豚',
    'Group stays': '团队住宿',
    'Direct booking': '直接预订',
    'General travel questions': '一般旅行问题',
    'Partner routing': '伙伴转介',
    'Visitor notes': '访客须知',
    'Convention-day planning': '大会当天规划',
    'Travel planning via Linktree': 'Linktree 行程规划',
    'Direct booking website': '直接预订网站',
    'Contact Bergosong Eco Travel': '联系 Bergosong Eco Travel',
    'Email BICC Team': '电邮 BICC 团队',
    'More travel partners can be added here once confirmed.': '更多已确认旅行伙伴可继续加在这里。',
    'Contact BICC': '联系 BICC',
    'View FAQ': '查看常见问题',
    'Foundation Pass': 'Foundation 通行证',
    'Mastery Pass': 'Mastery 通行证',
    'Foundation Track Pass': 'Foundation 课程通行证',
    'Mastery Track Pass': 'Mastery 课程通行证',
    'Foundation Workshop Pass': 'Foundation 工作坊通行证',
    'Mastery Workshop Pass': 'Mastery 工作坊通行证',
    'View Foundation Workshops': '查看 Foundation 工作坊',
    'View Mastery Workshops': '查看 Mastery 工作坊',
    'View Workshop Tracks': '查看工作坊课程',
    'Two Passes. One Shared Convention.': '两种通行证，一段共同大会体验。',
    'Pick your training track.': '选择你的训练课程。',
    'Same convention, same price. Choose by experience level.': '同一场大会，同一价格。请按经验阶段选择。',
    'For newer performers who want fundamentals, playful tools and stage confidence.':
      '适合想建立基础、玩乐工具与舞台信心的新晋表演者。',
    'For working performers ready for sharper timing, critique and stage command.':
      '适合准备提升节奏、接受反馈并强化舞台掌控的工作表演者。',
    'Track access subject to organizer confirmation.': '课程参与权限以主办方确认为准。',
    'Quick guide:': '快速建议：',
    'Choose track': '选择课程',
    'Foundation for new performers. Mastery for experienced performers.': '新手选择 Foundation；有经验的表演者选择 Mastery。',
    'Checkout safely': '安全付款',
    'Use the official Stripe button on the pass you choose.': '使用所选通行证上的官方 Stripe 按钮付款。',
    'Submit details': '提交资料',
    'Complete the participant form with your Stripe receipt email.': '用 Stripe 收据电邮填写参与者资料表。',
    'Newer performers choose Foundation. Working performers choose Mastery. After Stripe checkout, complete participant details with your receipt email.':
      '新手或正在建立基础的表演者选择 Foundation；已有演出经验者选择 Mastery。Stripe 付款后，请用收据电邮填写参与者资料。',
    'Official Stripe checkout': '官方 Stripe 付款',
    'Pay through the official BICC pass links.': '请通过 BICC 官方通行证链接付款。',
    'Same price, clear choice': '同一价格，清楚选择',
    'Foundation and Mastery are both US$190.': 'Foundation 与 Mastery 都是 US$190。',
    'Delegate / participant details after payment': '付款后填写参与者资料',
    'After Stripe checkout, submit your profile with the same receipt email.': 'Stripe 付款后，请用同一个收据电邮提交资料。',
    'Everything essential. Nothing confusing.': '只保留重点，清楚不复杂。',
    'A clear 3-day convention pass connected to your selected training track.': '一张清晰的三天大会通行证，连接你选择的训练课程。',
    'Final programme access, room assignments and any special activities follow official organiser confirmation.':
      '最终日程权限、房间安排与特别活动以主办方确认为准。',
    'Buy your pass. Then prepare for BICC.': '购买通行证，然后准备参加 BICC。',
    'Already paid? Complete Delegate / Participant Details': '已付款？填写参与者资料',
    'Build Your Professional Foundation': '建立你的专业基础',
    'Elevate Your Stage Performance': '提升你的舞台表现',
    'Where Laughter Becomes Legacy': '让欢笑成为传承',
    'A 3-day international gathering for clown artists, performers, educators and communities in Borneo.':
      '一场为小丑艺术家、表演者、教育工作者与社区而设的三天国际大会。',
    'Aug 3-5, 2026': '2026年8月3日至5日',
    'Aug 3–5, 2026': '2026年8月3日至5日',
    '2 Workshop Tracks': '两大工作坊课程',
    'US$190 Pass': 'US$190 通行证',
    'Choose Your Track': '选择你的课程',
    'Two Paths. One Price. Different Professional Needs.': '两条路径，同一价格，满足不同专业需求。',
    'Foundation Track': 'Foundation 课程',
    'Mastery Track': 'Mastery 课程',
    'Exchange Lab': '交流实验室',
    Showcase: '展示',
    'Delegate Info': '参与者资讯',
    'Participant Info': '参与者资讯',
    'All Participants': '所有参与者',
    'All Participants & Guests': '所有参与者与来宾',
    'Gala participants & guests': '晚会参与者与来宾',
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
    'Showcase & Community': '展示与社区',
    'Instructors & Guest Artists': '导师与嘉宾艺术家',
    'Learn From Artists Who Live the Stage.': '向真正活在舞台上的艺术家学习。',
    'Passes & Registration': '通行证与报名',
    'Choose Your BICC Pass.': '选择你的 BICC 通行证。',
    'Official Registration': '官方报名',
    'One convention. Two training paths. Pick Foundation if you are building confidence, or Mastery if you are ready for stronger stage critique.':
      '一场大会，两条训练路径。想建立信心请选择 Foundation；准备接受更强舞台反馈请选择 Mastery。',
    'Choose Your Pass. Start Your BICC Journey.': '选择通行证，开启你的 BICC 旅程。',
    'What Your Pass Gives You': '通行证包含什么',
    'Before You Register': '报名之前',
    'Which Pass Is Right for You?': '哪一种通行证适合你？',
    'How Registration Works': '报名流程',
    'Register Your Details': '填写报名资料',
    'Receive Organizer Confirmation': '等待主办方确认',
    'Prepare for BICC': '准备参加 BICC',
    '3-Day Convention Access': '三天大会通行',
    'Selected Workshop Track': '所选工作坊课程',
    'Instructor-Led Learning': '导师带领学习',
    'Shared Convention Moments': '共同大会体验',
    'Why Join BICC 2026?': '为什么参加 BICC 2026？',
    'Ready to Choose Your Pass?': '准备好选择通行证了吗？',
    'After Payment': '付款之后',
    'Your next step is simple.': '下一步很简单。',
    'Keep your Stripe receipt, then submit your participant details with the same email address. This helps the BICC team match your payment, selected track and official updates.':
      '请保留 Stripe 收据，并使用同一个电邮提交参与者资料。这能帮助 BICC 团队核对付款、所选课程与官方更新。',
    'Complete Participant Details': '填写参与者资料',
    'View Thank You Page': '查看感谢页面',
    'Need help? Email BICC': '需要协助？电邮 BICC',
    'Short answers before you register.': '报名之前的简短解答。',
    'Registration Confirmed': '报名已确认',
    'Thank you for securing your BICC pass.': '感谢你成功购买 BICC 通行证。',
    'Your payment step is complete. The next thing we need is your delegate details so the BICC team can match your payment, selected track and future programme updates.':
      '你的付款步骤已经完成。接下来请提交参与者资料，让 BICC 团队可以核对付款、所选课程和后续日程更新。',
    'Complete Delegate / Participant Details': '填写参与者资料',
    'What to do next': '接下来要做什么',
    'Save your Stripe receipt or payment confirmation.': '保存你的 Stripe 收据或付款确认。',
    'Complete your delegate details form for BICC.': '填写 BICC 参与者资料表。',
    'Watch for official updates about programme, venue and check-in.': '留意官方日程、场地与报到更新。',
    'Use the same email as your Stripe receipt when you complete the participant form. That makes organizer matching much easier.':
      '填写参与者表格时，请使用与 Stripe 收据相同的电邮，方便主办方核对。',
    'Need help matching your payment?': '需要协助核对付款？',
    'After Stripe checkout, complete the participant details form using your receipt email. The BICC team will use that information for official follow-up, programme updates and check-in preparation.':
      '完成 Stripe 付款后，请使用收据电邮填写参与者资料表。BICC 团队会用这些资料进行官方跟进、日程更新和报到准备。',
    'Venue & Visit': '场地与旅行',
    'Where should I ask general questions?': '一般问题应该问哪里？',
    'Email hello@bicc2026.com or use the Contact page so the BICC team can route your enquiry.':
      '你可以电邮 hello@bicc2026.com，或使用联系页面，让 BICC 团队把问题转给合适负责人。',
    'How do I match my Stripe payment with my delegate details?': '如何把 Stripe 付款和参与者资料对应起来？',
    'After payment, submit your delegate details and include the email used for your Stripe receipt so the organiser can match the purchase with your selected pass.':
      '付款后，请提交参与者资料，并填写 Stripe 收据使用的电邮，方便主办方把付款与你选择的通行证对应起来。',
    'Will there be a programme PDF?': '会有日程 PDF 吗？',
    'The programme preview is available on the website. An official PDF can be added once final times, rooms and instructor allocations are confirmed.':
      '网站上已有日程预览。正式时间、房间与导师安排确认后，可以加入官方 PDF。',
    'Are hotel and travel bookings handled by BICC?': '酒店和交通预订由 BICC 处理吗？',
    'Delegates and participants should arrange hotels, flights and local travel directly unless BICC announces an official partner arrangement.':
      '除非 BICC 公布官方合作安排，否则参与者需自行安排酒店、机票与本地交通。',
    'What is the price of each pass?': '每一种通行证多少钱？',
    'Both Foundation and Mastery passes are listed at US$190, unless the organizer updates the official pricing.':
      'Foundation 与 Mastery 通行证目前均为 US$190，除非主办方更新官方价格。',
    'What is the difference between Foundation and Mastery?': 'Foundation 和 Mastery 有什么不同？',
    'Foundation is designed for beginners and emerging performers who want essential clown craft. Mastery is designed for experienced performers who want deeper critique, stage presence and professional development.':
      'Foundation 适合想建立基本小丑技艺的初学者和新晋表演者；Mastery 适合希望获得更深入反馈、舞台表现和专业发展的有经验表演者。',
    'Are workshops included in the pass?': '工作坊包含在通行证内吗？',
    'Workshop access follows your selected pass and track. Final session access and capacity details are subject to organizer confirmation.':
      '工作坊参与权限会根据你选择的通行证和课程而定。最终环节权限与人数安排以主办方确认为准。',
    'Can I change tracks after registering?': '报名后可以更换课程吗？',
    'Track changes are subject to availability and organizer confirmation.': '课程更换需视名额情况与主办方确认而定。',
    'Are accommodation, meals or transport included?': '住宿、餐食或交通包含在内吗？',
    'These should not be assumed included unless the organizer confirms them separately.': '除非主办方另行确认，否则不应默认包含这些项目。',
    'What happens after I register?': '报名后会发生什么？',
    'What if the programme changes?': '如果日程有变怎么办？',
    'Final programme details, venue information and room assignments may be updated closer to the convention.':
      '最终日程、场地资讯与房间安排可能会在大会临近时更新。',
    'Do I need prior clowning experience?': '我需要有小丑经验吗？',
    'No. Foundation sessions are suitable for beginners and emerging performers. Mastery sessions are designed for experienced performers who want sharper feedback and deeper practice.':
      '不需要。Foundation 适合初学者与新晋表演者；Mastery 适合希望获得更深入练习和反馈的有经验表演者。',
    'Can I switch tracks?': '可以转换课程吗？',
    'Track switching is subject to availability and organizer confirmation.': '课程转换需视名额情况与主办方确认而定。',
    'Will there be a full workshop schedule?': '会有完整工作坊时间表吗？',
    'The main programme timing and class list are now available. Final room assignments, instructor allocation and class changes remain subject to organiser confirmation.':
      '主要日程时间与课程列表已公布。最终房间、导师安排与课程调整仍以主办方确认为准。',
    'Are the workshops suitable for educators?': '工作坊适合教育工作者吗？',
    'Yes. Several sessions are relevant for educators, school performers, family entertainers and community-based creative practitioners.':
      '适合。部分环节适合教育者、学校表演者、家庭娱乐表演者与社区创意实践者。',
    'Are materials provided?': '会提供材料吗？',
    'Workshop material requirements, if any, will be announced by the organizer.': '如有工作坊材料要求，主办方会另行公布。',
    'Will I receive a certificate?': '我会获得证书吗？',
    'Yes. The e-certificate will be sent by email after participants complete the feedback form. The link will be provided by the organizer.':
      '会。参与者完成反馈表后，电子证书将通过电邮发送；链接会由主办方提供。',
    'Is the full programme confirmed?': '完整日程已经确认了吗？',
    'The main three-day programme timing is now available. Room assignments, instructor allocation and any final organiser updates may still be refined before the convention.':
      '三天主要日程时间已公布。房间安排、导师分配及最终主办方更新仍可能在大会前调整。',
    'Do I need to choose a track before attending?': '参加前需要先选择课程吗？',
    'Yes. Delegates and participants should select the pass or track that best fits their current experience and learning goals.':
      '需要。参与者应选择最符合当前经验与学习目标的通行证或课程。',
    'Are all workshops included?': '所有工作坊都包含吗？',
    'Workshop access follows the selected pass and track structure. Some sessions may have capacity limits or organiser confirmation.':
      '工作坊权限根据所选通行证与课程结构而定，部分环节可能有人数限制或需主办方确认。',
    'Can I attend both Foundation and Mastery sessions?': '我可以同时参加 Foundation 和 Mastery 吗？',
    'Track access is subject to pass type, availability and organiser confirmation.': '课程权限取决于通行证类型、名额和主办方确认。',
    'Will there be showcase opportunities?': '会有展示机会吗？',
    'The programme includes showcase and community-sharing moments. Specific participation details will be confirmed in the final schedule.':
      '日程包含展示与社区分享环节，具体参与方式会在最终日程中确认。',
    'Where will the sessions happen?': '环节会在哪里进行？',
    'Venue zones and room assignments will be announced closer to the convention.': '场地区域与房间安排会在大会临近时公布。',
    'Where is BICC 2026 held?': 'BICC 2026 在哪里举行？',
    'Will there be a venue map?': '会有场地地图吗？',
    'Yes. The official venue map will be shared before the convention and will include key zones such as registration, workshop rooms, main hall, photo spots and food or rest areas.':
      '会。官方场地地图会在大会前发布，并包含报到处、工作坊房间、主厅、拍照点及餐饮/休息区域等重点。',
    'Where do I register when I arrive?': '抵达后在哪里报到？',
    'Delegate and participant registration details will be included in the final venue guide and programme update.':
      '参与者报到详情会包含在最终场地指南与日程更新中。',
    'Are workshop rooms assigned already?': '工作坊房间已经安排了吗？',
    'Room assignments will be confirmed closer to the convention and may depend on track, session type and final venue layout.':
      '房间安排会在大会临近时确认，并可能根据课程、环节类型与最终场地布局调整。',
    'Will there be food areas?': '会有餐饮区域吗？',
    'Food and rest area information will be included in the official venue guide once confirmed.': '餐饮与休息区域资讯确认后会加入官方场地指南。',
    'Is accommodation included in the pass?': '通行证包含住宿吗？',
    'Accommodation is not listed as included unless specifically stated by the organiser.': '除非主办方明确说明，否则住宿不包含在通行证内。',
    'How do I receive venue updates?': '我要如何收到场地更新？',
    'Follow the official BICC website or organiser updates for confirmed venue, programme and delegate/participant information.':
      '请关注 BICC 官方网站或主办方更新，以获取已确认的场地、日程与参与者资讯。',
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
    Joyful: '欢乐',
    Cultural: '文化',
    Inspiring: '启发',
    International: '国际',
    Community: '社区',
    'Joy that connects.': '连接彼此的快乐。',
    'Rooted in Borneo.': '扎根婆罗洲。',
    'Creative growth.': '创意成长。',
    'Global exchange.': '国际交流。',
    'Hope through service.': '以服务传递希望。',
    'Get Foundation Pass': '购买 Foundation 通行证',
    'Get Mastery Pass': '购买 Mastery 通行证',
    'View Instructors': '查看导师',
    'View Passes': '查看通行证',
    'Explore Programme': '探索日程',
    'Explore Workshops': '探索工作坊',
    'Learn About BICC': '了解 BICC',
    'Compare Foundation & Mastery Tracks': '比较 Foundation 与 Mastery 课程',
    'Where Laughter Becomes Legacy.': '让欢笑成为传承。',
    'Borneo International Clown Convention 2026': '婆罗洲国际小丑大会 2026',
    'Official Convention Magazine & Participant Handbook': '官方大会杂志与参与者手册',
    'What Is BICC?': '什么是 BICC？',
    'A convention for people who want practical growth, not just inspiration.': '一场为真正想成长的人而设的大会，不只是获得灵感。',
    'BICC brings together training, live performance, cultural exchange and community connection in one focused convention experience.':
      'BICC 将培训、现场演出、文化交流与社区连结汇聚成一个完整而聚焦的大会体验。',
    'Learn The Craft': '学习专业技艺',
    'Train inside clear Foundation and Mastery pathways built for real progress.': '在清晰的 Foundation 与 Mastery 路径中，为真实进步而训练。',
    'Share The Stage': '共享舞台',
    'Develop work for the stage, not just for the classroom.': '发展真正适合舞台的作品，而不只是课堂练习。',
    'Serve The Community': '服务社区',
    'Exchange ideas, methods and cultural perspectives with artists from different contexts.': '与不同背景的艺术家交流想法、方法与文化视角。',
    'Foundation builds your base. Mastery sharpens a working act.': 'Foundation 建立基础，Mastery 打磨已有演出。',
    'For beginners, emerging performers, educators, students and teaching artists.': '适合初学者、新晋表演者、教育者、学生与教学艺术工作者。',
    'For experienced performers, working clowns and stage artists ready for critique.': '适合有经验的表演者、职业小丑与准备接受反馈的舞台艺术家。',
    'Build confidence, character, timing and the physical clarity needed to hold an audience.': '建立自信、角色、节奏，以及吸引观众所需的身体表达清晰度。',
    'Refine stage presence, strengthen your act and make sharper professional choices under real feedback.': '在真实反馈中提升舞台存在感、强化节目，并作出更专业的表演选择。',
    'New to clowning or building confidence? Start with Foundation. Already performing for audiences? Choose Mastery.':
      '刚开始接触小丑或正在建立信心？选择 Foundation。已经面对观众演出？选择 Mastery。',
    'Programme Snapshot': '日程概览',
    'Fast to scan, easy to understand and built around a shared convention rhythm.': '快速浏览、容易理解，并围绕共同的大会节奏设计。',
    'Instructors & Performers': '导师与表演者',
    'Learn From Artists Who Live The Stage.': '向真正活在舞台上的艺术家学习。',
    'Instructors are selected for stage credibility, teaching clarity and real audience experience.': '导师根据舞台可信度、教学清晰度与真实观众经验而选出。',
    'Take your place in the BICC 2026 circle.': '加入 BICC 2026 的欢乐圈。',
    'Choose your track and join three days of training, performance, exchange and red-nose energy in Borneo.':
      '选择你的课程，加入在婆罗洲举行的三天培训、演出、交流与红鼻子能量。',
    'A convention built around laughter, craft, culture and human connection.': '一场围绕欢笑、技艺、文化与人与人连结而建立的大会。',
    'Laughter, craft and culture in one Borneo convention.': '欢笑、技艺与文化，汇聚在一场婆罗洲大会。',
    'BICC 2026 is a professional clowning convention held in Borneo, bringing together performers, educators, artists, families and communities through workshops, showcases, cultural exchange and meaningful human connection.':
      'BICC 2026 是在婆罗洲举行的专业小丑大会，通过工作坊、演出展示、文化交流与真诚的人际连结，聚集表演者、教育工作者、艺术家、家庭与社区。',
    'Professional workshops': '专业工作坊',
    'Stage showcase': '舞台展示',
    'Borneo culture': '婆罗洲文化',
    'Community impact': '社区影响',
    'Editorial Note': '编辑说明',
    'Why it matters': '为什么重要',
    'BICC 2026 was created to raise the standard of clowning as an art form, a performance discipline and a tool for community impact. Beyond entertainment, clowning carries the power to connect people, bring joy into difficult spaces, and create unforgettable human moments.':
      'BICC 2026 旨在提升小丑艺术作为表演艺术、专业训练与社区影响工具的标准。小丑不只是娱乐，它也能连接人心，把快乐带进困难空间，并创造难忘的人性时刻。',
    'Page Overview': '页面概览',
    'What makes BICC 2026 different.': 'BICC 2026 有什么不同。',
    'Professional Learning': '专业学习',
    'Structured workshops, international instructors and practical training for performers who want to grow their craft.':
      '为希望提升技艺的表演者提供结构化工作坊、国际导师与实用训练。',
    'Cultural Exchange': '文化交流',
    'A joyful gathering rooted in Borneo, connecting local creativity with regional and international clowning communities.':
      '一场扎根婆罗洲的欢乐聚会，连接本地创意与区域、国际小丑社群。',
    'Community Impact': '社区影响',
    'Clowning is presented not only as performance, but as a way to bring hope, care and connection to people.':
      '小丑艺术不只是表演，也是一种把希望、关怀与连结带给人们的方式。',
    'Our Vision': '我们的愿景',
    'Where laughter becomes legacy.': '让欢笑成为传承。',
    'To build BICC into a respected international platform where clown artists, educators, performers and communities gather to learn, collaborate and carry the spirit of joy beyond the stage.':
      '把 BICC 打造成受尊重的国际平台，让小丑艺术家、教育者、表演者与社区聚集学习、合作，并把快乐精神带到舞台之外。',
    'This is more than a convention. It is a growing movement for craft, culture and connection.': '这不只是一场大会，而是一场关于技艺、文化与连结的成长运动。',
    'Who Should Join': '谁适合参加',
    'Designed for performers, educators, families and communities.': '为表演者、教育者、家庭与社区而设计。',
    'BICC 2026 welcomes people from different backgrounds who believe in the power of joy, creativity and human connection.':
      'BICC 2026 欢迎来自不同背景、相信快乐、创意与人际连结力量的人。',
    'Built In Borneo': '扎根婆罗洲',
    'Built in Borneo. Open to the world.': '扎根婆罗洲，面向世界。',
    'Hosted in Tawau, Sabah, BICC 2026 carries the warmth of Borneo while welcoming guests from different countries and creative backgrounds. It is a convention, a cultural meeting point, and a shared celebration of laughter, learning and community.':
      'BICC 2026 在沙巴斗湖举行，带着婆罗洲的温暖，欢迎来自不同国家与创意背景的嘉宾。这是一场大会，也是文化交汇点，更是关于欢笑、学习与社区的共同庆典。',
    'Discover Tawau': '探索斗湖',
    'Beyond The Event': '超越三天活动',
    'More than a three-day event.': '不只是三天活动。',
    'BICC 2026 is part of a bigger journey to strengthen clowning culture, support creative growth and build a connected community through the Borneo Clown Hub. The convention is the beginning — the relationships, learning and impact continue beyond the event.':
      'BICC 2026 是更大旅程的一部分，通过 Borneo Clown Hub 强化小丑文化、支持创意成长并建立连结社群。大会只是开始，关系、学习与影响会在活动之后持续。',
    'Organised With Purpose': '带着使命举办',
    'Created by people who believe in the power of joyful impact.': '由相信快乐影响力的人共同打造。',
    'Ready To Join': '准备加入',
    'Be part of BICC 2026.': '成为 BICC 2026 的一份子。',
    'See the 3-Day BICC Journey.': '查看 BICC 三天旅程。',
    'Official Convention Programme': '官方大会日程',
    'Convention at a Glance': '大会一览',
    'A simple rhythm before the detailed schedule.': '在详细日程前，先了解整体节奏。',
    'Day-by-Day Programme': '每日详细日程',
    'Follow the three-day convention rhythm.': '跟随三天大会节奏。',
    'How the Programme Connects to Your Pass': '日程如何连接你的通行证',
    'Your pass shapes the workshop focus inside the wider convention journey.': '你的通行证决定你在大会旅程中的工作坊重点。',
    'Programme FAQ': '日程常见问题',
    'Quick answers before the full schedule is released.': '完整日程发布前的快速解答。',
    'Plan Your 3-Day BICC Journey.': '规划你的三天 BICC 旅程。',
    'Registration, Opening & First Classes': '报到、开幕与首轮课程',
    'Parallel Classes & Competition': '平行课程与比赛',
    'Outreach, Final Briefing & International Night Show': '外展、最终简报与国际之夜演出',
    Registration: '报到',
    Opening: '开幕',
    Lunch: '午餐',
    'Parallel Class 1': '平行课程 1',
    'Tea Break': '茶点休息',
    'Parallel Class 2': '平行课程 2',
    'Parallel Class 3': '平行课程 3',
    'Parallel Class 4': '平行课程 4',
    'Parallel Class 5': '平行课程 5',
    'Parallel Class 6': '平行课程 6',
    'Jamming Session': '即兴交流环节',
    'International Night Show': '国际之夜演出',
    'A formal closing event celebrating cultural exchange and international collaboration. Attendees will enjoy an elegant dinner accompanied by lively performances, followed by an awards ceremony recognizing outstanding achievements and contributions to the art of clowning.':
      '一场正式闭幕活动，庆祝文化交流与国际合作。来宾将享用优雅晚宴与精彩演出，并在颁奖环节表扬小丑艺术领域的杰出成就与贡献。',
    'Auditorium Session': '礼堂环节',
    Rest: '休息',
    'Variety Art Competition': '综艺艺术比赛',
    'Humanitarian Activities': '人道关怀活动',
    'Final Briefing': '最终简报',
    'Preparation for Gala Night': '晚会准备',
    'Hall Opens': '开放入场',
    'Workshop Catalogue': '工作坊目录',
    'Hands-on sessions designed to help you create, connect, perform and serve.': '通过动手实践，帮助你创作、连接、表演与服务。',
    'Participants are entitled to attend all eight classes included in their selected level. All classes are subject to change.':
      '参与者可参加所选级别包含的八堂课程。所有课程可能会根据主办方安排调整。',
    'Included in Pass': '包含在通行证内',
    'Who it is for': '适合对象',
    'Workshop Rhythm': '工作坊节奏',
    'Workshops sit inside the wider 3-day BICC journey.': '工作坊是 BICC 三天整体旅程的一部分。',
    'Training, exchange and showcase moments across three days.': '三天内包含培训、交流与展示时刻。',
    'Workshop FAQ': '工作坊常见问题',
    'Short answers before you choose your track.': '选择课程前的简短解答。',
    'Join the Training': '加入培训',
    'Ready to Build Your Clown Practice?': '准备好建立你的小丑实践了吗？',
    'Build Real Clown Practice.': '建立真实的小丑实践。',
    'Focused Workshop Learning': '聚焦式工作坊学习',
    'Choose the Workshop Path That Fits Your Stage.': '选择适合你当前阶段的工作坊路径。',
    'Choose the path that fits your current stage.': '选择适合你当前阶段的路径。',
    'Balloon Twisting Class': '气球造型课程',
    'Magic for Children': '儿童魔术',
    'Creative Story-Telling': '创意故事表达',
    'Original Clown Performance': '原创小丑表演',
    'Puppet Sounds & Manipulation': '偶戏声音与操控',
    'Community & Hospital Clowning': '社区与医院小丑',
    'Creative Story-Telling for Children': '儿童创意故事表达',
    'Puppet Making, Sounds & Manipulation': '偶戏制作、声音与操控',
    'How to Start a 1 Min Show': '如何开始一分钟演出',
    'Juggling Class': '杂耍课程',
    'Clown Makeup & Costumes': '小丑化妆与服装',
    'Creative Clowns for Community Care & Hospitals': '社区关怀与医院创意小丑',
    'Find Your Way in Borneo.': '在婆罗洲轻松找到方向。',
    'Official Delegate & Participant Venue Guide': '官方参与者场地指南',
    'The essentials delegates and participants want first.': '参与者最想先知道的重点。',
    'Calvary Crown Overview': 'Calvary Crown 概览',
    'Know the building before you arrive.': '抵达前先了解建筑动线。',
    'Delegate & Participant Flow': '参与者动线',
    'Think vertical, not complicated.': '把它看成垂直楼层动线，不复杂。',
    'How to Arrive and Check In': '如何抵达与报到',
    'A simple step-by-step guide for the delegate and participant arrival experience.': '参与者抵达体验的简单步骤指南。',
    'A clear arrival plan for delegates and participants.': '为参与者准备的清晰抵达计划。',
    'Arrival Route': '抵达路线',
    'From travel to check-in.': '从交通到报到。',
    'Venue FAQ': '场地常见问题',
    'Short answers for first-time delegates and participants.': '第一次参加者的简短解答。',
    'Ready to Gather in Borneo?': '准备好相聚婆罗洲了吗？',
    Location: '地点',
    'Convention Dates': '大会日期',
    'Main Activities': '主要活动',
    Updates: '更新',
    'Arrive in Tawau': '抵达斗湖',
    'Find Calvary Crown': '前往 Calvary Crown',
    'Check In': '报到',
    'Join the Opening Flow': '进入开幕流程',
    'By Air': '航空抵达',
    'Stay Nearby': '住在附近',
    'Start at Reception': '从接待处开始',
    'What to Bring': '携带物品',
    'Comfort & Access': '舒适与无障碍',
    'Follow Updates': '关注更新',
    'Dining Hall': '餐厅',
    'Workshop Rooms + Solat Room': '工作坊课室 + 祈祷室',
    Accommodation: '住宿',
    'Workshop Room': '工作坊课室',
    Auditorium: '礼堂',
    'Cafe / Reception': '咖啡厅 / 接待处',
    Arrive: '抵达',
    Gather: '集合',
    Train: '训练',
    Dine: '用餐',
    'Food': '美食',
    Stay: '住宿',
    Transport: '交通',
    'Things To Do': '景点体验',
    'Eat Tawau Without Overplanning': '轻松吃遍斗湖',
    'Tawau Food Guide': '斗湖美食指南',
    'Food ideas delegates can scan fast.': '参与者可快速浏览的美食建议。',
    'Food ideas participants can scan fast.': '参与者可快速浏览的美食建议。',
    'Accommodation References': '住宿参考',
    'Suggested stays from local accommodation materials.': '根据本地住宿资料整理的推荐住宿。',
    'Tawau, Sabah': '沙巴斗湖',
    'Event Destination': '活动目的地',
    'Local Experience': '本地体验',
    'Seafood & Local Dining': '海鲜与本地餐饮',
    'Kopitiam Breakfast': '咖啡店早餐',
    'Street Food & Local Snacks': '街头美食与本地小吃',
    'Cafe Stops': '咖啡馆小憩',
    'Near the Convention Venue': '靠近大会场地',
    'City Centre Hotels': '市中心酒店',
    'Group-Friendly Stays': '适合团队住宿',
    'Simple & Practical Options': '简单实用选择',
    'Airport to City / Venue': '机场到市区 / 场地',
    'Around Town': '市区交通',
    'Convention Days': '大会期间',
    'Pasar Tanjung Tawau': '斗湖中央巴刹',
    'Balung Cocos Columnar Basalt': 'Balung Cocos 柱状玄武岩',
    'Tawau Hills Park': '斗湖山公园',
    'Pasar Malam Chester': 'Chester 夜市',
    'Teck Guan Cocoa Village & Waterfall': '德源可可村与瀑布',
    'Teck Guan Cocoa Village Waterfall': '德源可可村瀑布',
    'Waterfront & City Walks': '海滨与城市漫步',
    'Explore Tawau between convention moments.': '在大会空档探索斗湖。',
    'Borneo Experience': '婆罗洲体验',
    'Join us in Tawau for learning, laughter, connection and a journey beyond the convention hall.':
      '来到斗湖，与我们一起学习、欢笑、连接，并展开大会场馆之外的旅程。',
    'Partner with BICC 2026.': '成为 BICC 2026 合作伙伴。',
    'Official Partnership Entry': '官方合作入口',
    'International Convention': '国际大会',
    'Family & Community Reach': '家庭与社区触达',
    'Sabah / Tawau Destination Event': '沙巴 / 斗湖目的地活动',
    'Request Sponsorship Deck': '索取赞助提案',
    'Talk to Partnership Team': '联系合作团队',
    'Why Sponsor BICC?': '为什么赞助 BICC？',
    'Sponsorship Opportunities': '赞助机会',
    'Where Your Brand Appears': '品牌曝光位置',
    'Sponsorship Packages': '赞助配套',
    'Become a Sponsor': '成为赞助伙伴',
    'Let’s build a joyful partnership.': '让我们建立一段有温度的合作关系。',
    Organiser: '主办单位',
    'Collaboration Partners': '协作伙伴',
    'Supported By': '支持单位',
    'Association & Business Partners': '协会与商业伙伴',
    'Brand Visibility': '品牌曝光',
    'CSR & Community Impact': '企业社会责任与社区影响',
    'Tourism & Local Business': '旅游与本地商业',
    'Cultural Partnership': '文化合作',
    'Main Stage Partner': '主舞台伙伴',
    'Workshop Partner': '工作坊伙伴',
    'Red Nose CSR Partner': '红鼻子 CSR 伙伴',
    'Delegate Experience Partner': '参与者体验伙伴',
    'Delegate & Participant Support': '参与者支持',
    'Delegate / Participant Details': '参与者资料',
    'Travel & Hospitality Partner': '旅游与酒店伙伴',
    'Official Magazine / Media Partner': '官方杂志 / 媒体伙伴',
    'Legacy Partner': 'Legacy 伙伴',
    'Signature Partner': 'Signature 伙伴',
    'Impact Partner': 'Impact 伙伴',
    'Community Partner': 'Community 伙伴',
    'Official Contact': '官方联系',
    'Choose the right desk': '选择正确联系方向',
    'Before you write': '联系前请准备',
    'Wear the': '戴上',
    'Red Nose.': '红鼻子。',
    'Share the Hope.': '分享希望。',
    'Official home of Borneo International Clown Convention 2026.': '婆罗洲国际小丑大会 2026 官方网站。',
    'Venue & Travel': '场地与旅行',
    Partners: '合作伙伴',
    Admin: '后台',
    'Next Step': '下一步',
    'Join BICC 2026': '加入 BICC 2026',
    'Official workshop access': '官方工作坊通行',
    'Translation Roadmap': '翻译路线图',
    'Content Admin': '内容后台',
    'Editable Content': '可编辑内容',
    'Before Launch': '上线前准备',
    '© 2026 Borneo International Clown Convention. All rights reserved.': '© 2026 婆罗洲国际小丑大会。版权所有。',
  },
  ms: {
    'Official Site': 'Laman Rasmi',
    About: 'Tentang',
    Workshops: 'Bengkel',
    Instructors: 'Pengajar',
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
    'Travel Help': 'Bantuan Perjalanan',
    All: 'Semua',
    Homestay: 'Homestay',
    'City Centre': 'Pusat Bandar',
    'Group-Friendly': 'Sesuai Kumpulan',
    Markets: 'Pasar',
    Nature: 'Alam',
    Culture: 'Budaya',
    'Easy Walks': 'Jalan Santai',
    'Cafe / Group Dining': 'Kafe / Kumpulan',
    'Venue / Local Food': 'Lokasi / Makanan',
    'Dinner / Group Meals': 'Malam / Kumpulan',
    'Casual Dining': 'Makan Santai',
    'Kopitiam / Breakfast': 'Kopitiam / Sarapan',
    Attend: 'Sertai',
    Visit: 'Lawatan',
    Partner: 'Rakan',
    'Travel Agencies': 'Agensi Perjalanan',
    'Travel Agency': 'Agensi Perjalanan',
    'Hotel / Homestay': 'Hotel / Homestay',
    'Visitor Support': 'Sokongan Pelawat',
    'Travel Support Partners': 'Rakan Sokongan Perjalanan',
    'Plan with local travel support.': 'Rancang dengan sokongan perjalanan tempatan.',
    'Choose the support that fits your trip.': 'Pilih sokongan yang sesuai dengan perjalanan anda.',
    'Use this section to compare travel agencies and visitor support options for airport transfers, tours, hotels and group travel.':
      'Gunakan bahagian ini untuk membandingkan agensi perjalanan dan pilihan sokongan pelawat untuk pemindahan lapangan terbang, lawatan, hotel dan perjalanan berkumpulan.',
    'Compare confirmed visitor support partners for airport transfers, stays, local tours and convention-day questions.':
      'Bandingkan rakan sokongan pelawat yang disahkan untuk pemindahan lapangan terbang, penginapan, lawatan tempatan dan soalan hari konvensyen.',
    'Find the right travel partner for your BICC trip.': 'Cari rakan perjalanan yang sesuai untuk perjalanan BICC anda.',
    'Compare by support type, language and service.': 'Bandingkan mengikut jenis sokongan, bahasa dan perkhidmatan.',
    'Planning route': 'Laluan perancangan',
    'Travel partner directory': 'Direktori rakan perjalanan',
    Showing: 'Memaparkan',
    partners: 'rakan',
    'Agency directory': 'Direktori agensi',
    'Related visitor support': 'Sokongan pelawat berkaitan',
    'Travel agency partners can be added here as they are confirmed.': 'Rakan agensi perjalanan boleh ditambah di sini selepas disahkan.',
    'Travel route support': 'Sokongan laluan perjalanan',
    'Airport to hotel, venue and Tawau moments.': 'Dari lapangan terbang ke hotel, lokasi dan pengalaman Tawau.',
    'A simple planning path for participants who want help beyond the convention venue.':
      'Laluan perancangan ringkas untuk peserta yang memerlukan bantuan selain lokasi konvensyen.',
    'Choose the support that fits your arrival plan.': 'Pilih sokongan yang sesuai dengan rancangan ketibaan anda.',
    'Choose local support.': 'Pilih sokongan tempatan.',
    'All partners are listed at the same level.': 'Semua rakan disenaraikan pada tahap yang sama.',
    'All partners are listed at the same level. Please confirm pricing, availability and booking details directly with each provider.':
      'Semua rakan disenaraikan pada tahap yang sama. Sila sahkan harga, ketersediaan dan butiran tempahan terus dengan setiap penyedia.',
    'Use the filters to find travel agency, stay support or official routing help.':
      'Gunakan penapis untuk mencari agensi perjalanan, sokongan penginapan atau bantuan laluan rasmi.',
    'Compare confirmed visitor support partners in one clean directory.': 'Bandingkan rakan sokongan pelawat yang disahkan dalam satu direktori yang jelas.',
    'Travel partners are listed for visitor convenience. Please confirm pricing, availability and booking details directly with each provider.':
      'Rakan perjalanan disenaraikan untuk kemudahan pelawat. Sila sahkan harga, ketersediaan dan butiran tempahan terus dengan setiap penyedia.',
    'Mini travel desk': 'Meja bantuan perjalanan',
    Airport: 'Lapangan Terbang',
    Hotel: 'Hotel',
    Attractions: 'Tarikan',
    'Best for': 'Sesuai untuk',
    Languages: 'Bahasa',
    'Open JWV Now': 'Buka JWV Now',
    'Open Chanliving': 'Buka Chanliving',
    'Travel agency': 'Agensi perjalanan',
    'Travel partner': 'Rakan perjalanan',
    HotelHomestay: 'HotelHomestay',
    'Visitor support': 'Sokongan pelawat',
    'Convention visitor help': 'Bantuan pelawat konvensyen',
    'Hotel / Homestay partner': 'Rakan hotel / homestay',
    'Local Tawau travel planning before or after BICC.': 'Perancangan perjalanan Tawau sebelum atau selepas BICC.',
    'Airport transfers, day tours, hotel guidance and group arrivals.': 'Pemindahan lapangan terbang, lawatan harian, panduan hotel dan ketibaan kumpulan.',
    'Hotel and homestay booking option for extended Borneo routes.': 'Pilihan tempahan hotel dan homestay untuk laluan Borneo lanjutan.',
    'Visitors arranging stays around Semporna or regional travel.': 'Pelawat yang mengatur penginapan sekitar Semporna atau perjalanan serantau.',
    'Smart Living Inn stay option in Semporna with simple booking support for extended Borneo routes.':
      'Pilihan penginapan Smart Living Inn di Semporna dengan sokongan tempahan ringkas untuk perjalanan Borneo lanjutan.',
    'Delegates adding Semporna stays, island trips or family travel around BICC.':
      'Sesuai untuk peserta yang menambah penginapan Semporna, lawatan pulau atau perjalanan keluarga sekitar BICC.',
    'Eco travel partner for Sebatik Island, mangrove routes, dolphin spotting and nature-based visitor experiences.':
      'Rakan eko-pelancongan untuk Pulau Sebatik, laluan bakau, melihat ikan lumba-lumba dan pengalaman alam semula jadi.',
    'Delegates who want eco day trips, river cruises, overnight packages or a nature extension after BICC.':
      'Sesuai untuk peserta yang mahukan lawatan eko harian, pelayaran sungai, pakej bermalam atau sambungan alam selepas BICC.',
    'Official routing help for convention visitor questions.': 'Bantuan rasmi untuk soalan pelawat konvensyen.',
    'Participants unsure which travel partner to contact first.': 'Peserta yang belum pasti rakan perjalanan mana perlu dihubungi dahulu.',
    'Visitor planning, local Tawau arrangements, day tours, transfers and group travel help.':
      'Sesuai untuk perancangan pelawat, aturan tempatan Tawau, lawatan harian, pemindahan dan bantuan perjalanan berkumpulan.',
    'Hotel and homestay booking support for delegates extending their Borneo trip around Semporna or regional stays.':
      'Sesuai untuk peserta yang ingin melanjutkan perjalanan Borneo dengan penginapan sekitar Semporna atau kawasan berdekatan.',
    'Airport transfer': 'Pemindahan lapangan terbang',
    'Tawau day tours': 'Lawatan harian Tawau',
    'Hotel guidance': 'Panduan hotel',
    'Group travel': 'Perjalanan berkumpulan',
    'Homestay booking': 'Tempahan homestay',
    'Semporna stays': 'Penginapan Semporna',
    'Room booking': 'Tempahan bilik',
    'Family travel': 'Perjalanan keluarga',
    'Island trip add-on': 'Tambahan lawatan pulau',
    'Sebatik Island': 'Pulau Sebatik',
    'Eco day tours': 'Lawatan eko harian',
    'Mangrove cruise': 'Pelayaran bakau',
    'Dolphin spotting': 'Melihat ikan lumba-lumba',
    'Group stays': 'Penginapan berkumpulan',
    'Direct booking': 'Tempahan terus',
    'General travel questions': 'Soalan perjalanan umum',
    'Partner routing': 'Rujukan rakan',
    'Visitor notes': 'Nota pelawat',
    'Convention-day planning': 'Perancangan hari konvensyen',
    'Travel planning via Linktree': 'Perancangan melalui Linktree',
    'Direct booking website': 'Laman tempahan terus',
    'Contact Bergosong Eco Travel': 'Hubungi Bergosong Eco Travel',
    'Email BICC Team': 'E-mel Pasukan BICC',
    'More travel partners can be added here once confirmed.': 'Lebih banyak rakan perjalanan boleh ditambah di sini selepas disahkan.',
    'Contact BICC': 'Hubungi BICC',
    'View FAQ': 'Lihat Soalan Lazim',
    'Foundation Pass': 'Pas Foundation',
    'Mastery Pass': 'Pas Mastery',
    'Foundation Track Pass': 'Pas Trek Foundation',
    'Mastery Track Pass': 'Pas Trek Mastery',
    'Foundation Workshop Pass': 'Pas Bengkel Foundation',
    'Mastery Workshop Pass': 'Pas Bengkel Mastery',
    'View Foundation Workshops': 'Lihat Bengkel Foundation',
    'View Mastery Workshops': 'Lihat Bengkel Mastery',
    'View Workshop Tracks': 'Lihat Trek Bengkel',
    'Two Passes. One Shared Convention.': 'Dua Pas. Satu Pengalaman Konvensyen.',
    'Pick your training track.': 'Pilih trek latihan anda.',
    'Same convention, same price. Choose by experience level.': 'Konvensyen yang sama, harga yang sama. Pilih mengikut tahap pengalaman.',
    'For newer performers who want fundamentals, playful tools and stage confidence.':
      'Untuk penghibur baharu yang mahukan asas, alat kreatif dan keyakinan pentas.',
    'For working performers ready for sharper timing, critique and stage command.':
      'Untuk penghibur berpengalaman yang bersedia memperkemas timing, menerima kritikan dan menguasai pentas.',
    'Track access subject to organizer confirmation.': 'Akses trek tertakluk kepada pengesahan penganjur.',
    'Quick guide:': 'Panduan ringkas:',
    'Choose track': 'Pilih trek',
    'Foundation for new performers. Mastery for experienced performers.': 'Foundation untuk peserta baharu. Mastery untuk penghibur berpengalaman.',
    'Checkout safely': 'Bayar dengan selamat',
    'Use the official Stripe button on the pass you choose.': 'Gunakan butang Stripe rasmi pada pas pilihan anda.',
    'Submit details': 'Hantar maklumat',
    'Complete the participant form with your Stripe receipt email.': 'Lengkapkan borang peserta menggunakan e-mel resit Stripe anda.',
    'Newer performers choose Foundation. Working performers choose Mastery. After Stripe checkout, complete participant details with your receipt email.':
      'Peserta baharu pilih Foundation. Penghibur berpengalaman pilih Mastery. Selepas pembayaran Stripe, lengkapkan butiran peserta menggunakan e-mel resit anda.',
    'Official Stripe checkout': 'Pembayaran rasmi Stripe',
    'Pay through the official BICC pass links.': 'Bayar melalui pautan pas rasmi BICC.',
    'Same price, clear choice': 'Harga sama, pilihan jelas',
    'Foundation and Mastery are both US$190.': 'Foundation dan Mastery kedua-duanya US$190.',
    'Delegate / participant details after payment': 'Butiran peserta selepas pembayaran',
    'After Stripe checkout, submit your profile with the same receipt email.': 'Selepas pembayaran Stripe, hantar profil anda dengan e-mel resit yang sama.',
    'Everything essential. Nothing confusing.': 'Semua yang penting, tanpa kekeliruan.',
    'A clear 3-day convention pass connected to your selected training track.': 'Pas konvensyen 3 hari yang jelas dan berkaitan dengan trek latihan pilihan anda.',
    'Final programme access, room assignments and any special activities follow official organiser confirmation.':
      'Akses program akhir, bilik dan aktiviti khas tertakluk kepada pengesahan rasmi penganjur.',
    'Buy your pass. Then prepare for BICC.': 'Beli pas anda. Kemudian bersedia untuk BICC.',
    'Already paid? Complete Delegate / Participant Details': 'Sudah bayar? Lengkapkan Butiran Peserta',
    'Build Your Professional Foundation': 'Bina Asas Profesional Anda',
    'Elevate Your Stage Performance': 'Tingkatkan Persembahan Pentas Anda',
    'Borneo International Clown Convention 2026': 'Konvensyen Badut Antarabangsa Borneo 2026',
    'Where Laughter Becomes Legacy': 'Di Mana Tawa Menjadi Legasi',
    'A 3-day international gathering for clown artists, performers, educators and communities in Borneo.':
      'Perhimpunan antarabangsa tiga hari untuk artis badut, penghibur, pendidik dan komuniti di Borneo.',
    'Aug 3-5, 2026': '3-5 Ogos 2026',
    'Aug 3–5, 2026': '3-5 Ogos 2026',
    'Tawau, Sabah': 'Tawau, Sabah',
    '2 Workshop Tracks': '2 Trek Bengkel',
    'US$190 Pass': 'Pas US$190',
    'Choose Your Track': 'Pilih Trek Anda',
    'Two Paths. One Price. Different Professional Needs.': 'Dua laluan. Satu harga. Keperluan profesional berbeza.',
    'Foundation Track': 'Trek Foundation',
    'Mastery Track': 'Trek Mastery',
    'Exchange Lab': 'Makmal Pertukaran',
    Showcase: 'Showcase',
    'Delegate Info': 'Maklumat Peserta',
    'Participant Info': 'Maklumat Peserta',
    'All Participants': 'Semua Peserta',
    'All Participants & Guests': 'Semua Peserta & Tetamu',
    'Gala participants & guests': 'Peserta gala & tetamu',
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
    'Showcase & Community': 'Showcase & Komuniti',
    'Learn From Artists Who Live the Stage.': 'Belajar daripada artis yang hidup di pentas.',
    'Passes & Registration': 'Pas & Pendaftaran',
    'Choose Your BICC Pass.': 'Pilih Pas BICC Anda.',
    'Official Registration': 'Pendaftaran Rasmi',
    'One convention. Two training paths. Pick Foundation if you are building confidence, or Mastery if you are ready for stronger stage critique.':
      'Satu konvensyen, dua laluan latihan. Pilih Foundation jika anda sedang membina keyakinan, atau Mastery jika anda bersedia untuk kritikan pentas yang lebih kuat.',
    'Choose Your Pass. Start Your BICC Journey.': 'Pilih pas anda. Mulakan perjalanan BICC.',
    'What Your Pass Gives You': 'Apa Yang Termasuk Dalam Pas',
    'Before You Register': 'Sebelum Mendaftar',
    'Which Pass Is Right for You?': 'Pas Mana Yang Sesuai?',
    'How Registration Works': 'Cara Pendaftaran',
    'Register Your Details': 'Daftar Maklumat Anda',
    'Receive Organizer Confirmation': 'Terima Pengesahan Penganjur',
    'Prepare for BICC': 'Bersedia untuk BICC',
    '3-Day Convention Access': 'Akses Konvensyen 3 Hari',
    'Selected Workshop Track': 'Trek Bengkel Dipilih',
    'Instructor-Led Learning': 'Pembelajaran Bersama Pengajar',
    'Shared Convention Moments': 'Momen Konvensyen Bersama',
    'Why Join BICC 2026?': 'Mengapa Sertai BICC 2026?',
    'Ready to Choose Your Pass?': 'Sedia Memilih Pas?',
    'After Payment': 'Selepas Bayaran',
    'Your next step is simple.': 'Langkah seterusnya mudah.',
    'Keep your Stripe receipt, then submit your participant details with the same email address. This helps the BICC team match your payment, selected track and official updates.':
      'Simpan resit Stripe anda, kemudian hantar maklumat peserta menggunakan alamat e-mel yang sama. Ini membantu pasukan BICC memadankan bayaran, trek pilihan dan kemas kini rasmi.',
    'Complete Participant Details': 'Lengkapkan Maklumat Peserta',
    'View Thank You Page': 'Lihat Halaman Terima Kasih',
    'Need help? Email BICC': 'Perlu bantuan? E-mel BICC',
    'Short answers before you register.': 'Jawapan ringkas sebelum anda mendaftar.',
    'Registration Confirmed': 'Pendaftaran Disahkan',
    'Thank you for securing your BICC pass.': 'Terima kasih kerana mendapatkan pas BICC anda.',
    'Your payment step is complete. The next thing we need is your delegate details so the BICC team can match your payment, selected track and future programme updates.':
      'Langkah bayaran anda telah selesai. Seterusnya, kami perlukan maklumat peserta supaya pasukan BICC boleh memadankan bayaran, trek pilihan dan kemas kini program akan datang.',
    'Complete Delegate / Participant Details': 'Lengkapkan Maklumat Peserta',
    'What to do next': 'Apa langkah seterusnya',
    'Save your Stripe receipt or payment confirmation.': 'Simpan resit Stripe atau pengesahan bayaran anda.',
    'Complete your delegate details form for BICC.': 'Lengkapkan borang maklumat peserta BICC.',
    'Watch for official updates about programme, venue and check-in.': 'Pantau kemas kini rasmi tentang program, lokasi dan daftar masuk.',
    'Use the same email as your Stripe receipt when you complete the participant form. That makes organizer matching much easier.':
      'Gunakan e-mel yang sama seperti resit Stripe semasa melengkapkan borang peserta. Ini memudahkan pihak penganjur membuat padanan.',
    'Need help matching your payment?': 'Perlu bantuan memadankan bayaran?',
    'After Stripe checkout, complete the participant details form using your receipt email. The BICC team will use that information for official follow-up, programme updates and check-in preparation.':
      'Selepas pembayaran Stripe, lengkapkan borang maklumat peserta menggunakan e-mel resit anda. Pasukan BICC akan menggunakan maklumat itu untuk susulan rasmi, kemas kini program dan persediaan daftar masuk.',
    'Venue & Visit': 'Lokasi & Lawatan',
    'Where should I ask general questions?': 'Di mana saya boleh bertanya soalan umum?',
    'Email hello@bicc2026.com or use the Contact page so the BICC team can route your enquiry.':
      'E-mel hello@bicc2026.com atau gunakan halaman Contact supaya pasukan BICC boleh menyalurkan pertanyaan anda.',
    'How do I match my Stripe payment with my delegate details?': 'Bagaimana saya padankan bayaran Stripe dengan maklumat peserta?',
    'After payment, submit your delegate details and include the email used for your Stripe receipt so the organiser can match the purchase with your selected pass.':
      'Selepas bayaran, hantar maklumat peserta dan masukkan e-mel yang digunakan untuk resit Stripe supaya penganjur boleh memadankan pembelian dengan pas pilihan anda.',
    'Will there be a programme PDF?': 'Adakah PDF program akan disediakan?',
    'The programme preview is available on the website. An official PDF can be added once final times, rooms and instructor allocations are confirmed.':
      'Pratonton program tersedia di laman web. PDF rasmi boleh ditambah selepas masa akhir, bilik dan penugasan pengajar disahkan.',
    'Are hotel and travel bookings handled by BICC?': 'Adakah tempahan hotel dan perjalanan diuruskan oleh BICC?',
    'Delegates and participants should arrange hotels, flights and local travel directly unless BICC announces an official partner arrangement.':
      'Delegat dan peserta perlu mengurus hotel, penerbangan dan perjalanan tempatan sendiri melainkan BICC mengumumkan aturan rakan rasmi.',
    'What is the price of each pass?': 'Berapakah harga setiap pas?',
    'Both Foundation and Mastery passes are listed at US$190, unless the organizer updates the official pricing.':
      'Pas Foundation dan Mastery disenaraikan pada US$190, kecuali penganjur mengemas kini harga rasmi.',
    'What is the difference between Foundation and Mastery?': 'Apakah perbezaan antara Foundation dan Mastery?',
    'Foundation is designed for beginners and emerging performers who want essential clown craft. Mastery is designed for experienced performers who want deeper critique, stage presence and professional development.':
      'Foundation direka untuk pemula dan penghibur baharu yang mahu asas seni badut. Mastery direka untuk penghibur berpengalaman yang mahu kritikan lebih mendalam, kehadiran pentas dan perkembangan profesional.',
    'Are workshops included in the pass?': 'Adakah bengkel termasuk dalam pas?',
    'Workshop access follows your selected pass and track. Final session access and capacity details are subject to organizer confirmation.':
      'Akses bengkel mengikut pas dan trek pilihan anda. Akses sesi akhir dan maklumat kapasiti tertakluk kepada pengesahan penganjur.',
    'Can I change tracks after registering?': 'Bolehkah saya menukar trek selepas mendaftar?',
    'Track changes are subject to availability and organizer confirmation.': 'Pertukaran trek tertakluk kepada ketersediaan dan pengesahan penganjur.',
    'Are accommodation, meals or transport included?': 'Adakah penginapan, makanan atau pengangkutan termasuk?',
    'These should not be assumed included unless the organizer confirms them separately.': 'Jangan anggap perkara ini termasuk melainkan disahkan secara berasingan oleh penganjur.',
    'What happens after I register?': 'Apa berlaku selepas saya mendaftar?',
    'What if the programme changes?': 'Bagaimana jika program berubah?',
    'Final programme details, venue information and room assignments may be updated closer to the convention.':
      'Butiran program akhir, maklumat lokasi dan penugasan bilik mungkin dikemas kini lebih dekat dengan konvensyen.',
    'Do I need prior clowning experience?': 'Adakah saya perlu pengalaman badut sebelum ini?',
    'No. Foundation sessions are suitable for beginners and emerging performers. Mastery sessions are designed for experienced performers who want sharper feedback and deeper practice.':
      'Tidak. Sesi Foundation sesuai untuk pemula dan penghibur baharu. Sesi Mastery direka untuk penghibur berpengalaman yang mahu maklum balas lebih tajam dan latihan lebih mendalam.',
    'Can I switch tracks?': 'Bolehkah saya menukar trek?',
    'Track switching is subject to availability and organizer confirmation.': 'Pertukaran trek tertakluk kepada ketersediaan dan pengesahan penganjur.',
    'Will there be a full workshop schedule?': 'Adakah jadual bengkel penuh akan disediakan?',
    'The main programme timing and class list are now available. Final room assignments, instructor allocation and class changes remain subject to organiser confirmation.':
      'Masa program utama dan senarai kelas kini tersedia. Penugasan bilik akhir, penugasan pengajar dan perubahan kelas masih tertakluk kepada pengesahan penganjur.',
    'Are the workshops suitable for educators?': 'Adakah bengkel sesuai untuk pendidik?',
    'Yes. Several sessions are relevant for educators, school performers, family entertainers and community-based creative practitioners.':
      'Ya. Beberapa sesi sesuai untuk pendidik, penghibur sekolah, penghibur keluarga dan pengamal kreatif komuniti.',
    'Are materials provided?': 'Adakah bahan disediakan?',
    'Workshop material requirements, if any, will be announced by the organizer.': 'Keperluan bahan bengkel, jika ada, akan diumumkan oleh penganjur.',
    'Will I receive a certificate?': 'Adakah saya akan menerima sijil?',
    'Yes. The e-certificate will be sent by email after participants complete the feedback form. The link will be provided by the organizer.':
      'Ya. E-sijil akan dihantar melalui e-mel selepas peserta melengkapkan borang maklum balas. Pautan akan diberikan oleh penganjur.',
    'Is the full programme confirmed?': 'Adakah program penuh telah disahkan?',
    'The main three-day programme timing is now available. Room assignments, instructor allocation and any final organiser updates may still be refined before the convention.':
      'Masa program utama tiga hari kini tersedia. Penugasan bilik, penugasan pengajar dan kemas kini akhir penganjur masih boleh diperhalusi sebelum konvensyen.',
    'Do I need to choose a track before attending?': 'Adakah saya perlu memilih trek sebelum hadir?',
    'Yes. Delegates and participants should select the pass or track that best fits their current experience and learning goals.':
      'Ya. Delegat dan peserta perlu memilih pas atau trek yang paling sesuai dengan pengalaman semasa dan matlamat pembelajaran mereka.',
    'Are all workshops included?': 'Adakah semua bengkel termasuk?',
    'Workshop access follows the selected pass and track structure. Some sessions may have capacity limits or organiser confirmation.':
      'Akses bengkel mengikut pas dan struktur trek yang dipilih. Sesetengah sesi mungkin mempunyai had kapasiti atau memerlukan pengesahan penganjur.',
    'Can I attend both Foundation and Mastery sessions?': 'Bolehkah saya menghadiri sesi Foundation dan Mastery?',
    'Track access is subject to pass type, availability and organiser confirmation.': 'Akses trek tertakluk kepada jenis pas, ketersediaan dan pengesahan penganjur.',
    'Will there be showcase opportunities?': 'Adakah peluang showcase disediakan?',
    'The programme includes showcase and community-sharing moments. Specific participation details will be confirmed in the final schedule.':
      'Program ini merangkumi showcase dan momen perkongsian komuniti. Butiran penyertaan khusus akan disahkan dalam jadual akhir.',
    'Where will the sessions happen?': 'Di mana sesi akan berlangsung?',
    'Venue zones and room assignments will be announced closer to the convention.': 'Zon lokasi dan penugasan bilik akan diumumkan lebih dekat dengan konvensyen.',
    'Where is BICC 2026 held?': 'Di mana BICC 2026 diadakan?',
    'Will there be a venue map?': 'Adakah peta lokasi akan disediakan?',
    'Yes. The official venue map will be shared before the convention and will include key zones such as registration, workshop rooms, main hall, photo spots and food or rest areas.':
      'Ya. Peta lokasi rasmi akan dikongsi sebelum konvensyen dan merangkumi zon utama seperti pendaftaran, bilik bengkel, dewan utama, lokasi bergambar serta kawasan makanan atau rehat.',
    'Where do I register when I arrive?': 'Di mana saya daftar apabila tiba?',
    'Delegate and participant registration details will be included in the final venue guide and programme update.':
      'Butiran pendaftaran delegat dan peserta akan dimasukkan dalam panduan lokasi akhir dan kemas kini program.',
    'Are workshop rooms assigned already?': 'Adakah bilik bengkel sudah ditetapkan?',
    'Room assignments will be confirmed closer to the convention and may depend on track, session type and final venue layout.':
      'Penugasan bilik akan disahkan lebih dekat dengan konvensyen dan mungkin bergantung pada trek, jenis sesi dan susun atur lokasi akhir.',
    'Will there be food areas?': 'Adakah kawasan makanan tersedia?',
    'Food and rest area information will be included in the official venue guide once confirmed.': 'Maklumat kawasan makanan dan rehat akan dimasukkan dalam panduan lokasi rasmi selepas disahkan.',
    'Is accommodation included in the pass?': 'Adakah penginapan termasuk dalam pas?',
    'Accommodation is not listed as included unless specifically stated by the organiser.': 'Penginapan tidak disenaraikan sebagai termasuk melainkan dinyatakan secara khusus oleh penganjur.',
    'How do I receive venue updates?': 'Bagaimana saya menerima kemas kini lokasi?',
    'Follow the official BICC website or organiser updates for confirmed venue, programme and delegate/participant information.':
      'Ikuti laman web rasmi BICC atau kemas kini penganjur untuk maklumat lokasi, program dan peserta yang disahkan.',
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
    'Travel & Visitor Help': 'Bantuan Perjalanan & Pelawat',
    'Media & General': 'Media & Umum',
    'BICC FAQ': 'Soalan Lazim BICC',
    'Quick answers before you join BICC 2026.': 'Jawapan ringkas sebelum menyertai BICC 2026.',
    General: 'Umum',
    'Passes & Registration questions': 'Soalan Pas & Pendaftaran',
    'Workshops questions': 'Soalan Bengkel',
    'Programme questions': 'Soalan Program',
    'Venue & Visit questions': 'Soalan Lokasi & Lawatan',
    Joyful: 'Gembira',
    Cultural: 'Budaya',
    Inspiring: 'Menginspirasi',
    International: 'Antarabangsa',
    Community: 'Komuniti',
    'Joy that connects.': 'Kegembiraan yang menghubungkan.',
    'Rooted in Borneo.': 'Berakar di Borneo.',
    'Creative growth.': 'Pertumbuhan kreatif.',
    'Global exchange.': 'Pertukaran global.',
    'Hope through service.': 'Harapan melalui khidmat.',
    'Get Foundation Pass': 'Dapatkan Pas Foundation',
    'Get Mastery Pass': 'Dapatkan Pas Mastery',
    'View Instructors': 'Lihat Pengajar',
    'View Passes': 'Lihat Pas',
    'Explore Programme': 'Teroka Program',
    'Explore Workshops': 'Teroka Bengkel',
    'Learn About BICC': 'Ketahui Tentang BICC',
    'Compare Foundation & Mastery Tracks': 'Bandingkan Trek Foundation & Mastery',
    'Where Laughter Becomes Legacy.': 'Di mana tawa menjadi legasi.',
    'Official Convention Magazine & Participant Handbook': 'Majalah Rasmi Konvensyen & Buku Panduan Peserta',
    'What Is BICC?': 'Apakah BICC?',
    'A convention for people who want practical growth, not just inspiration.': 'Konvensyen untuk mereka yang mahu perkembangan praktikal, bukan sekadar inspirasi.',
    'BICC brings together training, live performance, cultural exchange and community connection in one focused convention experience.':
      'BICC menghimpunkan latihan, persembahan langsung, pertukaran budaya dan hubungan komuniti dalam satu pengalaman konvensyen yang fokus.',
    'Learn The Craft': 'Pelajari Kemahiran',
    'Train inside clear Foundation and Mastery pathways built for real progress.': 'Berlatih melalui laluan Foundation dan Mastery yang jelas untuk kemajuan sebenar.',
    'Share The Stage': 'Kongsi Pentas',
    'Develop work for the stage, not just for the classroom.': 'Bangunkan karya untuk pentas, bukan hanya untuk kelas.',
    'Serve The Community': 'Berkhidmat Untuk Komuniti',
    'Exchange ideas, methods and cultural perspectives with artists from different contexts.': 'Bertukar idea, kaedah dan perspektif budaya dengan artis daripada pelbagai latar.',
    'Foundation builds your base. Mastery sharpens a working act.': 'Foundation membina asas anda. Mastery mempertajam persembahan sedia ada.',
    'For beginners, emerging performers, educators, students and teaching artists.': 'Untuk pemula, penghibur baharu, pendidik, pelajar dan artis pengajar.',
    'For experienced performers, working clowns and stage artists ready for critique.': 'Untuk penghibur berpengalaman, badut bekerja dan artis pentas yang bersedia menerima maklum balas.',
    'Build confidence, character, timing and the physical clarity needed to hold an audience.': 'Bina keyakinan, watak, masa komedi dan kejelasan fizikal untuk menarik perhatian penonton.',
    'Refine stage presence, strengthen your act and make sharper professional choices under real feedback.':
      'Perhalus kehadiran pentas, kukuhkan persembahan dan buat pilihan profesional yang lebih tajam melalui maklum balas sebenar.',
    'New to clowning or building confidence? Start with Foundation. Already performing for audiences? Choose Mastery.':
      'Baharu dalam dunia badut atau sedang membina keyakinan? Mulakan dengan Foundation. Sudah membuat persembahan? Pilih Mastery.',
    'Programme Snapshot': 'Ringkasan Program',
    'Fast to scan, easy to understand and built around a shared convention rhythm.': 'Mudah diimbas, senang difahami dan dibina mengikut rentak konvensyen bersama.',
    'Instructors & Performers': 'Pengajar & Penghibur',
    'Instructors & Guest Artists': 'Pengajar & Artis Jemputan',
    'Learn From Artists Who Live The Stage.': 'Belajar daripada artis yang hidup di pentas.',
    'Instructors are selected for stage credibility, teaching clarity and real audience experience.':
      'Pengajar dipilih berdasarkan kredibiliti pentas, kejelasan mengajar dan pengalaman penonton sebenar.',
    'Take your place in the BICC 2026 circle.': 'Ambil tempat anda dalam komuniti BICC 2026.',
    'Choose your track and join three days of training, performance, exchange and red-nose energy in Borneo.':
      'Pilih trek anda dan sertai tiga hari latihan, persembahan, pertukaran dan tenaga hidung merah di Borneo.',
    'A convention built around laughter, craft, culture and human connection.': 'Konvensyen yang dibina atas tawa, kemahiran, budaya dan hubungan manusia.',
    'Laughter, craft and culture in one Borneo convention.': 'Tawa, kemahiran dan budaya dalam satu konvensyen Borneo.',
    'BICC 2026 is a professional clowning convention held in Borneo, bringing together performers, educators, artists, families and communities through workshops, showcases, cultural exchange and meaningful human connection.':
      'BICC 2026 ialah konvensyen badut profesional di Borneo yang menghimpunkan penghibur, pendidik, artis, keluarga dan komuniti melalui bengkel, showcase, pertukaran budaya dan hubungan manusia yang bermakna.',
    'Professional workshops': 'Bengkel profesional',
    'Stage showcase': 'Showcase pentas',
    'Borneo culture': 'Budaya Borneo',
    'Community impact': 'Impak komuniti',
    'Editorial Note': 'Nota Editorial',
    'Why it matters': 'Mengapa ia penting',
    'BICC 2026 was created to raise the standard of clowning as an art form, a performance discipline and a tool for community impact. Beyond entertainment, clowning carries the power to connect people, bring joy into difficult spaces, and create unforgettable human moments.':
      'BICC 2026 diwujudkan untuk meningkatkan standard seni badut sebagai bentuk seni, disiplin persembahan dan alat impak komuniti. Di luar hiburan, seni badut mampu menghubungkan manusia, membawa kegembiraan ke ruang yang sukar dan mencipta detik kemanusiaan yang tidak dilupakan.',
    'Page Overview': 'Gambaran Halaman',
    'What makes BICC 2026 different.': 'Apa yang menjadikan BICC 2026 berbeza.',
    'Professional Learning': 'Pembelajaran Profesional',
    'Structured workshops, international instructors and practical training for performers who want to grow their craft.':
      'Bengkel berstruktur, pengajar antarabangsa dan latihan praktikal untuk penghibur yang mahu mengembangkan kemahiran.',
    'Cultural Exchange': 'Pertukaran Budaya',
    'A joyful gathering rooted in Borneo, connecting local creativity with regional and international clowning communities.':
      'Perhimpunan penuh kegembiraan yang berakar di Borneo, menghubungkan kreativiti tempatan dengan komuniti badut serantau dan antarabangsa.',
    'Community Impact': 'Impak Komuniti',
    'Clowning is presented not only as performance, but as a way to bring hope, care and connection to people.':
      'Seni badut ditampilkan bukan sahaja sebagai persembahan, tetapi sebagai cara membawa harapan, penjagaan dan hubungan kepada manusia.',
    'Our Vision': 'Visi Kami',
    'Where laughter becomes legacy.': 'Di mana tawa menjadi legasi.',
    'To build BICC into a respected international platform where clown artists, educators, performers and communities gather to learn, collaborate and carry the spirit of joy beyond the stage.':
      'Membangunkan BICC sebagai platform antarabangsa yang dihormati, tempat artis badut, pendidik, penghibur dan komuniti berkumpul untuk belajar, bekerjasama dan membawa semangat gembira melepasi pentas.',
    'This is more than a convention. It is a growing movement for craft, culture and connection.': 'Ini lebih daripada konvensyen. Ia gerakan yang berkembang untuk kemahiran, budaya dan hubungan.',
    'Who Should Join': 'Siapa Patut Sertai',
    'Designed for performers, educators, families and communities.': 'Direka untuk penghibur, pendidik, keluarga dan komuniti.',
    'BICC 2026 welcomes people from different backgrounds who believe in the power of joy, creativity and human connection.':
      'BICC 2026 mengalu-alukan orang daripada pelbagai latar yang percaya pada kuasa kegembiraan, kreativiti dan hubungan manusia.',
    'Built In Borneo': 'Dibina Di Borneo',
    'Built in Borneo. Open to the world.': 'Dibina di Borneo. Terbuka kepada dunia.',
    'Hosted in Tawau, Sabah, BICC 2026 carries the warmth of Borneo while welcoming guests from different countries and creative backgrounds. It is a convention, a cultural meeting point, and a shared celebration of laughter, learning and community.':
      'Diadakan di Tawau, Sabah, BICC 2026 membawa kehangatan Borneo sambil menyambut tetamu dari pelbagai negara dan latar kreatif. Ia sebuah konvensyen, titik pertemuan budaya dan sambutan bersama untuk tawa, pembelajaran dan komuniti.',
    'Discover Tawau': 'Teroka Tawau',
    'Beyond The Event': 'Melebihi Acara',
    'More than a three-day event.': 'Lebih daripada acara tiga hari.',
    'BICC 2026 is part of a bigger journey to strengthen clowning culture, support creative growth and build a connected community through the Borneo Clown Hub. The convention is the beginning — the relationships, learning and impact continue beyond the event.':
      'BICC 2026 ialah sebahagian daripada perjalanan yang lebih besar untuk mengukuhkan budaya badut, menyokong pertumbuhan kreatif dan membina komuniti berhubung melalui Borneo Clown Hub. Konvensyen ini permulaan — hubungan, pembelajaran dan impak berterusan selepas acara.',
    'Organised With Purpose': 'Dianjurkan Dengan Tujuan',
    'Created by people who believe in the power of joyful impact.': 'Dicipta oleh mereka yang percaya pada kuasa impak gembira.',
    'Ready To Join': 'Sedia Sertai',
    'Be part of BICC 2026.': 'Jadilah sebahagian daripada BICC 2026.',
    Programme: 'Program',
    'See the 3-Day BICC Journey.': 'Lihat perjalanan BICC selama 3 hari.',
    'Official Convention Programme': 'Program Rasmi Konvensyen',
    'Convention at a Glance': 'Konvensyen Sepintas Lalu',
    'A simple rhythm before the detailed schedule.': 'Rentak ringkas sebelum jadual terperinci.',
    'Day-by-Day Programme': 'Program Hari ke Hari',
    'Follow the three-day convention rhythm.': 'Ikuti rentak konvensyen tiga hari.',
    'How the Programme Connects to Your Pass': 'Bagaimana Program Berkait Dengan Pas Anda',
    'Your pass shapes the workshop focus inside the wider convention journey.': 'Pas anda menentukan fokus bengkel dalam perjalanan konvensyen yang lebih luas.',
    'Programme FAQ': 'Soalan Lazim Program',
    'Quick answers before the full schedule is released.': 'Jawapan ringkas sebelum jadual penuh dikeluarkan.',
    'Plan Your 3-Day BICC Journey.': 'Rancang perjalanan BICC 3 hari anda.',
    'Registration, Opening & First Classes': 'Pendaftaran, Pembukaan & Kelas Pertama',
    'Parallel Classes & Competition': 'Kelas Selari & Pertandingan',
    'Outreach, Final Briefing & International Night Show': 'Outreach, Taklimat Akhir & Persembahan Malam Antarabangsa',
    Registration: 'Pendaftaran',
    Opening: 'Pembukaan',
    Lunch: 'Makan Tengah Hari',
    'Parallel Class 1': 'Kelas Selari 1',
    'Tea Break': 'Rehat Teh',
    'Parallel Class 2': 'Kelas Selari 2',
    'Parallel Class 3': 'Kelas Selari 3',
    'Parallel Class 4': 'Kelas Selari 4',
    'Parallel Class 5': 'Kelas Selari 5',
    'Parallel Class 6': 'Kelas Selari 6',
    'Jamming Session': 'Sesi Jamming',
    'International Night Show': 'Persembahan Malam Antarabangsa',
    'A formal closing event celebrating cultural exchange and international collaboration. Attendees will enjoy an elegant dinner accompanied by lively performances, followed by an awards ceremony recognizing outstanding achievements and contributions to the art of clowning.':
      'Acara penutup rasmi yang meraikan pertukaran budaya dan kerjasama antarabangsa. Tetamu akan menikmati makan malam elegan bersama persembahan meriah, diikuti majlis anugerah yang mengiktiraf pencapaian dan sumbangan cemerlang dalam seni badut.',
    'Auditorium Session': 'Sesi Auditorium',
    Rest: 'Rehat',
    'Variety Art Competition': 'Pertandingan Seni Variasi',
    'Humanitarian Activities': 'Aktiviti Kemanusiaan',
    'Final Briefing': 'Taklimat Akhir',
    'Preparation for Gala Night': 'Persiapan Gala Night',
    'Hall Opens': 'Dewan Dibuka',
    'Workshop Catalogue': 'Katalog Bengkel',
    'Hands-on sessions designed to help you create, connect, perform and serve.': 'Sesi praktikal yang membantu anda mencipta, berhubung, membuat persembahan dan berkhidmat.',
    'Participants are entitled to attend all eight classes included in their selected level. All classes are subject to change.':
      'Peserta berhak menghadiri semua lapan kelas dalam tahap yang dipilih. Semua kelas tertakluk kepada perubahan.',
    'Included in Pass': 'Termasuk Dalam Pas',
    'Who it is for': 'Untuk siapa',
    'Workshop Rhythm': 'Rentak Bengkel',
    'Workshops sit inside the wider 3-day BICC journey.': 'Bengkel adalah sebahagian daripada perjalanan BICC 3 hari.',
    'Training, exchange and showcase moments across three days.': 'Latihan, pertukaran dan showcase sepanjang tiga hari.',
    'Workshop FAQ': 'Soalan Lazim Bengkel',
    'Short answers before you choose your track.': 'Jawapan ringkas sebelum memilih trek.',
    'Join the Training': 'Sertai Latihan',
    'Ready to Build Your Clown Practice?': 'Sedia membina amalan badut anda?',
    'Build Real Clown Practice.': 'Bina amalan badut yang sebenar.',
    'Focused Workshop Learning': 'Pembelajaran Bengkel Berfokus',
    'Choose the Workshop Path That Fits Your Stage.': 'Pilih laluan bengkel yang sesuai dengan tahap anda.',
    'Choose the path that fits your current stage.': 'Pilih laluan yang sesuai dengan tahap semasa anda.',
    'Balloon Twisting Class': 'Kelas Memutar Belon',
    'Magic for Children': 'Silap Mata untuk Kanak-kanak',
    'Creative Story-Telling': 'Penceritaan Kreatif',
    'Original Clown Performance': 'Persembahan Badut Asli',
    'Puppet Sounds & Manipulation': 'Bunyi & Manipulasi Boneka',
    'Community & Hospital Clowning': 'Badut Komuniti & Hospital',
    'Creative Story-Telling for Children': 'Penceritaan Kreatif untuk Kanak-kanak',
    'Puppet Making, Sounds & Manipulation': 'Pembuatan Boneka, Bunyi & Manipulasi',
    'How to Start a 1 Min Show': 'Cara Memulakan Persembahan 1 Minit',
    'Juggling Class': 'Kelas Juggling',
    'Clown Makeup & Costumes': 'Solekan & Kostum Badut',
    'Creative Clowns for Community Care & Hospitals': 'Badut Kreatif untuk Penjagaan Komuniti & Hospital',
    'Find Your Way in Borneo.': 'Cari arah anda di Borneo.',
    'Official Delegate & Participant Venue Guide': 'Panduan Lokasi Rasmi Peserta',
    'The essentials delegates and participants want first.': 'Maklumat penting yang paling diperlukan peserta.',
    'Calvary Crown Overview': 'Gambaran Calvary Crown',
    'Know the building before you arrive.': 'Kenali bangunan sebelum tiba.',
    'Delegate & Participant Flow': 'Aliran Peserta',
    'Think vertical, not complicated.': 'Fikirkan aliran tingkat, bukan sesuatu yang rumit.',
    'How to Arrive and Check In': 'Cara Tiba dan Daftar Masuk',
    'A simple step-by-step guide for the delegate and participant arrival experience.': 'Panduan langkah demi langkah untuk pengalaman ketibaan peserta.',
    'A clear arrival plan for delegates and participants.': 'Pelan ketibaan yang jelas untuk peserta.',
    'Arrival Route': 'Laluan Ketibaan',
    'From travel to check-in.': 'Dari perjalanan ke daftar masuk.',
    'Venue FAQ': 'Soalan Lazim Lokasi',
    'Short answers for first-time delegates and participants.': 'Jawapan ringkas untuk peserta pertama kali.',
    'Ready to Gather in Borneo?': 'Sedia berkumpul di Borneo?',
    Location: 'Lokasi',
    'Convention Dates': 'Tarikh Konvensyen',
    'Main Activities': 'Aktiviti Utama',
    Updates: 'Kemas Kini',
    'Arrive in Tawau': 'Tiba di Tawau',
    'Find Calvary Crown': 'Cari Calvary Crown',
    'Check In': 'Daftar Masuk',
    'Join the Opening Flow': 'Sertai Aliran Pembukaan',
    'By Air': 'Melalui Udara',
    'Stay Nearby': 'Menginap Berdekatan',
    'Start at Reception': 'Mula di Kaunter Penerimaan',
    'What to Bring': 'Apa Perlu Dibawa',
    'Comfort & Access': 'Keselesaan & Akses',
    'Follow Updates': 'Ikuti Kemas Kini',
    'Dining Hall': 'Dewan Makan',
    'Workshop Rooms + Solat Room': 'Bilik Bengkel + Bilik Solat',
    Accommodation: 'Penginapan',
    'Workshop Room': 'Bilik Bengkel',
    Auditorium: 'Auditorium',
    'Cafe / Reception': 'Kafe / Penerimaan',
    Arrive: 'Tiba',
    Gather: 'Berkumpul',
    Train: 'Berlatih',
    Dine: 'Makan',
    Food: 'Makanan',
    Stay: 'Penginapan',
    Transport: 'Pengangkutan',
    'Things To Do': 'Aktiviti',
    'Eat Tawau Without Overplanning': 'Nikmati Tawau tanpa terlalu banyak merancang',
    'Tawau Food Guide': 'Panduan Makanan Tawau',
    'Food ideas delegates can scan fast.': 'Idea makanan yang mudah diimbas peserta.',
    'Food ideas participants can scan fast.': 'Idea makanan yang mudah diimbas peserta.',
    'Accommodation References': 'Rujukan Penginapan',
    'Suggested stays from local accommodation materials.': 'Cadangan penginapan berdasarkan bahan tempatan.',
    'Event Destination': 'Destinasi Acara',
    'Local Experience': 'Pengalaman Tempatan',
    'Seafood & Local Dining': 'Makanan Laut & Sajian Tempatan',
    'Kopitiam Breakfast': 'Sarapan Kopitiam',
    'Street Food & Local Snacks': 'Makanan Jalanan & Snek Tempatan',
    'Cafe Stops': 'Hentian Kafe',
    'Near the Convention Venue': 'Berdekatan Lokasi Konvensyen',
    'City Centre Hotels': 'Hotel Pusat Bandar',
    'Group-Friendly Stays': 'Penginapan Mesra Kumpulan',
    'Simple & Practical Options': 'Pilihan Ringkas & Praktikal',
    'Airport to City / Venue': 'Lapangan Terbang ke Bandar / Lokasi',
    'Around Town': 'Sekitar Bandar',
    'Convention Days': 'Hari Konvensyen',
    'Pasar Tanjung Tawau': 'Pasar Tanjung Tawau',
    'Balung Cocos Columnar Basalt': 'Balung Cocos Columnar Basalt',
    'Tawau Hills Park': 'Taman Bukit Tawau',
    'Pasar Malam Chester': 'Pasar Malam Chester',
    'Teck Guan Cocoa Village & Waterfall': 'Teck Guan Cocoa Village & Waterfall',
    'Teck Guan Cocoa Village Waterfall': 'Air Terjun Teck Guan Cocoa Village',
    'Waterfront & City Walks': 'Waterfront & Jalan-jalan Bandar',
    'Explore Tawau between convention moments.': 'Teroka Tawau di antara sesi konvensyen.',
    'Borneo Experience': 'Pengalaman Borneo',
    'Join us in Tawau for learning, laughter, connection and a journey beyond the convention hall.':
      'Sertai kami di Tawau untuk pembelajaran, tawa, hubungan dan perjalanan melepasi dewan konvensyen.',
    'Sponsors & Partnerships': 'Penaja & Kerjasama',
    'Partner with BICC 2026.': 'Jadi rakan BICC 2026.',
    'Official Partnership Entry': 'Laluan Rasmi Kerjasama',
    'International Convention': 'Konvensyen Antarabangsa',
    'Family & Community Reach': 'Jangkauan Keluarga & Komuniti',
    'Sabah / Tawau Destination Event': 'Acara Destinasi Sabah / Tawau',
    'Request Sponsorship Deck': 'Minta Deck Penajaan',
    'Talk to Partnership Team': 'Bercakap Dengan Pasukan Kerjasama',
    'Why Sponsor BICC?': 'Mengapa Menaja BICC?',
    'Sponsorship Opportunities': 'Peluang Penajaan',
    'Where Your Brand Appears': 'Di Mana Jenama Anda Muncul',
    'Sponsorship Packages': 'Pakej Penajaan',
    'Become a Sponsor': 'Jadi Penaja',
    'Let’s build a joyful partnership.': 'Mari bina kerjasama yang menggembirakan.',
    Organiser: 'Penganjur',
    'Collaboration Partners': 'Rakan Kerjasama',
    'Supported By': 'Disokong Oleh',
    'Association & Business Partners': 'Rakan Persatuan & Perniagaan',
    'Brand Visibility': 'Keterlihatan Jenama',
    'CSR & Community Impact': 'CSR & Impak Komuniti',
    'Tourism & Local Business': 'Pelancongan & Perniagaan Tempatan',
    'Cultural Partnership': 'Kerjasama Budaya',
    'Main Stage Partner': 'Rakan Pentas Utama',
    'Workshop Partner': 'Rakan Bengkel',
    'Red Nose CSR Partner': 'Rakan CSR Red Nose',
    'Delegate Experience Partner': 'Rakan Pengalaman Peserta',
    'Delegate & Participant Support': 'Sokongan Peserta',
    'Delegate / Participant Details': 'Butiran Peserta',
    'Travel & Hospitality Partner': 'Rakan Perjalanan & Hospitaliti',
    'Official Magazine / Media Partner': 'Rakan Majalah Rasmi / Media',
    'Legacy Partner': 'Rakan Legacy',
    'Signature Partner': 'Rakan Signature',
    'Impact Partner': 'Rakan Impact',
    'Community Partner': 'Rakan Komuniti',
    'Official Contact': 'Hubungan Rasmi',
    'Choose the right desk': 'Pilih saluran yang betul',
    'Before you write': 'Sebelum anda menulis',
    'Wear the': 'Pakai',
    'Red Nose.': 'Hidung Merah.',
    'Share the Hope.': 'Kongsi Harapan.',
    'Official home of Borneo International Clown Convention 2026.': 'Laman rasmi Borneo International Clown Convention 2026.',
    'Venue & Travel': 'Lokasi & Perjalanan',
    Partners: 'Rakan Kongsi',
    Admin: 'Admin',
    'Next Step': 'Langkah Seterusnya',
    'Join BICC 2026': 'Sertai BICC 2026',
    'Official workshop access': 'Akses bengkel rasmi',
    'Translation Roadmap': 'Pelan Terjemahan',
    'Content Admin': 'Admin Kandungan',
    'Editable Content': 'Kandungan Boleh Disunting',
    'Before Launch': 'Sebelum Pelancaran',
    '© 2026 Borneo International Clown Convention. All rights reserved.': '© 2026 Borneo International Clown Convention. Hak cipta terpelihara.',
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
    price: 'US$190',
    badge: 'Best for beginners and emerging performers',
    label: 'Foundation Workshop Pass',
    headline: 'Build Your Professional Foundation',
    body: 'For newer performers who want fundamentals, playful tools and stage confidence.',
    badges: ['No prior experience required', '8 beginner classes included', 'All classes subject to change'],
    includes: [
      'Balloon Twisting Class',
      'Magic for Children',
      'Creative Story-Telling for Children',
      'Basic Puppet Making & Manipulation',
      'How to Start a 1 Min Show',
      'Basic Juggling Class',
      'Clown Makeup & Costumes',
      'Creative Clowns for Community Care',
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
    price: 'US$190',
    badge: 'Best for experienced performers',
    label: 'Mastery Workshop Pass',
    headline: 'Elevate Your Stage Performance',
    body: 'For working performers ready for sharper timing, critique and stage command.',
    badges: ['Prior stage experience recommended', '8 mastery classes included', 'All classes subject to change'],
    includes: [
      'Balloon Twisting Class',
      'Magic for Children',
      'Creative Story-Telling for Children / Clown Ministry',
      'Puppet Sounds & Manipulation for Children',
      'Develop Original Clown Performances',
      'Juggling Class',
      'Clown Characters & Costumes',
      'Creative Clowns for Community Care & Hospitals',
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
    title: 'Instructor-Led Learning',
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
    description: 'Complete checkout through the official BICC Stripe payment link for your selected pass.',
    icon: 'F',
  },
  {
    title: 'Submit Participant Details',
    description: 'After payment, send your details with the same email used for your Stripe receipt.',
    icon: 'E',
  },
  {
    title: 'Prepare for BICC',
    description: 'Watch for official email updates about programme, venue, check-in and arrival notes.',
    icon: 'B',
  },
] as const

const passFaqItems = [
  {
    question: 'What is the price of each pass?',
    answer: 'Both Foundation and Mastery passes are listed at US$190, unless the organizer updates the official pricing.',
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
    answer:
      'Yes. The e-certificate will be sent by email after participants complete the feedback form. The link will be provided by the organizer.',
  },
  {
    question: 'What happens after I register?',
    answer:
      'After Stripe checkout, complete the participant details form using your receipt email. The BICC team will use that information for official follow-up, programme updates and check-in preparation.',
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
    body: 'Registration, opening, first parallel classes, jamming and International Night Show.',
  },
  {
    day: 'Day 2',
    title: 'Workshops & Exchange',
    body: 'Parallel classes, auditorium session, jamming and Variety Art Competition.',
  },
  {
    day: 'Day 3',
    title: 'Showcase & Community',
    body: 'Humanitarian activities, final briefing, preparation and International Night Show.',
  },
]

const workshopHighlights = [
  {
    track: 'Foundation',
    title: 'Balloon Twisting Class',
    body: 'Build practical visual skills for family shows, schools and event audiences.',
    accent: 'foundation',
  },
  {
    track: 'Foundation',
    title: 'Magic for Children',
    body: 'Create simple surprise, audience participation and child-friendly wonder.',
    accent: 'foundation',
  },
  {
    track: 'Foundation',
    title: 'Creative Story-Telling',
    body: 'Shape stories that carry character, message and audience connection.',
    accent: 'foundation',
  },
  {
    track: 'Mastery',
    title: 'Original Clown Performance',
    body: 'Develop clearer stage material and more distinctive performance choices.',
    accent: 'mastery',
  },
  {
    track: 'Mastery',
    title: 'Puppet Sounds & Manipulation',
    body: 'Use puppet voice, movement and handling for children-focused performance.',
    accent: 'mastery',
  },
  {
    track: 'Mastery',
    title: 'Community & Hospital Clowning',
    body: 'Explore creative clowning for care, community and sensitive spaces.',
    accent: 'mastery',
  },
]

const workshopCards = [
  {
    id: 'balloon-twisting',
    title: 'Balloon Twisting Class',
    track: 'Foundation / Mastery',
    trackType: 'mastery' as ProgrammeSessionType,
    description:
      'Build practical balloon skills that support visual comedy, audience connection and fast event-ready moments.',
    forWhom: 'Beginners, family entertainers, school performers and working clowns.',
    outcomes: ['Balloon forms', 'Visual play', 'Audience participation', 'Event routines', 'Hands-on practice'],
    image: landingMasteryTrackImage,
    featured: true,
  },
  {
    id: 'magic-for-children',
    title: 'Magic for Children',
    track: 'Foundation / Mastery',
    trackType: 'foundation' as ProgrammeSessionType,
    description:
      'Create simple moments of wonder designed for children, families and interactive stage situations.',
    forWhom: 'Clowns, magicians, family performers, educators and children ministry teams.',
    outcomes: ['Magic structure', 'Child-friendly wonder', 'Volunteer handling', 'Comic timing', 'Audience safety'],
    image: landingFoundationTrackImage,
    featured: false,
  },
  {
    id: 'creative-storytelling',
    title: 'Creative Story-Telling for Children',
    track: 'Foundation / Mastery',
    trackType: 'exchange' as ProgrammeSessionType,
    description:
      'Shape clearer stories for children, classroom audiences, family shows and clown ministry contexts.',
    forWhom: 'Educators, children ministry teams, school performers and family entertainers.',
    outcomes: ['Story structure', 'Character-led messages', 'Children audience flow', 'Clown ministry format', 'Participation'],
    image: landingWorkshopMagicImage,
    featured: false,
  },
  {
    id: 'puppet-making',
    title: 'Puppet Making, Sounds & Manipulation',
    track: 'Foundation / Mastery',
    trackType: 'community' as ProgrammeSessionType,
    description:
      'Explore puppet basics, sound, manipulation and child-friendly character work for live interaction.',
    forWhom: 'Children performers, outreach teams, educators and visual storytellers.',
    outcomes: ['Basic puppet making', 'Puppet sounds', 'Manipulation basics', 'Character voice', 'Visual communication'],
    image: landingWorkshopOutreachImage,
    featured: false,
  },
  {
    id: 'one-minute-show',
    title: 'How to Start a 1 Min Show',
    track: 'Foundation',
    trackType: 'foundation' as ProgrammeSessionType,
    description:
      'Learn how to begin a short act with a clear opening, simple rhythm and confident audience connection.',
    forWhom: 'New performers, students, educators and artists building stage confidence.',
    outcomes: ['Short act structure', 'Clear opening', 'Simple conflict', 'Ending beat', 'Confidence building'],
    image: landingWorkshopEducationImage,
    featured: false,
  },
  {
    id: 'juggling-class',
    title: 'Juggling Class',
    track: 'Foundation / Mastery',
    trackType: 'showcase' as ProgrammeSessionType,
    description:
      'Develop rhythm, focus and playful prop control through practical juggling exercises.',
    forWhom: 'Clowns, variety artists, family entertainers and performers strengthening physical skill.',
    outcomes: ['Basic patterns', 'Rhythm', 'Stage focus', 'Prop control', 'Practice habits'],
    image: landingWorkshopTrainingImage,
    featured: false,
  },
  {
    id: 'clown-makeup-costumes',
    title: 'Clown Makeup & Costumes',
    track: 'Foundation / Mastery',
    trackType: 'foundation' as ProgrammeSessionType,
    description:
      'Understand how makeup, colour, costume choices and character clarity shape audience recognition.',
    forWhom: 'Beginners, family entertainers, educators and performers refining character identity.',
    outcomes: ['Makeup basics', 'Costume clarity', 'Character design', 'Colour choices', 'Stage readability'],
    image: landingWorkshopEducationImage,
    featured: false,
  },
  {
    id: 'community-hospital-clowning',
    title: 'Creative Clowns for Community Care & Hospitals',
    track: 'Mastery / Community',
    trackType: 'community' as ProgrammeSessionType,
    description:
      'Practice respectful clowning for community care, hospital contexts and sensitive human connection.',
    forWhom: 'Community workers, hospital clowns, volunteers and performers interested in outreach.',
    outcomes: ['Reading the room', 'Gentle presence', 'Care settings', 'Community connection', 'Respectful interaction'],
    image: landingWorkshopOutreachImage,
    featured: false,
  },
] as const

const workshopSchedulePreview = [
  {
    day: 'Day 1',
    title: 'Registration, Opening & First Classes',
    body: 'Opening flow, Parallel Class 1, Parallel Class 2, jamming and International Night Show.',
  },
  {
    day: 'Day 2',
    title: 'Parallel Classes & Competition',
    body: 'Auditorium session, Parallel Classes 3–5, jamming and Variety Art Competition.',
  },
  {
    day: 'Day 3',
    title: 'Outreach, Final Briefing & International Night Show',
    body: 'Humanitarian activities, Parallel Class 6, final briefing and International Night Show.',
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
    answer: 'The main programme timing and class list are now available. Final room assignments, instructor allocation and class changes remain subject to organiser confirmation.',
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
    answer:
      'Yes. The e-certificate will be sent by email after participants complete the feedback form. The link will be provided by the organizer.',
  },
] as const

const mentorCards = [
  {
    title: 'International Guest Instructors',
    body: 'Official instructor announcements will be released as the faculty line-up is confirmed.',
  },
  {
    title: 'Performance-Led Teaching',
    body: 'The instructor team is being curated around clowning, stage craft, education and creative leadership.',
  },
  {
    title: 'Regional & Global Exchange',
    body: 'BICC will bring together voices from Borneo, Malaysia and the wider international clown community.',
  },
]

const mentorPreviewCards = [
  {
    title: 'International Instructor',
    meta: 'Physical Comedy, Stage Presence & Live Performance Craft',
    track: 'Foundation Track',
    note: 'Instructor Announcement Wave 1',
    image: mentorPortraitRandy,
  },
  {
    title: 'Regional Teaching Artist',
    meta: 'Character Building, Teaching Practice & Community Performance',
    track: 'Foundation Track',
    note: 'Regional Artist-Educator',
    image: mentorPortraitUncleButton,
  },
  {
    title: 'Creative Exchange Instructor',
    meta: 'Audience Connection, Exchange Practice & Cultural Collaboration',
    track: 'Exchange Lab',
    note: 'International Exchange Instructor',
    image: mentorPortraitPayaCocos,
  },
  {
    title: 'Showcase Development Instructor',
    meta: 'Act Refinement, Showcase Direction & Professional Feedback',
    track: 'Mastery Track',
    note: 'Mastery Track Instructor',
    image: mentorPortraitChagy,
  },
]

type MentorFilterKey = 'all' | 'malaysia' | 'asia' | 'usa' | 'workshop-mentors' | 'guest-artists'

const mentorLineupOnlyIds = new Set(['mr-john'])
const mentorLineupOnlyNames = new Set(['mr. john'])

function isLineupOnlyMentor(id: string, name: string) {
  return mentorLineupOnlyIds.has(id) || mentorLineupOnlyNames.has(name.trim().toLowerCase())
}

const mentorFilterItems: Array<{ key: MentorFilterKey; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'malaysia', label: 'Malaysia' },
  { key: 'asia', label: 'Asia' },
  { key: 'usa', label: 'USA' },
  { key: 'workshop-mentors', label: 'Workshop Instructors' },
  { key: 'guest-artists', label: 'Guest Artists' },
]

const mentorLineup: MentorProfile[] = [
  {
    id: 'uncle-sunday',
    name: 'Uncle Sunday',
    country: 'Malaysia',
    region: 'Malaysia',
    role: 'Guest Artist / Convention Organiser',
    shortIntro: 'A Malaysia-based clown performer and BICC organiser known for heartwarming outreach in schools, churches and charity programmes, using humour as a bridge for connection and healing.',
    specialties: ['Community Outreach', 'Faith-Driven Clowning', 'Connection'],
    image: mentorPortraitUncleSunday,
    featured: true,
  },
  {
    id: 'paya-cocos',
    name: 'Paya Cocos',
    country: 'Mexico',
    region: 'International',
    role: 'Guest Artist',
    shortIntro: 'A guest artist joining the BICC 2026 line-up to bring colorful stage presence, international exchange and live performance energy to delegates and participants.',
    specialties: ['Guest Artist', 'Stage Performance', 'International Line-up'],
    image: mentorPortraitPayaCocos,
    featured: true,
  },
  {
    id: 'chagy',
    name: 'Chagy',
    country: 'USA',
    region: 'USA',
    role: 'Comedy Clown / Global Family Entertainer',
    shortIntro: 'Eugenio “Chagy” Adorno is a high-energy comedy clown and bilingual family entertainer whose work blends magic, mime, juggling, storytelling and heart-led audience connection across international stages.',
    specialties: ['Magic & Mime', 'Family Entertainment', 'Storytelling'],
    sourceUrl: 'https://texasclownassociation.com/tca-convention/headliner/',
    image: mentorPortraitChagy,
    featured: true,
  },
  {
    id: 'uncle-button',
    name: 'Uncle Button',
    country: 'Malaysia',
    region: 'Malaysia',
    role: 'Workshop Instructor / Community Clown',
    shortIntro: 'One of Malaysia’s well-known clowns, Sam Tee began with balloons at children’s parties, trained in the U.S. and has brought clowning into charity, missions and community work.',
    specialties: ['Family Entertainment', 'Balloon Art', 'Community Clowning'],
    image: mentorPortraitUncleButton,
    featured: true,
  },
  {
    id: 'randy-christensen',
    name: 'Randy Christensen',
    country: 'USA',
    region: 'USA',
    role: 'Master Clown / Performance Instructor',
    shortIntro: 'An award-winning Master Clown, entertainer and speaker with 40+ years of experience across 32 U.S. states and 9 countries, bringing variety arts, storytelling and physical comedy to BICC.',
    specialties: ['Master Clown', 'Variety Arts', 'Storytelling'],
    image: mentorPortraitRandy,
    featured: true,
  },
  {
    id: 'mr-john',
    name: 'Mr. John',
    country: 'Malaysia',
    region: 'Malaysia',
    role: 'Contemporary Clown / Teaching Artist',
    shortIntro: 'A contemporary clown and performance artist with 20+ years across commercial events, theatre and street festivals worldwide, blending puppetry, mime, physical comedy and heartfelt interactive storytelling.',
    specialties: ['Contemporary Performance', 'Puppetry & Mime', 'Physical Comedy'],
    image: mentorPortraitMrJohn,
    featured: false,
  },
  {
    id: 'kak-yogi',
    name: 'Kak Yogi',
    country: 'Indonesia',
    region: 'Asia',
    role: 'Community Instructor',
    shortIntro: 'A community instructor joining the BICC line-up to contribute regional perspective, creative exchange and performance conversation.',
    specialties: ['Community Clowning', 'Guest Artist', 'Details Coming Soon'],
    image: mentorPortraitKakYogi,
    featured: false,
  },
  {
    id: 'watt-de-clown',
    name: 'Watt De Clown',
    country: 'Malaysia',
    region: 'Malaysia',
    role: 'Magical Clown / Community Performer',
    shortIntro: 'Noor Hidawati Mohd Juki, known as Watt De Clown, is a Malaysian performer active in clowning, arts activities and community events, bringing magical clown shows and approachable family entertainment to public audiences.',
    specialties: ['Magical Clowning', 'Community Events', 'Family Shows'],
    sourceUrl: 'https://kitareporters.com/insan/WPe9r50ZaL',
    image: mentorPortraitWatt,
    featured: false,
  },
  {
    id: 'kosuke-omune',
    name: 'Kosuke Omune',
    country: 'Japan',
    region: 'Asia',
    role: 'Hospital Clown / Guest Artist',
    shortIntro: 'Kosuke Omune is a pioneering Japanese hospital clown and president of the Japan Hospital Clown Association, recognised internationally for bringing laughter and care into children’s hospitals.',
    specialties: ['Hospital Clowning', 'Community Care', 'International Artist'],
    sourceUrl: 'https://www.asahi.com/ajw/articles/14380177',
    image: mentorPortraitKosuke,
    featured: false,
  },
  {
    id: 'jackie-newton',
    name: 'Jackie Newton',
    country: 'USA',
    region: 'USA',
    role: 'WCA Leader / Workshop Instructor',
    shortIntro: 'Jackie Newton, also known as Sparky Malarkey, is a World Clown Association leader and teaching artist whose work focuses on movement, timing, character choices and approachable clowning for modern audiences.',
    specialties: ['Clown Education', 'Movement & Timing', 'WCA Leadership'],
    sourceUrl: 'https://worldclown.com/past-presidents/',
    image: mentorPortraitJackie,
    featured: false,
  },
  {
    id: 'frankie-malachi',
    name: 'Frankie Malachi',
    country: 'Singapore',
    region: 'Asia',
    role: 'Puppeteer / Visual Storyteller',
    shortIntro: 'Frankie Malachi is a Singapore-based puppeteer and maker whose work spans marionettes, mascots, theatre, children’s productions and regional puppetry exchange across Asia.',
    specialties: ['Puppetry', 'Mascot Making', 'Visual Storytelling'],
    sourceUrl: 'https://www.todayonline.com/business/sme/pulling-strings-work',
    image: mentorPortraitFrankie,
    featured: false,
  },
  {
    id: 'tony-lee',
    name: 'Tony Lee',
    country: 'Hong Kong',
    region: 'Asia',
    role: 'Showcase Artist',
    shortIntro: 'A showcase artist joining BICC 2026 to bring live performance presence and international exchange to the instructor line-up.',
    specialties: ['Showcase Artist', 'Stage Performance', 'Guest Artist'],
    image: mentorPortraitTony,
    featured: false,
  },
  {
    id: 'edmund-khong',
    name: 'Edmund Khong',
    country: 'Singapore',
    region: 'Asia',
    role: 'Master Clown / Family Entertainer',
    shortIntro: 'Edmund Khong, known for Captain Dazzle and Captain Bubbles, is an award-winning Singapore performer whose shows combine magic, comedy, bubbles, juggling, balloons and strong audience interaction.',
    specialties: ['Magic & Comedy', 'Bubbles & Balloons', 'Audience Interaction'],
    officialBioUrl: 'https://www.captaindazzle.com/',
    image: mentorPortraitEdmund,
    featured: false,
  },
  {
    id: 'zipper',
    name: 'Zipper',
    country: 'Thailand',
    region: 'Asia',
    role: 'Guest Artist / Circus Director',
    shortIntro: 'The creative force behind Zipper Circus, bringing clown and mime performance, juggling, visual acts, audience interaction and full-scale circus production experience to BICC.',
    specialties: ['Clown & Mime', 'Circus Production', 'Audience Interaction'],
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
    body: 'Reach families, educators, performers, tourism partners and international delegates and participants.',
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

const sponsorExposurePoints = [
  'Website',
  'Stage Backdrop',
  'Delegate & Participant Pass',
  'Official Magazine',
  'Social Media',
  'Workshop Room',
  'Welcome Kit',
  'Venue Signage',
  'Media Wall',
  'Outreach Programme',
  'Thank You Video',
  'Travel Guide',
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
    label: 'Participant Info',
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
  { key: 'delegate-info', label: 'Participant Info' },
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
      'Registration, opening, first parallel learning blocks, jamming and the evening international show.',
    focus:
      'Registration, opening ceremony, lunch, parallel classes, jamming session and international show.',
    accent: 'arrival',
    chipLabels: [
      'Registration',
      'Opening',
      'Parallel Class 1',
      'Parallel Class 2',
      'International Night Show',
    ],
    image: landingProgrammeOpeningImage,
    sessions: [
      {
        time: '9:00–10:00',
        title: 'Registration',
        type: 'delegate-info',
        track: 'All Participants',
        venue: 'Registration area',
        description: 'Check in, collect materials and receive the latest programme updates.',
        status: 'confirmed',
        icon: 'R',
      },
      {
        time: '10:30–12:00',
        title: 'Opening',
        type: 'showcase',
        track: 'All Participants',
        venue: 'Main hall',
        description: 'Official opening moment for participants, instructors, organisers and guests.',
        status: 'confirmed',
        icon: 'O',
        image: landingPerformanceAudienceImage,
      },
      {
        time: '12:00–13:00',
        title: 'Lunch',
        type: 'delegate-info',
        track: 'All Participants',
        venue: 'Break area',
        description: 'Midday break before the first parallel class.',
        status: 'confirmed',
        icon: 'L',
      },
      {
        time: '13:00–14:00',
        title: 'Parallel Class 1',
        type: 'foundation',
        track: 'Foundation Track / Mastery Track',
        venue: 'Workshop rooms',
        description: 'Foundation and Mastery participants begin their track-based classes at the same time.',
        status: 'confirmed',
        icon: '1',
      },
      {
        time: '14:00–15:00',
        title: 'Tea Break',
        type: 'delegate-info',
        track: 'All Participants',
        venue: 'Break area',
        description: 'A pause between learning blocks.',
        status: 'confirmed',
        icon: 'T',
      },
      {
        time: '15:00–16:00',
        title: 'Parallel Class 2',
        type: 'mastery',
        track: 'Foundation Track / Mastery Track',
        venue: 'Workshop rooms',
        description: 'Second simultaneous class block for Foundation and Mastery track practice.',
        status: 'confirmed',
        icon: '2',
      },
      {
        time: '16:00–17:00',
        title: 'Jamming Session',
        type: 'community',
        track: 'All Participants',
        venue: 'Shared practice space',
        description: 'A creative jam for participants to connect, test ideas and share energy.',
        status: 'confirmed',
        icon: 'J',
      },
      {
        time: '19:30–21:30',
        title: 'International Night Show',
        type: 'showcase',
        track: 'Audience-facing programme',
        venue: 'Main hall',
        description: 'An evening show celebrating international clown and variety performance.',
        status: 'confirmed',
        icon: 'S',
        image: landingPerformanceAudienceImage,
      },
    ],
  },
  {
    id: 'day-2',
    day: 'Day 2',
    date: 'Aug 4, 2026',
    title: 'Workshops & Exchange',
    description:
      'The main workshop day with auditorium flow, parallel classes, jamming and the variety art competition.',
    focus:
      'Auditorium session, parallel classes, rest breaks, jamming session and variety art competition.',
    accent: 'training',
    chipLabels: [
      'Auditorium Lv 2',
      'Parallel Class 3',
      'Parallel Class 4',
      'Parallel Class 5',
      'Variety Art Competition',
    ],
    image: landingWorkshopTrainingImage,
    sessions: [
      {
        time: '9:00–10:00',
        title: 'Auditorium Session',
        type: 'delegate-info',
        track: 'All Participants',
        venue: 'Auditorium, Lv 2',
        description: 'Shared morning session in the Lv 2 auditorium.',
        status: 'confirmed',
        icon: 'A',
      },
      {
        time: '10:00–11:00',
        title: 'Parallel Class 3',
        type: 'foundation',
        track: 'Foundation Track / Mastery Track',
        venue: 'Workshop rooms',
        description: 'Simultaneous Foundation and Mastery class block for practical training.',
        status: 'confirmed',
        icon: '3',
      },
      {
        time: '11:00–11:30',
        title: 'Rest',
        type: 'delegate-info',
        track: 'All Participants',
        venue: 'Break area',
        description: 'Short rest before the next class block.',
        status: 'confirmed',
        icon: 'R',
      },
      {
        time: '11:30–13:00',
        title: 'Parallel Class 4',
        type: 'mastery',
        track: 'Foundation Track / Mastery Track',
        venue: 'Workshop rooms',
        description: 'Extended simultaneous class block for deeper guided practice.',
        status: 'confirmed',
        icon: '4',
      },
      {
        time: '13:00–14:00',
        title: 'Lunch',
        type: 'delegate-info',
        track: 'All Participants',
        venue: 'Break area',
        description: 'Lunch break between workshop blocks.',
        status: 'confirmed',
        icon: 'L',
      },
      {
        time: '14:00–15:30',
        title: 'Parallel Class 5',
        type: 'foundation',
        track: 'Foundation Track / Mastery Track',
        venue: 'Workshop rooms',
        description: 'Afternoon simultaneous workshop block for both learning tracks.',
        status: 'confirmed',
        icon: '5',
      },
      {
        time: '15:30–16:30',
        title: 'Tea Break',
        type: 'delegate-info',
        track: 'All Participants',
        venue: 'Break area',
        description: 'Tea break before the late afternoon programme.',
        status: 'confirmed',
        icon: 'T',
      },
      {
        time: '16:30–18:30',
        title: 'Jamming Session',
        type: 'community',
        track: 'All Participants',
        venue: 'Shared practice space',
        description: 'A longer creative jam for exchange, play and collaborative exploration.',
        status: 'confirmed',
        icon: 'J',
        image: landingWorkshopOutreachImage,
      },
      {
        time: '19:30–21:00',
        title: 'Variety Art Competition',
        type: 'showcase',
        track: 'Audience-facing programme',
        venue: 'Main hall',
        description: 'An evening competition celebrating variety, stage presence and audience connection.',
        status: 'confirmed',
        icon: 'V',
        image: landingMasteryTrackImage,
      },
    ],
  },
  {
    id: 'day-3',
    day: 'Day 3',
    date: 'Aug 5, 2026',
    title: 'Showcase & Community',
    description:
      'Humanitarian activities, final class, briefing, preparation and International Night Show.',
    focus:
      'Humanitarian activities, final class, final briefing, preparation and International Night Show.',
    accent: 'showcase',
    chipLabels: [
      'Humanitarian Activities',
      'Parallel Class 6',
      'Final Briefing',
      'Gala Preparation',
      'International Night Show',
    ],
    image: landingPerformanceAudienceImage,
    sessions: [
      {
        time: '8:00–12:30',
        title: 'Humanitarian Activities',
        type: 'community',
        track: 'Community outreach',
        venue: 'Outreach locations',
        description: 'A community-facing morning programme built around joyful service and connection.',
        status: 'confirmed',
        icon: 'H',
        image: landingWorkshopOutreachImage,
      },
      {
        time: '12:30–13:30',
        title: 'Lunch',
        type: 'delegate-info',
        track: 'All Participants',
        venue: 'Break area',
        description: 'Lunch break before the final class and gala preparation.',
        status: 'confirmed',
        icon: 'L',
      },
      {
        time: '13:30–14:30',
        title: 'Parallel Class 6',
        type: 'foundation',
        track: 'Foundation Track / Mastery Track',
        venue: 'Workshop rooms',
        description: 'Final simultaneous class block before closing programme preparations.',
        status: 'confirmed',
        icon: '6',
      },
      {
        time: '14:30–16:00',
        title: 'Final Briefing',
        type: 'delegate-info',
        track: 'All Participants',
        venue: 'Main hall',
        description: 'Final briefing for participants before the evening gala flow.',
        status: 'confirmed',
        icon: 'B',
      },
      {
        time: '16:00',
        title: 'Preparation for Gala Night',
        type: 'showcase',
        track: 'Gala participants & guests',
        venue: 'Main hall',
        description: 'Preparation time for the evening gala programme.',
        status: 'confirmed',
        icon: 'P',
      },
      {
        time: '19:00',
        title: 'Hall Opens',
        type: 'delegate-info',
        track: 'All Participants & Guests',
        venue: 'Main hall',
        description: 'Doors open for the gala night audience and participants.',
        status: 'confirmed',
        icon: 'O',
      },
      {
        time: '19:30–21:30',
        title: 'International Night Show',
        type: 'showcase',
        track: 'All Participants & Guests',
        venue: 'Main hall',
        description:
          'A formal closing event celebrating cultural exchange and international collaboration. Attendees will enjoy an elegant dinner accompanied by lively performances, followed by an awards ceremony recognizing outstanding achievements and contributions to the art of clowning.',
        status: 'confirmed',
        icon: 'G',
        image: landingPerformanceAudienceImage,
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
    ctaHref: '/passes#foundation-pass',
  },
  {
    title: 'Mastery Track Pass',
    copy:
      'Best for experienced performers and working artists who want sharper critique, stage presence and professional development.',
    focus: [
      'Advanced workshops',
      'Instructor feedback',
      'Signature performance refinement',
      'Showcase preparation',
      'Professional exchange',
    ],
    accent: 'mastery',
    cta: 'Get Mastery Pass',
    ctaHref: '/passes#mastery-pass',
  },
] as const

const programmeFaqItems = [
  {
    question: 'Is the full programme confirmed?',
    answer:
      'The main three-day programme timing is now available. Room assignments, instructor allocation and any final organiser updates may still be refined before the convention.',
  },
  {
    question: 'Do I need to choose a track before attending?',
    answer:
      'Yes. Delegates and participants should select the pass or track that best fits their current experience and learning goals.',
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
    note: `Hosted inside a ${venueInfo.buildingStoreys}-storey multi-use building with reception, auditorium, workshop, accommodation and dining levels.`,
    icon: 'A',
    tone: 'soft-yellow',
    comingSoon: false,
  },
  {
    title: 'Delegate & Participant Flow',
    copy: 'Cafe/reception, auditorium, workshop rooms, accommodation, solat room and dining hall.',
    note: 'Expect a vertical convention flow across clearly assigned Calvary Crown floors.',
    icon: 'F',
    tone: 'soft-green',
    comingSoon: false,
  },
  {
    title: 'Updates',
    copy: 'Delegate and participant map overlays and final room assignments will be announced closer to the convention.',
    note: 'Use official BICC updates for the most current visitor information.',
    icon: 'U',
    tone: 'soft-aqua',
    comingSoon: true,
  },
] as const

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
    note: 'Delegate and participant essentials',
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
    copy: 'Fresh coastal flavours, shared meals and easy participant dinners after programme days.',
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
    copy: 'Slow moments for participants, families and guests to recharge between convention plans.',
    tone: 'cafe',
    meta: 'Breaks / casual meetings',
    image: visitWaterfrontImage,
    credit: 'Adznee Abas / Wikimedia Commons',
    guideTitle: 'Use cafes as reset points',
    guideCopy:
      'Cafes are useful between travel, workshops and evening plans. They give participants a calmer place to rest, talk and plan the next move.',
    bestTime: 'Afternoon / between sessions',
    whereToStart: 'Look near city-centre hotels, shopping areas and routes back from the venue.',
    highlights: ['Coffee breaks', 'Cocoa drinks', 'Light meals', 'Participant meetups'],
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
    name: 'CC Cafe',
    category: 'Cafe / Group Dining',
    image: visitFoodCcCafeImage,
    description: 'Comfort food, cafe meals and group dining spaces for participants planning meals around BICC.',
    bestFor: 'Cafe meals',
  },
  {
    name: 'Calvary Canteen',
    category: 'Venue / Local Food',
    image: visitFoodCalvaryCanteenImage,
    description: 'A practical venue-side food reference with local favourites for simple daytime meals.',
    bestFor: 'Venue convenience',
  },
  {
    name: 'Pate Grill House',
    category: 'Dinner / Group Meals',
    image: visitFoodPateGrillImage,
    description: 'A casual dining option for dinner plans, small groups and relaxed post-session meals.',
    bestFor: 'Group dinner',
  },
  {
    name: 'Dojo',
    category: 'Casual Dining',
    image: visitFoodDojoImage,
    description: 'A lively casual dining stop for participants who want an easy meal around Tawau.',
    bestFor: 'Casual meal',
  },
  {
    name: "Han's Kopitiam",
    category: 'Kopitiam / Breakfast',
    image: visitFoodHansKopitiamImage,
    description: 'A kopitiam-style stop for breakfast, coffee and simple local meals before the programme day.',
    bestFor: 'Breakfast / coffee',
  },
] as const

const tawauFoodFilterItems = ['All', 'Cafe / Group Dining', 'Venue / Local Food', 'Dinner / Group Meals', 'Casual Dining', 'Kopitiam / Breakfast'] as const

const tawauStayFilterItems = ['All', 'Hotel', 'Homestay', 'City Centre', 'Group-Friendly'] as const

const tawauStayCards = [
  {
    title: 'Near the Convention Venue',
    copy: 'Best for participants who want the simplest morning arrival and evening return.',
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
    copy: 'Clean, convenient stays for participants focused on programme days.',
    icon: 'S',
  },
] as const

const tawauHotelSamples = [
  {
    name: 'UMii Hotel',
    area: 'Tawau / Semporna travel base',
    fit: 'Simple modern hotel stay',
    tag: 'From RM150/night',
    note: 'A cozy, modern stay option with comfortable bedding, high-speed Wi-Fi, coffee and tea facilities, toiletries and air conditioning.',
    filters: ['Hotel'],
    image: hotelUmiiImage,
    link: 'https://wa.me/60168027721',
    credit: 'Image provided by UMii Hotel',
    contact: 'Wendee +60 16-802 7721',
  },
  {
    name: 'UMii Homestay',
    area: 'Tawau, Sabah',
    fit: 'Family and group stay',
    tag: 'From RM388/night',
    note: 'A clean and cozy homestay for families, friends and small groups with practical room options for Tawau or Semporna travel plans.',
    filters: ['Homestay', 'Group-Friendly'],
    image: hotelUmiiHomestayImage,
    link: 'https://wa.me/60128182417',
    credit: 'Image provided by UMii Homestay',
    contact: 'Wendy +60 12-818 2417 / Andy +60 16-220 0078',
  },
  {
    name: 'AeroHomeSuite',
    area: 'Tawau Plaza, Taman Anson',
    fit: 'Family-friendly themed stay',
    tag: 'Aviation homestay',
    note: 'A creative aviation-themed homestay for families or small groups who want a memorable Tawau stay.',
    filters: ['Homestay', 'Group-Friendly'],
    image: hotelAeroHomeSuiteImage,
    link: 'https://wa.me/601110036227',
    credit: 'Image provided by AeroHomeSuite',
    contact: '+60 11-1003 6227',
  },
  {
    name: 'Blu Sentral Hotel',
    area: 'TB 96, Kubota Sentral',
    fit: 'Comfort-focused hotel',
    tag: 'Kubota Sentral',
    note: 'A cozy hotel option with Smart TV, daily housekeeping and 24-hour reception for business or leisure stays.',
    filters: ['Hotel'],
    image: hotelBluSentralImage,
    link: 'https://blusentralhotel.com.my/',
    credit: 'Image provided by Blu Sentral Hotel',
    contact: '+60 13-873 9988 / +60 89-773 388',
  },
  {
    name: 'Hotel Emas Tawau',
    area: 'Heart of Tawau city centre',
    fit: 'City hotel with 102 rooms',
    tag: 'Central location',
    note: 'A practical city stay within walking distance of Hospital Besar Tawau and Tawau Tanjung Market, with dining, sauna, ballroom and 24-hour front desk support.',
    filters: ['Hotel', 'City Centre'],
    image: hotelEmasImage,
    link: 'mailto:emas@teckguan.com',
    credit: 'Image provided for Hotel Emas Tawau',
    contact: '+60 89-762 000 / emas@teckguan.com',
  },
  {
    name: 'Borneo Royale Hotel',
    area: 'East Coast Sabah, Tawau',
    fit: 'Business class hotel',
    tag: 'MICE ready',
    note: 'A smoke-free business class hotel with 178 guest rooms/suites and a large pillar-less grand ballroom.',
    filters: ['Hotel', 'Group-Friendly'],
    image: hotelBorneoRoyaleImage,
    link: 'https://borneoroyale.com/rooms/',
    credit: 'Image provided by Borneo Royale Hotel',
    contact: 'Rooms and booking details on hotel website',
  },
  {
    name: 'Grace Homestay Tawau',
    area: 'Fajar Commercial Area',
    fit: 'Homestay option',
    tag: 'Local stay',
    note: 'A cozy homestay in Fajar town with a home-away-from-home feel for travelers seeking a local experience.',
    filters: ['Homestay', 'Group-Friendly'],
    image: hotelGraceHomestayImage,
    link: 'https://wa.me/601159921799',
    credit: 'Image provided by Grace Homestay Tawau',
    contact: '+60 11-5992 1799',
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

const tawauTravelPartners = [
  {
    kind: 'agency',
    name: 'JWV Now',
    label: 'Travel agency',
    summary: 'Local Tawau travel planning before or after BICC.',
    bestFor: 'Airport transfers, day tours, hotel guidance and group arrivals.',
    languages: 'EN / 中文 / BM',
    services: ['Airport transfer', 'Tawau day tours', 'Hotel guidance', 'Group travel'],
    cta: 'Open JWV Now',
    href: visitTawauPartnerLink,
    image: tawauGuideWaterfrontImage,
    contact: 'Travel planning via Linktree',
    external: true,
    badge: 'Travel partner',
  },
  {
    kind: 'stay',
    name: 'Chanliving',
    label: 'Hotel / Homestay partner',
    summary: 'Smart Living Inn stay option in Semporna with simple booking support for extended Borneo routes.',
    bestFor: 'Delegates adding Semporna stays, island trips or family travel around BICC.',
    languages: 'EN / 中文 / BM',
    services: ['Semporna stays', 'Room booking', 'Family travel', 'Island trip add-on'],
    cta: 'Open Chanliving',
    href: 'https://book-directonline.com/properties/chanlivingsemporna',
    image: travelChanlivingImage,
    contact: '016-822 1589 / 017-898 2000',
    external: true,
    badge: 'HotelHomestay',
  },
  {
    kind: 'agency',
    name: 'Bergosong Eco Travel',
    label: 'Travel agency',
    summary: 'Eco travel partner for Sebatik Island, mangrove routes, dolphin spotting and nature-based visitor experiences.',
    bestFor: 'Delegates who want eco day trips, river cruises, overnight packages or a nature extension after BICC.',
    languages: 'EN / BM',
    services: ['Sebatik Island', 'Eco day tours', 'Mangrove cruise', 'Dolphin spotting'],
    cta: 'Contact Bergosong Eco Travel',
    href: 'https://wa.me/60138578178',
    image: travelBergosongImage,
    contact: '+6013-857 8178 / info.bergosongecotravel@gmail.com',
    external: true,
    badge: 'Travel partner',
  },
  {
    kind: 'support',
    name: 'BICC Travel Desk',
    label: 'Convention visitor help',
    summary: 'Official routing help for convention visitor questions.',
    bestFor: 'Participants unsure which travel partner to contact first.',
    languages: 'EN / 中文 / BM',
    services: ['General travel questions', 'Partner routing', 'Visitor notes', 'Convention-day planning'],
    cta: 'Email BICC Team',
    href: 'mailto:hello@bicc2026.com?subject=BICC%202026%20Travel%20Help',
    image: tawauGuideChesterMarketImage,
    contact: 'hello@bicc2026.com',
    external: false,
    badge: 'Visitor support',
  },
] as const

const tawauTravelFilterItems = [
  { key: 'all', label: 'All' },
  { key: 'agency', label: 'Travel Agency' },
  { key: 'stay', label: 'Hotel / Homestay' },
  { key: 'support', label: 'Visitor Support' },
] as const

const tawauDelegateTips = [
  'Book accommodation early around the convention dates.',
  'Keep your first evening flexible for registration and settling in.',
  'Plan food stops near your hotel or venue route.',
  'Save extra time for airport, hotel and venue transfers.',
] as const

const tawauThingsToDoCards = [
  {
    title: 'Pasar Tanjung Tawau',
    copy: 'Malaysia’s largest indoor market, with thousands of stalls across food, dried seafood, craft and souvenir floors.',
    tone: 'market',
    tag: 'Market & souvenirs',
    image: tawauGuidePasarTanjungImage,
    credit: 'BICC visitor guide source material',
    filters: ['Markets', 'Easy Walks'],
    highlights: [
      'Ground floor: fresh produce, fruits, vegetables and local snacks.',
      'First floor: dried salted fish, anchovies, prawns and preserved seafood.',
      'Top floor: Pasar Gantung handicrafts, woven baskets and wooden souvenirs.',
    ],
    tip: 'Bring cash, bargain politely and go earlier if you want a calmer visit.',
  },
  {
    title: 'Balung Cocos Columnar Basalt',
    copy: 'A rare natural formation of hexagonal basalt columns, located less than an hour from Tawau town.',
    tone: 'stone',
    tag: 'Geological wonder',
    image: tawauGuideBalungCocosImage,
    credit: 'BICC visitor guide source material',
    filters: ['Nature'],
    highlights: [
      'Formed when thick basalt lava cooled and contracted into columns.',
      'Good for photography, nature appreciation and a quieter countryside stop.',
      'Use Google Maps or Waze; a local guide can make the route easier.',
    ],
    tip: 'Wear comfortable shoes because parts of the terrain can be uneven.',
  },
  {
    title: 'Tawau Hills Park',
    copy: 'A forest escape known for giant tropical trees, waterfalls, hot springs and hiking routes.',
    tone: 'hills',
    tag: 'Nature & hiking',
    image: tawauGuideForestImage,
    credit: 'BICC visitor guide source material',
    filters: ['Nature'],
    highlights: [
      'Look for Yellow Meranti and the Lowland Gardens with Borneo flora.',
      'Popular stops include Table Waterfall, Galas Waterfall and the hot spring.',
      'Mount Magdalena, Lucia and Maria climbs require registration with Sabah Parks.',
    ],
    tip: 'Weekdays are better if you want to avoid school holiday or weekend crowds.',
  },
  {
    title: 'Pasar Malam Chester',
    copy: 'A lively night market with food, busker stages, children’s play corners and local craft activity.',
    tone: 'market',
    tag: 'Night market',
    image: tawauGuideChesterMarketImage,
    credit: 'BICC visitor guide source material',
    filters: ['Markets', 'Food'],
    highlights: [
      'Features traditional and international food in a casual evening setting.',
      'Includes Sabah ethnic handicrafts, celebration exhibitions and busker energy.',
      'The market layout uses East Gate and West Gate entrances.',
    ],
    tip: 'Good for a light evening walk when the convention schedule allows.',
  },
  {
    title: 'Teck Guan Cocoa Village & Waterfall',
    copy: 'A cocoa heritage and nature stop where participants can learn about local cocoa production, village activity and a relaxed waterfall setting.',
    tone: 'cocoa',
    tag: 'Cocoa + waterfall',
    image: tawauGuideCocoaVillageImage,
    credit: 'BICC visitor guide source material',
    filters: ['Culture', 'Nature'],
    highlights: [
      'Teck Guan is a major cocoa producer and distributor in Sabah.',
      'The Cocoa Village gives visitors a closer look at Tawau’s cocoa story.',
      'The waterfall cafe setting adds a cool, relaxed nature stop to the visit.',
    ],
    tip: 'Plan this as a half-day experience and confirm access details before travelling.',
  },
  {
    title: 'Teck Guan Cocoa Village Waterfall',
    copy: 'A scenic rest stop connected to the cocoa village experience, suitable for photos, refreshments and a slower Borneo moment.',
    tone: 'hills',
    tag: 'Waterfall cafe',
    image: tawauGuideCocoaWaterfallImage,
    credit: 'BICC visitor guide source material',
    filters: ['Nature'],
    highlights: [
      'Best treated as a leisure stop rather than a quick city walk.',
      'Useful for small groups who want a nature-and-cafe experience.',
      'Check opening hours and transport arrangements before planning the visit.',
    ],
    tip: 'Bring comfortable footwear and keep the schedule flexible around weather.',
  },
  {
    title: 'Waterfront & City Walks',
    copy: 'A simple way to reset between sessions with city views, casual photos, snacks and low-pressure walking time.',
    tone: 'waterfront',
    tag: 'Easy walk',
    image: tawauGuideWaterfrontImage,
    credit: 'BICC visitor guide source material',
    filters: ['Easy Walks'],
    highlights: [
      'Best for short, flexible moments between food, hotel and convention plans.',
      'Good for casual photos and a quick sense of Tawau’s coastal city atmosphere.',
      'Works well as a light option for families or participants with limited free time.',
    ],
    tip: 'Keep this as an easy add-on rather than a fixed full-day activity.',
  },
] as const

const tawauThingsFilterItems = ['All', 'Markets', 'Nature', 'Culture', 'Food', 'Easy Walks'] as const

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
    answer: 'Delegate and participant registration details will be included in the final venue guide and programme update.',
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
    answer: 'Follow the official BICC website or organiser updates for confirmed venue, programme and delegate/participant information.',
  },
] as const

const aboutValueCards = [
  {
    title: 'Professional Learning',
    body: 'Structured workshops, international instructors and practical training for performers who want to grow their craft.',
  },
  {
    title: 'Cultural Exchange',
    body: 'A joyful gathering rooted in Borneo, connecting local creativity with regional and international clowning communities.',
  },
  {
    title: 'Community Impact',
    body: 'Clowning is presented not only as performance, but as a way to bring hope, care and connection to people.',
  },
] as const

const aboutAudienceGroups = [
  'Professional clowns and entertainers',
  'New performers who want proper training',
  'Educators and children ministry teams',
  'Social workers and community workers',
  'Event performers, magicians, balloon artists and mascots',
  'Families and supporters of creative community events',
  'International guests who want to experience Tawau and Borneo',
] as const

const aboutBeyondPoints = ['Ongoing learning', 'Community connection', 'Future collaborations'] as const

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
    title: 'A three-day convention journey with confirmed daily rhythm.',
    intro:
      'The programme now shows the main timing for registration, opening, parallel classes, jamming sessions, humanitarian activity, shows and International Night Show.',
    cards: programme,
    asideTitle: 'Programme note',
    asideBody:
      'Final room assignments, instructor allocations and any class changes remain subject to organiser confirmation.',
    primaryCta: { label: 'View Passes', href: '/passes' },
    secondaryCta: { label: 'About BICC', href: '/about' },
  },
  '/workshops': {
    eyebrow: 'Workshops',
    title: 'Practical clown classes across Foundation and Mastery levels.',
    intro:
      'The workshop list covers balloons, magic, storytelling, puppetry, juggling, makeup, costumes, short-show structure and community care.',
    cards: workshopHighlights.map((item) => ({
      title: `${item.track}: ${item.title}`,
      body: item.body,
    })),
    asideTitle: 'Track structure',
    asideBody:
      'Participants are entitled to attend the eight classes listed for their level. All classes are subject to change.',
    primaryCta: { label: 'Compare Passes', href: '/passes' },
    secondaryCta: { label: 'View Programme', href: '/programme' },
  },
  '/mentors': {
    eyebrow: 'Instructors',
    title: 'Learning shaped by international artists, educators and performance instructors.',
    intro:
      'The BICC faculty is being built to support both artistic excellence and approachable teaching, with space for international exchange and regional leadership.',
    cards: mentorCards,
    asideTitle: 'Announcement status',
    asideBody:
      'Confirmed instructor names, countries and specialties will be published as soon as invitations and schedules are finalized.',
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
        title: 'Foundation Track Pass — US$190',
        body: 'Best for beginners, emerging performers and educators building confidence, technique and core clowning fundamentals.',
      },
      {
        title: 'Mastery Track Pass — US$190',
        body: 'Best for experienced performers who want stronger stage craft, sharper structure and more professional critique.',
      },
      {
        title: 'Simple Registration Decision',
        body: 'No crowded ticket menu, no confusing tiers. Just two focused learning paths designed around actual participant needs.',
      },
    ],
    asideTitle: 'Pass note',
    asideBody:
      'Both passes include access to your selected workshop track. The e-certificate will be sent by email after the feedback form is completed.',
    primaryCta: { label: 'Get Foundation Pass', href: '/passes#foundation-pass' },
    secondaryCta: { label: 'Get Mastery Pass', href: '/passes#mastery-pass' },
  },
  '/venue': {
    eyebrow: 'Venue & Travel',
    title: 'Gather in Tawau, Sabah and experience Borneo as part of the convention story.',
    intro:
      'The venue page will help delegates and participants understand where BICC takes place, how to plan travel and why the local setting matters to the convention atmosphere.',
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
        body: 'Reach performers, educators, families, creative leaders and international delegates and participants in one official event platform.',
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

type SeoMeta = {
  title: string
  description: string
  path: string
  image?: string
}

const defaultSeo: SeoMeta = {
  title: 'BICC 2026 | Borneo International Clown Convention in Tawau, Sabah',
  description:
    'Join BICC 2026 in Tawau, Sabah from Aug 3-5, 2026 for international clown workshops, instructors, performance, culture, community and a Borneo destination experience.',
  path: '/',
  image: defaultOgImage,
}

const routeSeo: Record<string, SeoMeta> = {
  '/': defaultSeo,
  '/about': {
    title: 'About BICC 2026 | Clown Craft, Culture and Human Connection',
    description:
      'Learn about BICC 2026, a professional clowning convention in Borneo built around laughter, craft, culture, community impact and international exchange.',
    path: '/about',
  },
  '/programme': {
    title: 'Programme | BICC 2026 3-Day Convention Journey',
    description:
      'Explore the BICC 2026 programme flow across arrival, workshops, exchange sessions, showcase moments and community celebration in Tawau, Sabah.',
    path: '/programme',
  },
  '/workshops': {
    title: 'Workshops | BICC 2026 Foundation and Mastery Tracks',
    description:
      'Compare hands-on BICC 2026 clown workshops for Foundation and Mastery tracks, including performance craft, character, magic, balloons, outreach and educational shows.',
    path: '/workshops',
  },
  '/mentors': {
    title: 'Instructors & Guest Artists | BICC 2026',
    description:
      'Meet the BICC 2026 instructors and guest artists joining the international clown convention from Malaysia, Asia, the USA and beyond.',
    path: '/mentors',
  },
  '/passes': {
    title: 'Passes & Registration | BICC 2026',
    description:
      'Choose your BICC 2026 Foundation or Mastery Track Pass and join three days of clown craft, training, performance, exchange and community in Tawau, Sabah.',
    path: '/passes',
  },
  '/venue': {
    title: 'Venue | Calvary Crown Tawau for BICC 2026',
    description:
      'Plan your BICC 2026 arrival at Calvary Crown in Tawau, Sabah with venue zones, floor guidance, delegate check-in and visitor information.',
    path: '/venue',
  },
  '/visit-tawau': {
    title: 'Visit Tawau | BICC 2026 Food, Hotels, Transport and Things To Do',
    description:
      'Discover Tawau food, hotels, local transport, markets, nature, cocoa heritage and waterfront experiences while joining BICC 2026 in Sabah.',
    path: '/visit-tawau',
  },
  '/sponsors': {
    title: 'Sponsors | Partner with BICC 2026',
    description:
      'Partner with BICC 2026 and connect your brand with performance, culture, tourism, family reach and community impact in Tawau, Sabah.',
    path: '/sponsors',
  },
  '/faq': {
    title: 'FAQ | BICC 2026 Delegate Questions',
    description:
      'Find answers about BICC 2026 passes, workshops, programme flow, venue, travel planning, languages, registration and participant updates.',
    path: '/faq',
  },
  '/contact': {
    title: 'Contact | BICC 2026',
    description:
      'Contact the BICC 2026 team for registration, sponsorship, visitor planning, media and convention questions.',
    path: '/contact',
  },
}

function setMetaBySelector(selector: string, value: string, attribute = 'content') {
  const element = document.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

function updateDocumentSeo(path: string) {
  const seo = routeSeo[path] || defaultSeo
  const canonicalUrl = `${publicBaseUrl}${seo.path === '/' ? '/' : seo.path}`
  const imageUrl = seo.image || defaultOgImage

  document.title = seo.title
  setMetaBySelector('meta[name="description"]', seo.description)
  setMetaBySelector('link[rel="canonical"]', canonicalUrl, 'href')
  setMetaBySelector('meta[property="og:title"]', seo.title)
  setMetaBySelector('meta[property="og:description"]', seo.description)
  setMetaBySelector('meta[property="og:url"]', canonicalUrl)
  setMetaBySelector('meta[property="og:image"]', imageUrl)
  setMetaBySelector('meta[property="og:image:secure_url"]', imageUrl)
  setMetaBySelector('meta[name="twitter:title"]', seo.title)
  setMetaBySelector('meta[name="twitter:description"]', seo.description)
  setMetaBySelector('meta[name="twitter:image"]', imageUrl)
}

function getTrackFromSearch(search: string): PassTrackId {
  const track = new URLSearchParams(search).get('track')
  return track === 'mastery' ? 'mastery' : 'foundation'
}

function getPassByTrack(track: PassTrackId) {
  return passes.find((pass) => pass.id === track) ?? passes[0]
}

function mapCmsMentors(cmsMentors: CmsMentor[], language: SiteLanguage): MentorProfile[] {
  return cmsMentors.map((mentor) => {
    const fallbackMentor = mentorLineup.find((item) => item.id === mentor._id || item.name === mentor.name)

    return {
      id: mentor._id,
      name: mentor.name,
      country: mentor.country || 'International',
      region: mentor.country === 'USA' ? 'USA' : mentor.country === 'Malaysia' ? 'Malaysia' : 'Asia',
      role: localize(mentor.role, language) || fallbackMentor?.role || 'Guest Artist',
      shortIntro:
        localize(mentor.shortIntro, language) ||
        fallbackMentor?.shortIntro ||
        'A guest artist joining BICC 2026 to share clown craft, performance experience and creative exchange with delegates and participants.',
      specialties: mentor.specialties?.map((specialty) => localize(specialty, language)).filter(Boolean).slice(0, 3) ||
        fallbackMentor?.specialties || ['Guest Artist', 'Performance', 'Creative Exchange'],
      officialBioUrl: mentor.officialBioUrl || fallbackMentor?.officialBioUrl,
      sourceUrl: mentor.sourceUrl || fallbackMentor?.sourceUrl,
      socialUrl: mentor.socialUrl || fallbackMentor?.socialUrl,
      image: sanityImageUrl(mentor.portrait) || sanityImageUrl(mentor.posterImage) || fallbackMentor?.image || null,
      featured: Boolean(mentor.isFeatured) && !isLineupOnlyMentor(mentor._id, mentor.name),
    }
  })
}

function mergeMentorProfiles(cmsMentors: MentorProfile[]) {
  const mergedMentors = [...cmsMentors]
  const existingIds = new Set(mergedMentors.map((mentor) => mentor.id))
  const existingNames = new Set(mergedMentors.map((mentor) => mentor.name.toLowerCase()))

  mentorLineup.forEach((mentor) => {
    if (existingIds.has(mentor.id) || existingNames.has(mentor.name.toLowerCase())) return
    mergedMentors.push(mentor)
  })

  return mergedMentors
}

function getDisplayedFeaturedMentorIds(mentors: MentorProfile[]) {
  return new Set(mentors.filter((mentor) => mentor.featured).slice(0, 4).map((mentor) => mentor.id))
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

function setCmsElementText(element: Element | null | undefined, value: string) {
  const nextText = value.trim()
  if (!element || !nextText) return
  element.textContent = nextText
}

function findHeroBodyParagraph(hero: Element) {
  const paragraphs = Array.from(hero.querySelectorAll('p')).filter((paragraph) => {
    if (paragraph.classList.contains('section-kicker')) return false
    if (paragraph.closest('.event-badges, .hero-actions, .final-cta-actions, .page-actions')) return false
    return normalizeTranslationKey(paragraph.textContent || '').length > 20
  })

  return paragraphs[0] || null
}

function applyCmsPageContent(pageContent: CmsPageContent | null, language: SiteLanguage) {
  if (!pageContent) return

  const main = document.querySelector('main')
  const hero = main?.querySelector('section')

  if (hero) {
    setCmsElementText(hero.querySelector('.section-kicker'), localize(pageContent.kicker, language))
    setCmsElementText(hero.querySelector('h1'), localize(pageContent.headline, language))
    setCmsElementText(findHeroBodyParagraph(hero), localize(pageContent.subheadline, language))

    const primaryCta = hero.querySelector<HTMLAnchorElement>('.primary-btn')
    const secondaryCta = hero.querySelector<HTMLAnchorElement>('.secondary-btn')
    setCmsElementText(primaryCta, localize(pageContent.primaryCtaLabel, language))
    setCmsElementText(secondaryCta, localize(pageContent.secondaryCtaLabel, language))
    if (primaryCta && pageContent.primaryCtaHref) primaryCta.href = pageContent.primaryCtaHref
    if (secondaryCta && pageContent.secondaryCtaHref) secondaryCta.href = pageContent.secondaryCtaHref

    const heroImageUrl = sanityImageUrl(pageContent.heroImage)
    const heroImage = hero.querySelector<HTMLImageElement>('img:not(.brand-logo-image)')
    if (heroImage && heroImageUrl) {
      heroImage.src = heroImageUrl
      const alt = localize(pageContent.heroImage?.alt ? { en: pageContent.heroImage.alt } : undefined, language)
      if (alt) heroImage.alt = alt
    }
  }

  const textOverrides = pageContent.textOverrides?.filter((item) => item.isPublished !== false) || []
  if (textOverrides.length) {
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
      const override = textOverrides.find((item) => {
        const replacementCandidates = Object.values(item.replacementText || {}).filter(Boolean)
        const candidates = [item.sourceText, ...replacementCandidates]
        return candidates.some((candidate) => candidate && normalizeTranslationKey(candidate) === key)
      })
      const replacement = localize(override?.replacementText, language)
      if (!replacement) return

      const leading = original.match(/^\s*/)?.[0] ?? ''
      const trailing = original.match(/\s*$/)?.[0] ?? ''
      node.textContent = `${leading}${replacement}${trailing}`
    })
  }

  const imageOverrides = pageContent.imageOverrides?.filter((item) => item.isPublished !== false && sanityImageUrl(item.image)) || []
  if (!imageOverrides.length) return

  document.querySelectorAll<HTMLImageElement>('main img').forEach((image) => {
    const alt = image.getAttribute('alt') || ''
    const src = image.getAttribute('src') || ''
    const cmsKey = image.getAttribute('data-cms-image') || ''
    const override = imageOverrides.find((item) => {
      const matchText = normalizeTranslationKey(item.matchText || '')
      if (!matchText) return false
      return (
        normalizeTranslationKey(alt) === matchText ||
        normalizeTranslationKey(cmsKey) === matchText ||
        src.includes(item.matchText || '')
      )
    })
    const imageUrl = sanityImageUrl(override?.image)
    if (!override || !imageUrl) return
    image.src = imageUrl
    const nextAlt = localize(override.alt, language) || override.image?.alt
    if (nextAlt) image.alt = nextAlt
  })
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
    'BICC 2026 Delegate / Participant Details',
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
  const subject = `BICC 2026 Delegate / Participant Details - ${pass.shortName}`
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
              <a className="primary-btn wide-btn" href={`/passes#${pass.id}-pass`}>
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
          <img alt="Convention workshop and stage energy" src={landingProgrammeOpeningImage} />
          <div className="programme-hero-caption">
            <strong>Programme opening spread</strong>
            <span>Workshop, stage, audience and community moments.</span>
          </div>
        </div>
        <article className="programme-floating-card top">
          <img alt="Workshop moment" src={landingWorkshopTrainingImage} />
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
            <img alt={session.title} decoding="async" loading="lazy" src={session.image} />
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
              <p className="pass-price">US$190</p>
              <p className="track-summary">{item.copy}</p>
              <div className="track-chip-list">
                {item.focus.slice(0, 4).map((focus) => (
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
        {programmeFaqItems.slice(0, 4).map((item) => (
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
        <p className="section-kicker">Next Step</p>
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
            <h2>Follow the three-day convention rhythm.</h2>
          </div>
          <p className="section-intro">
            Main programme times are listed below. Final rooms, instructor allocations and any schedule changes remain subject to organiser confirmation.
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
          <span className="programme-ticket-badge">Official Delegate & Participant Venue Guide</span>
        </div>
        <p className="venue-hero-intro">
          BICC 2026 gathers at {venueInfo.venueName} in {venueInfo.city}, {venueInfo.region}. This guide covers the building, arrival flow and essentials.
        </p>
        <div className="event-badges programme-hero-badges">
          <span>{venueInfo.city}, {venueInfo.region}</span>
          <span>Aug 3–5, 2026</span>
          <span>Delegate & Participant Registration</span>
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
        <div className="venue-hero-collage">
          <img alt="Delegates and participants arriving at a BICC venue in Tawau" className="venue-hero-main-photo" src={venueArrivalDelegatesImage} />
          <div className="venue-hero-photo-overlay" />
          <div className="venue-hero-card">
            <span>Confirmed Venue</span>
            <strong>{venueInfo.venueName}</strong>
            <small>{venueInfo.address}</small>
          </div>
          <article className="venue-hero-mini-card venue">
            <img alt="Calvary Crown aerial exterior view" src={calvaryCrownAerialImage} />
            <span>Venue context</span>
          </article>
          <article className="venue-hero-mini-card map">
            <img alt="Tawau town map reference" src={calvaryCrownPlanImage} />
            <span>Visitor route</span>
          </article>
          <div className="venue-hero-flow-strip">
            <span>L1 Cafe / Reception</span>
            <span>L2 Auditorium</span>
            <span>L3 Workshop Room</span>
            <span>L7 Accommodation</span>
            <span>L9 Workshop + Solat</span>
            <span>L10 Dining Hall</span>
          </div>
        </div>
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
          <h2>The essentials delegates and participants want first.</h2>
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
  const floorGroups = [
    {
      range: 'L10',
      title: 'Dining Hall',
      note: 'Delegate and participant meals and group dining',
      type: 'showcase' as ProgrammeSessionType,
    },
    {
      range: 'L9',
      title: 'Workshop Rooms + Solat Room',
      note: 'Learning rooms and prayer space',
      type: 'foundation' as ProgrammeSessionType,
    },
    {
      range: 'L7',
      title: 'Accommodation',
      note: 'Accommodation level',
      type: 'community' as ProgrammeSessionType,
    },
    {
      range: 'L3',
      title: 'Workshop Room',
      note: 'Hands-on workshop sessions',
      type: 'foundation' as ProgrammeSessionType,
    },
    {
      range: 'L2',
      title: 'Auditorium',
      note: 'Shared programme and stage flow',
      type: 'showcase' as ProgrammeSessionType,
    },
    {
      range: 'L1',
      title: 'Cafe / Reception',
      note: 'Arrival, check-in and support',
      type: 'delegate-info' as ProgrammeSessionType,
    },
  ]

  const keyZones = [
    {
      title: 'Arrive',
      level: 'L1',
      copy: 'Start at the cafe / reception level for check-in, materials and latest room guidance.',
      type: 'delegate-info' as ProgrammeSessionType,
    },
    {
      title: 'Gather',
      level: 'L2',
      copy: 'Use the auditorium for shared programme moments, stage flow and major delegate gatherings.',
      type: 'showcase' as ProgrammeSessionType,
    },
    {
      title: 'Train',
      level: 'L3 / L9',
      copy: 'Workshop rooms support Foundation, Mastery and practical class sessions.',
      type: 'foundation' as ProgrammeSessionType,
    },
    {
      title: 'Stay',
      level: 'L7',
      copy: 'Accommodation is located on Level 7 for assigned venue stay arrangements.',
      type: 'community' as ProgrammeSessionType,
    },
    {
      title: 'Dine',
      level: 'L10',
      copy: 'The dining hall supports group meal flow and delegate food coordination.',
      type: 'delegate-info' as ProgrammeSessionType,
    },
  ]

  return (
    <section className="editorial-section section-shell venue-map-section venue-orientation-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Calvary Crown Overview</p>
          <h2>Know the building before you arrive.</h2>
        </div>
          <p className="section-intro">A simple guide to the updated Calvary Crown floor flow: reception, auditorium, workshop rooms, accommodation, prayer space and dining.</p>
      </div>

      <div className="venue-orientation-shell">
        <article className="venue-orientation-photo-card">
          <img alt="Calvary Crown aerial site context" decoding="async" loading="lazy" src={calvaryCrownAerialImage} />
          <div className="venue-orientation-photo-overlay" />
          <div className="venue-orientation-badge">
            <span>Confirmed Venue</span>
            <strong>{venueInfo.venueName}</strong>
            <small>{venueInfo.city}, {venueInfo.region}</small>
          </div>
          <div className="venue-orientation-address">
            <strong>Address</strong>
            <span>{venueInfo.address}</span>
          </div>
        </article>

        <div className="venue-orientation-panel">
          <div className="venue-orientation-panel-head">
            <p className="section-kicker">Delegate & Participant Flow</p>
            <h3>Think vertical, not complicated.</h3>
            <p>Calvary Crown is a 10-storey venue. For BICC, delegates and participants mainly need to understand where to arrive, gather, train, stay and dine.</p>
          </div>

          <div className="venue-building-cutaway">
            <div className="venue-building-cutaway-stack" aria-label="Calvary Crown floor overview">
              {floorGroups.map((group) => (
                <article className={`venue-building-cutaway-level ${group.type}`} key={`cutaway-${group.range}`}>
                  <span>{group.range}</span>
                  <div>
                    <strong>{group.title}</strong>
                    <small>{group.note}</small>
                  </div>
                </article>
              ))}
            </div>
            <div className="venue-key-zone-grid">
              {keyZones.map((zone) => (
                <article className={`venue-key-zone-card ${zone.type}`} key={zone.title}>
                  <span>{zone.level}</span>
                  <h4>{zone.title}</h4>
                  <p>{zone.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <details className="venue-floor-flow-card venue-floor-accordion">
            <summary className="venue-floor-flow-head">
              <strong>Floor guide</strong>
              <span>Room assignments coming soon</span>
            </summary>
            <div className="venue-floor-flow-list">
              {floorGroups.map((group) => (
                <article className={`venue-floor-flow-row ${group.type}`} key={group.range}>
                  <span>{group.range}</span>
                  <div>
                    <strong>{group.title}</strong>
                    <small>{group.note}</small>
                  </div>
                </article>
              ))}
            </div>
          </details>

          <p className="venue-map-status-note">
            The official BICC room map will be added closer to the convention. Use this section as the venue orientation, not a final floor plan.
          </p>
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
          <h2>A simple step-by-step guide for the delegate and participant arrival experience.</h2>
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
  const visitSteps = ['Airport', 'Hotel', venueInfo.venueName, 'Reception', 'Programme']
  const priorityCards = practicalGuideCards.slice(0, 4)

  return (
    <section className="editorial-section section-shell venue-practical-guide venue-visit-planner">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Plan Your Visit</p>
          <h2>A clear arrival plan for delegates and participants.</h2>
        </div>
        <p className="section-intro">Use this as your convention-day checklist before the final delegate guide is released.</p>
      </div>

      <div className="venue-visit-planner-shell">
        <article className="venue-route-card">
          <img
            alt="Delegates and participants arriving for BICC in Tawau"
            className="venue-route-photo"
            decoding="async"
            loading="lazy"
            src={venueArrivalDelegatesImage}
          />
          <div className="venue-route-photo-overlay" />
          <div className="venue-route-head">
            <span className="section-kicker">Arrival Route</span>
            <h3>From travel to check-in.</h3>
          </div>
          <div className="venue-route-line">
            {visitSteps.map((step, index) => (
              <div className="venue-route-node" key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <p>Plan flights, stay close enough for easy mornings, then start at reception for your pass, materials and latest room directions.</p>
        </article>

        <div className="venue-practical-grid refined">
          {priorityCards.map((card) => (
            <article className="venue-travel-card refined" key={card.title}>
              <span className="venue-fact-icon">{card.icon}</span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </div>
              <span className="venue-coming-soon neutral">{card.note}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="venue-planner-note">
        <strong>Still to be confirmed:</strong>
        <span>final room assignments, detailed accessibility notes and any last venue route updates.</span>
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
          <h2>Short answers for first-time delegates and participants.</h2>
        </div>
      </div>

      <div className="programme-faq-list">
        {venueFaqItems.slice(0, 5).map((item) => (
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
        <p className="section-kicker">Next Step</p>
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
          <a className="primary-btn" href="#visit-travel-support">
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
        <a href="#visit-travel-support">Travel Help</a>
        <a href="#visit-things">Things To Do</a>
      </nav>

      <p className="visit-official-note">
        Use this as a participant planning guide. Final hotel, tour and transport arrangements should be confirmed directly with providers or listed travel support partners.
      </p>
    </section>
  )
}

function VisitFoodSection() {
  const [showAllFood, setShowAllFood] = useState(false)
  const [activeFoodFilter, setActiveFoodFilter] = useState<(typeof tawauFoodFilterItems)[number]>('All')
  const filteredFoodDirectory =
    activeFoodFilter === 'All'
      ? tawauFoodDirectory
      : tawauFoodDirectory.filter((item) => item.category === activeFoodFilter)
  const visibleFoodDirectory = showAllFood ? filteredFoodDirectory : filteredFoodDirectory.slice(0, 3)

  return (
    <section className="editorial-section section-shell visit-section" id="visit-food">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Food</p>
          <h2>Eat Tawau Without Overplanning</h2>
        </div>
        <p className="section-intro">
          Start with seafood, kopitiam breakfasts, market snacks and cafe resets. The guide is built to grow as more local recommendations are confirmed.
        </p>
      </div>

      <div className="visit-food-picks visit-food-picks-compact">
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
              <img alt={card.title} decoding="async" loading="lazy" src={card.image} />
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

      <div className="visit-food-guide visit-food-guide-compact">
        <div className="visit-food-guide-head">
          <p className="section-kicker">Tawau Food Guide</p>
          <h3>Food stops participants can scan fast.</h3>
          <p>Use these current BICC food references for simple planning. Confirm opening hours, menu and group arrangements directly before visiting.</p>
        </div>

        <div className="visit-food-filter-row" aria-label="Food directory filters">
          {tawauFoodFilterItems.map((filter) => (
            <button
              aria-pressed={activeFoodFilter === filter}
              className={activeFoodFilter === filter ? 'active' : ''}
              key={filter}
              onClick={() => {
                setActiveFoodFilter(filter)
                setShowAllFood(false)
              }}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="visit-food-directory-grid visit-food-directory-compact">
          {visibleFoodDirectory.map((item) => (
            <article
              className="visit-food-directory-card"
              id={`food-directory-${slugify(item.category)}`}
              key={item.name}
            >
              <img alt={item.name} decoding="async" loading="lazy" src={item.image} />
              <div>
                <span>{item.category}</span>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <small>{item.bestFor}</small>
              </div>
            </article>
          ))}
        </div>
        {filteredFoodDirectory.length > 3 && (
          <button
            aria-expanded={showAllFood}
            className="visit-reveal-btn"
            onClick={() => setShowAllFood((current) => !current)}
            type="button"
          >
            {showAllFood ? 'Show fewer food ideas' : `Show ${filteredFoodDirectory.length - 3} more food ideas`}
          </button>
        )}
        <p className="visit-directory-note">Food references are provided for delegate and participant planning. Details may be updated as partner arrangements are confirmed.</p>
      </div>
    </section>
  )
}

function VisitStaySection() {
  const [showAllStays, setShowAllStays] = useState(false)
  const [activeStayFilter, setActiveStayFilter] = useState<(typeof tawauStayFilterItems)[number]>('All')
  const visibleStayCards = tawauStayCards.slice(0, 3)
  const filteredHotels =
    activeStayFilter === 'All'
      ? tawauHotelSamples
      : tawauHotelSamples.filter((hotel) => (hotel.filters as readonly string[]).includes(activeStayFilter))
  const visibleHotels = showAllStays ? filteredHotels : filteredHotels.slice(0, 4)

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

      <div className="visit-stay-strategy" aria-label="Accommodation planning styles">
        {visibleStayCards.map((card) => (
          <article key={card.title}>
            <span>{card.icon}</span>
            <div>
              <strong>{card.title}</strong>
              <small>{card.copy}</small>
            </div>
          </article>
        ))}
      </div>
      <p className="visit-note">
        Official hotel partners and recommended participant options will be updated once confirmed. BICC does not manage hotel bookings unless official hotel partners are announced.
      </p>

      <div className="visit-hotel-panel">
        <div className="visit-hotel-panel-head">
          <p className="section-kicker">Accommodation References</p>
          <h3>Suggested stays from local accommodation materials.</h3>
          <p>
            Use these as starting points for participant planning. Booking, rates and availability should be confirmed directly with each hotel or homestay.
          </p>
        </div>

        <div className="visit-food-filter-row" aria-label="Accommodation filters">
          {tawauStayFilterItems.map((filter) => (
            <button
              aria-pressed={activeStayFilter === filter}
              className={activeStayFilter === filter ? 'active' : ''}
              key={filter}
              onClick={() => {
                setActiveStayFilter(filter)
                setShowAllStays(false)
              }}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="visit-hotel-grid">
          {visibleHotels.map((hotel) => (
            <a className="visit-hotel-card" href={hotel.link} key={hotel.name} rel="noreferrer" target="_blank">
              <div className="visit-hotel-image">
                <img alt={`${hotel.name} in Tawau`} decoding="async" loading="lazy" src={hotel.image} />
                <span>{hotel.tag}</span>
              </div>
              <div className="visit-hotel-copy">
                <span>{hotel.fit}</span>
                <h4>{hotel.name}</h4>
                <p>{hotel.area}</p>
                <small>{hotel.note}</small>
                <p className="visit-hotel-contact">{hotel.contact}</p>
                <strong>Open booking / contact</strong>
                <em>{hotel.credit}</em>
              </div>
            </a>
          ))}
        </div>
        {filteredHotels.length > 4 && (
          <button
            aria-expanded={showAllStays}
            className="visit-reveal-btn"
            onClick={() => setShowAllStays((current) => !current)}
            type="button"
          >
            {showAllStays ? 'Show fewer stay options' : `Show ${filteredHotels.length - 4} more stay options`}
          </button>
        )}
      </div>

      <div className="visit-tip-strip">
        <strong>Participant reminders</strong>
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
        International participants should check flight connections into Tawau before booking hotels. Final BICC travel notes will be updated closer to the convention.
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

function VisitTravelAgencySection() {
  const [activeTravelFilter, setActiveTravelFilter] = useState<(typeof tawauTravelFilterItems)[number]['key']>('all')
  const visibleTravelPartners =
    activeTravelFilter === 'all'
      ? tawauTravelPartners
      : tawauTravelPartners.filter((partner) => partner.kind === activeTravelFilter)

  return (
    <section className="editorial-section section-shell visit-travel-support visit-travel-agency-section" id="visit-travel-support">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Travel Agencies</p>
          <h2>Find the right travel partner for your BICC trip.</h2>
        </div>
        <p className="section-intro">
          Compare confirmed visitor support partners for airport transfers, stays, local tours and convention-day questions.
        </p>
      </div>

      <div className="visit-travel-desk">
        <div className="visit-travel-route-strip">
          <div>
            <span>Planning route</span>
            <h3>Airport to hotel, venue and Tawau moments.</h3>
          </div>
          <div className="visit-travel-mini-route" aria-label="Travel planning route">
            {tawauRouteSteps.map((step) => (
              <strong key={step}>{step}</strong>
            ))}
          </div>
        </div>

        <div className="visit-travel-directory-head">
          <div>
            <p className="section-kicker">Travel partner directory</p>
            <h3>Compare by support type, language and service.</h3>
            <p>All partners are listed at the same level. Please confirm pricing, availability and booking details directly with each provider.</p>
          </div>
          <div className="visit-travel-directory-controls">
            <div className="visit-food-filter-row compact" aria-label="Travel partner filters">
              {tawauTravelFilterItems.map((filter) => (
                <button
                  aria-pressed={activeTravelFilter === filter.key}
                  className={activeTravelFilter === filter.key ? 'active' : ''}
                  key={filter.key}
                  onClick={() => setActiveTravelFilter(filter.key)}
                  type="button"
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <small>
              Showing {visibleTravelPartners.length} partners
            </small>
          </div>
        </div>

        <div className="visit-agency-grid directory">
          {visibleTravelPartners.map((partner) => (
            <a
              className={`visit-agency-card ${partner.kind}`}
              href={partner.href}
              key={partner.name}
              rel={partner.external ? 'noreferrer' : undefined}
              target={partner.external ? '_blank' : undefined}
            >
              <div className="visit-agency-image">
                <img alt={`${partner.name} travel support for BICC visitors`} decoding="async" loading="lazy" src={partner.image} />
                <span>{partner.badge}</span>
              </div>
              <div className="visit-agency-copy">
                <div className="visit-travel-partner-head">
                  <small>{partner.label}</small>
                </div>
                <h3>{partner.name}</h3>
                <p>{partner.summary}</p>
                <p className="visit-agency-best-for">
                  <strong>Best for</strong>
                  <span>{partner.bestFor}</span>
                </p>
                <p className="visit-agency-meta">
                  <strong>Languages</strong>
                  <span>{partner.languages}</span>
                </p>
                <div className="pass-focus-chips">
                  {partner.services.slice(0, 3).map((service) => (
                    <span key={service}>{service}</span>
                  ))}
                  {partner.services.length > 3 ? <span>+{partner.services.length - 3}</span> : null}
                </div>
                <p className="visit-hotel-contact">{partner.contact}</p>
                <em>{partner.cta}</em>
              </div>
            </a>
          ))}
        </div>
      </div>

      <p className="visit-directory-note">Travel agency partners can be added here as they are confirmed.</p>
    </section>
  )
}

function VisitThingsToDoSection() {
  const [showAllThings, setShowAllThings] = useState(false)
  const [activeThingFilter, setActiveThingFilter] = useState<(typeof tawauThingsFilterItems)[number]>('All')
  const filteredThings =
    activeThingFilter === 'All'
      ? tawauThingsToDoCards
      : tawauThingsToDoCards.filter((card) => (card.filters as readonly string[]).includes(activeThingFilter))
  const visibleThings = showAllThings ? filteredThings : filteredThings.slice(0, 3)

  return (
    <section className="editorial-section section-shell visit-section" id="visit-things">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Things To Do</p>
          <h2>Explore Tawau between convention moments.</h2>
        </div>
        <p className="section-intro">
          A focused visitor guide for markets, nature, cocoa heritage and simple city experiences participants can plan around BICC.
        </p>
      </div>

      <div className="visit-guide-strip" aria-label="Tawau visitor highlights">
        {tawauThingsFilterItems.map((filter) => (
          <button
            aria-pressed={activeThingFilter === filter}
            className={activeThingFilter === filter ? 'active' : ''}
            key={filter}
            onClick={() => {
              setActiveThingFilter(filter)
              setShowAllThings(false)
            }}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="visit-things-guide-grid">
        {visibleThings.map((card) => (
          <article className={`visit-destination-guide-card ${card.tone}`} key={card.title}>
            <div className="visit-destination-guide-media">
              <img alt={card.title} decoding="async" loading="lazy" src={card.image} />
              <small>{card.tag}</small>
            </div>
            <div className="visit-destination-guide-copy">
              <span>{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <div className="visit-destination-points">
                {card.highlights.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
              <p className="visit-destination-tip">{card.tip}</p>
              <small>{card.credit}</small>
            </div>
          </article>
        ))}
      </div>
      {filteredThings.length > 3 && (
        <button
          aria-expanded={showAllThings}
          className="visit-reveal-btn"
          onClick={() => setShowAllThings((current) => !current)}
          type="button"
        >
          {showAllThings ? 'Show fewer places' : `Show ${filteredThings.length - 3} more places`}
        </button>
      )}

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
        <a className="primary-btn" href="#visit-travel-support">
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
      <VisitTravelAgencySection />
      <VisitThingsToDoSection />
      <VisitTawauCTA />
    </main>
  )
}

function ContactPage() {
  const contactCards = [
    {
      title: 'Delegate & Participant Support',
      copy: 'Passes, track selection, payment follow-up and arrival questions.',
      cta: 'Email Delegate & Participant Support',
      href: 'mailto:hello@bicc2026.com?subject=BICC%202026%20Delegate%20and%20Participant%20Support',
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
          <p>Short, direct routes for delegates and participants, international visitors, partners and media.</p>
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
      'The programme preview is available on the website. An official PDF can be added once final times, rooms and instructor allocations are confirmed.',
  },
  {
    question: 'Are hotel and travel bookings handled by BICC?',
    answer:
      'Delegates and participants should arrange hotels, flights and local travel directly unless BICC announces an official partner arrangement.',
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
            A practical guide for delegates and participants, international visitors, instructors, sponsors and families planning for Tawau, Sabah.
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
        'The full website, pass information, programme preview and visitor guide are maintained in English for international delegates, participants and partners.',
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
      points: ['日期：2026年8月3日至5日', '地点：马来西亚沙巴斗湖', '通行证：Foundation / Mastery，US$190'],
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
      points: ['Tarikh: 3-5 Ogos 2026', 'Lokasi: Tawau, Sabah, Malaysia', 'Pas: Foundation / Mastery, US$190'],
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
            BICC is an international convention rooted in Sabah. These quick guides help delegates, participants, families, local partners and visitors understand the essentials before they explore the full English site.
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
            Sanity will become the editing dashboard for page content, images, instructors, sponsors, FAQ, workshops and Visit Tawau listings.
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
            ['Instructors', 'Profile photo, country, role, bio, specialties and featured status.'],
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
          <span className="programme-ticket-badge">Official Partnership Entry</span>
        </div>
        <p className="passes-hero-intro">
          Put your brand at the heart of performance, culture, tourism and community impact in Tawau, Sabah.
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
          <img alt="BICC performance and audience engagement" src={landingSponsorImpactImage} />
          <div className="sponsor-hero-overlay" />
          <div className="sponsor-hero-impact-card">
            <span>Partnership Focus</span>
            <strong>Visibility + CSR + Destination Impact</strong>
          </div>
        </div>
        <article className="programme-floating-card top">
          <img alt="Interactive clown performance" decoding="async" loading="lazy" src={landingPerformanceAudienceImage} />
          <span>Stage visibility</span>
        </article>
        <article className="programme-floating-card bottom">
          <img alt="Hands-on workshop" decoding="async" loading="lazy" src={landingWorkshopTrainingImage} />
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
          <p className="section-kicker">Official Support</p>
          <h2>Official support, visible immediately.</h2>
        </div>
        <p className="section-intro">Current organiser, collaboration and destination supporters at a glance.</p>
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
          <h2>Four reasons sponsors can see quickly.</h2>
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
          <h2>Choose the sponsorship lane that fits your brand.</h2>
        </div>
        <p className="section-intro">Stage, workshops, CSR, delegates and participants, travel or media. Each route can be shaped into a package.</p>
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

      <div className="sponsor-exposure-strip">
        <div className="sponsor-brand-core compact">
          <img alt="BICC 2026 logo" src={biccLogo} />
          <strong>Where Your Brand Appears</strong>
          <span>Visibility points can be packaged based on sponsor level.</span>
        </div>
        <div className="sponsor-brand-points">
          {sponsorExposurePoints.slice(0, 8).map((point) => (
            <span className="playful-chip" key={point}>{point}</span>
          ))}
        </div>
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
          <h2>Simple tiers. Details by request.</h2>
        </div>
        <p className="section-intro">Keep the page easy to scan. Full benefits, pricing and custom options belong in the sponsorship deck.</p>
      </div>

      <div className="sponsor-package-grid">
        {sponsorPackageCards.map((card) => (
          <article className="sponsor-package-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <ul className="pass-mini-list">
              {card.points.slice(0, 3).map((point) => (
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
        <p className="section-kicker">Partnership Inquiry</p>
        <h2>Let’s build a joyful partnership.</h2>
        <p>
          Tell us your sponsorship goal. We will match your brand with the right visibility, CSR, tourism or community opportunity.
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
            <strong>Best next step</strong>
            <span>Request the sponsorship deck, then schedule a package discussion.</span>
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

function PassHero() {
  return (
    <section className="passes-hero section-shell">
      <div aria-hidden="true" className="spotlight-glow passes-spotlight" />
      <div aria-hidden="true" className="confetti-field passes-confetti" />
      <div className="passes-hero-copy">
        <p className="section-kicker">Passes & Registration</p>
        <div className="passes-hero-title-row">
          <h1>Choose Your BICC Pass.</h1>
          <span className="programme-ticket-badge">Official Registration</span>
        </div>
        <p className="passes-hero-intro">
          One convention. Two training paths. Pick Foundation if you are building confidence, or Mastery if you are ready for stronger stage critique.
        </p>
        <div className="event-badges programme-hero-badges">
          <span>Aug 3–5, 2026</span>
          <span>Tawau, Sabah</span>
          <span>US$190</span>
        </div>
        <div className="hero-actions programme-hero-actions">
          <a className="primary-btn" href="#pass-compare">
            Choose Your Pass
          </a>
          <a className="secondary-btn" href="#pass-compare">
            Compare Tracks
          </a>
        </div>
      </div>

      <div className="passes-hero-visual">
        <img alt="Delegate or participant receiving a BICC convention pass" className="passes-hero-photo" src={passesRegistrationMomentImage} />
        <div className="passes-hero-photo-overlay" />
        <div className="passes-hero-ticket-stack" aria-label="Available passes">
          {passes.map((pass) => (
            <article className={`pass-mini-ticket ${pass.accent}`} key={`hero-${pass.id}`}>
              <span className={`track-label ${pass.accent}`}>{pass.shortName}</span>
              <strong>{pass.price}</strong>
              <small>{pass.accent === 'foundation' ? 'Beginner-friendly' : 'Performance-focused'}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PassComparisonCards() {
  return (
    <section className="editorial-section section-shell pass-comparison-section" id="pass-compare">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Two Passes. One Shared Convention.</p>
          <h2>Pick your training track.</h2>
        </div>
        <p className="section-intro">Same convention, same price. Choose by experience level.</p>
      </div>

      <div className="pass-ticket-grid">
        {passes.map((pass) => (
          <article className={`pass-ticket-card ${pass.accent}`} id={`${pass.id}-pass`} key={pass.id}>
            <div className="ticket-perforation" />
            <div className="pass-ticket-media">
              <img
                alt={pass.name}
                decoding="async"
                loading="lazy"
                src={pass.accent === 'foundation' ? passesFoundationWorkshopImage : passesMasteryStageImage}
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
              <div className="pass-ticket-quick-row">
                <strong>Best for</strong>
                <div>
                  {pass.bestFor.slice(0, 2).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="pass-focus-chips">
                {pass.includes.slice(0, 3).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="pass-ticket-actions">
                <a className="primary-btn wide-btn" href={pass.ctaHref} rel="noreferrer" target="_blank">
                  {pass.cta}
                </a>
                <a className="text-link" href={pass.workshopHref}>
                  {pass.id === 'foundation' ? 'View Foundation Workshops' : 'View Mastery Workshops'}
                </a>
              </div>
              <small className="pass-ticket-note">Track access subject to organizer confirmation.</small>
            </div>
          </article>
        ))}
      </div>

      <div className="pass-unsure-note compact">
        <strong>Quick guide:</strong>
        <div className="pass-decision-mini-grid">
          <article>
            <span>01</span>
            <h3>Choose track</h3>
            <p>Foundation for new performers. Mastery for experienced performers.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Checkout safely</h3>
            <p>Use the official Stripe button on the pass you choose.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Submit details</h3>
            <p>Complete the participant form with your Stripe receipt email.</p>
          </article>
        </div>
        <a className="text-link" href="/workshops">
          View Workshop Tracks
        </a>
      </div>
    </section>
  )
}

function PassTrustStrip() {
  const trustItems = [
    {
      title: 'Official Stripe checkout',
      copy: 'Pay through the official BICC pass links.',
    },
    {
      title: 'Same price, clear choice',
      copy: 'Foundation and Mastery are both US$190.',
    },
    {
      title: 'Delegate / participant details after payment',
      copy: 'After Stripe checkout, submit your profile with the same receipt email.',
    },
  ]

  return (
    <section className="pass-trust-strip" aria-label="Pass registration reassurance">
      {trustItems.map((item) => (
        <article className="pass-trust-item" key={item.title}>
          <span className="pass-trust-dot" aria-hidden="true" />
          <div>
            <strong>{item.title}</strong>
            <span>{item.copy}</span>
          </div>
        </article>
      ))}
    </section>
  )
}

function PassIncludedSection() {
  return (
    <section className="editorial-section section-shell pass-included-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">What Your Pass Gives You</p>
          <h2>Everything essential. Nothing confusing.</h2>
        </div>
        <p className="section-intro">A clear 3-day convention pass connected to your selected training track.</p>
      </div>

      <div className="pass-included-grid">
        {passIncludedItems.slice(0, 4).map((item) => (
          <article className={`venue-fact-card ${item.tone}`} key={item.title}>
            <span className="venue-fact-icon">{item.icon}</span>
            <div className="venue-fact-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="pass-included-note">
        Final programme access, room assignments and any special activities follow official organiser confirmation.
      </p>
    </section>
  )
}

function PassRegistrationFlow() {
  return (
    <section className="editorial-section section-shell pass-registration-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">How Registration Works</p>
          <h2>Buy your pass. Then prepare for BICC.</h2>
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
          Already paid? Complete Delegate / Participant Details
        </a>
      </div>
    </section>
  )
}

function PassAfterPaymentPanel() {
  return (
    <section className="pass-after-payment-panel section-shell" id="after-payment">
      <div>
        <p className="section-kicker">After Payment</p>
        <h2>Your next step is simple.</h2>
        <p>
          Keep your Stripe receipt, then submit your participant details with the same email address. This helps the BICC team match your payment, selected track and official updates.
        </p>
      </div>
      <div className="pass-after-payment-actions">
        <a className="primary-btn" href="/delegate-details">
          Complete Participant Details
        </a>
        <a className="secondary-btn" href="/registration-confirmed">
          View Thank You Page
        </a>
        <a className="text-link" href="mailto:hello@bicc2026.com?subject=BICC%202026%20Payment%20Follow-up">
          Need help? Email BICC
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
        {passFaqItems.slice(0, 5).map((item) => (
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
        <p className="section-kicker">Join BICC 2026</p>
        <h2>Ready to Choose Your Pass?</h2>
        <p>Three days. Two tracks. One joyful international convention in Tawau, Sabah.</p>
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
      <PassTrustStrip />
      <PassComparisonCards />
      <PassIncludedSection />
      <PassRegistrationFlow />
      <PassAfterPaymentPanel />
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
              Complete Delegate / Participant Details
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
            Use the same email as your Stripe receipt when you complete the participant form. That makes organizer matching much easier.
          </p>
          <a className="text-link" href="mailto:hello@bicc2026.com?subject=BICC%202026%20Payment%20Confirmation%20Help">
            Need help matching your payment?
          </a>
        </aside>
      </section>

      <section className="editorial-section section-shell registration-steps-panel">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Delegate / Participant Flow</p>
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
              <h3>Submit participant details</h3>
              <p>Tell BICC who you are, which track you selected and how to reach you.</p>
            </div>
          </article>
          <article className="venue-fact-card soft-yellow">
            <span className="venue-fact-icon">3</span>
            <div className="venue-fact-copy">
              <h3>Receive updates</h3>
              <p>Programme, venue, check-in and follow-up details will be sent through official communication.</p>
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
      setStatusMessage('Delegate / participant details copied. You can paste them into an email to hello@bicc2026.com if needed.')
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
          <p className="section-kicker">Delegate / Participant Details</p>
          <h1>Complete your BICC delegate details.</h1>
          <p className="page-intro">
            Use this simple form so the BICC team can match your payment with your selected track and send you the right updates before the convention.
          </p>
          <div className="event-badges">
            <span>{selectedPass.shortName}</span>
            <span>{selectedPass.price}</span>
            <span>International Delegate / Participant</span>
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
          <img alt="Hands-on clown workshop training" src={landingWorkshopTrainingImage} />
        </div>
        <article className="workshop-hero-sidecard">
          <span className="workshop-hero-sidecard-label">Training Focus</span>
          <strong>Stage craft, visual play, outreach and live audience connection.</strong>
        </article>
        <article className="programme-floating-card top">
          <img alt="Workshop practice" decoding="async" loading="lazy" src={landingFoundationTrackImage} />
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
              <img
                alt={pass.name}
                decoding="async"
                loading="lazy"
                src={pass.accent === 'foundation' ? landingFoundationTrackImage : landingMasteryTrackImage}
              />
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
              <a className="primary-btn wide-btn" href={`/passes#${pass.id}-pass`}>
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
        <p className="section-intro">
          Participants are entitled to attend all eight classes included in their selected level. All classes are subject to
          change.
        </p>
      </div>

      <div className="workshop-catalogue-grid">
        {workshopCards.map((workshop) => (
          <article className={`workshop-card ${workshop.featured ? 'featured' : ''} ${workshop.trackType}`} key={workshop.id}>
            <div className="workshop-card-media">
              <img alt={workshop.title} decoding="async" loading="lazy" src={workshop.image} />
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
        <p className="section-kicker">Join the Training</p>
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
        <a className="primary-btn foundation-btn" href="/passes#foundation-pass">
          Get Foundation Pass
        </a>
        <a className="primary-btn" href="/passes#mastery-pass">
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

function MentorResourceLinks({ mentor }: { mentor: MentorProfile }) {
  const links = [
    mentor.officialBioUrl ? { label: 'Official bio', href: mentor.officialBioUrl } : null,
    mentor.socialUrl ? { label: 'Social', href: mentor.socialUrl } : null,
    mentor.sourceUrl ? { label: 'Source', href: mentor.sourceUrl } : null,
  ]
    .filter((link): link is { label: string; href: string } => Boolean(link?.href))
    .filter((link, index, list) => list.findIndex((item) => item.href === link.href) === index)
    .slice(0, 2)

  if (!links.length) return null

  return (
    <div className="mentor-resource-links" aria-label={`${mentor.name} profile links`}>
      {links.map((link) => (
        <a href={link.href} key={`${mentor.id}-${link.label}`} rel="noreferrer" target="_blank">
          {link.label}
        </a>
      ))}
    </div>
  )
}

function MentorHero() {
  return (
    <section className="mentor-page-hero section-shell">
      <div className="mentor-hero-copy">
        <p className="section-kicker">Instructors & Guest Artists</p>
        <h1>Meet the Artists Behind the BICC Stage.</h1>
        <p className="passes-hero-intro">
          Meet the performers, teachers and guest artists bringing real stage experience, practical craft and
          creative exchange to BICC 2026.
        </p>
        <div className="event-badges programme-hero-badges">
          <span>International Guest Artists</span>
          <span>Workshop Instructors</span>
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
          <span>Workshops • Showcase • Community Exchange</span>
        </div>
      </div>

      <div className="mentor-hero-visual">
        <div className="mentor-hero-lineup-collage" aria-label="International BICC instructor and guest artist lineup">
          <img alt="Mr. John" className="mentor-lineup-photo mentor-lineup-photo-john" src="/mentors/mr-john.jpg" />
          <img alt="Chagy" className="mentor-lineup-photo mentor-lineup-photo-chagy" src="/mentors/chagy.jpg" />
          <img alt="Randy Christensen" className="mentor-lineup-photo mentor-lineup-photo-randy" src="/mentors/randy-christensen.jpg" />
          <img alt="Uncle Button" className="mentor-lineup-photo mentor-lineup-photo-button" src="/mentors/uncle-button.jpg" />
          <img alt="Paya Cocos" className="mentor-lineup-photo mentor-lineup-photo-paya" src="/mentors/paya-cocos.png" />
          <img alt="Uncle Sunday" className="mentor-lineup-photo mentor-lineup-photo-sunday" src="/mentors/uncle-sunday.png" />
        </div>
        <div aria-hidden="true" className="mentor-hero-overlay" />
        <span className="programme-ticket-badge mentor-hero-badge">2026 Instructor Line-up</span>
        <div className="mentor-hero-note">
          <span>Faculty Edition</span>
          <strong>Stage artists, teachers and performers gathered for a warm international exchange.</strong>
        </div>
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
        {mentor.image ? (
          <img alt={`${mentor.name} portrait`} decoding="async" loading="lazy" src={mentor.image} />
        ) : (
          <MentorPlaceholderArt label={mentor.name} />
        )}
        <span className="mentor-card-flag">{featured ? 'Featured' : mentor.country}</span>
      </div>
      <div className="mentor-lineup-copy">
        <div className="mentor-lineup-badges">
          <span className="track-label red">{mentor.country}</span>
          <span className="mentor-role-pill">{mentor.role}</span>
        </div>
        <h3>{mentor.name}</h3>
        <p>{mentor.shortIntro}</p>
        <MentorResourceLinks mentor={mentor} />
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
  const featuredMentors = mentors.filter((mentor) => mentor.featured).slice(0, 4)

  return (
    <section className="editorial-section section-shell mentor-featured-section">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Featured Guest Artists</p>
          <h2>Featured artists shaping BICC 2026.</h2>
        </div>
        <p className="section-intro">A focused preview of the guest artists, teachers and stage voices joining the convention.</p>
      </div>

      <div className="mentor-featured-grid">
        {featuredMentors.map((mentor) => (
          <article className="mentor-feature-card" data-mentor-id={mentor.id} key={mentor.id}>
            <div className="mentor-feature-media">
              {mentor.image ? (
                <img alt={`${mentor.name} portrait`} decoding="async" loading="lazy" src={mentor.image} />
              ) : (
                <MentorPlaceholderArt label={mentor.name} />
              )}
            </div>
            <div className="mentor-feature-copy">
              <div className="mentor-lineup-badges">
                <span className="track-label red">{mentor.country}</span>
                <span className="mentor-role-pill">{mentor.role}</span>
              </div>
              <h3>{mentor.name}</h3>
              <p>{mentor.shortIntro}</p>
              <MentorResourceLinks mentor={mentor} />
              <div className="pass-focus-chips">
                {mentor.specialties.slice(0, 2).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mentor-feature-footer">
        <a className="secondary-btn" href="#mentor-lineup">
          View Full Line-up
        </a>
      </div>
    </section>
  )
}

function MentorGrid({ mentors, hiddenMentorIds }: { mentors: MentorProfile[]; hiddenMentorIds?: Set<string> }) {
  const [activeFilter, setActiveFilter] = useState<MentorFilterKey>('all')

  const filteredMentors = mentors.filter((mentor) => {
    if (hiddenMentorIds?.has(mentor.id)) return false
    if (activeFilter === 'all') return true
    if (activeFilter === 'malaysia') return mentor.country === 'Malaysia'
    if (activeFilter === 'asia') return mentor.region === 'Asia' || mentor.country === 'Malaysia'
    if (activeFilter === 'usa') return mentor.country === 'USA'
    if (activeFilter === 'workshop-mentors') return mentor.role.includes('Workshop') || mentor.role.includes('Teaching')
    if (activeFilter === 'guest-artists') return mentor.role.includes('Guest Artist')
    return true
  })

  return (
    <section className="editorial-section section-shell mentor-grid-section" id="mentor-lineup">
      <div className="section-head with-copy">
        <div>
          <p className="section-kicker">Meet the Line-up</p>
          <h2>Explore more of the BICC 2026 instructors, performers and guest artists.</h2>
        </div>
      </div>

      <div className="mentor-filter-row" role="tablist" aria-label="Instructor filters">
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
      <p className="mentor-directory-meta">{filteredMentors.length} instructors and guest artists shown.</p>

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
        <p className="section-kicker">Meet the Line-up</p>
        <h2>Train With the BICC Instructors.</h2>
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
  const displayedFeaturedMentorIds = getDisplayedFeaturedMentorIds(mentors)

  return (
    <main className="mentors-page">
      <MentorHero />
      <FeaturedMentors mentors={mentors} />
      <MentorGrid mentors={mentors} hiddenMentorIds={displayedFeaturedMentorIds} />
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
            <span>US$190</span>
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
            <img alt="Joyful professional clown performer" src={landingHeroPerformerImage} />
            <SmileDoodle />
          </div>
          <article className="floating-photo training-shot">
            <img alt="Clown workshop training moment" src={landingWorkshopTrainingImage} />
            <span>Workshop / Training</span>
          </article>
          <article className="floating-photo audience-shot">
            <img alt="Clown performance and audience moment" src={landingPerformanceAudienceImage} />
            <span>Performance / Audience</span>
          </article>
          <aside className="hero-participation-card" aria-label="BICC 2026 participation snapshot">
            <span className="hero-participation-kicker">Participation Snapshot</span>
            <div className="hero-participation-stats">
              <strong>32+</strong>
              <span>participants so far</span>
            </div>
            <p>11 countries / regions represented</p>
            <div className="hero-country-cloud">
              {heroParticipationCountries.map((country) => (
                <span key={country}>{country}</span>
              ))}
            </div>
          </aside>
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
            <img alt="Clown performer or instructor on stage" src={landingStoryConnectionImage} />
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
                  src={index === 0 ? landingFoundationTrackImage : landingMasteryTrackImage}
                />
              </div>
              <div className="track-card-copy">
                <span className={`track-label ${pass.accent} sticker-badge`}>{pass.name}</span>
                <p className="track-audience">{index === 0 ? 'For beginners, emerging performers, educators, students and teaching artists.' : 'For experienced performers, working clowns and stage artists ready for critique.'}</p>
                <p className="pass-price">{pass.price}</p>
                <p className="track-summary">{index === 0 ? 'Build confidence, character, timing and the physical clarity needed to hold an audience.' : 'Refine stage presence, strengthen your act and make sharper professional choices under real feedback.'}</p>
                <div className="track-chip-list">
                  {pass.includes.slice(0, 4).map((item) => (
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
            <p className="section-kicker">Instructors & Guest Artists</p>
            <h2>Learn From Artists Who Live The Stage.</h2>
          </div>
          <p className="section-intro">Instructors are selected for stage credibility, teaching clarity and real audience experience.</p>
        </div>

        <div className="mentor-preview-grid">
          {mentorPreviewCards.map((item) => (
            <article className="mentor-preview-card" key={item.title}>
              <div className="mentor-preview-image">
                <img alt={item.title} decoding="async" loading="lazy" src={item.image} />
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
            View Instructors
          </a>
        </div>
      </section>

      <section className="final-cta home-final-cta">
        <div aria-hidden="true" className="home-cta-orbit">
          <span />
          <span />
          <span />
        </div>
        <div className="final-cta-copy">
          <span className="home-cta-badge">Aug 3–5, 2026 · Tawau, Sabah</span>
          <h2>Take your place in the BICC 2026 circle.</h2>
          <p>Choose your track and join three days of training, performance, exchange and red-nose energy in Borneo.</p>
          <div className="final-cta-actions">
            <a className="primary-btn home-cta-primary" href="/passes#foundation-pass">
              Get Foundation Pass
            </a>
            <a className="secondary-btn home-cta-secondary" href="/passes#mastery-pass">
              Get Mastery Pass
            </a>
            <a className="secondary-btn home-cta-ghost" href="/programme">
              View Programme
            </a>
          </div>
          <div className="home-cta-meta" aria-label="Convention highlights">
            <span>2 Workshop Tracks</span>
            <span>International Instructors</span>
            <span>US$190 Pass</span>
          </div>
        </div>
      </section>
    </main>
  )
}

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero section-shell">
        <div className="about-hero-copy">
          <p className="section-kicker">About BICC 2026</p>
          <h1>Laughter, craft and culture in one Borneo convention.</h1>
          <p>
            BICC 2026 brings performers, educators, artists, families and communities together through workshops,
            showcases, cultural exchange and meaningful human connection.
          </p>
          <div className="about-hero-pills" aria-label="BICC focus areas">
            <span>Professional workshops</span>
            <span>Stage showcase</span>
            <span>Borneo culture</span>
            <span>Community impact</span>
          </div>
          <div className="page-actions">
            <a className="primary-btn" href="/passes">
              View Passes
            </a>
            <a className="secondary-btn" href="/programme">
              Explore Programme
            </a>
          </div>
        </div>

        <aside className="about-hero-visual">
          <div className="about-hero-image-card">
            <img
              alt="Professional clown performer connecting with an audience"
              decoding="async"
              loading="lazy"
              src={landingStoryConnectionImage}
            />
            <div className="about-hero-image-overlay" />
            <span className="about-hero-image-badge">Craft · Culture · Connection</span>
          </div>
          <div className="about-editorial-card compact">
            <SmileDoodle />
            <p className="page-aside-kicker">Editorial Note</p>
            <h2>Why it matters</h2>
            <p>
              BICC raises clowning as a performance discipline and a human tool for joy, care and connection.
            </p>
          </div>
        </aside>
      </section>

      <section className="editorial-section section-shell about-overview-section">
        <div className="section-head single">
          <div>
            <p className="section-kicker">Page Overview</p>
            <h2>What makes BICC 2026 different.</h2>
          </div>
        </div>

        <div className="page-card-grid">
          {aboutValueCards.map((card) => (
            <article className="page-card about-value-card" key={card.title}>
              <RedNoseIcon />
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-vision-section section-shell">
        <p className="section-kicker">Our Vision</p>
        <h2>Where laughter becomes legacy.</h2>
        <p>
          To build BICC into a respected international platform where clown artists, educators, performers and
          communities gather to learn, collaborate and carry the spirit of joy beyond the stage.
        </p>
        <strong>This is more than a convention. It is a growing movement for craft, culture and connection.</strong>
      </section>

      <section className="editorial-section section-shell about-audience-section">
        <div className="about-split-copy">
          <p className="section-kicker">Who Should Join</p>
          <h2>Designed for performers, educators, families and communities.</h2>
          <p>
            BICC 2026 welcomes people from different backgrounds who believe in the power of joy, creativity and human
            connection.
          </p>
        </div>

        <div className="about-audience-list">
          {aboutAudienceGroups.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="about-borneo-section section-shell">
        <div className="about-borneo-copy">
          <p className="section-kicker">Built In Borneo</p>
          <h2>Built in Borneo. Open to the world.</h2>
          <p>
            Hosted in Tawau, Sabah, BICC 2026 carries the warmth of Borneo while welcoming guests from different
            countries and creative backgrounds. It is a convention, a cultural meeting point, and a shared celebration of
            laughter, learning and community.
          </p>
          <a className="secondary-btn" href="/visit-tawau">
            Discover Tawau
          </a>
        </div>

        <div className="about-borneo-visual">
          <img alt="Tawau and Borneo convention atmosphere" decoding="async" loading="lazy" src={visitWaterfrontImage} />
          <div className="about-map-card">
            <RedNoseIcon />
            <strong>Tawau, Sabah</strong>
            <span>Borneo warmth · international welcome</span>
          </div>
          <PatternCorner side="right" />
        </div>
      </section>

      <section className="about-beyond-section section-shell">
        <div>
          <p className="section-kicker">Beyond The Event</p>
          <h2>More than a three-day event.</h2>
        </div>
        <p>
          BICC 2026 is part of a bigger journey to strengthen clowning culture, support creative growth and build a
          connected community through the Borneo Clown Hub. The convention is the beginning — the relationships, learning
          and impact continue beyond the event.
        </p>
        <div className="about-mini-points">
          {aboutBeyondPoints.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </section>

      <section className="about-purpose-section section-shell">
        <div>
          <p className="section-kicker">Organised With Purpose</p>
          <h2>Created by people who believe in the power of joyful impact.</h2>
          <p>
            BICC 2026 is organised by a team passionate about performance, education, community service and creative
            collaboration. With local roots and an international outlook, the event is built to create a professional,
            welcoming and meaningful convention experience for every participant.
          </p>
        </div>
        <div className="about-organiser-mark">
          <img alt="BICC 2026 official logo" src={biccLogo} />
          <span>Official BICC 2026 convention platform</span>
        </div>
      </section>

      <section className="final-cta about-final-cta">
        <div className="final-cta-copy">
          <p className="section-kicker">Ready To Join</p>
          <h2>Be part of BICC 2026.</h2>
          <p>
            Whether you are joining as a performer, learner, instructor, sponsor or supporter, BICC 2026 invites you to be
            part of a convention where laughter becomes craft, culture and legacy.
          </p>
          <div className="final-cta-actions">
            <a className="primary-btn" href="/passes">
              Get Pass
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
  const [cmsPageContent, setCmsPageContent] = useState<CmsPageContent | null>(null)
  const isHome = currentPath === '/'
  const isAbout = currentPath === '/about'
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
    updateDocumentSeo(currentPath)
  }, [currentPath])

  useEffect(() => {
    window.localStorage.setItem('bicc-site-language', siteLanguage)
    document.documentElement.lang = siteLanguage === 'zh' ? 'zh-Hans' : siteLanguage === 'ms' ? 'ms' : 'en'
    window.setTimeout(() => {
      applyPageTranslations(siteLanguage)
      applyCmsPageContent(cmsPageContent, siteLanguage)
    }, 0)
  }, [siteLanguage, currentPath, cmsPageContent, cmsMentors])

  useEffect(() => {
    let isActive = true

    async function loadCmsPageContent() {
      try {
        const result = await fetchFromSanity<CmsPageContent | null>(cmsQueries.pageContent, { route: currentPath })
        if (!isActive) return
        setCmsPageContent(result || null)
      } catch {
        if (isActive) setCmsPageContent(null)
      }
    }

    loadCmsPageContent()
    return () => {
      isActive = false
    }
  }, [currentPath])

  useEffect(() => {
    let isActive = true

    async function loadCmsMentors() {
      try {
        const result = await fetchFromSanity<CmsMentor[]>(cmsQueries.mentors)
        if (!isActive || !result?.length) return
        setCmsMentors(mergeMentorProfiles(mapCmsMentors(result, siteLanguage)))
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
    <div className="page-shell" data-language={siteLanguage}>
      <header className="site-header">
        <a className="brand-lockup" href="/">
          <img alt="BICC 2026 logo" className="brand-logo-image" src={biccLogo} />
          <div className="brand-text-lockup">
            <div className="brand-logo-line">
              <span>BICC</span>
              <RedNoseIcon />
              <span>2026</span>
            </div>
          </div>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a className={currentPath === '/about' ? 'active' : ''} href="/about">
            About
          </a>
          {navGroups.map((group) => {
            const isGroupActive = group.items.some((item) => currentPath === item.path)

            return (
              <div className={`nav-group ${isGroupActive ? 'active' : ''}`} key={group.label}>
                <button className="nav-group-trigger" type="button" aria-haspopup="true">
                  {group.label}
                </button>
                <div className="nav-group-menu">
                  {group.items.map((item) => (
                    <a className={currentPath === item.path ? 'active' : ''} href={item.path} key={item.path}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </nav>

        <div className="header-actions">
          <span aria-label="Website language" className="language-switcher" data-no-translate>
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

          <a className="primary-btn header-cta" href="/passes">
            Get Pass
          </a>
        </div>
      </header>

      {isHome ? (
        <HomePage />
      ) : isAbout ? (
        <AboutPage />
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
      <Analytics />
    </div>
  )
}

export default App
