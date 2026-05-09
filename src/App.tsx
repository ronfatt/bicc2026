import { useState } from 'react'

type ValueItem = {
  title: string
  body: string
  icon: 'joy' | 'culture' | 'inspire' | 'world' | 'community'
}

type AudienceItem = {
  title: string
  body: string
  icon: 'performer' | 'pro' | 'educator' | 'partner'
}

type PassItem = {
  name: string
  shortLabel: string
  headline: string
  description: string
  badges: string[]
  includes: string[]
  accent: 'foundation' | 'mastery'
  cta: string
}

type ProgrammeDay = {
  day: string
  title: string
  body: string
}

type WorkshopPreview = {
  track: 'Foundation' | 'Mastery'
  title: string
  benefit: string
  accent: 'foundation' | 'mastery'
}

type MentorPreview = {
  name: string
  country: string
  specialty: string
  description: string
  track: 'Foundation' | 'Mastery'
  accent: 'red' | 'teal' | 'gold' | 'coral'
}

type ImpactItem = {
  title: string
  body: string
}

type ExploreItem = {
  title: string
  body: string
  art: 'food' | 'islands' | 'culture' | 'coffee' | 'travel'
}

const values: ValueItem[] = [
  { title: 'Joyful', body: 'Laughter that heals and connects.', icon: 'joy' },
  { title: 'Cultural', body: 'Rooted in Borneo, open to the world.', icon: 'culture' },
  { title: 'Inspiring', body: 'Creativity that grows confidence and craft.', icon: 'inspire' },
  { title: 'International', body: 'Bringing artists, ideas and hearts together.', icon: 'world' },
  { title: 'Community', body: 'Building hope through service and friendship.', icon: 'community' },
]

const audienceItems: AudienceItem[] = [
  {
    title: 'Emerging Performers',
    body: 'For beginners ready to build confidence, character and stage presence.',
    icon: 'performer',
  },
  {
    title: 'Professional Clowns & Entertainers',
    body: 'For performers who want to refine timing, routine structure and audience command.',
    icon: 'pro',
  },
  {
    title: 'Educators & Community Workers',
    body: 'For teachers, youth leaders and community teams using creativity to connect with people.',
    icon: 'educator',
  },
  {
    title: 'Families, Sponsors & Cultural Partners',
    body: 'For audiences and partners who believe in joyful, meaningful cultural experiences.',
    icon: 'partner',
  },
]

const passes: PassItem[] = [
  {
    name: 'Foundation Track Pass',
    shortLabel: 'Foundation Workshop Pass',
    headline: 'Build Your Professional Foundation',
    description:
      'Designed for beginners, emerging performers, educators, youth leaders and entertainers who want a stronger foundation in clown performance.',
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
    shortLabel: 'Mastery Workshop Pass',
    headline: 'Elevate Your Stage Performance',
    description:
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

const programmeDays: ProgrammeDay[] = [
  {
    day: 'Day 1',
    title: 'Arrival & Opening',
    body: 'Registration, welcome reception, orientation, opening ceremony and early creative connections.',
  },
  {
    day: 'Day 2',
    title: 'Workshops & Exchange',
    body: 'Full-day training, mentorship, workshop tracks, creative exchange and evening performance activity.',
  },
  {
    day: 'Day 3',
    title: 'Showcase & Community',
    body: 'Final sessions, community sharing, showcase preparation and closing celebration.',
  },
]

const workshopPreviews: WorkshopPreview[] = [
  {
    track: 'Foundation',
    title: 'Physical Comedy Fundamentals',
    benefit: 'Build body awareness, timing and stage confidence from the ground up.',
    accent: 'foundation',
  },
  {
    track: 'Foundation',
    title: 'Character & Persona Building',
    benefit: 'Discover a stronger stage identity and more playful audience connection.',
    accent: 'foundation',
  },
  {
    track: 'Foundation',
    title: 'Balloon Sculpting',
    benefit: 'Learn practical visual engagement skills for family-facing live performance.',
    accent: 'foundation',
  },
  {
    track: 'Mastery',
    title: 'Advanced Stage Craft',
    benefit: 'Refine pacing, structure and presence for stronger professional stage command.',
    accent: 'mastery',
  },
  {
    track: 'Mastery',
    title: 'Signature Performance',
    benefit: 'Shape a more memorable act with stronger theatrical identity and rhythm.',
    accent: 'mastery',
  },
  {
    track: 'Mastery',
    title: 'Showcase & Mentorship',
    benefit: 'Receive critique, direction and refinement support for your developing act.',
    accent: 'mastery',
  },
]

const mentors: MentorPreview[] = [
  {
    name: 'International Mentor To Be Announced',
    country: 'Global Faculty',
    specialty: 'Clown Performance & Stage Presence',
    description: 'A featured international mentor profile will be announced with the official workshop release.',
    track: 'Mastery',
    accent: 'red',
  },
  {
    name: 'Regional Teaching Artist',
    country: 'Malaysia / Borneo',
    specialty: 'Character Building & Performance Foundations',
    description: 'This profile space is reserved for a teaching artist supporting emerging performers and educators.',
    track: 'Foundation',
    accent: 'teal',
  },
  {
    name: 'Creative Exchange Mentor',
    country: 'International Faculty',
    specialty: 'Community Performance & Audience Connection',
    description: 'An invited mentor focused on creativity, exchange, and practical joy in live performance.',
    track: 'Foundation',
    accent: 'gold',
  },
  {
    name: 'Showcase Development Mentor',
    country: 'Guest Faculty',
    specialty: 'Stage Craft, Feedback & Professional Growth',
    description: 'A specialist guiding performers who want stronger critique, polish and professional direction.',
    track: 'Mastery',
    accent: 'coral',
  },
]

const impactItems: ImpactItem[] = [
  {
    title: 'Cultural Exchange',
    body: 'Bring together local heritage, international artists and meaningful creative dialogue in one shared gathering.',
  },
  {
    title: 'Hospital Clowning & Outreach',
    body: 'Highlight the role of laughter, presence and creative care in community-facing human connection work.',
  },
  {
    title: 'Creative Community Building',
    body: 'Support friendships, collaboration and shared growth between performers, educators and partners.',
  },
]

const exploreItems: ExploreItem[] = [
  {
    title: 'Local Food',
    body: 'Enjoy flavours, markets and family-friendly food experiences unique to Tawau and Sabah.',
    art: 'food',
  },
  {
    title: 'Nature & Islands',
    body: 'Discover landscapes, sea air and day-trip inspiration beyond the convention programme.',
    art: 'islands',
  },
  {
    title: 'Culture & Community',
    body: 'Experience local hospitality, story, craft and shared community warmth while you gather.',
    art: 'culture',
  },
  {
    title: 'Coffee, Cocoa & Local Taste',
    body: 'Explore the textures, tastes and agricultural identity that make Tawau memorable.',
    art: 'coffee',
  },
  {
    title: 'Travel Tips',
    body: 'Plan your stay with clearer arrival, movement and venue guidance for a smooth convention journey.',
    art: 'travel',
  },
]

function RedNoseIcon({ large = false }: { large?: boolean }) {
  return (
    <span aria-hidden="true" className={`red-nose-icon${large ? ' large' : ''}`}>
      <span className="red-nose-dot" />
    </span>
  )
}

function HeaderLogo() {
  return (
    <div className="brand-logo-line">
      <span>BICC</span>
      <RedNoseIcon />
      <span>2026</span>
    </div>
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

function DecorativeIcon({ icon }: { icon: ValueItem['icon'] | AudienceItem['icon'] }) {
  return <span aria-hidden="true" className={`decorative-icon ${icon}`} />
}

function VisualPlaceholder() {
  return (
    <div className="hero-visual-card">
      <div className="hero-illustration">
        <span className="confetti-star star-a" />
        <span className="confetti-star star-b" />
        <span className="confetti-dot dot-a" />
        <span className="confetti-dot dot-b" />
        <div className="clown-figure">
          <div className="clown-hat" />
          <div className="clown-face">
            <span className="clown-eyes" />
            <RedNoseIcon />
            <span className="clown-smile" />
          </div>
          <div className="clown-costume" />
        </div>
        <div className="borneo-hall" />
        <div className="hero-palm" />
        <SmileDoodle />
        <PatternCorner side="right" />
      </div>
      <p className="hero-caption">Official Convention Magazine & Delegate Handbook</p>
    </div>
  )
}

function MentorPortrait({ accent }: { accent: MentorPreview['accent'] }) {
  return (
    <div className={`mentor-portrait ${accent}`}>
      <div className="mentor-portrait-ring" />
      <span>MN</span>
    </div>
  )
}

function ExploreArt({ art }: { art: ExploreItem['art'] }) {
  return <div aria-hidden="true" className={`explore-art ${art}`} />
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="page-shell">
      <div aria-hidden="true" className="confetti-layer">
        {Array.from({ length: 16 }).map((_, index) => (
          <span className={`floating-confetti confetti-${(index % 6) + 1}`} key={index} />
        ))}
      </div>

      <header className="site-header">
        <a className="brand-lockup" href="#top">
          <HeaderLogo />
          <small>Borneo International Clown Convention 2026</small>
        </a>

        <button
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav${menuOpen ? ' open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#programme" onClick={() => setMenuOpen(false)}>
            Programme
          </a>
          <a href="#workshops" onClick={() => setMenuOpen(false)}>
            Workshops
          </a>
          <a href="#mentors" onClick={() => setMenuOpen(false)}>
            Mentors
          </a>
          <a href="#passes" onClick={() => setMenuOpen(false)}>
            Passes
          </a>
          <a href="#venue" onClick={() => setMenuOpen(false)}>
            Venue
          </a>
          <a href="#sponsors" onClick={() => setMenuOpen(false)}>
            Sponsors
          </a>
        </nav>

        <a className="primary-btn header-cta" href="#passes">
          Get Pass
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="hero-eyebrow">Borneo International Clown Convention 2026</p>
            <h1>Where Laughter Becomes Legacy</h1>
            <p className="hero-subheadline">
              A 3-day international clowning, performance, training and cultural exchange gathering in Borneo.
            </p>
            <p className="hero-body">
              Join performers, educators, artists, mentors and communities for a joyful convention built around professional training, creative exchange, cultural connection and the healing power of laughter.
            </p>

            <div className="event-badges">
              <span>Aug 3–5, 2026</span>
              <span>Tawau, Sabah, Malaysia</span>
              <span>Workshop Tracks Available</span>
              <span>International Mentors</span>
            </div>

            <div className="hero-actions">
              <a className="primary-btn" href="#passes">
                Get Your Pass
              </a>
              <a className="secondary-btn" href="#programme">
                View Programme
              </a>
              <a className="text-link" href="#passes">
                Compare Foundation & Mastery Tracks
              </a>
            </div>
          </div>

          <VisualPlaceholder />
        </section>

        <section className="value-grid">
          {values.map((item) => (
            <article className="value-card" key={item.title}>
              <DecorativeIcon icon={item.icon} />
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="editorial-section" id="about">
          <div className="section-head with-copy">
            <div>
              <p className="section-kicker">What Is BICC?</p>
              <h2>Professional training, cultural exchange, and joyful community in one bright international gathering.</h2>
            </div>
            <p className="section-intro">
              BICC 2026 is an international gathering for clown artists, performers, educators, entertainers, community workers and creative leaders. It brings together structured training, performance development, cultural exchange, showcase experiences and community outreach in one joyful convention in Borneo.
            </p>
          </div>

          <div className="triple-card-grid">
            <article className="story-card">
              <span className="tag-pill">Professional Training</span>
              <h3>Structured workshop tracks for beginners and experienced performers.</h3>
            </article>
            <article className="story-card">
              <span className="tag-pill teal">Creative Exchange</span>
              <h3>Meet international mentors, artists, educators and performers.</h3>
            </article>
            <article className="story-card">
              <span className="tag-pill coral">Community Impact</span>
              <h3>Celebrate clowning as a craft that brings joy, connection and healing.</h3>
            </article>
          </div>

          <div className="section-cta left">
            <a className="text-link" href="#about">
              Learn About BICC
            </a>
          </div>
        </section>

        <section className="editorial-section">
          <div className="section-head single">
            <div>
              <p className="section-kicker">Who Is This For?</p>
              <h2>Different journeys. Shared joy. One convention.</h2>
            </div>
          </div>

          <div className="audience-grid">
            {audienceItems.map((item) => (
              <article className="audience-card" key={item.title}>
                <DecorativeIcon icon={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="passes-section editorial-section" id="passes">
          <div className="section-head with-copy">
            <div>
              <p className="section-kicker">Choose Your Workshop Track</p>
              <h2>Two professional training paths. One price. Different growth journey.</h2>
            </div>
            <p className="section-intro">
              Choose the path that best fits your current experience and the kind of performance growth you want to focus on.
            </p>
          </div>

          <div className="passes-grid">
            {passes.map((pass) => (
              <article className={`pass-card ${pass.accent}`} key={pass.name}>
                <span className={`track-label ${pass.accent}`}>{pass.shortLabel}</span>
                <h3>{pass.name}</h3>
                <p className="pass-price">US$130</p>
                <strong className="pass-headline">{pass.headline}</strong>
                <p className="pass-description">{pass.description}</p>
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
                <a className="primary-btn wide-btn" href="#passes">
                  {pass.cta}
                </a>
              </article>
            ))}
          </div>

          <div className="pass-helper">
            <p>
              <strong>Not sure which track is right for you?</strong>
            </p>
            <p>Choose Foundation if you are building confidence, technique and core performance fundamentals.</p>
            <p>Choose Mastery if you already perform and want stronger stage craft, critique and professional direction.</p>
            <a className="text-link" href="#passes">
              Compare Tracks
            </a>
          </div>
        </section>

        <section className="editorial-section" id="programme">
          <div className="section-head single">
            <div>
              <p className="section-kicker">Your 3-Day BICC Journey</p>
              <h2>A clear convention flow from arrival to showcase.</h2>
            </div>
          </div>

          <div className="programme-grid">
            {programmeDays.map((item) => (
              <article className="programme-card" key={item.day}>
                <span className="track-label red">{item.day}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="section-cta">
            <a className="secondary-btn" href="#programme">
              View Full Programme
            </a>
          </div>
        </section>

        <section className="editorial-section" id="workshops">
          <div className="section-head single">
            <div>
              <p className="section-kicker">Training Built For Real Performance Growth</p>
              <h2>Six workshop anchors to preview the kind of development BICC is built around.</h2>
            </div>
          </div>

          <div className="workshop-preview-grid">
            {workshopPreviews.map((item) => (
              <article className={`workshop-preview-card ${item.accent}`} key={item.title}>
                <span className={`track-label ${item.accent}`}>{item.track}</span>
                <h3>{item.title}</h3>
                <p>{item.benefit}</p>
              </article>
            ))}
          </div>

          <div className="section-cta">
            <a className="text-link" href="#workshops">
              Explore Workshops
            </a>
          </div>
        </section>

        <section className="editorial-section" id="mentors">
          <div className="section-head">
            <div>
              <p className="section-kicker">Learn From International Mentors</p>
              <h2>Editorial-style mentor profiles that build trust without overloading the page.</h2>
            </div>
            <a className="text-link" href="#mentors">
              View All Mentors
            </a>
          </div>

          <div className="mentor-grid">
            {mentors.map((mentor) => (
              <article className="mentor-card" key={mentor.name}>
                <MentorPortrait accent={mentor.accent} />
                <div className="mentor-copy">
                  <h3>{mentor.name}</h3>
                  <p className="mentor-meta">
                    {mentor.country} · {mentor.specialty}
                  </p>
                  <p>{mentor.description}</p>
                  <span className={`track-label ${mentor.track === 'Foundation' ? 'foundation' : 'mastery'}`}>
                    {mentor.track} Track
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-section">
          <div className="section-head single">
            <div>
              <p className="section-kicker">More Than A Convention</p>
              <h2>BICC celebrates clowning as a professional art form and a human connection tool.</h2>
            </div>
          </div>

          <div className="impact-grid">
            {impactItems.map((item) => (
              <article className="impact-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="section-cta left">
            <a className="text-link" href="#about">
              Discover Community Impact
            </a>
          </div>
        </section>

        <section className="editorial-section" id="venue">
          <div className="section-head single">
            <div>
              <p className="section-kicker">Experience Borneo While You Gather</p>
              <h2>Make Tawau / Sabah part of the convention experience.</h2>
            </div>
          </div>

          <div className="explore-grid">
            {exploreItems.map((item) => (
              <article className="explore-card" key={item.title}>
                <ExploreArt art={item.art} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="section-cta left">
            <a className="text-link" href="#venue">
              View Venue & Travel Guide
            </a>
          </div>
        </section>

        <section className="editorial-section sponsors-section" id="sponsors">
          <div className="section-head with-copy">
            <div>
              <p className="section-kicker">Partner With A Joyful International Movement</p>
              <h2>BICC offers sponsors and partners a meaningful platform connected to performance, education, tourism, culture and community impact.</h2>
            </div>
            <p className="section-intro">
              Designed to feel warm and professional for family-facing audiences, international mentors, destination partners and values-led sponsors.
            </p>
          </div>

          <div className="logo-row">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="logo-placeholder" key={index}>
                Partner Logo
              </div>
            ))}
          </div>

          <div className="dual-cta-row">
            <a className="primary-btn" href="mailto:hello@bicc2026.com">
              Become a Sponsor
            </a>
            <a className="secondary-btn" href="mailto:hello@bicc2026.com">
              Download Sponsorship Deck
            </a>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-copy">
            <p className="section-kicker">Final CTA</p>
            <h2>Two Tracks. One Price. Choose Your Growth Path.</h2>
            <p>
              Whether you are beginning your performance journey or refining your professional stage craft, BICC 2026 gives you a focused path to grow.
            </p>
            <div className="final-cta-actions">
              <a className="primary-btn" href="#passes">
                Get Foundation Pass
              </a>
              <a className="secondary-btn" href="#passes">
                Get Mastery Pass
              </a>
            </div>
            <small>Both passes are US$130 and include access to your selected workshop track and certificate.</small>
          </div>
        </section>
      </main>

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
          <a href="#about">About</a>
          <a href="#programme">Programme</a>
          <a href="#workshops">Workshops</a>
        </div>

        <div className="footer-column">
          <strong>Passes</strong>
          <a href="#passes">Foundation Track Pass</a>
          <a href="#passes">Mastery Track Pass</a>
          <a href="#venue">Venue & Travel</a>
        </div>

        <div className="footer-column">
          <strong>Sponsors</strong>
          <a href="#sponsors">Partners</a>
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
    </div>
  )
}

export default App
