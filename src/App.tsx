const clownHeroImage =
  'https://images.pexels.com/photos/18652042/pexels-photo-18652042/free-photo-of-clown-performing-on-stage.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&dpr=2'
const clownStageImage =
  'https://images.pexels.com/photos/18652043/pexels-photo-18652043/free-photo-of-clown-on-stage.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&dpr=2'
const clownDuoImage =
  'https://images.pexels.com/photos/18652033/pexels-photo-18652033/free-photo-of-clowns-playing-on-stage.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&dpr=2'
const clownShowImage =
  'https://images.pexels.com/photos/17165097/pexels-photo-17165097/free-photo-of-man-in-a-colorful-costume-of-a-clown-standing-on-stage.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&dpr=2'
const biccLogo = '/bicc-logo.png'

const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Programme', path: '/programme' },
  { label: 'Workshops', path: '/workshops' },
  { label: 'Mentors', path: '/mentors' },
  { label: 'Passes', path: '/passes' },
  { label: 'Venue', path: '/venue' },
  { label: 'Sponsors', path: '/sponsors' },
]

const values = [
  { title: 'Joyful', body: 'Joy that connects.' },
  { title: 'Cultural', body: 'Rooted in Borneo.' },
  { title: 'Inspiring', body: 'Creative growth.' },
  { title: 'International', body: 'Global exchange.' },
  { title: 'Community', body: 'Hope through service.' },
]

const passes = [
  {
    name: 'Foundation Track Pass',
    price: 'US$130',
    label: 'Foundation Workshop Pass',
    headline: 'Build Your Professional Foundation',
    body:
      'Designed for beginners, emerging performers, educators, youth leaders and entertainers who want strong clowning fundamentals.',
    badges: ['No prior experience required', 'Certificate of Participation awarded'],
    includes: [
      'Physical Comedy Fundamentals',
      'Character & Persona Building',
      'Balloon Sculpting',
      'Interactive Storytelling',
      'Magic & Visual Illusions',
      'Puppetry Performance',
    ],
    accent: 'foundation',
    cta: 'Get Foundation Pass',
  },
  {
    name: 'Mastery Track Pass',
    price: 'US$130',
    label: 'Mastery Workshop Pass',
    headline: 'Elevate Your Stage Performance',
    body:
      'Designed for experienced performers ready to sharpen technique, stage confidence and professional performance direction.',
    badges: ['Prior stage experience recommended', 'Certificate of Completion awarded'],
    includes: [
      'Advanced Stage Craft',
      'Signature Performance',
      'Showcase & Mentorship',
      'Advanced Comedy Timing & Acting',
      'Professional Magic & Variety Integration',
      'Career Positioning & Stage Command',
    ],
    accent: 'mastery',
    cta: 'Get Mastery Pass',
  },
]

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
    meta: 'Physical Comedy',
    track: 'Foundation Track',
    note: 'Global Faculty',
    image: clownHeroImage,
  },
  {
    title: 'Regional Teaching Artist',
    meta: 'Foundation Track',
    track: 'Creative Learning',
    note: 'Sabah / Malaysia',
    image: clownStageImage,
  },
  {
    title: 'Creative Exchange Mentor',
    meta: 'Performance & Community',
    track: 'Exchange Lab',
    note: 'Cross-Cultural Practice',
    image: clownDuoImage,
  },
  {
    title: 'Showcase Development Mentor',
    meta: 'Mastery Track',
    track: 'Stage Direction',
    note: 'Performance Growth',
    image: clownShowImage,
  },
]

const storyFeatures = [
  {
    title: 'Professional Workshops',
    body: 'Train with structured Foundation and Mastery tracks.',
  },
  {
    title: 'Performance Showcase',
    body: 'Celebrate clowning as a serious performing art.',
  },
  {
    title: 'Community & Cultural Exchange',
    body: 'Connect through laughter, culture and shared humanity.',
  },
]

const borneoCards = [
  {
    title: 'Local Taste',
    body: 'Food, coffee and Sabah flavours.',
    label: 'Tawau Food & Coffee',
  },
  {
    title: 'Nature & Culture',
    body: 'A warm destination shaped by people, stories and place.',
    label: 'Culture & Coastal Warmth',
  },
  {
    title: 'Travel Guide',
    body: 'Plan your stay with venue, hotel and visitor information.',
    label: 'Venue & Visitor Guide',
  },
]

const sponsorLogos = ['Arts & Culture', 'Tourism Sabah', 'Education Partner', 'Community Impact', 'Global Support']

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
    primaryCta: { label: 'Get Foundation Pass', href: '/passes' },
    secondaryCta: { label: 'Get Mastery Pass', href: '/passes' },
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
          <a className="primary-btn wide-btn" href="/passes">
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

function HomePage() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="hero-eyebrow-row">
            <img alt="BICC 2026 official logo" className="hero-mini-logo" src={biccLogo} />
            <p className="hero-eyebrow">Borneo International Clown Convention 2026</p>
            <span className="hero-edition-tag">International Edition</span>
          </div>
          <div className="hero-title-block">
            <p className="hero-monogram">BICC 2026</p>
            <h1>
              Where Laughter Becomes <span className="hero-highlight">Legacy</span>
            </h1>
          </div>
          <p className="hero-subheadline">
            A 3-day international gathering for clown artists, performers, educators and communities in Borneo.
          </p>
          <p className="hero-mini-note">Professional training. Cultural exchange. Real stage energy.</p>

          <div className="event-badges">
            <span>Aug 3–5, 2026</span>
            <span>Tawau, Sabah</span>
            <span>2 Workshop Tracks</span>
            <span>US$130 Pass</span>
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
            <div className="hero-logo-seal">
              <img alt="BICC logo seal" src={biccLogo} />
            </div>
            <div className="hero-image-badge">
              <strong>Official Convention Magazine</strong>
              <span>Delegate Handbook 2026</span>
            </div>
            <SmileDoodle />
            <PatternCorner side="right" />
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
        {values.map((item) => (
          <article className="value-card" key={item.title}>
            <RedNoseIcon />
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="editorial-section">
        <div className="story-layout">
          <div className="story-photo-frame">
            <img alt="Clown performer or mentor on stage" src={clownShowImage} />
            <span className="story-photo-tag">Performance / Culture / Connection</span>
          </div>

          <div className="story-copy">
            <p className="section-kicker">What Is BICC?</p>
            <h2>A Festival of Performance, Culture and Human Connection.</h2>
            <p className="section-intro">
              BICC brings together workshops, stage performance, cultural exchange and community outreach in one joyful convention experience.
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

      <section className="passes-section editorial-section">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Choose Your Track</p>
            <h2>Two paths. One price. Built for different stages of growth.</h2>
          </div>
          <p className="section-intro">A cleaner decision for beginners, emerging performers and experienced stage artists.</p>
        </div>

        <div className="track-comparison">
          {passes.map((pass, index) => (
            <article className={`track-card ${pass.accent}`} key={pass.name}>
              <div className="track-card-media">
                <img
                  alt={pass.name}
                  src={index === 0 ? clownStageImage : clownDuoImage}
                />
              </div>
              <div className="track-card-copy">
                <span className={`track-label ${pass.accent}`}>{pass.name}</span>
                <p className="track-audience">{index === 0 ? 'For beginners and emerging performers.' : 'For experienced performers.'}</p>
                <p className="pass-price">{pass.price}</p>
                <p className="track-summary">{index === 0 ? 'Build confidence, character and core performance skills.' : 'Refine your stage presence, timing and professional act.'}</p>
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
          <p>Not sure which track fits you? Compare both tracks.</p>
          <a className="text-link" href="/passes">
            Compare Tracks
          </a>
        </div>
      </section>

      <section className="editorial-section programme-strip">
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

      <section className="editorial-section">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Mentors & Performers</p>
            <h2>Learn From Artists Who Live The Stage.</h2>
          </div>
          <p className="section-intro">Mentors, performers and creative leaders from the world of clowning and performance.</p>
        </div>

        <div className="mentor-preview-grid">
          {mentorPreviewCards.map((item) => (
            <article className="mentor-preview-card" key={item.title}>
              <div className="mentor-preview-image">
                <img alt={item.title} src={item.image} />
              </div>
              <div className="mentor-preview-copy">
                <span className="track-label red">{item.track}</span>
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
                <small>{item.note}</small>
              </div>
            </article>
          ))}
        </div>

        <div className="section-cta">
          <a className="secondary-btn" href="/mentors">
            View Speakers
          </a>
        </div>
      </section>

      <section className="editorial-section">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Borneo Experience</p>
            <h2>Gather in Borneo.</h2>
          </div>
          <p className="section-intro">Make Tawau / Sabah part of the convention experience.</p>
        </div>

        <div className="borneo-grid">
          {borneoCards.map((item) => (
            <article className="borneo-card" key={item.title}>
              <div className="borneo-image-placeholder">
                <span>{item.label}</span>
              </div>
              <div className="borneo-copy">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="section-cta">
          <a className="secondary-btn" href="/venue">
            View Venue & Travel
          </a>
        </div>
      </section>

      <section className="editorial-section sponsor-strip">
        <div className="section-head with-copy">
          <div>
            <p className="section-kicker">Sponsors</p>
            <h2>Partner With A Joyful International Movement.</h2>
          </div>
          <p className="section-intro">BICC connects performance, education, tourism, culture and community impact.</p>
        </div>

        <div className="logo-row" aria-label="Partner logo placeholders">
          {sponsorLogos.map((item) => (
            <span className="logo-pill" key={item}>
              {item}
            </span>
          ))}
        </div>

        <div className="section-cta sponsor-actions">
          <a className="primary-btn" href="/sponsors">
            Become a Sponsor
          </a>
          <a className="secondary-btn" href="/sponsors">
            Download Sponsorship Deck
          </a>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-copy">
          <p className="section-kicker">Final CTA</p>
          <h2>Ready To Join BICC 2026?</h2>
          <p>Choose your workshop track and be part of a joyful international convention in Borneo.</p>
          <div className="final-cta-actions">
            <a className="primary-btn" href="/passes">
              Get Foundation Pass
            </a>
            <a className="secondary-btn" href="/passes">
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
      </div>

      <div className="footer-column">
        <strong>Sponsors</strong>
        <a href="/sponsors">Partners</a>
        <a href="mailto:hello@bicc2026.com">Contact</a>
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
  const isHome = currentPath === '/'
  const routePath = isHome ? null : (currentPath in routeContent ? (currentPath as RouteKey) : null)

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
        </nav>

        <a className="primary-btn header-cta" href="/passes">
          Get Pass
        </a>
      </header>

      {isHome ? <HomePage /> : routePath ? <InteriorPage path={routePath} /> : <InteriorPage path="/about" />}

      <Footer />
    </div>
  )
}

export default App
