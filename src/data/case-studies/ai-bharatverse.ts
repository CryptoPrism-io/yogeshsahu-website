import type { CaseStudyContent } from './types';

export const aiBharatverse: CaseStudyContent = {
  slug: 'ai-bharatverse',
  cluster: 'C',
  archetype: 'Product Visionary',
  oneLineTagline:
    'Interactive AI-powered platform for exploring the history of India — built for Times of India as a 6-month fractional engagement with RAG-grounded LLM responses and zero tolerance for historical hallucination.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-ai-bharatverse.html',

  leadershipLens: {
    call: 'When Times of India approached with the brief — make Indian history engaging for younger audiences through AI — the real decision was not which LLM to call, but whether to treat this as a content-curation product (editorialised articles, curated timelines, static Q&A) or as a genuine AI platform where users could explore any thread of Indian history conversationally. Chose the platform approach: a LangChain-powered conversational AI with RAG over verified historical sources, accepting the harder engineering problem of hallucination prevention in exchange for the step-change in user experience that open-ended exploration enables.',
    bet: 'Bet that retrieval-augmented generation — pairing LLM generation with a grounded historical knowledge base — could meet a zero-tolerance accuracy bar in a branded editorial environment, while still delivering the fluid, conversational experience TOI needed to capture younger audiences. The alternative (manual content curation at scale) would have required a permanent editorial team and could never match the breadth of questions a curious user might ask.',
    tradeoff:
      'Accepted a fundamentally more complex validation pipeline — every LLM output passes through a factual verification layer before surfacing — in exchange for genuinely open-ended exploration. Traded the simplicity of a curated content library for the breadth that only a live AI system can provide. Also accepted a harder stakeholder management problem: the TOI editorial team, product team, and subject matter experts all had legitimate opinions on accuracy, tone, and cultural sensitivity, requiring a multi-layer content review process embedded into the delivery cadence from Month 1.',
    outcome:
      'Delivered end-to-end in 6 months across research, architecture, implementation, testing, and handover. The platform allows users to ask questions about any period, event, or figure in Indian history and receive rich, contextually accurate responses — with conversation state maintained across sessions. Production infrastructure designed for horizontal scaling across LLM endpoints with intelligent caching, capable of handling concurrent load on one of India\'s largest media platforms. Full handover to TOI engineering team with documentation, CI/CD, and monitoring in place.',
    coordinated:
      'The most stakeholder-intensive engagement in the consumer portfolio. Coordinated across TOI editorial (accuracy standards, cultural guardrails, historical source selection), TOI product (UX direction, audience targeting, feature scope), TOI engineering (infrastructure integration, handover requirements), and subject matter experts (content accuracy review in Month 4–5). Sprint demos provided the regular alignment checkpoint — each demo locked feature scope for the next sprint and surfaced editorial feedback early enough to feed back into the RAG source layer rather than requiring post-hoc corrections.',
    nextStep:
      'Extend the knowledge base beyond the initial historical source set to cover regional histories and vernacular sources, unlocking a deeper second tier of Indian history that national-level content often misses. Introduce a personalisation layer — tracking which periods and themes a user explores — to surface proactive "you might be interested in" threads. Consider a Bharat-language expansion (Hindi, Tamil, Bengali) to reach the next 500 million users who engage with TOI in their mother tongue rather than English.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  CLIENT BRIEF
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'The Challenge',
      blocks: [
        {
          type: 'prose',
          body: 'Times of India — one of India\'s largest media conglomerates — wanted an interactive platform that lets users explore Indian history through AI-powered conversations and content generation. The goal: make history engaging for younger audiences through modern AI interactions.',
        },
        {
          type: 'callout',
          title: 'Client Vision',
          body: 'Create a platform where users can ask questions about any period of Indian history and receive rich, contextually accurate, and engaging responses powered by large language models — transforming passive content consumption into active exploration.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Engagement',
              value: '6mo',
              sub: 'Fractional delivery',
              tone: 'gold',
            },
            {
              label: 'Client',
              value: 'TOI',
              sub: 'Times of India',
              tone: 'blue',
            },
            {
              label: 'Model',
              value: 'Agile',
              sub: 'Sprint-based delivery',
              tone: 'purple',
            },
            {
              label: 'Scope',
              value: 'Full',
              sub: 'End-to-end build',
              tone: 'green',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  AI ARCHITECTURE
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: 'System Design',
      blocks: [
        {
          type: 'prose',
          body: 'The platform architecture was designed around a LangChain-powered pipeline that ensures historically accurate, engaging content generation while maintaining real-time responsiveness for interactive exploration.',
        },
        {
          type: 'prose',
          heading: 'LLM Engine — Content Generation',
          body: 'LLM-driven content generation tuned for historical accuracy and engaging narrative style. Context-aware responses that maintain factual integrity while being accessible to younger audiences.',
        },
        {
          type: 'prose',
          heading: 'Conversational Layer — Interactive Exploration',
          body: 'Conversational exploration system allowing users to ask questions about any period, event, or figure in Indian history — with follow-up context maintained across sessions.',
        },
        {
          type: 'prose',
          heading: 'React Interactive UI',
          body: 'React-based frontend delivering rich, interactive responses with timelines, maps, and multimedia content woven into the AI-generated narratives.',
        },
        {
          type: 'prose',
          heading: 'Python AI Orchestration',
          body: 'Python backend orchestrating LangChain pipelines, managing conversation state, handling content retrieval, and coordinating between multiple AI services.',
        },
        {
          type: 'flow',
          title: 'AI Pipeline Architecture',
          rows: [
            [
              { label: 'User Query', tone: 'navy' },
              { label: 'LangChain Pipeline', tone: 'blue' },
              { label: 'LLM (Context-Aware)', tone: 'purple' },
              { label: 'Rich Response', tone: 'green' },
              { label: 'Interactive UI', tone: 'gold' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'Architecture Principle',
          body: 'Every response passes through a factual verification layer before reaching the user — combining retrieval-augmented generation (RAG) with editorial guardrails to prevent hallucination of historical facts.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  DELIVERY MODEL
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'Engagement Model',
      blocks: [
        {
          type: 'prose',
          body: 'The project was delivered as a 6-month fractional engagement, structured around agile sprints with regular client demos and collaborative iteration on content accuracy and editorial tone.',
        },
        {
          type: 'prose',
          heading: 'Month 1 — Research & Discovery',
          body: 'Historical content audit, LLM evaluation, architecture design, and alignment on editorial guidelines with TOI content team.',
        },
        {
          type: 'prose',
          heading: 'Month 2 — Architecture & Foundation',
          body: 'LangChain pipeline implementation, RAG system setup, Python backend scaffolding, and React UI framework.',
        },
        {
          type: 'prose',
          heading: 'Month 3–4 — Core Implementation',
          body: 'Full-stack development — conversational AI features, interactive UI components, content generation pipelines, and accuracy validation systems.',
        },
        {
          type: 'prose',
          heading: 'Month 5 — Testing & Refinement',
          body: 'Content accuracy testing with subject matter experts, performance optimization for real-time responses, and editorial review cycles.',
        },
        {
          type: 'prose',
          heading: 'Month 6 — Deployment & Launch',
          body: 'Production deployment, load testing, monitoring setup, and handover documentation for TOI engineering team.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Area', align: 'left' },
            { label: 'Responsibility', align: 'left' },
            { label: 'Collaboration', align: 'left' },
          ],
          rows: [
            [
              { value: 'Research', bold: true },
              { value: 'LLM evaluation, architecture patterns, historical data sources' },
              { value: 'TOI editorial team' },
            ],
            [
              { value: 'Architecture', bold: true },
              { value: 'System design, AI pipeline, infrastructure planning' },
              { value: 'TOI engineering' },
            ],
            [
              { value: 'Implementation', bold: true },
              { value: 'Full-stack development, LangChain pipelines, React UI' },
              { value: 'Sprint demos' },
            ],
            [
              { value: 'Deployment', bold: true },
              { value: 'Cloud infrastructure, CI/CD, monitoring, handover' },
              { value: 'TOI DevOps' },
            ],
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  KEY CHALLENGES
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'Problems Solved',
      blocks: [
        {
          type: 'prose',
          body: 'Building an AI-powered historical content platform for a major media company required solving several critical challenges at the intersection of AI accuracy, cultural sensitivity, and production-scale performance.',
        },
        {
          type: 'prose',
          heading: 'Challenge 01 — Historical Accuracy',
          body: 'AI must not hallucinate facts. Implemented retrieval-augmented generation with verified historical sources and multi-layer fact-checking pipelines to ensure every generated response is grounded in documented history.',
        },
        {
          type: 'prose',
          heading: 'Challenge 02 — Cultural Sensitivity',
          body: 'Content must respect diverse perspectives across India\'s complex history. Built editorial guardrails and content review systems that ensure balanced, respectful treatment of sensitive historical topics.',
        },
        {
          type: 'prose',
          heading: 'Challenge 03 — Real-Time Performance',
          body: 'Interactive exploration requires fast LLM responses. Optimized pipeline with caching strategies, streaming responses, and intelligent pre-computation to deliver sub-second initial response times.',
        },
        {
          type: 'prose',
          heading: 'Challenge 04 — Scale for Media Platform',
          body: 'Handling concurrent users on one of India\'s largest media platforms. Designed horizontal scaling architecture with intelligent load distribution across LLM endpoints and response caching layers.',
        },
        {
          type: 'callout',
          tone: 'red',
          title: 'Critical Constraint',
          body: 'Unlike typical chatbots where occasional inaccuracy is acceptable, a historical education platform published under the Times of India brand demands zero tolerance for factual errors — requiring a fundamentally different approach to LLM output validation.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 05  CAPABILITIES PROVEN
    // ─────────────────────────────────────────────────────────────
    {
      number: '05',
      eyebrow: 'Chapter 5',
      title: 'Capabilities Proven',
      blocks: [
        {
          type: 'prose',
          body: 'The AI Bharatverse project demonstrates a comprehensive set of capabilities spanning enterprise delivery, AI product development, and full-stack engineering.',
        },
        {
          type: 'prose',
          heading: 'Enterprise Client Delivery',
          body: 'Successful delivery for Times of India — one of India\'s largest media conglomerates — with structured engagement, regular stakeholder communication, and production-grade output.',
        },
        {
          type: 'prose',
          heading: 'AI/LLM Product Development',
          body: 'End-to-end AI product development from architecture through deployment — LangChain pipelines, RAG systems, prompt engineering, and output validation at scale.',
        },
        {
          type: 'prose',
          heading: 'Generative AI Quality at Scale',
          body: 'Solving the hardest problem in generative AI — content accuracy — with multi-layer verification systems that prevent hallucination in a zero-tolerance editorial environment.',
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Full-Stack Implementation',
          body: 'Complete ownership across the stack: React frontend for interactive experiences, Python backend for AI orchestration, LangChain for LLM pipeline management, and cloud infrastructure for production deployment — all delivered as a single integrated product.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 06  TECH STACK
    // ─────────────────────────────────────────────────────────────
    {
      number: '06',
      eyebrow: 'Chapter 6',
      title: 'Technologies Used',
      blocks: [
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Frontend',
              value: 'React',
              sub: 'Interactive UI',
              tone: 'blue',
            },
            {
              label: 'AI Framework',
              value: 'LangChain',
              sub: 'LLM orchestration',
              tone: 'purple',
            },
            {
              label: 'Backend',
              value: 'Python',
              sub: 'AI orchestration',
              tone: 'green',
            },
            {
              label: 'Method',
              value: 'RAG',
              sub: 'Grounded generation',
              tone: 'gold',
            },
          ],
        },
        {
          type: 'tags',
          items: [
            { label: 'React', tone: 'blue' },
            { label: 'TypeScript', tone: 'blue' },
            { label: 'Python', tone: 'green' },
            { label: 'LangChain', tone: 'purple' },
            { label: 'AI/LLM', tone: 'purple' },
            { label: 'RAG', tone: 'gold' },
            { label: 'Prompt Engineering' },
            { label: 'Cloud Infrastructure', tone: 'cyan' },
            { label: 'Vector DB' },
            { label: 'Streaming Responses' },
          ],
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
              { value: 'React, TypeScript', mono: true },
              { value: 'Interactive UI, rich content rendering' },
            ],
            [
              { value: 'AI Framework', bold: true },
              { value: 'LangChain', mono: true },
              { value: 'LLM orchestration, chain management, RAG' },
            ],
            [
              { value: 'Backend', bold: true },
              { value: 'Python', mono: true },
              { value: 'API layer, AI pipeline coordination' },
            ],
            [
              { value: 'AI/LLM', bold: true },
              { value: 'Large Language Models', mono: true },
              { value: 'Content generation, conversational AI' },
            ],
            [
              { value: 'Infrastructure', bold: true },
              { value: 'Cloud (scalable)', mono: true },
              { value: 'Production hosting, auto-scaling, monitoring' },
            ],
            [
              { value: 'Data', bold: true },
              { value: 'Vector DB, Document Store', mono: true },
              { value: 'Historical knowledge base, retrieval layer' },
            ],
          ],
        },
      ],
    },
  ],
};
