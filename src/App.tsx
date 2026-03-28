type Stat = {
  value: string
  label: string
}

type Feature = {
  tag: string
  title: string
  body: string
}

type Speaker = {
  name: string
  role: string
  bio: string
  accent: 'cyan' | 'pink' | 'purple'
}

type Day = {
  day: string
  label: string
  date: string
  items: { time: string; title: string; note: string }[]
}

type Pass = {
  name: string
  price: string
  badge: string
  accent: 'cyan' | 'pink' | 'purple'
  perks: string[]
}

type Workshop = {
  track: 'Beginner' | 'Performance' | 'Mastery'
  title: string
  mentor: string
  duration: string
  attendees: string
  points: string[]
}

type Testimonial = {
  quote: string
  name: string
  title: string
}

const stats: Stat[] = [
  { value: '3 Days', label: 'Immersive convention journey' },
  { value: '50+', label: 'Workshops and masterclasses' },
  { value: '20+', label: 'International mentors' },
  { value: '300+', label: 'Expected delegates worldwide' },
]

const features: Feature[] = [
  {
    tag: 'Performance Labs',
    title: 'Build stage presence with live, coached practice',
    body:
      'From improvisation drills to audience connection techniques, every session is designed to be active, social, and unforgettable.',
  },
  {
    tag: 'Creative Exchange',
    title: 'Meet artists, directors, and educators across the globe',
    body:
      'BICC brings together performers from festivals, schools, and theatre companies to spark new collaborations and touring opportunities.',
  },
  {
    tag: 'Showcase Night',
    title: 'Celebrate clowning as both craft and community',
    body:
      'Each evening closes with performances, conversations, and a glowing social atmosphere inspired by the design direction you shared.',
  },
]

const speakers: Speaker[] = [
  {
    name: 'Jean-Pierre Laurent',
    role: 'Legendary Performance Artist',
    bio:
      'Known for emotionally rich physical comedy and contemporary clown theatre across Europe.',
    accent: 'pink',
  },
  {
    name: 'Maria Valentina',
    role: 'Master Instructor',
    bio:
      'International clown champion guiding character transformation and stage confidence.',
    accent: 'purple',
  },
  {
    name: 'Sarah Chen',
    role: 'Movement Specialist',
    bio:
      'Helps performers translate body awareness into playful, audience-ready rhythm.',
    accent: 'cyan',
  },
  {
    name: 'Marco Rossi',
    role: 'Mask & Character Coach',
    bio:
      'Blends classic techniques with modern devised theatre for high-impact storytelling.',
    accent: 'pink',
  },
]

const schedule: Day[] = [
  {
    day: 'Day 1',
    label: 'Foundation & Welcome',
    date: 'May 15, 2026',
    items: [
      {
        time: '09:00',
        title: 'Registration & Welcome Reception',
        note: 'Arrival, badges, venue orientation, and opening connections.',
      },
      {
        time: '11:00',
        title: 'Opening Keynote',
        note: 'A high-energy opening on performance, play, and global exchange.',
      },
      {
        time: '14:00',
        title: 'Beginner Workshop Sessions',
        note: 'Core clown foundations, movement, and audience rapport.',
      },
      {
        time: '19:00',
        title: 'Welcome Gala Performance',
        note: 'Evening showcase featuring invited artists and community acts.',
      },
    ],
  },
  {
    day: 'Day 2',
    label: 'Mastery & Innovation',
    date: 'May 16, 2026',
    items: [
      {
        time: '09:00',
        title: 'Advanced Masterclasses',
        note: 'Deep-dive sessions with world-class faculty and directors.',
      },
      {
        time: '12:00',
        title: 'Innovation Panel Discussion',
        note: 'The future of performance, clowning, and cultural exchange.',
      },
      {
        time: '14:00',
        title: 'Hands-on Practice Labs',
        note: 'Feedback-driven labs for rehearsal, staging, and improvisation.',
      },
      {
        time: '20:00',
        title: 'Awards Ceremony & Gala',
        note: 'Celebrate excellence and community impact under neon lights.',
      },
    ],
  },
  {
    day: 'Day 3',
    label: 'Community & Future',
    date: 'May 17, 2026',
    items: [
      {
        time: '09:00',
        title: 'Business of Performance',
        note: 'Branding, touring, funding, and making creative work sustainable.',
      },
      {
        time: '11:00',
        title: 'Community Building Session',
        note: 'Launch future partnerships and cross-border initiatives.',
      },
      {
        time: '14:00',
        title: 'Open Stage Performances',
        note: 'Delegates share works-in-progress and celebrate experimentation.',
      },
      {
        time: '17:00',
        title: 'Closing Ceremony',
        note: 'Farewell reflections, recognition, and next-year announcements.',
      },
    ],
  },
]

const passes: Pass[] = [
  {
    name: 'Explorer Pass',
    price: '$149',
    badge: 'Early Bird',
    accent: 'cyan',
    perks: [
      'Access to all keynote sessions',
      'Entry to welcome showcase and social mixer',
      'Community directory and event materials',
    ],
  },
  {
    name: 'Performer Pass',
    price: '$289',
    badge: 'Most Popular',
    accent: 'pink',
    perks: [
      'Full workshop and lab access for all 3 days',
      'Priority booking for masterclasses',
      'Awards gala seat plus networking lounge entry',
    ],
  },
  {
    name: 'Faculty Circle',
    price: '$449',
    badge: 'VIP Access',
    accent: 'purple',
    perks: [
      'Private mentor breakfast and speaker meet-up',
      'Front-row seating and backstage networking',
      'Post-event strategy session with organisers',
    ],
  },
]

const mentorStats = [
  { value: '20+', label: 'Expert instructors' },
  { value: '15+', label: 'Countries represented' },
  { value: '50+', label: 'Industry experts' },
  { value: '300+', label: 'Expected delegates' },
]

const workshops: Workshop[] = [
  {
    track: 'Beginner',
    title: 'Introduction to Physical Comedy',
    mentor: 'Sarah Chen',
    duration: '2 hours',
    attendees: '30 attendees',
    points: ['Basic techniques', 'Safety routines', 'Stage confidence'],
  },
  {
    track: 'Beginner',
    title: 'Clown Makeup Essentials',
    mentor: 'Marco Rossi',
    duration: '90 mins',
    attendees: '25 attendees',
    points: ['Color theory', 'Quick change tips', 'Character identity'],
  },
  {
    track: 'Performance',
    title: 'Juggling Fundamentals',
    mentor: 'Viktor Petrov',
    duration: '2.5 hours',
    attendees: '20 attendees',
    points: ['Ball control', 'Rhythm mastery', 'Performance flow'],
  },
  {
    track: 'Mastery',
    title: 'Advanced Character Development',
    mentor: 'Maria Valentina',
    duration: '3 hours',
    attendees: '18 attendees',
    points: ['Psychology of comedy', 'Improvisation arcs', 'Character depth'],
  },
  {
    track: 'Mastery',
    title: 'Stage Combat & Stunts',
    mentor: 'Jean-Pierre Laurent',
    duration: '3 hours',
    attendees: '16 attendees',
    points: ['Safety technique', 'Comic timing', 'Ensemble reactions'],
  },
  {
    track: 'Mastery',
    title: 'Business of Performance',
    mentor: 'Jennifer Park',
    duration: '2 hours',
    attendees: '24 attendees',
    points: ['Marketing strategy', 'Contracts', 'Social media growth'],
  },
]

const testimonials: Testimonial[] = [
  {
    quote:
      'BICC feels like a rare mix of intensive training and genuine artistic community. You leave with practical tools and lasting collaborators.',
    name: 'Alicia Mendoza',
    title: 'Festival Producer, Manila',
  },
  {
    quote:
      'What stood out most was the quality of the mentors and how thoughtfully the programme balanced beginner access with advanced craft.',
    name: 'Rizwan Karim',
    title: 'Physical Theatre Educator, Kuala Lumpur',
  },
  {
    quote:
      'The visual identity promises energy, and the programme matches it. It feels ambitious, welcoming, and internationally relevant.',
    name: 'Hannah Lee',
    title: 'Creative Director, Singapore',
  },
]

const sponsors = [
  'Sarawak Creative Economy',
  'Borneo Arts Council',
  'Stagecraft Asia',
  'PlayLab International',
  'Global Performance Network',
]

const faqs = [
  {
    question: 'Who is BICC2026 for?',
    answer:
      'The event is designed for performers, theatre educators, students, creative producers, and anyone interested in clowning, movement, and live performance.',
  },
  {
    question: 'Will there be beginner-friendly sessions?',
    answer:
      'Yes. The programme is intentionally split across beginner, intermediate, and advanced pathways so newcomers can join confidently.',
  },
  {
    question: 'Can international guests participate?',
    answer:
      'Absolutely. The schedule, onboarding, and networking activities are built for regional and international attendees.',
  },
  {
    question: 'Is the website mobile-friendly?',
    answer:
      'This implementation is being structured responsively so the long-form event page reads clearly across phones, tablets, and desktops.',
  },
]

function App() {
  return (
    <div className="page-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <header className="site-header">
        <div className="brand-lockup">
          <div className="brand-mark">B</div>
          <div>
            <p>Borneo International</p>
            <strong>Clown Convention 2026</strong>
          </div>
        </div>
        <nav className="main-nav">
          <a href="#experience">Experience</a>
          <a href="#speakers">Speakers</a>
          <a href="#schedule">Schedule</a>
          <a href="#passes">Passes</a>
        </nav>
        <a className="button ghost" href="#passes">
          Reserve Spot
        </a>
      </header>

      <main>
        <section className="hero section">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Southeast Asia’s boldest performance gathering
            </div>
            <h1>
              Step Into The Neon Stage Of <span>BICC2026</span>
            </h1>
            <p className="hero-text">
              A cinematic 3-day convention for performers, educators, and
              creators to train, collaborate, and celebrate the future of clown
              performance together in one immersive destination.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#passes">
                Get Tickets
              </a>
              <a className="button secondary" href="#schedule">
                View Programme
              </a>
            </div>
            <div className="stat-grid">
              {stats.map((stat) => (
                <article className="glass-card stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-panel glass-card">
            <div className="hero-panel-glow" />
            <p className="panel-tag">May 15-17, 2026</p>
            <h2>Kuching Waterfront Convention District</h2>
            <p>
              Designed to echo the futuristic, glowing atmosphere from your
              Figma concept while staying readable and fast on the web.
            </p>
            <div className="panel-stack">
              <div className="mini-panel cyan">
                <span>Opening Gala</span>
                <strong>19:00</strong>
              </div>
              <div className="mini-panel pink">
                <span>Masterclasses</span>
                <strong>12 Tracks</strong>
              </div>
              <div className="mini-panel purple">
                <span>Global Faculty</span>
                <strong>20+ Artists</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Signature Experience
            </div>
            <h2>Designed Like A Festival, Structured Like A High-Value Summit</h2>
            <p>
              The page mirrors your concept with glowing cards, stacked content
              zones, and a premium sci-fi mood that still feels practical to
              browse and book from.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="glass-card feature-card" key={feature.title}>
                <span className="feature-tag">{feature.tag}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section speakers-section" id="speakers">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              World-Class Faculty
            </div>
            <h2>Learn From The Very Best</h2>
            <p>
              A faculty roster inspired by the layout in the design: spotlight
              speakers first, followed by a tighter grid of supporting mentors.
            </p>
          </div>

          <div className="speaker-grid">
            {speakers.map((speaker) => (
              <article
                className={`glass-card speaker-card accent-${speaker.accent}`}
                key={speaker.name}
              >
                <div className="avatar">{speaker.name.slice(0, 2)}</div>
                <div>
                  <h3>{speaker.name}</h3>
                  <p className="speaker-role">{speaker.role}</p>
                  <p>{speaker.bio}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mentor-stat-grid">
            {mentorStats.map((stat) => (
              <article className="glass-card mentor-stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Workshop Tracks
            </div>
            <h2>World-Class Training, Split Into Clear Paths</h2>
            <p>
              The visual direction from the mockup suggested distinct track
              cards, so the site uses a three-column layout with contrasting
              accents for quick scanning.
            </p>
          </div>

          <div className="track-grid">
            <article className="glass-card track-card">
              <span className="feature-tag cyan">Beginner Track</span>
              <h3>Start with confidence</h3>
              <ul>
                <li>Physical comedy basics</li>
                <li>Character building fundamentals</li>
                <li>Safety, rhythm, and stage awareness</li>
              </ul>
            </article>
            <article className="glass-card track-card">
              <span className="feature-tag pink">Performance Lab</span>
              <h3>Sharpen stage instincts</h3>
              <ul>
                <li>Improvisation and audience dialogue</li>
                <li>Scene work with mentor feedback</li>
                <li>Applied rehearsal and collaboration</li>
              </ul>
            </article>
            <article className="glass-card track-card">
              <span className="feature-tag purple">Mastery Track</span>
              <h3>Advance your professional craft</h3>
              <ul>
                <li>Business of performance</li>
                <li>Advanced physical storytelling</li>
                <li>Touring, branding, and project strategy</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section workshop-section">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Detailed Workshop Schedule
            </div>
            <h2>Your Practical Sessions, Broken Into Bookable Experiences</h2>
            <p>
              This section leans closer to the denser middle portion of the
              mockup with compact session cards, badges, bullet points, and
              utility meta like duration and attendee limits.
            </p>
          </div>

          <div className="workshop-grid">
            {workshops.map((workshop) => (
              <article className="glass-card workshop-card" key={workshop.title}>
                <div className="workshop-topline">
                  <span
                    className={`feature-tag ${
                      workshop.track === 'Beginner'
                        ? 'cyan'
                        : workshop.track === 'Performance'
                          ? 'pink'
                          : 'purple'
                    }`}
                  >
                    {workshop.track}
                  </span>
                  <small>{workshop.mentor}</small>
                </div>
                <h3>{workshop.title}</h3>
                <ul>
                  {workshop.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="workshop-meta">
                  <span>{workshop.duration}</span>
                  <span>{workshop.attendees}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="section-cta">
            <a className="button primary" href="#passes">
              View Full Workshop Schedule
            </a>
          </div>
        </section>

        <section className="section schedule-section" id="schedule">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              3-Day Event Schedule
            </div>
            <h2>Your Journey Through BICC2026</h2>
            <p>
              The timeline follows the design’s strongest section closely:
              oversized day markers, glowing connectors, and stacked agenda
              cards for each session.
            </p>
          </div>

          <div className="timeline">
            {schedule.map((day) => (
              <section className="timeline-day" key={day.day}>
                <div className="timeline-marker">
                  <div className="marker-card glass-card">
                    <strong>{day.day}</strong>
                    <span>{day.date}</span>
                    <small>{day.label}</small>
                  </div>
                </div>
                <div className="timeline-items">
                  {day.items.map((item) => (
                    <article className="glass-card timeline-card" key={item.title}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.note}</p>
                      </div>
                      <time>{item.time}</time>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="section testimonial-section">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Delegate Voices
            </div>
            <h2>Why Artists And Educators Keep Coming Back</h2>
            <p>
              Your design has a lot of emotional energy, so this section adds
              social proof with calmer cards that give the page a useful pacing
              break before conversion.
            </p>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="glass-card testimonial-card" key={testimonial.name}>
                <p className="testimonial-quote">“{testimonial.quote}”</p>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.title}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section passes-section" id="passes">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Choose Your Pass
            </div>
            <h2>Reserve The Experience That Fits Your Journey</h2>
            <p>
              Pricing cards are styled with the same neon trim and dark-glass
              surface language so the conversion section still feels premium.
            </p>
          </div>

          <div className="pass-grid">
            {passes.map((pass) => (
              <article
                className={`glass-card pass-card accent-${pass.accent}`}
                key={pass.name}
              >
                <span className="pass-badge">{pass.badge}</span>
                <h3>{pass.name}</h3>
                <p className="pass-price">{pass.price}</p>
                <ul>
                  {pass.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <a className="button primary wide" href="#contact">
                  Select Pass
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section venue-section">
          <div className="venue-layout">
            <div className="venue-card glass-card">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Venue & Travel
              </div>
              <h2>Kuching Waterfront Convention District</h2>
              <p>
                Positioned near hotels, riverfront dining, and cultural
                landmarks, the venue gives international guests an easy base for
                both the convention and after-hours networking.
              </p>
              <div className="venue-points">
                <div>
                  <strong>Nearest airport</strong>
                  <span>Kuching International Airport · 20 mins</span>
                </div>
                <div>
                  <strong>Check-in window</strong>
                  <span>May 14 from 16:00 onwards</span>
                </div>
                <div>
                  <strong>Language support</strong>
                  <span>English-first, multilingual volunteers on site</span>
                </div>
              </div>
            </div>

            <div className="venue-map glass-card">
              <div className="map-grid" />
              <div className="map-pin pin-a">Main Hall</div>
              <div className="map-pin pin-b">Workshop Labs</div>
              <div className="map-pin pin-c">Riverfront Social</div>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="contact">
          <div className="faq-layout">
            <div className="section-heading left">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Need Details?
              </div>
              <h2>Frequently Asked Questions</h2>
              <p>
                A long-form page like this needs breathing room near the end, so
                the FAQ and call-to-action are split into two calmer columns.
              </p>
              <a className="button secondary" href="mailto:hello@bicc2026.com">
                Contact Organisers
              </a>
            </div>

            <div className="faq-column">
              <div className="faq-list">
                {faqs.map((faq) => (
                  <details className="glass-card faq-card" key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>

              <form className="glass-card contact-card">
                <h3>Request Group Booking Info</h3>
                <div className="form-grid">
                  <label>
                    Name
                    <input type="text" placeholder="Your name" />
                  </label>
                  <label>
                    Email
                    <input type="email" placeholder="name@email.com" />
                  </label>
                  <label className="full">
                    Organisation
                    <input type="text" placeholder="School, theatre, or company" />
                  </label>
                  <label className="full">
                    Message
                    <textarea
                      rows={4}
                      placeholder="Tell us how many delegates you're planning to bring"
                    />
                  </label>
                </div>
                <button className="button primary wide" type="button">
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="section final-cta">
          <div className="final-cta-panel glass-card">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Ready To Join?
              </div>
              <h2>Make BICC2026 The Most Electric Stop On Your Creative Calendar</h2>
              <p>
                Lock in your pass, bring your team, and step into a three-day
                programme of training, performance, and meaningful creative
                connection.
              </p>
            </div>
            <div className="final-cta-actions">
              <a className="button primary" href="#passes">
                Reserve Your Pass
              </a>
              <a className="button secondary" href="mailto:hello@bicc2026.com">
                Talk To Organisers
              </a>
            </div>
          </div>
        </section>

        <section className="section sponsor-section">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Supporting Partners
            </div>
            <h2>Built With Regional And International Creative Support</h2>
            <p>
              A partner strip helps the page feel like a real launch site rather
              than a static mockup, and gives you a place for sponsor logos
              later.
            </p>
          </div>
          <div className="sponsor-grid">
            {sponsors.map((sponsor) => (
              <article className="glass-card sponsor-card" key={sponsor}>
                <span>{sponsor}</span>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <p className="footer-kicker">BICC 2026</p>
          <strong>Built from your Figma direction into a web-ready landing page.</strong>
        </div>
        <p>hello@bicc2026.com · Kuching, Sarawak · 15-17 May 2026</p>
      </footer>
    </div>
  )
}

export default App
