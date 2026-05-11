import type { CaseStudyContent } from './types';

export const kari: CaseStudyContent = {
  slug: 'kari',
  cluster: 'C',
  archetype: 'Product Visionary',
  oneLineTagline:
    'Unity mobile game for Isha Foundation — guide Kari through India\'s sacred temples, collect lost relics. 50,000+ downloads, 4.5+ rating on both the App Store and Google Play.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-kari-game.html',

  leadershipLens: {
    call: 'Chose to build Kari as a full game — with 3D environments, puzzle mechanics, and a narrative progression system — rather than the lighter-weight formats Isha Foundation could have commissioned: a documentary-style app, a virtual tour, or a video content series. The "game" decision was the founding product call. It meant accepting Unity\'s complexity, a multi-discipline production pipeline (concept art → 3D modeling → game logic → mobile optimisation), and the longer timeline that entails. The alternative formats were safer and cheaper; a game was the only format that could create genuine player agency — letting someone physically explore a temple, solve puzzles rooted in its history, and collect relics that unlock deeper lore. Cultural education had to be woven into gameplay, not bolted on.',
    bet: 'Bet on Unity as the engine and mobile-first as the primary canvas — two decisions that locked the entire technical architecture. Unity\'s single-codebase cross-platform target (iOS + Android) was the right call for reach, but it required committing to C# as the sole scripting language and to mobile GPU constraints as the design ceiling. The temple-collection mechanic — relic hunting as the core loop — was the gameplay bet: that a collect-to-unlock progression would sustain engagement long enough for the cultural content to land. Each temple had to be its own self-contained world with unique puzzles, environment art, and historical beats, which multiplied the production effort per level but made the game replayable rather than linear.',
    tradeoff:
      'The depth-per-temple model traded breadth for quality — fewer temples, each richly detailed, rather than many shallow environments. This also kept the initial download size manageable through addressable asset loading. The model was free-to-play with no in-app purchases, which traded monetisation upside for frictionless reach — consistent with Isha Foundation\'s non-profit mandate. Cultural sensitivity was a hard constraint throughout: every architectural choice, every puzzle, and every piece of narrative had to be reviewed against the authentic heritage of the temple it represented. That constraint slowed iteration but protected the product\'s integrity in the eyes of Isha Foundation\'s global community.',
    outcome:
      '50,000+ downloads across iOS and Android, 4.5+ rating on both stores — organic growth driven by Isha Foundation\'s volunteer network and community channels rather than paid acquisition. The App Store listing (id1561474376) remains live. The 4.5+ rating across both stores reflects sustained player satisfaction beyond the initial community push, which means the gameplay loop held up for players outside Isha Foundation\'s existing audience. Device testing was conducted across 50+ Android devices and multiple iPhone generations to ensure the mobile performance held at scale.',
    coordinated:
      'Worked directly with Isha Foundation stakeholders to align on cultural representation, narrative direction, and launch sequencing. The production pipeline required coordinating across art (concept art and 3D temple environments), audio (ambient and puzzle-state sound design), and game design disciplines — all feeding into Unity for integration. The community launch phase was coordinated with Isha Foundation\'s volunteer network and social channels, which was the primary acquisition channel. Isha Foundation\'s global community provided both the distribution surface and the cultural authority that gave the game its credibility.',
    nextStep:
      'The natural roadmap is additional temples: India has thousands of architecturally and historically distinct sacred sites, and each one is a candidate level. A multiplayer or co-op relic hunt — where two players explore the same temple from different entry points — would extend the social dimension that Isha Foundation\'s community naturally supports. A curator mode, where Isha Foundation volunteers can contribute cultural annotations to each level\'s lore layer, would turn the game into a living cultural record rather than a static product. Seasonal events tied to real temple festivals (Diwali, Mahashivratri) would drive re-engagement without requiring full new levels.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  CLIENT BRIEF
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'The Brief: Cultural Education Through Play',
      blocks: [
        {
          type: 'prose',
          body: 'Isha Foundation — a global non-profit spiritual organisation founded by Sadhguru, with millions of volunteers and participants worldwide — came with a specific challenge: introduce India\'s temple heritage to a younger, digitally-native audience that may never visit these sites in person.',
        },
        {
          type: 'prose',
          body: 'The brief was not "build us an app." It was a product strategy question: what format gives young audiences (ages 12–35) a genuine reason to engage with sacred architecture, history, and cultural context? Video could broadcast. A virtual tour could showcase. Only a game could let someone feel like they were *there* — solving puzzles that emerged from the temple\'s own history, collecting relics that unlocked its lore.',
        },
        {
          type: 'callout',
          tone: 'gold',
          title: 'The Challenge',
          body: 'Cultural education through engaging gameplay — reaching young audiences who might not visit temples physically, but could discover India\'s ancient architectural heritage through an immersive digital experience.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Downloads',
              value: '50K+',
              sub: 'Both stores combined',
              tone: 'green',
            },
            {
              label: 'Rating',
              value: '4.5+',
              sub: 'iOS & Android',
              tone: 'gold',
            },
            {
              label: 'Platforms',
              value: '2',
              sub: 'iOS + Android',
              tone: 'blue',
            },
            {
              label: 'Client',
              value: 'Isha',
              sub: 'Global non-profit',
              tone: 'purple',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  GAME DESIGN
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: 'Game Design: Temples as Levels',
      blocks: [
        {
          type: 'prose',
          body: 'The core loop: players guide Kari through beautifully rendered Indian temples, solving puzzles rooted in each site\'s architecture and history, and collecting ancient relics that unlock deeper lore about the temple. Exploration rewards curiosity; the relic system rewards completion.',
        },
        {
          type: 'prose',
          body: 'Every level was designed around a real Indian temple — its architecture, its iconography, its historical context. Education was woven into the puzzle design itself, not appended as tooltips or loading-screen facts. If you wanted to progress, you had to engage with the place.',
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'Design Philosophy',
          body: 'Every level was designed around a real Indian temple — its architecture, history, and cultural significance shaped the puzzles, environment art, and narrative beats. Education was woven into gameplay, never forced.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Aspect', align: 'left' },
            { label: 'Decision', align: 'left' },
          ],
          rows: [
            [
              { value: 'Genre', bold: true },
              { value: 'Adventure / Exploration / Puzzle' },
            ],
            [
              { value: 'Target Audience', bold: true },
              { value: 'Ages 12–35, interested in Indian culture and heritage' },
            ],
            [
              { value: 'Level Design', bold: true },
              { value: 'Each temple is a unique environment with its own history and challenges' },
            ],
            [
              { value: 'Progression', bold: true },
              { value: 'Collect relics to unlock new temples and deeper lore' },
            ],
            [
              { value: 'Monetisation', bold: true },
              { value: 'Free-to-play, no in-app purchases — aligned with Isha Foundation\'s non-profit mandate' },
            ],
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  DEVELOPMENT
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'Development: Unity, C#, and the Mobile Constraint',
      blocks: [
        {
          type: 'prose',
          body: 'The game was built in Unity for cross-platform deployment, with C# scripting powering all game logic. 3D environments were modeled after real Indian temple architecture and optimised for mobile GPU constraints — the production ceiling that shaped every art decision.',
        },
        {
          type: 'flow',
          title: 'Build Pipeline',
          rows: [
            [
              { label: 'Concept Art', tone: 'navy' },
              { label: '3D Modeling', tone: 'blue' },
              { label: 'Unity Integration', tone: 'purple' },
              { label: 'C# Game Logic', tone: 'green' },
              { label: 'Mobile Optimisation', tone: 'gold' },
            ],
          ],
        },
        {
          type: 'table',
          headers: [
            { label: 'Area', align: 'left' },
            { label: 'Approach', align: 'left' },
          ],
          rows: [
            [
              { value: 'Performance', bold: true },
              { value: 'LOD systems, texture atlasing, and draw call batching for smooth mobile framerate' },
            ],
            [
              { value: 'Asset Pipeline', bold: true },
              { value: 'Addressable assets for on-demand loading, reducing initial download size' },
            ],
            [
              { value: 'Retention', bold: true },
              { value: 'Push notifications, daily challenges, and progression rewards to drive re-engagement' },
            ],
            [
              { value: 'Testing', bold: true },
              { value: 'Device farm testing across 50+ Android devices and multiple iPhone generations' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'purple',
          title: 'The Cross-Platform Bet',
          body: 'Unity\'s single-codebase target for iOS and Android was the right call for reach. The tradeoff was accepting mobile GPU constraints as the design ceiling — every art and performance decision was made relative to what the lowest-tier supported device could render smoothly.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  LAUNCH & PUBLISHING
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'Launch: Community-Led Distribution',
      blocks: [
        {
          type: 'prose',
          body: 'The game was published on both the Apple App Store and Google Play Store, with a coordinated launch leveraging Isha Foundation\'s global community network for initial traction. The distribution model was community-first rather than paid acquisition — consistent with the non-profit context and demonstrably effective given the 50K+ downloads.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Phase', align: 'left' },
            { label: 'Action', align: 'left' },
          ],
          rows: [
            [
              { value: 'Phase 1', bold: true },
              { value: 'App Store submission — optimised listings on both Apple App Store and Google Play' },
            ],
            [
              { value: 'Phase 2', bold: true },
              { value: 'ASO — keyword research, screenshot optimisation, and A/B testing for discoverability' },
            ],
            [
              { value: 'Phase 3', bold: true },
              { value: 'Community launch — coordinated push with Isha Foundation\'s volunteer network and social channels' },
            ],
            [
              { value: 'Phase 4', bold: true },
              { value: 'Post-launch — regular content updates with new temples, puzzles, and seasonal events' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'App Store',
          body: 'Live on Apple App Store: apps.apple.com/us/app/kari-and-the-lost-shrines/id1561474376',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 05  RESULTS
    // ─────────────────────────────────────────────────────────────
    {
      number: '05',
      eyebrow: 'Chapter 5',
      title: 'Results: 50K Downloads, 4.5+ Rating',
      blocks: [
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Downloads',
              value: '50K+',
              sub: 'Both stores combined',
              tone: 'green',
            },
            {
              label: 'Rating',
              value: '4.5+',
              sub: 'iOS & Android',
              tone: 'gold',
            },
            {
              label: 'Platforms',
              value: '2',
              sub: 'iOS + Android',
              tone: 'blue',
            },
            {
              label: 'Cultural Impact',
              value: 'Global',
              sub: 'Heritage education',
              tone: 'purple',
            },
          ],
        },
        {
          type: 'prose',
          body: 'The 4.5+ rating across both stores is the signal that matters most. It means the gameplay loop held up for players outside Isha Foundation\'s existing audience — beyond the initial community push, users who arrived with no prior connection to Isha Foundation rated the experience at 4.5+ stars. That\'s genuine product satisfaction, not community loyalty.',
        },
        {
          type: 'callout',
          tone: 'gold',
          title: 'Impact Statement',
          body: 'The game successfully introduced India\'s temple heritage to a younger, global audience — achieving strong organic growth through Isha Foundation\'s community while maintaining high user satisfaction reflected in 4.5+ ratings on both stores.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 06  TECH STACK & CAPABILITIES
    // ─────────────────────────────────────────────────────────────
    {
      number: '06',
      eyebrow: 'Chapter 6',
      title: 'Technologies & What This Demonstrates',
      blocks: [
        {
          type: 'tags',
          items: [
            { label: 'Unity', tone: 'navy' },
            { label: 'C#', tone: 'purple' },
            { label: 'iOS', tone: 'blue' },
            { label: 'Android', tone: 'green' },
            { label: 'Apple App Store', tone: 'gold' },
            { label: 'Google Play', tone: 'cyan' },
            { label: '3D Modeling' },
            { label: 'Mobile Optimisation' },
            { label: 'Push Notifications' },
          ],
        },
        {
          type: 'table',
          headers: [
            { label: 'Capability', align: 'left' },
            { label: 'Evidence', align: 'left' },
          ],
          rows: [
            [
              { value: 'Client delivery for major non-profit', bold: true },
              { value: 'End-to-end product for Isha Foundation — a globally recognised org with millions of followers' },
            ],
            [
              { value: 'Full game development lifecycle', bold: true },
              { value: 'Concept → design → development → publishing → post-launch maintenance' },
            ],
            [
              { value: 'Cross-platform mobile development', bold: true },
              { value: 'Single Unity codebase on iOS and Android, device-tested across 50+ devices' },
            ],
            [
              { value: 'Cultural sensitivity in product design', bold: true },
              { value: 'Respectfully representing sacred architecture and spiritual heritage in a game context' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Key Takeaway',
          body: 'Kari demonstrates that cultural education and genuine gameplay are not in tension — when the education IS the mechanic, players engage willingly. The 50K+ download count and 4.5+ rating are the proof.',
        },
      ],
    },
  ],
};
