/* ============================================================
   ESPERANZA 2K26 — AUTHORITATIVE EVENT DATA MODEL
   Source: Official Esperanza 2K26 Brochure (Shiksha Niketan)
   100% Sourced — No Inventions, No Missing Rules Omitted
   ============================================================ */

const EVENTS_DATA = [
  {
    id: "01",
    slug: "danza-celestial",
    name: "DANZA CELESTIAL",
    format: "Group Dance",
    theme: "AI, Robotics and the Future of Human",
    eligibility: "Classes VI–VIII",
    category: "VI-VIII",
    eligibleClasses: [6, 7, 8],
    participants: "6 Participants",
    teamSize: "6",
    duration: "5 Minutes",
    accentColor: "#ec4899",
    secondaryColor: "#8b5cf6",
    accentHue: 325,
    teacher: "Ms. Kumari Ragini",
    contact: "9798857681",
    specialSpecs: [
      { label: "Music Submission", value: "Labelled pen drive before event (free from explicit content, no last-minute changes)" },
      { label: "Costumes & Props", value: "Must be decent, related to theme, and safe to use" },
      { label: "Dispute Clause", value: "Judges' decision will be final and binding; no changes or appeals entertained" }
    ],
    rules: [
      "Students of Classes VI to VIII can participate.",
      "No. of participants - 6.",
      "Time - 5 minutes.",
      "Teams must submit their music tracks before the event in a labelled pen drive and ensure that they are free from explicit content. No last-minute changes will be allowed.",
      "Costumes must be decent and related to the theme and props to be used should be safe.",
      "Judges' decision will be final and binding, and no changes or appeals will be entertained."
    ],
    criteria: [
      "Adherence to the Theme",
      "Choreography",
      "Synchronization",
      "Creativity",
      "Overall Presentation"
    ],
    visualMotif: `
      <div class="event-motif event-motif--celestial">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ec4899" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.3"/>
            </linearGradient>
            <radialGradient id="cg2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ec4899" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="130" stroke="url(#cg1)" stroke-width="1" stroke-dasharray="4 6" class="spin-slow" />
          <circle cx="200" cy="200" r="90" stroke="#8b5cf6" stroke-width="1.5" stroke-opacity="0.4" class="spin-reverse" />
          <path d="M70,200 C120,110 280,290 330,200 C300,100 100,300 70,200 Z" stroke="url(#cg1)" stroke-width="2" fill="none" class="pulse-flow" />
          <path d="M120,130 C180,230 220,170 280,270" stroke="#ec4899" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="12 12" class="dash-move" />
          <circle cx="200" cy="200" r="50" fill="url(#cg2)" />
          <circle cx="200" cy="70" r="5" fill="#ec4899" class="glow-dot" />
          <circle cx="330" cy="200" r="6" fill="#8b5cf6" class="glow-dot" />
          <circle cx="140" cy="290" r="4" fill="#f43f5e" class="glow-dot" />
          <circle cx="200" cy="200" r="16" fill="#ffffff" fill-opacity="0.1" stroke="#ec4899" stroke-width="1.5" />
        </svg>
        <div class="event-motif__label">KINETIC FLOW &amp; CELESTIAL ORBITS</div>
      </div>
    `
  },
  {
    id: "02",
    slug: "alma-lunar",
    name: "ALMA LUNAR",
    format: "Group Song",
    theme: "Back to the Beats - 80s and 90s remix",
    eligibility: "Classes IX–XII",
    category: "IX-XII",
    eligibleClasses: [9, 10, 11, 12],
    participants: "6 per group",
    teamSize: "6",
    duration: "4 Minutes",
    accentColor: "#38bdf8",
    secondaryColor: "#6366f1",
    accentHue: 205,
    teacher: "Ms. Pallavi",
    contact: "9334880970",
    specialSpecs: [
      { label: "Language", value: "Only Hindi songs are allowed" },
      { label: "Instrumentation", value: "One instrument per group is allowed" },
      { label: "Audio Track", value: "Tracks/Karaoke must be submitted before the event in a labelled pen drive; no last-minute changes" },
      { label: "Decision Clause", value: "Judges' decision will be final and binding" }
    ],
    rules: [
      "Students of classes IX to XII can participate.",
      "NO. OF PARTICIPANTS :- 6 per group.",
      "TIME :- 4 minutes.",
      "Teams can use their own track / Karaoke which must be submitted before the event in a labelled pen drive.",
      "Last minute changes are not allowed.",
      "One instrument per group is allowed.",
      "Only Hindi songs are allowed.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Adherence to the theme (Song selection)",
      "Stage Presentation",
      "Rhythmic Interpretation",
      "Voice Quality",
      "Overall Presentation"
    ],
    visualMotif: `
      <div class="event-motif event-motif--lunar">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#6366f1"/>
            </linearGradient>
          </defs>
          <!-- Lunar crescent -->
          <path d="M200 80 A 120 120 0 1 0 320 200 A 95 95 0 1 1 200 80 Z" fill="url(#lg1)" fill-opacity="0.25" stroke="#38bdf8" stroke-width="1.5"/>
          <!-- Waveform ripples -->
          <circle cx="200" cy="200" r="60" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.3" class="ripple-wave" />
          <circle cx="200" cy="200" r="110" stroke="#6366f1" stroke-width="1" stroke-opacity="0.2" class="ripple-wave-delay" />
          <!-- Equalizer Spectrum Bars -->
          <g class="eq-bars">
            <line x1="120" y1="260" x2="120" y2="210" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" class="bar-anim-1" />
            <line x1="140" y1="260" x2="140" y2="180" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" class="bar-anim-2" />
            <line x1="160" y1="260" x2="160" y2="230" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" class="bar-anim-3" />
            <line x1="180" y1="260" x2="180" y2="160" stroke="#818cf8" stroke-width="4" stroke-linecap="round" class="bar-anim-4" />
            <line x1="200" y1="260" x2="200" y2="140" stroke="#818cf8" stroke-width="4" stroke-linecap="round" class="bar-anim-5" />
            <line x1="220" y1="260" x2="220" y2="170" stroke="#818cf8" stroke-width="4" stroke-linecap="round" class="bar-anim-4" />
            <line x1="240" y1="260" x2="240" y2="210" stroke="#6366f1" stroke-width="4" stroke-linecap="round" class="bar-anim-2" />
            <line x1="260" y1="260" x2="260" y2="190" stroke="#6366f1" stroke-width="4" stroke-linecap="round" class="bar-anim-3" />
            <line x1="280" y1="260" x2="280" y2="240" stroke="#6366f1" stroke-width="4" stroke-linecap="round" class="bar-anim-1" />
          </g>
          <circle cx="200" cy="200" r="10" fill="#ffffff" fill-opacity="0.7" />
        </svg>
        <div class="event-motif__label">LUNAR ACOUSTICS &amp; SPECTRUM RESONANCE</div>
      </div>
    `
  },
  {
    id: "03",
    slug: "ecos-humanos",
    name: "ECOS HUMANOS",
    format: "Drama",
    theme: "CODE VS CONSCIENCE",
    eligibility: "Classes VI–X",
    category: "VI-X",
    eligibleClasses: [6, 7, 8, 9, 10],
    participants: "5 members per team",
    teamSize: "5",
    duration: "1 min stage setup + 3 mins perform",
    accentColor: "#f43f5e",
    secondaryColor: "#06b6d4",
    accentHue: 345,
    teacher: "Ms. Shalini Sharma",
    contact: "7004648626",
    specialSpecs: [
      { label: "Stage Time", value: "Maximum 1 minute to arrange stage + 3 minutes to perform" },
      { label: "Content Standards", value: "Vulgar, offensive or inappropriate language / content is not permitted" },
      { label: "Audio & Props", value: "Safe props allowed; music track on labelled pen drive prior to event" }
    ],
    rules: [
      "Students of classes VI to X can participate.",
      "Team Size :- 5 members per team.",
      "The team will be allowed a maximum of one minute to arrange the stage and 3 minutes to perform.",
      "Use of safe and appropriate props is allowed.",
      "Music and costumes should be theme appropriate.",
      "Teams must submit their music tracks before the event in a labelled pen drive and ensure that they are free from explicit content.",
      "Vulgar, offensive or inappropriate language / content is not permitted.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Theme adherence",
      "Creativity & Originality",
      "Choreography, Expression and Synchronisation",
      "Costume, Prop and Music",
      "Overall Impact"
    ],
    visualMotif: `
      <div class="event-motif event-motif--duality">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Split mask: organic curve left (human), digital grid right (code) -->
          <path d="M200 60 C130 60 90 120 90 200 C90 280 130 340 200 340" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" fill="rgba(244, 63, 94, 0.08)"/>
          <path d="M200 60 L310 60 L310 340 L200 340" stroke="#06b6d4" stroke-width="2" stroke-dasharray="6 4" fill="rgba(6, 182, 212, 0.05)"/>
          <!-- Central conscience divider -->
          <line x1="200" y1="50" x2="200" y2="350" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.4" stroke-dasharray="3 3"/>
          <!-- Circuit grid right -->
          <line x1="200" y1="120" x2="290" y2="120" stroke="#06b6d4" stroke-width="1.5"/>
          <circle cx="290" cy="120" r="4" fill="#06b6d4" />
          <line x1="200" y1="180" x2="260" y2="180" stroke="#06b6d4" stroke-width="1.5"/>
          <line x1="260" y1="180" x2="290" y2="210" stroke="#06b6d4" stroke-width="1.5"/>
          <circle cx="290" cy="210" r="4" fill="#06b6d4" />
          <line x1="200" y1="260" x2="280" y2="260" stroke="#06b6d4" stroke-width="1.5"/>
          <circle cx="280" cy="260" r="4" fill="#06b6d4" />
          <!-- Organic heart pulse left -->
          <path d="M120 200 Q140 160 160 200 T200 200" stroke="#f43f5e" stroke-width="2" fill="none" class="pulse-flow"/>
          <circle cx="160" cy="200" r="5" fill="#f43f5e" class="glow-dot" />
        </svg>
        <div class="event-motif__label">HUMAN CONSCIENCE VS DIGITAL CODE</div>
      </div>
    `
  },
  {
    id: "04",
    slug: "aura-dorado",
    name: "AURA DORADO",
    brochureTitle: "AURA DORODO",
    format: "Ramp Walk",
    theme: null,
    eligibility: "Classes IX–XII",
    category: "IX-XII",
    eligibleClasses: [9, 10, 11, 12],
    participants: "6 per school",
    teamSize: "6",
    duration: "2 Minutes",
    accentColor: "#fbbf24",
    secondaryColor: "#d97706",
    accentHue: 42,
    teacher: "Ms. Sandhya Kumari",
    contact: "9162777500",
    specialSpecs: [
      { label: "Ramp Route", value: "Participants must follow designated ramp route; stepping outside marked area prohibited" },
      { label: "Time Discipline", value: "Each participant must complete the walk within 2 minutes" },
      { label: "Costumes & Props", value: "Decent, related to theme, and safe to use; music submitted in advance" }
    ],
    rules: [
      "Students of classes IX to XII can participate.",
      "No. of participant: 6 per school.",
      "Time: 2 minutes.",
      "Participants must submit their music tracks in advance in a labelled pen drive on the day of the event and ensure that they are free from explicit content. No last minute changes will be allowed.",
      "Costumes must be decent and related to the theme and props to be used should be safe.",
      "Each participant must complete the walk within the given time limit.",
      "Participants must follow the designated ramp route and should not step outside the marked area.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Concept & creativity",
      "Adherence to the theme",
      "Facial Expressions & Personality",
      "Costumes",
      "Overall Impact"
    ],
    visualMotif: `
      <div class="event-motif event-motif--gold">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fbbf24"/>
              <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
          </defs>
          <!-- Runway perspective lines -->
          <polygon points="175,70 225,70 320,340 80,340" stroke="url(#gg1)" stroke-width="1.5" fill="rgba(251, 191, 36, 0.04)"/>
          <!-- Central stage beam -->
          <line x1="200" y1="70" x2="200" y2="340" stroke="#fbbf24" stroke-width="1" stroke-dasharray="8 6"/>
          <!-- Spotlight cones -->
          <path d="M50 40 L180 200 L120 200 Z" fill="rgba(251, 191, 36, 0.06)" />
          <path d="M350 40 L220 200 L280 200 Z" fill="rgba(251, 191, 36, 0.06)" />
          <!-- Diamond Haute Couture Facets -->
          <polygon points="200,110 240,150 200,190 160,150" stroke="#fbbf24" stroke-width="2" fill="rgba(251, 191, 36, 0.15)"/>
          <polygon points="200,80 260,150 200,220 140,150" stroke="#d97706" stroke-width="1" stroke-dasharray="4 4" class="spin-slow"/>
          <circle cx="200" cy="150" r="4" fill="#ffffff" />
        </svg>
        <div class="event-motif__label">HAUTE COUTURE RUNWAY &amp; RADIANCE</div>
      </div>
    `
  },
  {
    id: "05",
    slug: "la-mirada",
    name: "LA MIRADA",
    format: "Film Making",
    theme: "BEYOND THE CODE: HUMANS IN AN AI WORLD",
    eligibility: "Classes XI–XII",
    category: "XI-XII",
    eligibleClasses: [11, 12],
    participants: "2 members per team",
    teamSize: "2",
    duration: "5 Minutes",
    accentColor: "#e11d48",
    secondaryColor: "#fda4af",
    accentHue: 350,
    teacher: "Ms. Ankita",
    contact: "7250819777",
    specialSpecs: [
      { label: "Theme Connection", value: "Clear connection with AI and/or Robotics mandatory" },
      { label: "Creative Freedom", value: "Fiction, drama, sci-fi, comedy, documentary, thriller, or any suitable genre" },
      { label: "Techniques Allowed", value: "Costumes, props, locations, music, VFX, and modern editing techniques" },
      { label: "Content Standard", value: "Decent, school-appropriate, and free from explicit or offensive material" }
    ],
    rules: [
      "Students of classes XI and XII can participate.",
      "Team Size: 2 members per team.",
      "Time: 5 minutes.",
      "The film must be based on the given theme and should have a clear connection with AI and/or Robotics.",
      "Use of appropriate costumes, props, locations, music, visual effects and editing techniques is allowed.",
      "The content must be decent, school-appropriate and free from explicit or offensive material.",
      "Participants are free to interpret the theme creatively through fiction, drama, comedy, science fiction, documentary, thriller, or any other suitable genre.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Story & Screenplay",
      "Creativity & Originality",
      "Direction & Cinematography",
      "Adherence to the theme",
      "Overall Impact"
    ],
    visualMotif: `
      <div class="event-motif event-motif--cinema">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 35mm Film Frame Outer -->
          <rect x="70" y="90" width="260" height="220" rx="4" stroke="#e11d48" stroke-width="2" fill="rgba(225, 29, 72, 0.05)"/>
          <!-- Sprocket holes top & bottom -->
          <g fill="#e11d48" fill-opacity="0.4">
            <rect x="85" y="100" width="16" height="12" rx="2"/>
            <rect x="125" y="100" width="16" height="12" rx="2"/>
            <rect x="165" y="100" width="16" height="12" rx="2"/>
            <rect x="205" y="100" width="16" height="12" rx="2"/>
            <rect x="245" y="100" width="16" height="12" rx="2"/>
            <rect x="285" y="100" width="16" height="12" rx="2"/>
            <rect x="85" y="288" width="16" height="12" rx="2"/>
            <rect x="125" y="288" width="16" height="12" rx="2"/>
            <rect x="165" y="288" width="16" height="12" rx="2"/>
            <rect x="205" y="288" width="16" height="12" rx="2"/>
            <rect x="245" y="288" width="16" height="12" rx="2"/>
            <rect x="285" y="288" width="16" height="12" rx="2"/>
          </g>
          <!-- Rotating camera aperture iris -->
          <circle cx="200" cy="200" r="55" stroke="#e11d48" stroke-width="1.5" class="spin-slow"/>
          <path d="M165 170 L235 170 L210 235 L155 210 Z" stroke="#fda4af" stroke-width="1.5" fill="none"/>
          <line x1="200" y1="180" x2="200" y2="220" stroke="#ffffff" stroke-width="1"/>
          <line x1="180" y1="200" x2="220" y2="200" stroke="#ffffff" stroke-width="1"/>
          <circle cx="95" cy="135" r="4" fill="#e11d48" class="blink-dot"/>
          <text x="110" y="139" fill="#e11d48" font-family="monospace" font-size="10" letter-spacing="1">REC [00:05:00]</text>
        </svg>
        <div class="event-motif__label">35MM APERTURE &amp; CINEMATIC GAZE</div>
      </div>
    `
  },
  {
    id: "06",
    slug: "vision-libre",
    name: "VISION LIBRE",
    format: "Declamation",
    theme: "Digital Panopticon: The Illusion of Privacy",
    eligibility: "Classes IX–X",
    category: "IX-X",
    eligibleClasses: [9, 10],
    participants: "1 student per school",
    teamSize: "1",
    duration: "1 Minute",
    accentColor: "#10b981",
    secondaryColor: "#059669",
    accentHue: 160,
    teacher: "Ms. Neha",
    contact: "8825277547",
    specialSpecs: [
      { label: "Strict Ban", value: "No placards, charts, visual aids, or electronic devices allowed" },
      { label: "Originality Clause", value: "Speech must be original and thought-provoking; plagiarised speeches disqualified" },
      { label: "Delivery", value: "Delivered without reading from any kind of written script" }
    ],
    rules: [
      "Students of classes IX & X can participate.",
      "NO. OF PARTICIPANTS: 1 student per school.",
      "TIME: 1 minute.",
      "Teams can not use placards, charts, any visual aids or electronic devices.",
      "Plagiarised or copied speeches may lead to disqualification.",
      "Speech should be original, relevant to the theme age appropriate and thought provoking.",
      "Participants are requested to deliver their speech without reading from any kind of written script.",
      "Participants will be judged on the basis of their clarity of speech, confidence, pronunciation, fluency, expression, voice modulation, body language and overall impact.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Adherence to the theme",
      "Stage presentation",
      "Authenticity and originality",
      "Voice quality",
      "Overall presentation"
    ],
    visualMotif: `
      <div class="event-motif event-motif--panopticon">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Digital Panopticon Telemetry Rings -->
          <circle cx="200" cy="200" r="140" stroke="#10b981" stroke-width="1" stroke-dasharray="2 8" />
          <circle cx="200" cy="200" r="105" stroke="#10b981" stroke-width="1.5" stroke-opacity="0.5" />
          <circle cx="200" cy="200" r="65" stroke="#059669" stroke-width="2" />
          <!-- Sweeping radar vector -->
          <line x1="200" y1="200" x2="330" y2="120" stroke="#10b981" stroke-width="2" class="radar-sweep" stroke-linecap="round"/>
          <!-- Central watchful telemetry eye -->
          <path d="M140 200 Q200 145 260 200 Q200 255 140 200 Z" stroke="#10b981" stroke-width="2" fill="rgba(16, 185, 129, 0.08)"/>
          <circle cx="200" cy="200" r="22" stroke="#ffffff" stroke-width="1.5" fill="#059669" fill-opacity="0.4"/>
          <circle cx="200" cy="200" r="8" fill="#ffffff" />
          <!-- Target brackets -->
          <path d="M100 130 L90 130 L90 140 M300 130 L310 130 L310 140 M100 270 L90 270 L90 260 M300 270 L310 270 L310 260" stroke="#10b981" stroke-width="2"/>
        </svg>
        <div class="event-motif__label">PANOPTICON SURVEILLANCE &amp; RADAR TELEMETRY</div>
      </div>
    `
  },
  {
    id: "07",
    slug: "universo-oculto",
    name: "UNIVERSO OCULTO",
    format: "Science Working Model",
    theme: "Mystical and Hidden Dimensions of Universe",
    eligibility: "Classes VI–VIII",
    category: "VI-VIII",
    eligibleClasses: [6, 7, 8],
    participants: "3 members per team",
    teamSize: "3",
    duration: "1hr Model Making + 10min Q&A",
    accentColor: "#8b5cf6",
    secondaryColor: "#c084fc",
    accentHue: 270,
    teacher: "Mr. Sushant Kumar",
    contact: "9122580272",
    specialSpecs: [
      { label: "Dimensions", value: "Exact 1m × 1m × 1m (Strict specification)" },
      { label: "Electricity Notice", value: "Electricity will NOT be provided by the venue" },
      { label: "Assembly Rule", value: "Model must be assembled on-site during competition within stipulated time" },
      { label: "Materials", value: "Teams must bring their own materials; model must be working based on theme" }
    ],
    rules: [
      "Students of classes VI to VIII can participate.",
      "Team Size - 3 members.",
      "Model Making: 1 hour + Explanation & Q&A : 10 MINS.",
      "The Model must be assembled during the competition within the stipulated time.",
      "Teams must bring their own materials.",
      "Model must be working based on the them.",
      "Dimensions: 1m×1m×1m.",
      "Electricity will not be provided.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Adherence to the theme",
      "Originality",
      "Creativity",
      "Explanation",
      "Overall presentation"
    ],
    visualMotif: `
      <div class="event-motif event-motif--universe">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Dimensional Tesseract / Hypercube wireframe -->
          <!-- Outer Cube -->
          <polygon points="120,120 280,120 280,280 120,280" stroke="#8b5cf6" stroke-width="1.5" fill="none"/>
          <!-- Inner Cube -->
          <polygon points="160,160 240,160 240,240 160,240" stroke="#c084fc" stroke-width="2" fill="rgba(192, 132, 252, 0.1)"/>
          <!-- Connectors -->
          <line x1="120" y1="120" x2="160" y2="160" stroke="#8b5cf6" stroke-width="1.5"/>
          <line x1="280" y1="120" x2="240" y2="160" stroke="#8b5cf6" stroke-width="1.5"/>
          <line x1="280" y1="280" x2="240" y2="240" stroke="#8b5cf6" stroke-width="1.5"/>
          <line x1="120" y1="280" x2="160" y2="240" stroke="#8b5cf6" stroke-width="1.5"/>
          <!-- Orbital planetary rings -->
          <ellipse cx="200" cy="200" rx="150" ry="50" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="6 6" transform="rotate(-30 200 200)" class="spin-slow"/>
          <circle cx="80" cy="130" r="6" fill="#c084fc" class="glow-dot"/>
          <circle cx="320" cy="270" r="8" fill="#8b5cf6" class="glow-dot"/>
          <circle cx="200" cy="200" r="10" fill="#ffffff" fill-opacity="0.8"/>
        </svg>
        <div class="event-motif__label">TESSERACT HYPERCUBE &amp; QUANTUM ORBITS</div>
      </div>
    `
  },
  {
    id: "08",
    slug: "combate-mecanico",
    name: "COMBATE MECÁNICO",
    format: "Robo War",
    theme: null,
    eligibility: "Classes IX–XII",
    category: "IX-XII",
    eligibleClasses: [9, 10, 11, 12],
    participants: "2 members per team",
    teamSize: "2",
    duration: "3 mins per match (3 Rounds)",
    accentColor: "#f97316",
    secondaryColor: "#ea580c",
    accentHue: 25,
    teacher: "Mr. Ashwani Kumar",
    contact: "7489098028",
    specialSpecs: [
      { label: "Dimensions Limit", value: "Max 40 cm × 40 cm × 40 cm (STRICT: ZERO TOLERANCE)" },
      { label: "Weight Limit", value: "Max 5 kg (ZERO TOLERANCE; controller excluded from weight)" },
      { label: "Controller Type", value: "Wired or wireless controllers permitted" },
      { label: "Weapons Policy", value: "Weapons are allowed. However, cutting blades and flames are strictly not allowed" },
      { label: "Error / Repair Time", value: "Teams may opt for a 2-minute repair window if error develops" },
      { label: "Tournament Rounds", value: "3 Rounds: Prelims, Semi-Final, and Final (3 minutes per match)" }
    ],
    rules: [
      "Students of classes IX to XII can participate.",
      "Team size: 2 members per team.",
      "The competition will be held in 3 rounds: Prelims, Semi-Final and Final.",
      "Robot dimensions should not exceed 40 cm × 40 cm × 40 cm. There is no tolerance on dimensions.",
      "Robot weight must not exceed 5 kg. There is no tolerance on weight.",
      "The controller will not be included in the weight calculation.",
      "Controllers can be wired or wireless.",
      "Weapons are allowed. However, cutting blades and flames are strictly not allowed.",
      "Robot will be checked for dimensions and weight before the competition. Robots not meeting the limits will be disqualified.",
      "If a robot develops an error during the competition, the team can opt for a repair time of 2 minutes.",
      "Points will be awarded on the basis of aggression, as described in the judgement criteria.",
      "Judges' decision will be final and binding on all teams.",
      "Each match will be of 3 minutes."
    ],
    criteria: [
      "Immobilizing the opponent's robot",
      "Damaging the opponent's robot",
      "Flipping the opponent's robot",
      "Pushing the opponent's robot out of the arena"
    ],
    visualMotif: `
      <div class="event-motif event-motif--mechanical">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Heavy Industrial Cog / Gear -->
          <g class="spin-slow" style="transform-origin: 200px 200px;">
            <circle cx="200" cy="200" r="85" stroke="#f97316" stroke-width="12" fill="rgba(249, 115, 22, 0.08)"/>
            <!-- Gear teeth -->
            <rect x="190" y="90" width="20" height="25" fill="#f97316" rx="2"/>
            <rect x="190" y="285" width="20" height="25" fill="#f97316" rx="2"/>
            <rect x="90" y="190" width="25" height="20" fill="#f97316" rx="2"/>
            <rect x="285" y="190" width="25" height="20" fill="#f97316" rx="2"/>
            <rect x="122" y="122" width="20" height="20" fill="#f97316" rx="2" transform="rotate(45 132 132)"/>
            <rect x="258" y="122" width="20" height="20" fill="#f97316" rx="2" transform="rotate(45 268 132)"/>
            <rect x="122" y="258" width="20" height="20" fill="#f97316" rx="2" transform="rotate(45 132 268)"/>
            <rect x="258" y="258" width="20" height="20" fill="#f97316" rx="2" transform="rotate(45 268 268)"/>
          </g>
          <!-- Combat Targeting Crosshair -->
          <circle cx="200" cy="200" r="140" stroke="#ea580c" stroke-width="1.5" stroke-dasharray="8 8"/>
          <line x1="60" y1="200" x2="340" y2="200" stroke="#ea580c" stroke-width="1.5" stroke-opacity="0.4"/>
          <line x1="200" y1="60" x2="200" y2="340" stroke="#ea580c" stroke-width="1.5" stroke-opacity="0.4"/>
          <!-- Hazard chevrons -->
          <path d="M170 190 L190 200 L170 210" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
          <path d="M230 190 L210 200 L230 210" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <div class="event-motif__label">TITANIUM COGS &amp; COMBAT TARGETING</div>
      </div>
    `
  },
  {
    id: "09",
    slug: "voz-del-futuro",
    name: "VOZ DEL FUTURO",
    format: "Debate",
    theme: "ACCELERATING PROFITS AND STEERING ETHICS",
    eligibility: "Classes IX–XII",
    category: "IX-XII",
    eligibleClasses: [9, 10, 11, 12],
    participants: "2 members per team",
    teamSize: "2",
    duration: "Speaker 1: 2 min | Speaker 2: 2 min | Rebuttal: 1 min",
    accentColor: "#06b6d4",
    secondaryColor: "#3b82f6",
    accentHue: 195,
    teacher: "Ms. Soma Giri",
    contact: "7004277740",
    specialSpecs: [
      { label: "Language", value: "English" },
      { label: "Speech Timings", value: "Speaker 1 (for the motion): 2 mins; Speaker 2 (against the motion): 2 mins; Rebuttal round: 1 min" },
      { label: "Rebuttal Protocol", value: "Rebuttals must address existing points, not introduce new arguments" },
      { label: "Conduct Standards", value: "Respectful Language: Target ideas, not individuals. Personal attacks and offensive language are prohibited" },
      { label: "Decision Clause", value: "Judges' decision will be final and binding" }
    ],
    rules: [
      "Students of classes IX-XII can participate.",
      "Team Size :- 2 members per team.",
      "Language: English.",
      "Timing: Speaker 1 (for the motion): 2 minutes.",
      "Timing: Speaker 2 (against the motion): 2 minutes.",
      "Timing: 1-minute rebuttal round (rebuttals must address existing points, not introduce new arguments).",
      "Respectful Language: Target ideas, not individuals. Personal attacks and use of offensive language are prohibited.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Strength and Relevance of Arguments",
      "Critical Thinking and Reasoning",
      "Understanding of Business Ethics",
      "Rebuttal and Counter Argument",
      "Communication and Language"
    ],
    visualMotif: `
      <div class="event-motif event-motif--debate">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Opposing acoustic speech waves (Affirmative cyan vs Negative cobalt) -->
          <path d="M80 160 C120 120 160 200 200 160" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/>
          <path d="M80 200 C120 160 160 240 200 200" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M80 240 C120 200 160 280 200 240" stroke="#06b6d4" stroke-width="2" stroke-linecap="round"/>

          <path d="M320 160 C280 200 240 120 200 160" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
          <path d="M320 200 C280 240 240 160 200 200" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M320 240 C280 280 240 200 200 240" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>

          <!-- Central dialectic nexus collision -->
          <circle cx="200" cy="200" r="30" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4 4" class="spin-slow"/>
          <circle cx="200" cy="200" r="10" fill="#ffffff" />
          <!-- Dialectic labels -->
          <text x="100" y="110" fill="#06b6d4" font-family="monospace" font-size="11" letter-spacing="2">AFFIRMATIVE</text>
          <text x="245" y="110" fill="#3b82f6" font-family="monospace" font-size="11" letter-spacing="2">REBUTTAL</text>
        </svg>
        <div class="event-motif__label">DIALECTIC OPPOSITION &amp; ACOUSTIC RESONANCE</div>
      </div>
    `
  },
  {
    id: "10",
    slug: "cibernetica-legion",
    name: "CIBERNATICA LEGION",
    brochureTitle: "CIBERNATICA LEGION",
    format: "Capture the Flag",
    theme: "AI Security, Logic & Problem-Solving Challenge",
    eligibility: "Classes IX–XII",
    category: "IX-XII",
    eligibleClasses: [9, 10, 11, 12],
    participants: "2 members per team",
    teamSize: "2",
    duration: "2 Hours",
    accentColor: "#22c55e",
    secondaryColor: "#15803d",
    accentHue: 140,
    teacher: "Mr. Rajan Sharma",
    contact: "82103 20311",
    specialSpecs: [
      { label: "Objective", value: "3 System Flags + Logic Demo" },
      { label: "Challenge Format", value: "Live CTF + Judges Viva / Q&A session" },
      { label: "Equipment", value: "Bring your own laptop (Wi-Fi capable). No USBs or external media permitted" },
      { label: "STRICT PROHIBITION", value: "Local LLMs (Ollama, LM Studio), Terminal AI Agents, or MCP Servers" },
      { label: "Disqualification", value: "Automated AI tooling or network/property damage leads to immediate disqualification; Judges' decision will be final and binding" }
    ],
    rules: [
      "Objective: 3 System Flags + Logic Demo.",
      "Format: Live CTF + Judges Viva/Q&A.",
      "Basic knowledge of Networking, Cybersecurity & Problem-Solving required.",
      "Student of classes IX - XII can participate.",
      "Team size: 2 members per teams.",
      "Time: 2 hours.",
      "Bring your own laptop (with Wi-Fi capability).",
      "No USB drives, external storage devices, or secondary media allowed.",
      "Strictly Prohibited: Local LLMs (Ollama, LM Studio), Terminal AI Agents, or MCP Servers.",
      "Use of automated AI tooling will lead to immediate disqualification.",
      "Damage to school property/network → Immediate disqualification + Consequences.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "CTF Scoreboard points",
      "Judges Viva / Technical Defense",
      "Judges' decision will be final and binding"
    ],
    visualMotif: `
      <div class="event-motif event-motif--terminal">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Terminal Window Frame -->
          <rect x="70" y="80" width="260" height="240" rx="6" stroke="#22c55e" stroke-width="2" fill="rgba(34, 197, 94, 0.04)"/>
          <line x1="70" y1="110" x2="330" y2="110" stroke="#22c55e" stroke-width="1.5"/>
          <circle cx="90" cy="95" r="4" fill="#22c55e"/>
          <circle cx="105" cy="95" r="4" fill="#22c55e" fill-opacity="0.5"/>
          <circle cx="120" cy="95" r="4" fill="#22c55e" fill-opacity="0.3"/>
          <!-- Hex / Binary Code Stream -->
          <text x="90" y="145" fill="#22c55e" font-family="monospace" font-size="11">FLAG{0x7F_ESPERANZA_2K26}</text>
          <text x="90" y="175" fill="#22c55e" fill-opacity="0.7" font-family="monospace" font-size="10">> BYPASS_DEFENSE: ACTIVE</text>
          <text x="90" y="200" fill="#22c55e" fill-opacity="0.5" font-family="monospace" font-size="10">> ZERO_AI_TOOLING: ENFORCED</text>
          <text x="90" y="225" fill="#22c55e" fill-opacity="0.4" font-family="monospace" font-size="10">> SYSTEM_FLAGS: [1/3] CAPTURED</text>
          <!-- Cyber Shield Lock -->
          <polygon points="200,240 230,255 230,285 200,300 170,285 170,255" stroke="#22c55e" stroke-width="2" fill="rgba(34, 197, 94, 0.15)"/>
          <circle cx="200" cy="272" r="5" fill="#ffffff"/>
        </svg>
        <div class="event-motif__label">CYBERSECURITY TERMINAL &amp; SYSTEM FLAGS</div>
      </div>
    `
  },
  {
    id: "11",
    slug: "mission-secreta",
    name: "MISSION SECRETA",
    format: "Treasure Hunt",
    theme: "Simple machines and tools in daily life",
    eligibility: "Classes IX–X",
    category: "IX-X",
    eligibleClasses: [9, 10],
    participants: "1 per school",
    teamSize: "1",
    duration: "1 Hour",
    accentColor: "#eab308",
    secondaryColor: "#ca8a04",
    accentHue: 48,
    teacher: "Ms. Rachana Sharma",
    contact: "9204689389",
    specialSpecs: [
      { label: "Clue Briefing", value: "Clues related to hunt provided 5 minutes before hunt commencement" },
      { label: "Objective", value: "Decipher/solve riddles and find items within 1 hour" },
      { label: "Mobile Phone & Assistance Ban", value: "Participants must not take help from anyone or use a mobile phone while solving riddles or finding items" },
      { label: "Discipline", value: "Strict discipline required throughout school premises; indiscipline leads to disqualification" }
    ],
    rules: [
      "Students of classes: IX & X can participate.",
      "NO. OF PARTICIPANTS :- 1 per school.",
      "TIME :- 1 Hour.",
      "Clues related to hunt shall be provided 5 minutes before the beginning of the hunt.",
      "Participants have to decipher/solve the riddles/clues and find the items within the time allotted.",
      "Students must stay disciplined during the hunt as any act of indiscipline will lead to disqualification.",
      "Participants must not take help from anyone or use mobile phone during solving the riddles or finding the items.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Number of items collected",
      "Time used",
      "Overall discipline"
    ],
    visualMotif: `
      <div class="event-motif event-motif--cipher">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Nautical / Tactical Compass Rose -->
          <circle cx="200" cy="200" r="120" stroke="#eab308" stroke-width="1.5" stroke-dasharray="4 6"/>
          <circle cx="200" cy="200" r="80" stroke="#eab308" stroke-width="1" stroke-opacity="0.4"/>
          <!-- Compass Pointer Stars -->
          <polygon points="200,80 210,190 200,200 190,190" fill="#eab308"/>
          <polygon points="200,320 210,210 200,200 190,210" fill="#ca8a04"/>
          <polygon points="80,200 190,210 200,200 190,190" fill="#ca8a04"/>
          <polygon points="320,200 210,210 200,200 210,190" fill="#eab308"/>
          <!-- Coordinates & Topo lines -->
          <path d="M120 140 Q160 170 200 150 T280 140" stroke="#eab308" stroke-width="1" stroke-dasharray="2 4"/>
          <path d="M110 250 Q160 220 200 260 T290 240" stroke="#eab308" stroke-width="1" stroke-dasharray="2 4"/>
          <circle cx="200" cy="200" r="6" fill="#ffffff"/>
          <text x="195" y="70" fill="#eab308" font-family="monospace" font-size="12" font-weight="bold">N</text>
        </svg>
        <div class="event-motif__label">CARTOGRAPHIC COMPASS &amp; CIPHER COORDINATES</div>
      </div>
    `
  },
  {
    id: "12",
    slug: "enigma-supremo",
    name: "ENIGMA SUPREMO",
    brochureTitle: "ENGIMA SUPREMO",
    format: "Quiz",
    theme: "Super 'Mystery Quiz' — GK, Current Affairs, Logical Reasoning, Technology & Aptitude",
    eligibility: "Classes VII–X",
    category: "VII-X",
    eligibleClasses: [7, 8, 9, 10],
    participants: "2 members per team (max. 1 team per school)",
    teamSize: "2",
    duration: "Multi-Round (Prelims + Finals)",
    accentColor: "#d946ef",
    secondaryColor: "#a21caf",
    accentHue: 295,
    teacher: "Ms. Punam Choudhary",
    contact: "9279334260",
    specialSpecs: [
      { label: "Coverage", value: "General knowledge, current affairs, Logical Reasoning, Technology and Aptitude" },
      { label: "Round 1 (Prelims)", value: "Written quiz for all teams; star-marked questions serve as tie breaker; Top 4 teams qualify for Finals" },
      { label: "Round 2 (Finals)", value: "On-stage event: Round 1 (General), Round 2 (Bounce/Pounce), Round 3 (Mystery solver)" },
      { label: "Rules & Gear", value: "Electronic gadgets or reference materials prohibited; unfair means leads to disqualification" }
    ],
    rules: [
      "Eligibility: Classes VII to X.",
      "No. of participants: 2 members per team (max. 1 team per school).",
      "Electronic gadgets or any reference materials are not permitted.",
      "Unfair means will lead to disqualification.",
      "Time limit and other details of each round will be stated before its commencement.",
      "ROUND 1: PRELIMINARY ROUND — Written quiz for all participating team. In case of tie - star marked questions shall be considered as tie breaker. Top scoring 4 teams qualify for the Finals.",
      "ROUND 2: FINALS (on stage event) — Round 1: General Round, Round 2: Bounce/ Pounce, Round 3: Mystry solver. Four teams qualifying prelims are eligible for Final.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Preliminary written quiz ranking (Star-marked tie-breaker)",
      "Finals Round 1: General Round points",
      "Finals Round 2: Bounce / Pounce points",
      "Finals Round 3: Mystery Solver points"
    ],
    visualMotif: `
      <div class="event-motif event-motif--enigma">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Isometric Logic Maze Labyrinth -->
          <path d="M200 90 L310 150 L310 270 L200 330 L90 270 L90 150 Z" stroke="#d946ef" stroke-width="2" fill="rgba(217, 70, 239, 0.05)"/>
          <path d="M200 90 L200 210 L310 270 M200 210 L90 270" stroke="#d946ef" stroke-width="1.5"/>
          <!-- Inner maze pathways -->
          <path d="M150 145 L200 170 L250 145" stroke="#a21caf" stroke-width="2"/>
          <path d="M150 235 L200 210 L250 235" stroke="#a21caf" stroke-width="2"/>
          <!-- Mystery Question Rune / Glyph -->
          <circle cx="200" cy="190" r="14" stroke="#ffffff" stroke-width="2" fill="#d946ef" class="glow-dot"/>
          <text x="195" y="196" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="16">?</text>
        </svg>
        <div class="event-motif__label">ISOMETRIC LOGIC LABYRINTH &amp; RUNES</div>
      </div>
    `
  },
  {
    id: "13",
    slug: "arte-sin-pinceles",
    name: "ARTE SIN PINCELES",
    format: "Art Without a Brush",
    theme: "AI at Home",
    eligibility: "Classes IX–X",
    category: "IX-X",
    eligibleClasses: [9, 10],
    participants: "2 Participants",
    teamSize: "2",
    duration: "1.5 Hours",
    accentColor: "#f43f5e",
    secondaryColor: "#a855f7",
    accentHue: 335,
    teacher: "Ms. Ranjana Sharma",
    contact: "9113156313",
    specialSpecs: [
      { label: "Paper Provided", value: "A3 size paper will be provided" },
      { label: "Materials Required", value: "Participants must bring their own materials" },
      { label: "Originality Clause", value: "Artwork must be original and not copied" },
      { label: "Decision Clause", value: "Judges' decision will be final and binding" }
    ],
    rules: [
      "Students of classes IX and X can participate.",
      "NO. OF PARTICIPANTS :- 2.",
      "TIME :- One and a half hours.",
      "A3 size paper will be provided.",
      "Participants must bring their own materials.",
      "The artwork must be original and not copied.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Creativity and originality",
      "Neatness",
      "Composition",
      "Adherence to the theme",
      "Overall presentation"
    ],
    visualMotif: `
      <div class="event-motif event-motif--art">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="artGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f43f5e"/>
              <stop offset="100%" stop-color="#a855f7"/>
            </linearGradient>
          </defs>
          <!-- Sweeping palette ribbon (pigment without brushes) -->
          <path d="M80 280 C120 120 220 340 320 140 C280 80 180 200 120 180 Z" fill="url(#artGrad)" fill-opacity="0.3" stroke="url(#artGrad)" stroke-width="2"/>
          <path d="M100 220 Q200 80 300 200 T180 300" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" fill="none"/>
          <circle cx="140" cy="160" r="10" fill="#f43f5e" fill-opacity="0.6"/>
          <circle cx="280" cy="180" r="14" fill="#a855f7" fill-opacity="0.6"/>
          <circle cx="220" cy="270" r="8" fill="#ec4899" fill-opacity="0.8"/>
          <!-- A3 canvas outline -->
          <rect x="140" y="100" width="120" height="170" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="6 4" fill="none"/>
        </svg>
        <div class="event-motif__label">FLUID PIGMENT SWIRL &amp; A3 PAPER</div>
      </div>
    `
  },
  {
    id: "14",
    slug: "imperio-digital",
    name: "IMPERIO DIGITAL",
    format: "Business Venture Challenge",
    theme: "Artificial Intelligence / Robotics",
    eligibility: "Classes XI–XII",
    category: "XI-XII",
    eligibleClasses: [11, 12],
    participants: "A team of 2",
    teamSize: "2",
    duration: "7 mins pitch + 3 mins Q&A",
    accentColor: "#3b82f6",
    secondaryColor: "#4f46e5",
    accentHue: 225,
    teacher: "Ms. Sarita R Sinha",
    contact: "9430745064",
    specialSpecs: [
      { label: "Pitch Timing", value: "7 minutes pitch + 3 minutes Q & A with panel" },
      { label: "Deck Limit", value: "Recommended maximum 8 content slides (excluding title/thank you)" },
      { label: "Data & APIs", value: "External APIs and open-source datasets allowed with proper acknowledgement" },
      { label: "Core Requirement", value: "AI/Robotics must be a meaningful core part of the product, service, or business model with viable implementation path" }
    ],
    rules: [
      "Students of Class XI & XII can participate.",
      "No. of participants: a team of 2.",
      "Time: 7 mins pitch + 3 mins Q & A.",
      "Recommended: Maximum 8 content slides, excluding title/thank you.",
      "External APIs, open-source software datasets may be used with appropriate acknowledgement.",
      "Teams must propose a viable business idea where AI/Robotics is a meaningful core part of the product, service or business model. The idea should solve the real-world problem and have a believable customer, business model and path to implementation.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "Business Model & Revenue",
      "AI/Robotics integration",
      "Market Potential and Execution",
      "Originality of Idea",
      "Overall Presentation"
    ],
    visualMotif: `
      <div class="event-motif event-motif--venture">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Venture Node Grid & Exponential Growth Vector -->
          <line x1="80" y1="300" x2="320" y2="300" stroke="#3b82f6" stroke-width="1.5"/>
          <line x1="80" y1="300" x2="80" y2="80" stroke="#3b82f6" stroke-width="1.5"/>
          <!-- Hockey stick growth curve -->
          <path d="M80 290 Q200 280 240 200 T320 90" stroke="#3b82f6" stroke-width="3.5" stroke-linecap="round" fill="none"/>
          <!-- Network venture nodes -->
          <circle cx="120" cy="285" r="5" fill="#4f46e5"/>
          <circle cx="180" cy="275" r="6" fill="#4f46e5"/>
          <circle cx="230" cy="210" r="7" fill="#3b82f6"/>
          <circle cx="280" cy="130" r="8" fill="#60a5fa"/>
          <circle cx="320" cy="90" r="10" fill="#ffffff" stroke="#3b82f6" stroke-width="2" class="glow-dot"/>
          <!-- Candlestick bars -->
          <rect x="150" y="240" width="8" height="20" fill="#3b82f6" fill-opacity="0.4"/>
          <rect x="200" y="200" width="8" height="35" fill="#3b82f6" fill-opacity="0.6"/>
          <rect x="250" y="140" width="8" height="40" fill="#60a5fa" fill-opacity="0.8"/>
        </svg>
        <div class="event-motif__label">EXPONENTIAL VENTURE NODES &amp; VALUATION CURVE</div>
      </div>
    `
  },
  {
    id: "15",
    slug: "titmes-de-acero",
    name: "TITMES DE ACERO",
    brochureTitle: "TITMES DE ACERO (Short Pitch Circket)",
    format: "Short Pitch Cricket",
    theme: null,
    objective: "Score more or chase the score to beat the opponent team",
    eligibility: "Classes XI–XII",
    category: "XI-XII",
    eligibleClasses: [11, 12],
    participants: "4 members",
    teamSize: "4 members",
    duration: "5 overs per side (League Tournament)",
    accentColor: "#14b8a6",
    secondaryColor: "#0f766e",
    accentHue: 175,
    teacher: "Ms. Rita",
    contact: "9064681414",
    specialSpecs: [
      { label: "Eligibility", value: "Students of Class XI & XII can participate" },
      { label: "Team Composition", value: "4 members" },
      { label: "Overs Breakdown", value: "5 overs per side; 1 over will be bowled by girls" },
      { label: "Special Catch Rule", value: "If you catch the ball in one drop with one hand, then the batsman is out" },
      { label: "Equipment", value: "Matches will be played with a tennis ball (Cosco)" },
      { label: "Umpire Authority", value: "No argument with the umpire. Umpire's decision will be final." }
    ],
    rules: [
      "Students of Class XI & XII can participate.",
      "Objective: Score more or chase the score to beat the opponent team.",
      "Team Size: 4 members.",
      "Short-pitch cricket tournament.",
      "Each side has to play 5 overs; 1 over will be bowled by girls.",
      "If you catch the ball in one drop with one hand, then the batsman is out.",
      "Matches will be played with a tennis ball (Cosco).",
      "No argument with the umpire. Umpire's decision will be final.",
      "It will be a league tournament.",
      "Judges' decision will be final and binding."
    ],
    criteria: [
      "1st Position: Tournament Winner",
      "2nd Position: Runner-up of the Tournament"
    ],
    visualMotif: `
      <div class="event-motif event-motif--cricket">
        <svg class="event-motif__svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Pitch Crease & Turf Coordinates -->
          <ellipse cx="200" cy="270" rx="140" ry="50" stroke="#14b8a6" stroke-width="1.5" stroke-dasharray="6 4" fill="rgba(20, 184, 166, 0.05)"/>
          <line x1="120" y1="270" x2="280" y2="270" stroke="#14b8a6" stroke-width="2"/>
          <!-- Three Stumps & Bails -->
          <line x1="185" y1="270" x2="185" y2="210" stroke="#ffffff" stroke-width="2.5"/>
          <line x1="200" y1="270" x2="200" y2="210" stroke="#ffffff" stroke-width="2.5"/>
          <line x1="215" y1="270" x2="215" y2="210" stroke="#ffffff" stroke-width="2.5"/>
          <line x1="180" y1="208" x2="220" y2="208" stroke="#14b8a6" stroke-width="3"/>
          <!-- Parabolic Cosco Ball Flight Arc -->
          <path d="M70 180 Q200 60 270 240" stroke="#14b8a6" stroke-width="2.5" stroke-dasharray="4 6" fill="none" class="dash-move"/>
          <!-- Ball & velocity rings -->
          <circle cx="270" cy="240" r="10" fill="#14b8a6"/>
          <circle cx="270" cy="240" r="18" stroke="#14b8a6" stroke-width="1" stroke-opacity="0.4"/>
          <!-- 1-Drop Catch Telemetry -->
          <circle cx="200" cy="140" r="4" fill="#ffffff"/>
        </svg>
        <div class="event-motif__label">PARABOLIC BALL FLIGHT &amp; STUMPS TELEMETRY</div>
      </div>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EVENTS_DATA };
}
