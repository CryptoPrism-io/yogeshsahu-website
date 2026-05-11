import type { CaseStudyContent } from './types';

export const gyanmarg: CaseStudyContent = {
  slug: 'gyanmarg',
  cluster: 'C',
  archetype: 'Product Visionary',
  oneLineTagline:
    'Adaptive LMS with real-time synchronization — Firestore-powered learning paths that adjust difficulty after every assessment, deployed live at ai-polymind.web.app.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-gyanmarg.html',

  leadershipLens: {
    call: 'Chose to build a custom adaptive LMS on Firebase rather than extending an existing platform (Moodle, Canvas, Google Classroom), identifying that the core gap was not content delivery but the feedback loop — instructors discovering student struggles days after the fact. The decision to own the full stack meant owning the real-time sync layer, which no off-the-shelf tool offered without expensive add-ons.',
    bet: 'Bet that Firestore\'s onSnapshot listeners — replacing REST polling and eliminating WebSocket boilerplate entirely — would deliver a real-time instructor dashboard and adaptive path recalculation with zero server management overhead, and that this architectural simplicity would hold from a classroom of 10 to one of 10,000.',
    tradeoff:
      'Traded breadth of features (no gradebook import/export, no LTI integrations, no SCORM compliance) for depth in the two capabilities that mattered most: instant progress visibility for instructors and per-student difficulty adjustment. Also accepted Firestore\'s document model limitations (no complex joins) in exchange for built-in offline persistence and sub-100ms global CDN delivery via Firebase Hosting.',
    outcome:
      'Live platform at ai-polymind.web.app — a full React + Firebase LMS with real-time sync across the Course > Module > Lesson > Assessment hierarchy, adaptive path recalculation via Cloud Functions (score > 85% for 3 consecutive assessments advances difficulty; score < 60% branches to remedial content), optimistic UI updates so learners stay in flow state, and multi-device access (phone for students, desktop dashboard for instructors). Firebase free tier (50K reads/day, 20K writes/day, 1 GB storage) supports product-market-fit validation at zero infrastructure cost.',
    coordinated:
      'Sole product and engineering decision-maker. Designed the adaptive path algorithm, the Firestore data model, the role separation (student vs. instructor views), and the Cloud Functions trigger logic. Curriculum and content-sequencing decisions — what constitutes "mastery" (85% threshold), what triggers remediation (sub-60%), how modules nest — were made without an external curriculum team, requiring domain judgment to be embedded directly into code.',
    nextStep:
      'Add AI-generated hint prompts tied to the remedial branch (leveraging the polymind branding direction); build an analytics export for instructors (cohort-level completion rates, time-on-task heatmaps); explore LTI 1.3 integration to allow embedding within institutional portals without requiring separate Firebase Auth accounts.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  THE PROBLEM
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'Static Learning Doesn\'t Scale',
      blocks: [
        {
          type: 'prose',
          body: 'Traditional LMS platforms are fundamentally static — content delivery doesn\'t adapt to individual learning pace. Every student receives the same material at the same speed, regardless of their comprehension level or prior knowledge.\n\nTeachers lack real-time visibility into student progress. They discover struggles only after assignments are submitted, missing the critical window for intervention. The feedback loop between instructor action and student response is measured in days, not seconds.',
        },
        {
          type: 'callout',
          tone: 'red',
          title: 'Core Challenges',
          body: 'No real-time sync between instructor and students. No adaptive content paths based on performance. No immediate feedback loops. Result: disengaged learners and overwhelmed teachers.',
        },
        {
          type: 'stats',
          cols: 2,
          items: [
            {
              label: 'Gap Identified',
              value: 'Days',
              sub: 'feedback latency in traditional LMS',
              tone: 'red',
            },
            {
              label: 'Target Latency',
              value: 'Seconds',
              sub: 'with Firestore real-time listeners',
              tone: 'green',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  PLATFORM ARCHITECTURE
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: 'Serverless Real-time Stack',
      blocks: [
        {
          type: 'prose',
          body: 'GyanMarg is built on a fully serverless architecture. Firebase provides the backbone — authentication, real-time database, cloud functions, and hosting — eliminating server management overhead while guaranteeing automatic scaling.',
        },
        {
          type: 'flow',
          title: 'System Architecture',
          rows: [
            [
              { label: 'React Frontend', tone: 'blue' },
              { label: 'Firebase Auth', tone: 'purple' },
              { label: 'Firestore (Real-time)', tone: 'green' },
              { label: 'Cloud Functions', tone: 'gold' },
            ],
            [
              { label: 'Student Browser', tone: 'light' },
              { label: 'Auth Layer', tone: 'light' },
              { label: 'Real-time Listeners', tone: 'light' },
              { label: 'Serverless Logic', tone: 'light' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'Architecture Decision',
          body: 'By choosing Firestore over a traditional REST API, every data mutation automatically propagates to all subscribed clients. This eliminates an entire class of sync bugs and removes the need for manual cache invalidation.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  KEY FEATURES
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'Platform Capabilities',
      blocks: [
        {
          type: 'prose',
          body: 'GyanMarg delivers four core capabilities that distinguish it from traditional LMS platforms — each designed to close the feedback gap between instruction and learning.',
        },
        {
          type: 'prose',
          heading: 'Feature 01 — Real-time Synchronization',
          body: 'Live updates propagate the instant an instructor publishes content. Student progress is visible immediately on the instructor dashboard — no refresh required. Powered by Firestore\'s onSnapshot listeners.',
        },
        {
          type: 'prose',
          heading: 'Feature 02 — Adaptive Learning Paths',
          body: 'Content difficulty adjusts based on student performance. Struggling students receive additional foundational material; advanced learners progress to challenging content. Paths recalculate after each assessment.',
        },
        {
          type: 'prose',
          heading: 'Feature 03 — Educational Content Delivery',
          body: 'Structured modules with lessons, assessments, and multimedia content. Hierarchical organization: Course > Module > Lesson > Assessment. Rich text, video embeds, and interactive elements.',
        },
        {
          type: 'prose',
          heading: 'Feature 04 — Progress Tracking',
          body: 'Instructor dashboard showing class-wide and individual metrics. Completion rates, time-on-task, assessment scores, and engagement patterns — all updating in real-time.',
        },
        {
          type: 'prose',
          heading: 'Adaptive Path Algorithm',
          body: 'difficulty_level = f(assessment_score, time_spent, attempts)\n// Score > 85% for 3 consecutive assessments → advance difficulty\n// Score < 60% → provide remedial content branch\nnext_content = path_map[difficulty_level][module_id]\n// Real-time recalculation via Cloud Functions trigger',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  TECHNICAL IMPLEMENTATION
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'Engineering Decisions',
      blocks: [
        {
          type: 'prose',
          body: 'Every technical choice in GyanMarg was driven by two priorities: type safety to reduce runtime errors in an educational context where reliability matters, and perceived speed to keep learners engaged.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Technology', align: 'left' },
            { label: 'Purpose', align: 'left' },
            { label: 'Why This Choice', align: 'left' },
          ],
          rows: [
            [
              { value: 'React + TypeScript', bold: true, mono: true },
              { value: 'Frontend framework' },
              { value: 'Type safety catches data-shape bugs at compile time; component model maps to LMS UI patterns' },
            ],
            [
              { value: 'Firebase Auth', bold: true, mono: true },
              { value: 'Authentication' },
              { value: 'Email/password + Google OAuth out of the box; role-based access (student vs instructor)' },
            ],
            [
              { value: 'Firestore Listeners', bold: true, mono: true },
              { value: 'Real-time data sync' },
              { value: 'Instant propagation without WebSocket boilerplate; offline persistence built-in' },
            ],
            [
              { value: 'Optimistic UI', bold: true, mono: true },
              { value: 'Perceived performance' },
              { value: 'UI updates immediately before server confirms; reverts on failure — feels instant' },
            ],
            [
              { value: 'Responsive CSS', bold: true, mono: true },
              { value: 'Multi-device support' },
              { value: 'Students access from phones during commutes; instructors use desktop dashboards' },
            ],
          ],
        },
        {
          type: 'flow',
          title: 'User Authentication Flow',
          rows: [
            [
              { label: 'Login Page', tone: 'light' },
              { label: 'Firebase Auth', tone: 'purple' },
              { label: 'JWT Token', tone: 'navy' },
              { label: 'Role Check', tone: 'green' },
              { label: 'Dashboard', tone: 'blue' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Optimistic Updates',
          body: 'When a student submits an answer, the UI shows success immediately while the write propagates to Firestore. If the write fails (e.g., network issues), the UI gracefully reverts. This pattern eliminates perceived latency and keeps learners in flow state.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 05  WHY FIREBASE
    // ─────────────────────────────────────────────────────────────
    {
      number: '05',
      eyebrow: 'Chapter 5',
      title: 'Platform Choice Rationale',
      blocks: [
        {
          type: 'prose',
          body: 'Firebase was chosen deliberately — not as a default, but because its feature set maps precisely to EdTech requirements. The platform eliminates entire categories of infrastructure work that would otherwise consume engineering time.',
        },
        {
          type: 'prose',
          heading: 'Zero Server Management',
          body: 'No provisioning, patching, or scaling decisions. Focus engineering effort on learning outcomes, not infrastructure.',
        },
        {
          type: 'prose',
          heading: 'Built-in Real-time',
          body: 'No WebSocket server setup. No connection pooling. No reconnection logic. Firestore handles all of this natively.',
        },
        {
          type: 'prose',
          heading: 'Automatic Scaling',
          body: 'Handles 10 students or 10,000 without configuration changes. Exam-day traffic spikes are absorbed transparently.',
        },
        {
          type: 'prose',
          heading: 'Offline Support',
          body: 'Firestore caches data locally. Students in low-connectivity environments continue learning; syncs when reconnected.',
        },
        {
          type: 'callout',
          title: 'Cost at Scale',
          body: 'Firebase\'s pay-per-operation model means costs grow linearly with actual usage — not with provisioned capacity. For an EdTech platform with variable daily active users, this eliminates idle-infrastructure waste. The generous free tier (50K reads/day, 20K writes/day, 1 GB storage) allows full product-market-fit validation at zero cost.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 06  TECH STACK
    // ─────────────────────────────────────────────────────────────
    {
      number: '06',
      eyebrow: 'Chapter 6',
      title: 'Technology Overview',
      blocks: [
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Frontend',
              value: 'React',
              sub: 'Component-based UI',
              tone: 'blue',
            },
            {
              label: 'Language',
              value: 'TypeScript',
              sub: 'Full type safety',
              tone: 'purple',
            },
            {
              label: 'Backend',
              value: 'Firebase',
              sub: 'Serverless platform',
              tone: 'gold',
            },
            {
              label: 'Database',
              value: 'Firestore',
              sub: 'Real-time NoSQL',
              tone: 'green',
            },
          ],
        },
        {
          type: 'tags',
          items: [
            { label: 'React', tone: 'blue' },
            { label: 'TypeScript', tone: 'purple' },
            { label: 'Firebase Auth', tone: 'gold' },
            { label: 'Firestore', tone: 'gold' },
            { label: 'Firebase Hosting', tone: 'gold' },
            { label: 'Cloud Functions', tone: 'gold' },
            { label: 'Real-time Listeners', tone: 'green' },
            { label: 'Responsive CSS', tone: 'cyan' },
            { label: 'Google OAuth' },
            { label: 'CDN Delivery' },
          ],
        },
        {
          type: 'table',
          headers: [
            { label: 'Resource', align: 'left' },
            { label: 'URL', align: 'left' },
          ],
          rows: [
            [
              { value: 'Live Platform', bold: true },
              { value: 'ai-polymind.web.app', mono: true },
            ],
            [
              { value: 'Source Code', bold: true },
              { value: 'github.com/CryptoPrism-io/gyanmarg', mono: true },
            ],
          ],
        },
      ],
    },
  ],
};
