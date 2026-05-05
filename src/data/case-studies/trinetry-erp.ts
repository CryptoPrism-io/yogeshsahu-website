import type { CaseStudyContent } from './types';

export const trinetryErp: CaseStudyContent = {
  slug: 'trinetry-erp',
  cluster: 'B',
  archetype: 'Solution Architect',
  oneLineTagline:
    'AI-native ERP/CRM for SME manufacturing and distribution — unified invoicing, inventory, and client outreach with autonomous AI agents that handle routine business decisions, escalating to humans only when confidence is low.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-trinetry-erp.html',

  leadershipLens: {
    call: 'Decided to build a purpose-fit, AI-native ERP rather than deploying any off-the-shelf solution, recognising that the real bottleneck for Trinetry\'s SME clients was not missing features but missing automation — 15+ hours a week lost to invoicing, 23% monthly stock-out rate, and 40% lead drop-off from inconsistent follow-ups that no existing SaaS product addressed with autonomous decision-making.',
    bet: 'Bet that embedding LangChain-orchestrated AI agents directly into the ERP core — rather than bolting on a chatbot — would allow routine business decisions (invoice approvals, reorder triggers, client follow-up sequences) to execute autonomously, with a configurable confidence threshold (0.85) that builds operator trust progressively over eight weeks.',
    tradeoff:
      'Accepted the complexity of maintaining an agent orchestration layer (LangChain, Celery task queue, Redis state) on top of a full-stack ERP, trading a simpler CRUD architecture for autonomous operations capability. This meant the system required more initial setup and operator onboarding than a conventional ERP, but eliminated the ongoing manual overhead that made simpler tools unviable at scale.',
    outcome:
      'Trinetry clients achieved a 70% reduction in time spent on routine decisions, 95% agent decision accuracy, and full AI autonomy within eight weeks of deployment. The platform consolidated five disconnected tools into one unified system with a shared data layer — an invoice automatically updating inventory, triggering CRM events, and feeding the AI agent decision engine.',
    coordinated:
      'Aligned with Trinetry\'s operations stakeholders on four distinct module scopes (Invoicing, Inventory, Client Outreach, CRM) and the phased autonomy model — starting with AI suggestions in week one, moving to autonomous routine decisions with daily human review by week four, and full exception-only human oversight by week eight. Defined agent confidence thresholds collaboratively with the client to ensure trust was built before each escalation of autonomy.',
    nextStep:
      'Extend the agent layer with multi-agent coordination for cross-module decisions (e.g. a single stock-out event triggering both a reorder agent and a client outreach agent to proactively communicate delivery delays); add GST e-invoicing (IRP/IRN) integration for invoices above the threshold; introduce a natural-language query interface so operators can interrogate business data without navigating the full UI.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  BUSINESS PROBLEM
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'The Business Problem: Fragmented Operations in SME Manufacturing',
      blocks: [
        {
          type: 'prose',
          body: 'SME manufacturing and distribution companies in India struggle with disconnected systems — invoicing in one tool, inventory in another, client outreach entirely manual. Data lives in silos, decisions are delayed, and operational overhead compounds as the business scales.',
        },
        {
          type: 'prose',
          body: 'The need was a unified platform that not only consolidated operations but also automated repetitive decisions using AI agents — reducing human bottlenecks while maintaining compliance with Indian regulatory requirements (GST, multi-branch reporting, regional norms).',
        },
        {
          type: 'callout',
          tone: 'red',
          title: 'Pain Points',
          body: 'Manual invoice creation (2–3 hrs/day) · Stock-outs from delayed reorder decisions · Lost leads from inconsistent follow-ups · Zero visibility across branches · Five disconnected tools with no shared data layer.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Manual Hours',
              value: '15+',
              sub: 'hrs/week on invoicing',
              tone: 'red',
            },
            {
              label: 'Stock-outs',
              value: '23%',
              sub: 'monthly occurrence',
              tone: 'gold',
            },
            {
              label: 'Lead Drop-off',
              value: '40%',
              sub: 'due to no follow-up',
              tone: 'blue',
            },
            {
              label: 'Systems Used',
              value: '5+',
              sub: 'disconnected tools',
              tone: 'purple',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  PLATFORM MODULES
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: 'Platform Modules',
      blocks: [
        {
          type: 'prose',
          body: 'Trinetry consolidates four core operational pillars into a single unified system, each module designed for Indian SME workflows from the ground up. All modules share a unified data layer so that events in one module automatically propagate to others.',
        },
        {
          type: 'prose',
          heading: 'Module A — Invoicing',
          body: 'Automated invoice generation with full GST compliance (CGST, SGST, IGST). Payment tracking, recurring invoices, multi-currency support, and automated reminders for overdue payments.',
        },
        {
          type: 'prose',
          heading: 'Module B — Inventory Management',
          body: 'Real-time stock levels across warehouses and branches. Intelligent reorder points, supplier management, batch tracking, and consumption pattern analysis for demand forecasting.',
        },
        {
          type: 'prose',
          heading: 'Module C — Client Outreach',
          body: 'Automated follow-up sequences triggered by client behaviour. Proposal generation from templates, lead nurturing workflows, and multi-channel communication (email, WhatsApp, SMS).',
        },
        {
          type: 'prose',
          heading: 'Module D — CRM',
          body: 'Complete customer lifecycle management from initial lead capture to repeat purchase. Deal pipeline visualisation, customer segmentation, and relationship health scoring.',
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Design Principle',
          body: 'Each module works standalone but shares a unified data layer — an invoice automatically updates inventory, triggers CRM events, and feeds the AI agent decision engine.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  AGENTIC AI WORKFLOWS
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'Agentic AI Workflows',
      blocks: [
        {
          type: 'prose',
          body: 'The defining feature of Trinetry: AI agents that autonomously handle routine business decisions, escalating to humans only when confidence is low or stakes are high. This is not a chatbot bolted on — agents are wired directly into the business event loop.',
        },
        {
          type: 'prose',
          heading: 'Agent 1 — Invoice Processing',
          body: 'Automatically categorises incoming invoices, matches them to purchase orders, flags discrepancies, and routes for approval. High-confidence matches (≥0.85) are auto-approved and the invoice is generated without human input.',
        },
        {
          type: 'prose',
          heading: 'Agent 2 — Smart Reorder',
          body: 'Analyses consumption patterns, seasonal trends, and supplier lead times to generate reorder suggestions before stock-outs occur. Evaluates multiple suppliers on price and lead time before placing orders autonomously.',
        },
        {
          type: 'prose',
          heading: 'Agent 3 — Client Follow-up',
          body: 'Sequences automated outreach based on client engagement signals — proposal views, email opens, purchase history gaps. Selects the right message template and channel (email, WhatsApp, SMS) based on client behaviour.',
        },
        {
          type: 'callout',
          tone: 'purple',
          title: 'Confidence Thresholds',
          body: 'Each agent operates with a configurable confidence threshold (default 0.85). High-confidence decisions execute autonomously; low-confidence ones surface to the dashboard for human review — building trust progressively over eight weeks.',
        },
        {
          type: 'flow',
          title: 'Agentic Workflow Pipeline',
          rows: [
            [
              { label: 'Business Event', tone: 'navy' },
              { label: 'AI Agent', tone: 'purple' },
              { label: 'Decision', tone: 'gold' },
              { label: 'Action', tone: 'green' },
            ],
          ],
        },
        {
          type: 'stats',
          cols: 3,
          items: [
            {
              label: 'Time Saved',
              value: '70%',
              sub: 'on routine decisions',
              tone: 'green',
            },
            {
              label: 'Accuracy',
              value: '95%',
              sub: 'agent decision accuracy',
              tone: 'blue',
            },
            {
              label: 'Adoption',
              value: '8 wks',
              sub: 'to full autonomy',
              tone: 'purple',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  ARCHITECTURE
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'System Architecture',
      blocks: [
        {
          type: 'prose',
          body: 'A layered architecture separating business logic, AI orchestration, and data persistence — designed for incremental automation adoption. The system starts fully manual and enables AI autonomy module by module.',
        },
        {
          type: 'flow',
          title: 'Architecture Layers',
          rows: [
            [
              { label: 'React Frontend', tone: 'blue' },
              { label: 'Python API', tone: 'navy' },
              { label: 'Agent Orchestrator', tone: 'purple' },
              { label: 'PostgreSQL', tone: 'green' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Frontend — React Dashboard',
          body: 'TypeScript React application with real-time dashboards, management UI for all four modules, and an agent monitoring panel showing autonomous decisions and their outcomes. Operators can see every action the agent took and why.',
        },
        {
          type: 'prose',
          heading: 'Backend — Python FastAPI',
          body: 'FastAPI-based backend handling business logic, authentication, and serving as the bridge between the UI and the AI agent layer. RESTful endpoints for all CRUD operations. Celery handles async agent tasks and background processing.',
        },
        {
          type: 'prose',
          heading: 'AI Layer — Agent Orchestrator',
          body: 'LangChain-based agent framework that coordinates autonomous workflows. Each agent has defined tools, memory, and decision boundaries. Supports chain-of-thought reasoning for complex decisions. Confidence scores determine autonomous vs. human-reviewed execution.',
        },
        {
          type: 'prose',
          heading: 'Data — PostgreSQL + Redis',
          body: 'Relational database for all business data — invoices, inventory, CRM records, and agent decision logs. Full audit trail of every autonomous action taken. Redis handles session management and real-time state for the agent layer.',
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'Agent Decision Schema',
          body: 'event = business_trigger(source, payload, timestamp) → agent.gather(context, history, rules) → agent.reason(confidence_threshold=0.85) → if confidence ≥ 0.85: execute autonomously, else: escalate to human dashboard.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 05  DIFFERENTIATORS
    // ─────────────────────────────────────────────────────────────
    {
      number: '05',
      eyebrow: 'Chapter 5',
      title: 'What Sets This Apart',
      blocks: [
        {
          type: 'prose',
          body: 'Trinetry is not another CRUD application with a chatbot bolted on. It represents a fundamentally different approach to SME business software — one where AI agents are first-class participants in the business process, not optional add-ons.',
        },
        {
          type: 'prose',
          heading: 'Beyond CRUD',
          body: 'AI agents make decisions autonomously — not just responding to queries, but proactively taking action on business events without human intervention. The system moves from a tool operators use to a system that operates alongside them.',
        },
        {
          type: 'prose',
          heading: 'Indian SME Native',
          body: 'Built for Indian workflows: GST compliance (CGST/SGST/IGST), multi-branch operations, regional language support, and compliance with local regulations out of the box. Not adapted from a global product.',
        },
        {
          type: 'prose',
          heading: 'Progressive Automation',
          body: 'Start fully manual, add AI incrementally. Each agent can be enabled or disabled per module. Week 1: AI suggests, human approves. Week 4: AI executes routine decisions, human reviews daily summary. Week 8: AI operates autonomously within defined boundaries, human handles exceptions only.',
        },
        {
          type: 'callout',
          title: 'Progressive Trust Model',
          body: 'The eight-week trust ramp is a deliberate design choice, not a limitation. Operators who have watched the agent make correct decisions for four weeks are far more comfortable granting autonomy than those who flip a switch on day one.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 06  TECH STACK
    // ─────────────────────────────────────────────────────────────
    {
      number: '06',
      eyebrow: 'Chapter 6',
      title: 'Technology Stack',
      blocks: [
        {
          type: 'prose',
          body: 'A modern, production-ready stack chosen for reliability, developer velocity, and AI-native capabilities. Every layer has a defined role in the autonomous decision pipeline.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Layer', align: 'left' },
            { label: 'Technology', align: 'left' },
            { label: 'Purpose', align: 'left' },
          ],
          rows: [
            [
              { value: 'Frontend', bold: true },
              { value: 'React + TypeScript', mono: true },
              { value: 'Dashboard, management UI, agent monitoring panel' },
            ],
            [
              { value: 'Backend', bold: true },
              { value: 'Python + FastAPI', mono: true },
              { value: 'Business logic, REST API, authentication' },
            ],
            [
              { value: 'AI / Agents', bold: true },
              { value: 'LangChain + GPT-4', mono: true },
              { value: 'Agent orchestration, reasoning, tool use' },
            ],
            [
              { value: 'Database', bold: true },
              { value: 'PostgreSQL', mono: true },
              { value: 'Business data, audit logs, agent memory' },
            ],
            [
              { value: 'Cache', bold: true },
              { value: 'Redis', mono: true },
              { value: 'Session management, real-time agent state' },
            ],
            [
              { value: 'Queue', bold: true },
              { value: 'Celery', mono: true },
              { value: 'Async agent tasks, background processing' },
            ],
          ],
        },
        {
          type: 'tags',
          items: [
            { label: 'Python', tone: 'navy' },
            { label: 'React', tone: 'blue' },
            { label: 'TypeScript', tone: 'blue' },
            { label: 'PostgreSQL', tone: 'green' },
            { label: 'LangChain', tone: 'purple' },
            { label: 'AI Agents', tone: 'purple' },
            { label: 'FastAPI', tone: 'gold' },
            { label: 'Redis', tone: 'cyan' },
            { label: 'Celery' },
            { label: 'GPT-4' },
          ],
        },
      ],
    },
  ],
};
