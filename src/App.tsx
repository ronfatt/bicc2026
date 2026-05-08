type Feature = {
  title: string
  body: string
}

type Speaker = {
  name: string
  role: string
  country: string
  bio: string
  tag: string
  accent: 'red' | 'turquoise' | 'sunshine' | 'coral'
}

type WorkshopTrack = {
  name: string
  accent: 'turquoise' | 'coral' | 'red'
  description: string
  items: string[]
}

type Session = {
  track: 'Beginner' | 'Performance' | 'Mastery'
  mentor: string
  title: string
  duration: string
  attendees: string
  points: string[]
}

type Day = {
  day: string
  date: string
  theme: string
  accent: 'sunshine' | 'coral' | 'turquoise'
  items: { time: string; title: string; note: string }[]
}

type Pass = {
  name: string
  badge: string
  price: string
  accent: 'red' | 'sunshine' | 'turquoise'
  perks: string[]
}

const brandValues = [
  ['Joyful', 'Laughter that heals and connects.'],
  ['Cultural', 'Stories rooted in Sabah and Borneo spirit.'],
  ['Inspiring', 'Learning that grows confidence and craft.'],
  ['International', 'A global faculty and delegate community.'],
  ['Community', 'Families, artists, educators, and sponsors together.'],
] as const

const features: Feature[] = [
  {
    title: 'Performance Lab',
    body: 'Build stage confidence through live, coached practice.',
  },
  {
    title: 'Creative Exchange',
    body: 'Meet artists, educators, performers, and clown leaders from around the world.',
  },
  {
    title: 'Showcase Night',
    body: 'Celebrate clowning as both craft and community.',
  },
]

const speakers: Speaker[] = [
  {
    name: 'Jean-Pierre Laurent',
    role: 'Guest Artist',
    country: 'France',
    bio: 'A celebrated physical comedy performer known for expressive stage language and emotionally intelligent clowning.',
    tag: 'Festival Headliner',
    accent: 'red',
  },
  {
    name: 'Maria Valentina',
    role: 'Mentor',
    country: 'Argentina',
    bio: 'An international workshop leader guiding performers through character discovery, presence, and transformation.',
    tag: 'Workshop Leader',
    accent: 'turquoise',
  },
  {
    name: 'Sarah Chen',
    role: 'Workshop Leader',
    country: 'Malaysia',
    bio: 'A movement specialist bringing precision, play, and confidence-building methods for emerging performers.',
    tag: 'Regional Faculty',
    accent: 'sunshine',
  },
  {
    name: 'Marco Rossi',
    role: 'Guest Mentor',
    country: 'Italy',
    bio: 'A mask and visual performance director blending classic clowning technique with modern theatrical storytelling.',
    tag: 'Creative Mentor',
    accent: 'coral',
  },
]

const tracks: WorkshopTrack[] = [
  {
    name: 'Beginner Track',
    accent: 'turquoise',
    description: 'A welcoming entry point for first-time delegates, students, and curious artists.',
    items: [
      'Physical comedy foundations',
      'Character play and ensemble trust',
      'Safety, rhythm, and audience awareness',
    ],
  },
  {
    name: 'Performance Lab',
    accent: 'coral',
    description: 'Hands-on experimentation for artists who want to sharpen performance instincts.',
    items: [
      'Improvisation and response work',
      'Live mentor feedback sessions',
      'Scene shaping for stage confidence',
    ],
  },
  {
    name: 'Mastery Track',
    accent: 'red',
    description: 'Advanced learning for professionals, teachers, and creative leaders in the field.',
    items: [
      'Business of performance',
      'Advanced physical storytelling',
      'Touring, branding, and international collaboration',
    ],
  },
]

const sessions: Session[] = [
  {
    track: 'Beginner',
    mentor: 'Sarah Chen',
    title: 'Introduction to Physical Comedy',
    duration: '2 hours',
    attendees: '30 attendees',
    points: ['Basic techniques', 'Safety routines', 'Stage confidence'],
  },
  {
    track: 'Beginner',
    mentor: 'Marco Rossi',
    title: 'Clown Makeup Essentials',
    duration: '90 mins',
    attendees: '25 attendees',
    points: ['Colour language', 'Quick change tips', 'Character identity'],
  },
  {
    track: 'Performance',
    mentor: 'Viktor Petrov',
    title: 'Juggling Fundamentals',
    duration: '2.5 hours',
    attendees: '20 attendees',
    points: ['Ball control', 'Rhythm mastery', 'Performance flow'],
  },
  {
    track: 'Mastery',
    mentor: 'Maria Valentina',
    title: 'Advanced Character Development',
    duration: '3 hours',
    attendees: '18 attendees',
    points: ['Psychology of comedy', 'Improvisation arcs', 'Character depth'],
  },
  {
    track: 'Mastery',
    mentor: 'Jean-Pierre Laurent',
    title: 'Stage Combat & Stunts',
    duration: '3 hours',
    attendees: '16 attendees',
    points: ['Safety technique', 'Comic timing', 'Ensemble reactions'],
  },
  {
    track: 'Mastery',
    mentor: 'Jennifer Park',
    title: 'Business of Performance',
    duration: '2 hours',
    attendees: '24 attendees',
    points: ['Marketing strategy', 'Contracts', 'Social media growth'],
  },
]

const days: Day[] = [
  {
    day: 'Day 1',
    date: 'May 15, 2026',
    theme: 'Arrival, Welcome & Shared Joy',
    accent: 'sunshine',
    items: [
      {
        time: '09:00',
        title: 'Registration & Welcome Reception',
        note: 'Meet delegates, collect materials, and settle into the convention spirit.',
      },
      {
        time: '11:00',
        title: 'Opening Ceremony',
        note: 'A joyful opening celebrating laughter, healing, and cultural connection.',
      },
      {
        time: '14:00',
        title: 'Beginner Workshop Sessions',
        note: 'Hands-on foundations in movement, presence, and playful audience exchange.',
      },
      {
        time: '19:00',
        title: 'Showcase Night',
        note: 'An evening performance programme welcoming local and international voices.',
      },
    ],
  },
  {
    day: 'Day 2',
    date: 'May 16, 2026',
    theme: 'Skill, Craft & International Exchange',
    accent: 'coral',
    items: [
      {
        time: '09:00',
        title: 'Advanced Masterclasses',
        note: 'Focused sessions led by renowned artists, educators, and guest mentors.',
      },
      {
        time: '12:00',
        title: 'Panel: Performance Across Cultures',
        note: 'Conversations on clowning, education, family audiences, and creative futures.',
      },
      {
        time: '14:00',
        title: 'Practice Labs',
        note: 'Collaborative rehearsal and mentor feedback in smaller bookable groups.',
      },
      {
        time: '20:00',
        title: 'Convention Gala',
        note: 'A celebratory gathering for delegates, partners, sponsors, and families.',
      },
    ],
  },
  {
    day: 'Day 3',
    date: 'May 17, 2026',
    theme: 'Community, Hope & The Road Ahead',
    accent: 'turquoise',
    items: [
      {
        time: '09:00',
        title: 'Business of Performance',
        note: 'Practical sessions on touring, sustainability, partnerships, and visibility.',
      },
      {
        time: '11:00',
        title: 'Community Building Session',
        note: 'Create new regional networks for artistic support and future collaboration.',
      },
      {
        time: '14:00',
        title: 'Open Stage Performances',
        note: 'Delegates share work, experimentation, and discoveries from the convention.',
      },
      {
        time: '17:00',
        title: 'Closing Ceremony',
        note: 'A final call to carry laughter, courage, and hope back into our communities.',
      },
    ],
  },
]

const passes: Pass[] = [
  {
    name: 'Explorer Pass',
    badge: 'Early Bird',
    price: '$149',
    accent: 'sunshine',
    perks: [
      'Opening ceremony and keynote access',
      'Showcase night admission',
      'Delegate handbook and community listing',
    ],
  },
  {
    name: 'Performer Pass',
    badge: 'Most Popular',
    price: '$289',
    accent: 'red',
    perks: [
      'Full access across all 3 days',
      'Priority booking for workshops and labs',
      'Convention gala and networking sessions',
    ],
  },
  {
    name: 'Faculty Circle',
    badge: 'Partner Access',
    price: '$449',
    accent: 'turquoise',
    perks: [
      'Mentor breakfast and special meet-up',
      'Reserved seating for headline events',
      'Post-event strategy circle with organisers',
    ],
  },
]

const sponsors = [
  'Sabah Creative Network',
  'Tawau Arts Community',
  'Borneo Culture Forum',
  'PlayLab International',
  'Global Performance Network',
]

const faqs = [
  {
    question: 'Who is BICC 2026 for?',
    answer:
      'BICC 2026 welcomes performers, educators, cultural organisers, families, students, and international delegates interested in clowning, healing through laughter, and community-centred creativity.',
  },
  {
    question: 'Will there be beginner-friendly sessions?',
    answer:
      'Yes. The programme includes a clear Beginner Track, making the convention accessible to first-time performers and curious participants of different ages and backgrounds.',
  },
  {
    question: 'Can international guests attend easily?',
    answer:
      'Yes. The event is designed for international participation, with travel-friendly scheduling, hospitality support, and a convention structure that balances professionalism with warmth.',
  },
  {
    question: 'Can groups or schools enquire together?',
    answer:
      'Absolutely. Group bookings are encouraged for schools, organisations, community leaders, and cultural partners who wish to attend as a delegation.',
  },
]

function RedNoseIcon({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`red-nose ${className}`.trim()}>
      <span className="red-nose-dot" />
    </span>
  )
}

function BrushUnderline() {
  return <span aria-hidden="true" className="brush-underline" />
}

function PatternStrip() {
  return (
    <div aria-hidden="true" className="pattern-strip">
      {Array.from({ length: 12 }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  )
}

function ConfettiBackground() {
  return (
    <div aria-hidden="true" className="confetti-field">
      {Array.from({ length: 18 }).map((_, index) => (
        <span className={`confetti confetti-${(index % 6) + 1}`} key={index} />
      ))}
      <span className="smile-doodle" />
      <span className="heart-doodle" />
      <span className="star-doodle star-a" />
      <span className="star-doodle star-b" />
    </div>
  )
}

function ValueIconCard({
  title,
  body,
}: {
  title: string
  body: string
}) {
  return (
    <article className="value-card">
      <div className="value-icon-wrap">
        <RedNoseIcon className="value-icon" />
      </div>
      <strong>{title}</strong>
      <p>{body}</p>
    </article>
  )
}

function PortraitFrame({
  name,
  accent,
  country,
}: {
  name: string
  accent: Speaker['accent']
  country: string
}) {
  return (
    <div className={`portrait-frame accent-${accent}`}>
      <div className="portrait-pattern" />
      <div className="portrait-badge">{country}</div>
      <div className="portrait-initials">{name.slice(0, 2)}</div>
    </div>
  )
}

function App() {
  return (
    <div className="page-shell">
      <ConfettiBackground />

      <header className="site-header">
        <a className="brand-lockup" href="#top">
          <RedNoseIcon />
          <div>
            <p>BICC 2026</p>
            <strong>Borneo International Clown Convention</strong>
          </div>
        </a>

        <nav className="main-nav">
          <a href="#experience">Experience</a>
          <a href="#speakers">Speakers</a>
          <a href="#schedule">Schedule</a>
          <a href="#workshops">Workshops</a>
          <a href="#passes">Passes</a>
        </nav>

        <div className="header-actions">
          <button className="menu-pill" type="button">
            Menu
          </button>
          <a className="primary-btn" href="#passes">
            Reserve Spot
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              BORNEO INTERNATIONAL CLOWN CONVENTION <span>2026</span>
            </p>
            <h1 className="hero-title">
              BICC <span>2026</span>
            </h1>
            <p className="hero-subtitle">
              Official Convention Magazine & Delegate Handbook
            </p>
            <p className="hero-text">
              A joyful international gathering where performance, culture,
              creativity, and community come together in Tawau, Sabah.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#passes">
                Get Tickets
              </a>
              <a className="secondary-btn" href="#schedule">
                View Programme
              </a>
            </div>
          </div>

          <div className="hero-art">
            <PatternStrip />
            <div className="cover-illustration">
              <div className="nose-orbit">
                <RedNoseIcon className="hero-nose" />
              </div>
              <div className="smile-curve" />
              <div className="balloon balloon-red" />
              <div className="balloon balloon-yellow" />
              <div className="balloon balloon-teal" />
              <div className="brush-circle" />
              <div className="textile-ring" />
            </div>
          </div>
        </section>

        <section className="value-grid-section">
          <div className="value-grid">
            {brandValues.map(([title, body]) => (
              <ValueIconCard body={body} key={title} title={title} />
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading">
            <p className="section-kicker">
              Why We Gather <BrushUnderline />
            </p>
            <h2>We gather to share joy, skill, culture, and the healing power of performance.</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="editorial-card feature-card" key={feature.title}>
                <div className="feature-icon-row">
                  <RedNoseIcon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="speakers">
          <div className="section-heading">
            <p className="section-kicker">Learn From The Very Best</p>
            <h2>A world-class faculty of performers, educators, and creative mentors.</h2>
          </div>

          <div className="speaker-grid">
            {speakers.map((speaker) => (
              <article className={`speaker-card editorial-card accent-${speaker.accent}`} key={speaker.name}>
                <PortraitFrame accent={speaker.accent} country={speaker.country} name={speaker.name} />
                <div className="speaker-copy">
                  <span className={`speaker-tag tag-${speaker.accent}`}>{speaker.tag}</span>
                  <h3>{speaker.name}</h3>
                  <p className="speaker-meta">
                    {speaker.role} · {speaker.country}
                  </p>
                  <p>{speaker.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="workshops">
          <div className="section-heading">
            <p className="section-kicker">Workshop Tracks</p>
            <h2>Three colourful paths for artists, educators, and delegates at every stage.</h2>
          </div>

          <div className="track-grid">
            {tracks.map((track) => (
              <article className={`track-card editorial-card track-${track.accent}`} key={track.name}>
                <span className={`track-pill pill-${track.accent}`}>{track.name}</span>
                <h3>{track.description}</h3>
                <ul className="custom-list">
                  {track.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="section-kicker">Detailed Workshop Schedule</p>
            <h2>Bookable sessions designed for clear choices and joyful learning.</h2>
          </div>

          <div className="session-grid">
            {sessions.map((session) => {
              const accent =
                session.track === 'Beginner'
                  ? 'turquoise'
                  : session.track === 'Performance'
                    ? 'coral'
                    : 'red'

              return (
                <article className={`session-card editorial-card session-${accent}`} key={session.title}>
                  <div className="session-topline">
                    <span className={`track-pill pill-${accent}`}>{session.track}</span>
                    <small>{session.mentor}</small>
                  </div>
                  <h3>{session.title}</h3>
                  <ul className="custom-list">
                    {session.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="session-meta">
                    <span>{session.duration}</span>
                    <span>{session.attendees}</span>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="section-cta">
            <a className="primary-btn" href="#passes">
              View Full Workshop Schedule
            </a>
          </div>
        </section>

        <section className="section" id="schedule">
          <div className="section-heading">
            <p className="section-kicker">Your Journey Through BICC 2026</p>
            <h2>A magazine-style guide to three days of learning, celebration, and connection.</h2>
          </div>

          <div className="day-tabs">
            {days.map((day) => (
              <div className={`day-pill pill-${day.accent}`} key={day.day}>
                <strong>{day.day}</strong>
                <span>{day.date}</span>
              </div>
            ))}
          </div>

          <div className="journey-stack">
            {days.map((day) => (
              <section className="day-section" key={day.day}>
                <div className="day-summary">
                  <span className={`track-pill pill-${day.accent}`}>{day.day}</span>
                  <h3>{day.theme}</h3>
                  <p>{day.date}</p>
                </div>
                <div className="timeline-items">
                  {day.items.map((item) => (
                    <article className="timeline-card editorial-card" key={`${day.day}-${item.title}`}>
                      <span className="timeline-dot">
                        <RedNoseIcon />
                      </span>
                      <div className="timeline-copy">
                        <div className="timeline-topline">
                          <time>{item.time}</time>
                          <h4>{item.title}</h4>
                        </div>
                        <p>{item.note}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="section" id="passes">
          <div className="section-heading">
            <p className="section-kicker">Passes & Registration</p>
            <h2>Choose the convention experience that best fits your journey.</h2>
          </div>

          <div className="pass-grid">
            {passes.map((pass) => (
              <article className={`pass-card editorial-card pass-${pass.accent}`} key={pass.name}>
                <span className={`track-pill pill-${pass.accent}`}>{pass.badge}</span>
                <h3>{pass.name}</h3>
                <p className="pass-price">{pass.price}</p>
                <ul className="custom-list">
                  {pass.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <a className="primary-btn wide-btn" href="#contact">
                  Get Tickets
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section venue-section">
          <div className="venue-layout">
            <div className="venue-copy">
              <p className="section-kicker">Tawau, Sabah, Malaysia</p>
              <h2>Where convention professionalism meets a warm Borneo welcome.</h2>
              <p>
                Expect cultural hospitality, daylight warmth, family-friendly energy, and a setting that makes sponsors, performers, and international delegates feel genuinely welcomed.
              </p>
              <PatternStrip />
            </div>

            <div className="image-frame venue-frame">
              <div className="image-scene">
                <span className="scene-sun" />
                <span className="scene-mountain" />
                <span className="scene-water" />
                <span className="scene-house" />
                <span className="scene-house scene-house-small" />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="faq-layout">
            <div className="section-heading left">
              <p className="section-kicker">Need Details?</p>
              <h2>Bring your school, organisation, family, or creative team.</h2>
              <p>
                Group enquiries, sponsor conversations, and cultural partnerships are all welcome. The page keeps the warm, official tone you asked for while staying easy to browse on mobile.
              </p>
            </div>

            <div className="faq-column">
              <div className="faq-list">
                {faqs.map((faq) => (
                  <details className="editorial-card faq-card" key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>

              <form className="editorial-card contact-card">
                <h3>Request Group Booking Info</h3>
                <div className="form-grid">
                  <label>
                    Name
                    <input placeholder="Your name" type="text" />
                  </label>
                  <label>
                    Email
                    <input placeholder="name@email.com" type="email" />
                  </label>
                  <label className="full">
                    Organisation
                    <input placeholder="School, theatre, or company" type="text" />
                  </label>
                  <label className="full">
                    Message
                    <textarea placeholder="Tell us about your group, delegation, or partnership idea" rows={4} />
                  </label>
                </div>
                <button className="primary-btn wide-btn" type="button">
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="section sponsor-section">
          <div className="section-heading">
            <p className="section-kicker">Supporting Partners</p>
            <h2>Suitable for sponsors, families, performers, educators, and international delegates.</h2>
          </div>
          <div className="sponsor-grid">
            {sponsors.map((sponsor) => (
              <article className="editorial-card sponsor-card" key={sponsor}>
                <span>{sponsor}</span>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <p className="footer-kicker">BICC 2026</p>
          <strong>Wear the Red Nose. Share the Hope.</strong>
        </div>
        <p>Website · Instagram · Facebook · hello@bicc2026.com · Tawau, Sabah, Malaysia</p>
      </footer>
    </div>
  )
}

export default App
