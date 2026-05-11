import type { CaseStudyContent } from './types';

export const pggCrm: CaseStudyContent = {
  slug: 'pgg-crm',
  cluster: 'B',
  archetype: 'Solution Architect',
  oneLineTagline:
    'Lead management and sales automation for an industrial packaging company — a full-stack CRM covering pipeline tracking, quote generation, and multi-channel outreach (email + WhatsApp) built on Express + Prisma + PostgreSQL where Salesforce/HubSpot/Zoho were overbuilt for a lean two-vertical sales team.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-pgg-crm.html',

  leadershipLens: {
    call: 'Chose to build a purpose-fit CRM over adopting an off-the-shelf solution (Salesforce, HubSpot, Zoho CRM), recognising that PGG operates two distinct verticals — Paper & Board (relationship-driven Pune region) and PP Corrugated (specification-driven pan-India) — with fundamentally different ICP profiles and lead sources. A commercial CRM would force a generic pipeline onto a business that needs per-vertical ICP scoring, IndiaMART/GeM/LinkedIn scrape ingestion, and integrated quote generation with a rate-card pricing engine: capabilities that either don\'t exist in SaaS tools or require costly customisation.',
    bet: 'Bet that a server-rendered, no-SPA architecture (Express 5 + EJS + Prisma) combined with a tight 4-model data schema would be sufficient for a multi-channel outreach CRM — accepting that it would never have the reporting depth or mobile apps of a commercial platform, but would ship faster and be fully tailored to PGG\'s exact lead-to-quote workflow.',
    tradeoff:
      'Sacrificed advanced analytics dashboards, mobile apps, and CRM ecosystem integrations (Outlook, Sheets sync) in exchange for a system that runs as a single Node.js process, has zero per-seat licensing cost, and encodes PGG\'s exact pipeline logic — 6 stages with dormant re-entry, per-vertical ICP scoring, and 18 rate-card-based quote generation — which no commercial CRM would offer out of the box.',
    outcome:
      'Pune Global Group gained a production-ready CRM covering the full outreach lifecycle: 12 leads and 13 contacts seeded, 12 Express routes powering pipeline operations, 18 rate cards loaded for instant PDF quote generation via Puppeteer, and multi-channel outreach across email (Resend, 3,000/mo) and WhatsApp (Baileys) with webhook-based delivery tracking. The platform replaced manual phone and inbox-based follow-up with centralized pipeline visibility and templated outreach across 6 message templates.',
    coordinated:
      'Aligned with Pune Global Group on the two-vertical structure (Paper & Board vs PP Corrugated) and the distinct ICP profiles each requires — a Pune corrugator behaves nothing like a pan-India FMCG procurement team, so both pipeline scoring and outreach templates were configured differently per vertical. Scoped the system to an internal sales tool for a small team, which meant the sign-off condition was delivering a working quote-to-outreach flow rather than a training programme or multi-department rollout.',
    nextStep:
      'Add per-vertical conversion analytics and a pipeline velocity dashboard; build a WhatsApp inbox view for two-way conversation tracking; extend the quote module with revision history and accepted-quote-to-order handoff; explore IndiaMART webhook integration to auto-ingest leads without manual scraping sessions.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  BUSINESS PROBLEM
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'The Business Problem',
      blocks: [
        {
          type: 'prose',
          body: 'Pune Global Group (PGG) is an industrial packaging company serving two distinct verticals across different geographies and buyer profiles. Before this CRM existed, leads arrived from four or more channels with no centralised tracking, quotes were generated manually, and outreach happened through personal phones and inboxes with no visibility into performance.',
        },
        {
          type: 'prose',
          heading: 'Vertical A — Paper & Board',
          body: 'Corrugators, box makers, and printers concentrated in the Pune region. Relationship-driven B2B sales with repeat orders and long-term contracts.',
        },
        {
          type: 'prose',
          heading: 'Vertical B — PP Corrugated',
          body: 'Automotive, pharma, electronics, and FMCG companies across pan-India markets. Specification-driven procurement with formal RFQ processes.',
        },
        {
          type: 'callout',
          tone: 'gold',
          title: 'Core Challenge',
          body: 'Managing leads from 4+ sources (IndiaMART, Google, GeM, LinkedIn) with fundamentally different ICP profiles — a Pune corrugator has nothing in common with a pan-India FMCG buyer, yet both need to flow through the same pipeline with tailored scoring and outreach.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Lead Sources',
              value: '4+',
              sub: 'IndiaMART, Google, GeM, LinkedIn',
              tone: 'blue',
            },
            {
              label: 'Rate Cards',
              value: '18',
              sub: 'Loaded in system',
              tone: 'gold',
            },
            {
              label: 'Outreach Channels',
              value: '2',
              sub: 'Email + WhatsApp',
              tone: 'green',
            },
            {
              label: 'Pipeline Stages',
              value: '6',
              sub: 'Plus dormant re-entry',
              tone: 'purple',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  MODULE A — LEAD DATABASE & PIPELINE
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: 'Module A — Lead Database & Pipeline',
      blocks: [
        {
          type: 'prose',
          body: 'The lead module is the backbone of the CRM — 12 Express routes powering a full pipeline from raw lead to closed deal. Every lead is tracked through a 5-stage pipeline with ICP scoring, activity logging, and a tabbed detail view for deep context on each prospect.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Express Routes',
              value: '12',
              sub: 'CRUD + pipeline ops',
              tone: 'blue',
            },
            {
              label: 'Demo Leads',
              value: '12',
              sub: 'In database',
              tone: 'gold',
            },
            {
              label: 'Contacts',
              value: '13',
              sub: 'Linked to leads',
              tone: 'green',
            },
            {
              label: 'Activities',
              value: '12',
              sub: 'Logged interactions',
              tone: 'purple',
            },
          ],
        },
        {
          type: 'prose',
          heading: 'Pipeline Stages',
          body: 'Leads progress through six active stages. Any stage can transition to DORMANT, and dormant leads can re-enter the pipeline at any stage — reflecting the reality that industrial sales cycles can go quiet for months and then reactivate.',
        },
        {
          type: 'flow',
          title: 'Lead pipeline flow',
          rows: [
            [
              { label: 'NEW', tone: 'navy' },
              { label: 'RESEARCHED', tone: 'blue' },
              { label: 'CONTACTED', tone: 'purple' },
              { label: 'QUALIFIED', tone: 'cyan' },
              { label: 'QUOTED', tone: 'gold' },
              { label: 'WON / LOST', tone: 'green' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'ICP Fit Engine',
          body: 'Computes a fit score for each lead based on vertical alignment, company size, geography, and procurement signals. Paper & Board leads are scored differently from PP Corrugated leads — vertical-specific weights ensure the scoring reflects actual conversion likelihood for each buyer type.',
        },
        {
          type: 'prose',
          heading: 'Lead Detail View',
          body: 'Tabbed interface showing Info, Contacts, Activity, and Sales Intel for full context on every prospect. The filter query builder allows searching by stage, source, vertical, score range, and free-text across all fields.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  MODULE B — QUOTE GENERATOR + SUPPLIER RFQ
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'Module B — Quote Generator + Supplier RFQ',
      blocks: [
        {
          type: 'prose',
          body: 'The quoting engine turns rate cards into pixel-perfect PDF quotes in seconds. With 18 rate cards loaded into the system, the sales team selects products, adjusts quantities, and the pricing engine computes totals with applicable margins. Puppeteer renders the final quote as a professional PDF ready for email attachment.',
        },
        {
          type: 'stats',
          cols: 3,
          items: [
            {
              label: 'Rate Cards',
              value: '18',
              sub: 'Loaded in system',
              tone: 'gold',
            },
            {
              label: 'PDF Engine',
              value: 'Puppeteer',
              sub: 'Pixel-perfect rendering',
              tone: 'blue',
            },
            {
              label: 'Lifecycle',
              value: 'Managed',
              sub: 'Draft → sent → accepted',
              tone: 'green',
            },
          ],
        },
        {
          type: 'flow',
          title: 'Quote generation flow',
          rows: [
            [
              { label: 'Select Products', tone: 'light' },
              { label: 'Rate Card Lookup', tone: 'gold' },
              { label: 'Pricing Engine', tone: 'blue' },
              { label: 'Puppeteer PDF', tone: 'purple' },
              { label: 'Send to Lead', tone: 'green' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'Why Puppeteer?',
          body: 'Industrial packaging quotes need precise formatting — product specifications, GST breakdowns, delivery terms, and company branding. Puppeteer renders the EJS template to PDF with full CSS support, ensuring the quote looks identical whether viewed on screen or printed.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Stage', align: 'left' },
            { label: 'Description', align: 'left' },
            { label: 'Actions', align: 'left' },
          ],
          rows: [
            [
              { value: 'Draft', bold: true },
              { value: 'Quote created, products and pricing configured' },
              { value: 'edit, preview, delete', mono: true },
            ],
            [
              { value: 'Sent', bold: true },
              { value: 'PDF generated and sent to lead via email/WhatsApp' },
              { value: 'resend, revise, track', mono: true },
            ],
            [
              { value: 'Accepted', bold: true },
              { value: 'Lead accepts terms, deal moves to WON' },
              { value: 'convert, archive', mono: true },
            ],
            [
              { value: 'Rejected', bold: true },
              { value: 'Lead declines, feedback captured for future reference' },
              { value: 'revise, close', mono: true },
            ],
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  MODULE C — OUTREACH ENGINE
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'Module C — Outreach Engine',
      blocks: [
        {
          type: 'prose',
          body: 'Multi-channel outreach from a single platform — email via Resend and WhatsApp via Baileys. The outreach engine supports templated campaigns, batch sends, and webhook-based delivery tracking so the team knows exactly which messages land and which bounce.',
        },
        {
          type: 'stats',
          cols: 3,
          items: [
            {
              label: 'Email Capacity',
              value: '3K/mo',
              sub: 'Via Resend API',
              tone: 'cyan',
            },
            {
              label: 'Template Types',
              value: '6',
              sub: 'For different scenarios',
              tone: 'green',
            },
            {
              label: 'Channels',
              value: '2',
              sub: 'Email + WhatsApp',
              tone: 'purple',
            },
          ],
        },
        {
          type: 'prose',
          heading: 'Resend Integration (Email)',
          body: 'Transactional and campaign emails through Resend\'s API. 3,000 emails per month with delivery webhooks for open/bounce tracking. Templates render dynamically with lead and company data.',
        },
        {
          type: 'prose',
          heading: 'Baileys Integration (WhatsApp)',
          body: 'WhatsApp messaging via the Baileys library for direct outreach. Same templates work across both channels, ensuring consistent messaging whether the prospect prefers email or WhatsApp.',
        },
        {
          type: 'table',
          headers: [
            { label: '#', align: 'left' },
            { label: 'Template', align: 'left' },
            { label: 'Use Case', align: 'left' },
            { label: 'Channel', align: 'left' },
          ],
          rows: [
            [
              { value: '1', mono: true },
              { value: 'Cold Introduction', bold: true },
              { value: 'First touch after lead research' },
              { value: 'Email + WhatsApp' },
            ],
            [
              { value: '2', mono: true },
              { value: 'Product Catalogue', bold: true },
              { value: 'Share capabilities and product range' },
              { value: 'Email' },
            ],
            [
              { value: '3', mono: true },
              { value: 'Quote Follow-up', bold: true },
              { value: 'Nudge after quote sent, no response' },
              { value: 'Email + WhatsApp' },
            ],
            [
              { value: '4', mono: true },
              { value: 'Meeting Request', bold: true },
              { value: 'Schedule factory visit or call' },
              { value: 'Email + WhatsApp' },
            ],
            [
              { value: '5', mono: true },
              { value: 'Re-engagement', bold: true },
              { value: 'Revive dormant leads with new offers' },
              { value: 'Email + WhatsApp' },
            ],
            [
              { value: '6', mono: true },
              { value: 'Batch Campaign', bold: true },
              { value: 'Bulk outreach to filtered lead segments' },
              { value: 'Email' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Webhook Tracking',
          body: 'Every email sent through Resend fires delivery, open, and bounce webhooks back to the CRM. The activity log on each lead automatically updates, giving the sales team real-time visibility into outreach performance without leaving the platform.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 05  DATA MODEL
    // ─────────────────────────────────────────────────────────────
    {
      number: '05',
      eyebrow: 'Chapter 5',
      title: 'Data Model',
      blocks: [
        {
          type: 'prose',
          body: 'The Prisma schema defines four core models backed by a shared PostgreSQL instance. The outreach database handles all CRM data, with relationships between leads, contacts, activities, and scrape batches.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Model', align: 'left' },
            { label: 'Purpose', align: 'left' },
            { label: 'Key Fields', align: 'left' },
          ],
          rows: [
            [
              { value: 'Lead', bold: true },
              { value: 'Company-level prospect record' },
              { value: 'name, vertical, stage, source, icpScore', mono: true },
            ],
            [
              { value: 'Contact', bold: true },
              { value: 'Individual people at a lead company' },
              { value: 'name, email, phone, role, leadId', mono: true },
            ],
            [
              { value: 'Activity', bold: true },
              { value: 'Logged interactions and events' },
              { value: 'type, channel, note, leadId, contactId', mono: true },
            ],
            [
              { value: 'ScrapeBatch', bold: true },
              { value: 'Lead sourcing session metadata' },
              { value: 'source, query, count, scrapedAt', mono: true },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'purple',
          title: 'Lead Sourcing Workflow',
          body: 'Leads are sourced through Claude Code terminal sessions that scrape IndiaMART, Google, GeM, and LinkedIn. Each scraping run creates a ScrapeBatch record, linking the raw source data to the leads it produced for full traceability.',
        },
        {
          type: 'flow',
          title: 'Data relationships',
          rows: [
            [
              { label: 'Lead', tone: 'navy' },
              { label: '1:N', tone: 'light' },
              { label: 'Contact', tone: 'blue' },
            ],
            [
              { label: 'Lead', tone: 'navy' },
              { label: '1:N', tone: 'light' },
              { label: 'Activity', tone: 'purple' },
            ],
            [
              { label: 'ScrapeBatch', tone: 'gold' },
              { label: '1:N', tone: 'light' },
              { label: 'Lead', tone: 'navy' },
            ],
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 06  ARCHITECTURE
    // ─────────────────────────────────────────────────────────────
    {
      number: '06',
      eyebrow: 'Chapter 6',
      title: 'Architecture',
      blocks: [
        {
          type: 'prose',
          body: 'The system follows a classic server-rendered architecture — Express handles routing, Prisma manages the data layer, and EJS templates render the UI. No SPA complexity needed: the CRM is an internal tool where server-side rendering provides fast page loads and straightforward deployment.',
        },
        {
          type: 'flow',
          title: 'End-to-end architecture',
          rows: [
            [
              { label: 'Lead Sources (IndiaMART / Google / GeM / LinkedIn)', tone: 'navy' },
              { label: 'Scraping (Claude Code sessions)', tone: 'gold' },
              { label: 'PostgreSQL', tone: 'navy' },
              { label: 'Express API', tone: 'blue' },
              { label: 'EJS Templates', tone: 'light' },
            ],
          ],
        },
        {
          type: 'flow',
          title: 'Output channels',
          rows: [
            [
              { label: 'EJS Templates', tone: 'light' },
              { label: 'Puppeteer', tone: 'purple' },
              { label: 'PDF Quotes', tone: 'gold' },
            ],
            [
              { label: 'EJS Templates', tone: 'light' },
              { label: 'Resend', tone: 'cyan' },
              { label: 'Email', tone: 'blue' },
            ],
            [
              { label: 'EJS Templates', tone: 'light' },
              { label: 'Baileys', tone: 'green' },
              { label: 'WhatsApp', tone: 'green' },
            ],
          ],
        },
        {
          type: 'callout',
          title: 'Architecture Rationale',
          body: 'No React, no SPA, no client-side state management. This is an internal sales tool used by a small team — server-rendered EJS pages with full-page navigation are faster to build, easier to maintain, and deploy as a single process. The complexity budget was spent where it matters: the ICP scoring engine, rate-card pricing, PDF renderer, and multi-channel outreach integrations.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 07  TECH STACK
    // ─────────────────────────────────────────────────────────────
    {
      number: '07',
      eyebrow: 'Chapter 7',
      title: 'Tech Stack',
      blocks: [
        {
          type: 'prose',
          body: 'A deliberate choice of mature, well-documented tools optimised for a server-rendered internal CRM. Express 5 provides the routing layer, Prisma handles database access with type safety, and EJS keeps the view layer simple and fast.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Layer', align: 'left' },
            { label: 'Technology', align: 'left' },
            { label: 'Role', align: 'left' },
          ],
          rows: [
            [
              { value: 'Server', bold: true },
              { value: 'Express 5', mono: true },
              { value: 'HTTP routing, middleware, API endpoints' },
            ],
            [
              { value: 'Views', bold: true },
              { value: 'EJS', mono: true },
              { value: 'Server-side HTML templating' },
            ],
            [
              { value: 'ORM', bold: true },
              { value: 'Prisma', mono: true },
              { value: 'Type-safe database client and migrations' },
            ],
            [
              { value: 'Database', bold: true },
              { value: 'PostgreSQL', mono: true },
              { value: 'Shared instance, "outreach" database' },
            ],
            [
              { value: 'PDF', bold: true },
              { value: 'Puppeteer', mono: true },
              { value: 'Headless Chrome for pixel-perfect PDF rendering' },
            ],
            [
              { value: 'Email', bold: true },
              { value: 'Resend', mono: true },
              { value: 'Transactional and campaign email API' },
            ],
            [
              { value: 'WhatsApp', bold: true },
              { value: 'Baileys', mono: true },
              { value: 'WhatsApp Web API for direct messaging' },
            ],
            [
              { value: 'Auth', bold: true },
              { value: 'bcrypt', mono: true },
              { value: 'Password hashing for admin login' },
            ],
          ],
        },
        {
          type: 'tags',
          items: [
            { label: 'Express 5', tone: 'navy' },
            { label: 'EJS', tone: 'blue' },
            { label: 'Prisma', tone: 'purple' },
            { label: 'PostgreSQL', tone: 'green' },
            { label: 'Puppeteer', tone: 'gold' },
            { label: 'Resend', tone: 'cyan' },
            { label: 'Baileys', tone: 'green' },
            { label: 'bcrypt' },
            { label: 'Node.js' },
            { label: 'JavaScript' },
          ],
        },
      ],
    },
  ],
};
