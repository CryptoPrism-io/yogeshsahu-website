import type { CaseStudyContent } from './types';

export const pggErp: CaseStudyContent = {
  slug: 'pgg-erp',
  cluster: 'B',
  archetype: 'Solution Architect',
  oneLineTagline:
    'GST-compliant invoicing and operations ERP for an Indian manufacturing business — custom-built on Express + Prisma + PostgreSQL where off-the-shelf tools (Tally, Zoho) were too heavyweight or insufficiently customisable.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-pgg-erp.html',

  leadershipLens: {
    call: 'Chose to build a purpose-fit, server-rendered ERP over adopting an off-the-shelf solution (Tally, SAP B1, Zoho Books), recognising that for a lean manufacturing operation with specific GST-bifurcation requirements and a single operator, a custom tool would be faster to use, cheaper to run, and easier to maintain than any SaaS subscription that forces an over-engineered workflow.',
    bet: 'Bet that a no-SPA, no-build-step architecture (Express + EJS + Prisma) would be faster to ship, easier for a non-technical operator to use, and robust enough for daily production invoicing — accepting that it would never have the feature breadth of commercial ERP software.',
    tradeoff:
      'Sacrificed multi-user access, role-based permissions, and a polished consumer UI (single master-password auth, no roles, plain CSS) in exchange for a system that fits on a Cloud Run container, scales to zero, and can be fully understood and modified by one engineer.',
    outcome:
      'Pune Global Group gained a production-ready invoicing system covering the full operations cycle — outgoing sales invoices with auto-numbered GST-compliant PDFs, purchase recording, and both receivables and payables tracking — replacing a manual or ad-hoc process and eliminating the risk of incorrect tax bifurcation that could trigger GST notices.',
    coordinated:
      'Aligned with the Pune Global Group operations team on GST compliance requirements (CGST/SGST vs IGST split rules, HSN codes per product line, Indian financial-year invoice numbering reset on April 1) and the business configuration (single GSTIN, state code for intra/inter-state determination). Scoped the system to a single-operator internal tool so that no training programme or multi-seat rollout was required, which was the key sign-off condition from the client side.',
    nextStep:
      'Add a dashboard with receivables/payables ageing summary and monthly GST liability report; extend purchase module with a goods-received note workflow; explore an e-invoicing (IRP/IRN) integration to automate GSTN submission for invoices above the e-invoice threshold.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  BUSINESS PROBLEM
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'The Business Problem: GST Compliance for a Lean Operation',
      blocks: [
        {
          type: 'prose',
          body: 'Pune Global Group operates as a general trading and retail business in India. The core operational need was a local-first invoicing system that handles Indian GST compliance correctly — CGST/SGST for intra-state transactions and IGST for inter-state ones — while also managing suppliers, purchase tracking, and payment receivables/payables.',
        },
        {
          type: 'prose',
          body: 'Off-the-shelf tools like Tally or Zoho are either too heavyweight, too expensive for the volume, or lack the customisation needed for a lean manufacturing operation. The requirement was a fast, server-rendered tool that a single operator can use without training, deployed to the cloud but functional even on a local network.',
        },
        {
          type: 'callout',
          tone: 'red',
          title: 'Compliance Constraint',
          body: 'Indian GST law mandates correct tax bifurcation: intra-state sales must split GST into equal CGST + SGST halves, while inter-state sales must charge the full rate as IGST. Getting this wrong results in tax notices and penalties.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Modules',
              value: '7',
              sub: 'End-to-end operations',
              tone: 'gold',
            },
            {
              label: 'Prisma Models',
              value: '9',
              sub: 'Fully relational',
              tone: 'green',
            },
            {
              label: 'GST Rates',
              value: '5+',
              sub: 'Per line item',
              tone: 'blue',
            },
            {
              label: 'PDF Engine',
              value: 'A4',
              sub: 'Pixel-perfect invoices',
              tone: 'purple',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  MODULE BREAKDOWN
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: 'Module Breakdown',
      blocks: [
        {
          type: 'prose',
          body: 'The ERP is organised into six tightly integrated modules, each handling a distinct part of the business workflow. All modules share a common product catalog and GST engine.',
        },
        {
          type: 'prose',
          heading: 'Module A — Customers & Suppliers',
          body: 'Full CRUD for buyers and vendors. Stores GSTIN, state code, business name, phone, and address. State is used to auto-determine GST type (intra vs inter-state).',
        },
        {
          type: 'prose',
          heading: 'Module B — Products',
          body: 'Shared catalog used in both sales and purchases. Each product stores name, HSN code, unit, GST rate, and base price — single source of truth across all transactions.',
        },
        {
          type: 'prose',
          heading: 'Module C — Sales (Invoicing)',
          body: 'Create outgoing invoices with dynamic line items. Auto-numbering (INV-2526-001), automatic GST calculation, customer dropdown, and notes field. PDF download on detail page.',
        },
        {
          type: 'prose',
          heading: 'Module D — Purchases',
          body: 'Record incoming invoices from suppliers (PUR-2526-001). Tracks vendor\'s own invoice reference. Same dynamic line items and GST engine as sales, but on the payables side.',
        },
        {
          type: 'prose',
          heading: 'Module E — Payments (Receivables)',
          body: 'Track money owed by customers. Lists all sales with outstanding balances. Record partial or full payments against specific invoices with method and notes.',
        },
        {
          type: 'prose',
          heading: 'Module F — Payments Out (Payables)',
          body: 'Track money owed to suppliers. Lists all purchases with outstanding balances. Record payments to vendors with method tracking (cash, NEFT, UPI).',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  GST ENGINE
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'GST Engine',
      blocks: [
        {
          type: 'prose',
          body: 'The GST calculation logic is the heart of the system. A single shared service (src/services/gst.js) handles tax computation for both sales and purchases, ensuring consistent behaviour across the application.',
        },
        {
          type: 'prose',
          heading: 'Tax Determination Logic',
          body: 'determineGstType(businessState, counterpartyState)\n  // If business state === customer/supplier state\n  → "CGST_SGST" (split rate equally into CGST + SGST)\n  // If business state !== customer/supplier state\n  → "IGST" (full rate goes to IGST column)',
        },
        {
          type: 'prose',
          heading: 'Line Item Computation',
          body: 'computeLineItem(qty, unitPrice, gstRate, gstType)\n  taxableAmount = qty * unitPrice\n  // If CGST_SGST:\n    cgst = taxableAmount * (gstRate / 2) / 100\n    sgst = taxableAmount * (gstRate / 2) / 100\n    igst = 0\n  // If IGST:\n    cgst = 0\n    sgst = 0\n    igst = taxableAmount * gstRate / 100\n  lineTotal = taxableAmount + cgst + sgst + igst',
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Decimal.js — No Float Math',
          body: 'All monetary calculations use Decimal.js to avoid floating-point rounding errors. Native JS floats are never used for money. This prevents the classic 0.1 + 0.2 !== 0.3 problem in financial software.',
        },
        {
          type: 'stats',
          cols: 3,
          items: [
            {
              label: 'Intra-State',
              value: 'CGST+SGST',
              sub: 'Equal split of GST rate',
              tone: 'green',
            },
            {
              label: 'Inter-State',
              value: 'IGST',
              sub: 'Full rate, single column',
              tone: 'blue',
            },
            {
              label: 'Rates Supported',
              value: 'Any %',
              sub: 'Per product, per line',
              tone: 'gold',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  PDF GENERATION
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'PDF Generation',
      blocks: [
        {
          type: 'prose',
          body: 'Every sales invoice can be downloaded as a pixel-perfect A4 PDF, generated server-side using Puppeteer (headless Chromium). The PDF template is a dedicated EJS file (views/invoice-pdf.ejs) with no navigation chrome — purely formatted for print.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Section', align: 'left' },
            { label: 'Content', align: 'left' },
          ],
          rows: [
            [
              { value: 'Header (Left)', bold: true },
              { value: 'Business name, address, GSTIN, phone' },
            ],
            [
              { value: 'Header (Center)', bold: true },
              { value: '"TAX INVOICE" heading (bold)' },
            ],
            [
              { value: 'Header (Right)', bold: true },
              { value: 'Invoice No (INV-2526-XXX) + Date' },
            ],
            [
              { value: 'Bill To', bold: true },
              { value: 'Customer name, address, GSTIN, state' },
            ],
            [
              { value: 'Line Items', bold: true },
              { value: 'Sr | Description | HSN | Unit | Qty | Rate | Taxable | CGST% | CGST | SGST% | SGST | IGST% | IGST | Total' },
            ],
            [
              { value: 'Totals', bold: true },
              { value: 'Subtotal | Total CGST | Total SGST | Total IGST | Grand Total' },
            ],
            [
              { value: 'Footer', bold: true },
              { value: 'Amount in words (Indian system) + Notes + "Computer generated invoice"' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'Cloud Run Safe Config',
          body: 'Puppeteer launches with --no-sandbox and --disable-setuid-sandbox flags. The executable path is configurable via PUPPETEER_EXECUTABLE_PATH env var for containerised deployments.',
        },
        {
          type: 'flow',
          title: 'PDF Generation Flow',
          rows: [
            [
              { label: 'GET /sales/:id/pdf', tone: 'navy' },
              { label: 'Load Sale + Items', tone: 'blue' },
              { label: 'Render invoice-pdf.ejs', tone: 'green' },
              { label: 'Puppeteer HTML→PDF', tone: 'purple' },
              { label: 'Download A4 PDF', tone: 'gold' },
            ],
          ],
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
          body: 'The system uses 9 Prisma models backed by PostgreSQL 15. The schema enforces referential integrity through foreign keys and supports auto-incrementing invoice numbers per financial year via atomic DB transactions.',
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
              { value: 'Business', bold: true },
              { value: 'Single-row company config' },
              { value: 'name, gstin, state, address, phone', mono: true },
            ],
            [
              { value: 'Customer', bold: true },
              { value: 'Buyers (linked to Sales)' },
              { value: 'name, gstin, state, phone, address', mono: true },
            ],
            [
              { value: 'Supplier', bold: true },
              { value: 'Vendors (linked to Purchases)' },
              { value: 'name, gstin, state, phone, address', mono: true },
            ],
            [
              { value: 'Product', bold: true },
              { value: 'Shared catalog (Sales + Purchases)' },
              { value: 'name, hsn, unit, gstRate, basePrice', mono: true },
            ],
            [
              { value: 'Sale', bold: true },
              { value: 'Outgoing invoice' },
              { value: 'invoiceNo, date, customerId, gstType, grandTotal', mono: true },
            ],
            [
              { value: 'SaleItem', bold: true },
              { value: 'Line items on a sale' },
              { value: 'saleId, productId, qty, unitPrice, cgst, sgst, igst', mono: true },
            ],
            [
              { value: 'Purchase', bold: true },
              { value: 'Incoming invoice from supplier' },
              { value: 'purchaseNo, date, supplierId, gstType, grandTotal', mono: true },
            ],
            [
              { value: 'PurchaseItem', bold: true },
              { value: 'Line items on a purchase' },
              { value: 'purchaseId, productId, qty, unitPrice, cgst, sgst, igst', mono: true },
            ],
            [
              { value: 'Payment', bold: true },
              { value: 'Receivables (money from customers)' },
              { value: 'saleId, amount, method, date, notes', mono: true },
            ],
            [
              { value: 'PaymentOut', bold: true },
              { value: 'Payables (money to suppliers)' },
              { value: 'purchaseId, amount, method, date, notes', mono: true },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Invoice Number Generation',
          body: 'Sales:     INV-YYXX-NNN  (e.g. INV-2526-001)\nPurchases: PUR-YYXX-NNN  (e.g. PUR-2526-001)\n\n// YY = FY start year (25 for 2025-26)\n// XX = FY end year   (26 for 2025-26)\n// NNN = zero-padded sequential, resets each April 1\n// Both sequences are independent — atomic DB transaction',
        },
        {
          type: 'callout',
          title: 'Key Relationships',
          body: 'Sale → Customer (many-to-one), SaleItem → Product, Payment → Sale. Purchase → Supplier (many-to-one), PurchaseItem → Product, PaymentOut → Purchase. Product is shared across both sales and purchases.',
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
          body: 'The system is intentionally simple: a pure server-rendered architecture with no SPA framework, no build step, and no client-side routing. This makes it fast to develop, easy to debug, and trivial to deploy.',
        },
        {
          type: 'flow',
          title: 'Request Flow',
          rows: [
            [
              { label: 'Browser', tone: 'navy' },
              { label: 'Express (EJS)', tone: 'blue' },
              { label: 'Prisma ORM', tone: 'green' },
              { label: 'PostgreSQL (Cloud SQL)', tone: 'purple' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Authentication',
          body: 'Single master password stored as a bcrypt hash in environment variables. Session-based authentication using express-session with connect-pg-simple for session storage in PostgreSQL. No multi-user, no roles — this is an internal tool for one operator.',
        },
        {
          type: 'prose',
          heading: 'Design Decisions',
          body: 'NO SPA — Pure server-rendered HTML via EJS. No React, no Vue, no build step. Pages load instantly, forms work without JavaScript (progressive enhancement for dynamic line items only).\n\nSTORED TOTALS — All GST amounts and grand totals are computed on POST and stored in the database. Views never recompute — they display what was stored. This prevents drift and ensures PDF accuracy.\n\nATOMIC INVOICE NUMBERS — Invoice and purchase numbers are generated inside a DB transaction to prevent duplicates under concurrent access. The sequence resets each financial year (April 1).\n\nLOCAL-FIRST DEPLOY — Designed to run on localhost for daily use. Cloud Run deployment is the target for remote access, but the app functions perfectly without internet connectivity.',
        },
        {
          type: 'prose',
          heading: 'Route Structure',
          body: 'SALES & INVOICING\nGET  /sales              — List all invoices\nGET  /sales/new          — Invoice form (dynamic line items)\nPOST /sales              — Create invoice + compute GST\nGET  /sales/:id          — Detail view + payment history\nGET  /sales/:id/pdf      — Download PDF (Puppeteer)\n\nPURCHASES\nGET  /purchases          — List all purchases\nGET  /purchases/new      — Purchase form (supplier dropdown)\nPOST /purchases          — Create purchase + compute GST\nGET  /purchases/:id      — Purchase detail view\n\nPAYMENTS\nGET  /payments           — Receivables — outstanding from customers\nPOST /payments           — Record payment received\nGET  /payments-out       — Payables — outstanding to suppliers\nPOST /payments-out       — Record payment made',
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
          type: 'table',
          headers: [
            { label: 'Layer', align: 'left' },
            { label: 'Technology', align: 'left' },
            { label: 'Reason', align: 'left' },
          ],
          rows: [
            [
              { value: 'Runtime', bold: true },
              { value: 'Node.js 20 LTS' },
              { value: 'Cloud Run compatible, fast startup' },
            ],
            [
              { value: 'Web Framework', bold: true },
              { value: 'Express 4' },
              { value: 'Minimal, battle-tested, fast' },
            ],
            [
              { value: 'Templating', bold: true },
              { value: 'EJS' },
              { value: 'No build step, server-rendered HTML' },
            ],
            [
              { value: 'ORM', bold: true },
              { value: 'Prisma' },
              { value: 'Type-safe queries, migration support' },
            ],
            [
              { value: 'Database', bold: true },
              { value: 'PostgreSQL 15' },
              { value: 'Cloud SQL target, ACID guarantees' },
            ],
            [
              { value: 'PDF', bold: true },
              { value: 'Puppeteer (Chromium)' },
              { value: 'Pixel-perfect HTML to PDF rendering' },
            ],
            [
              { value: 'Auth', bold: true },
              { value: 'bcrypt + express-session' },
              { value: 'Simple master password, session store in PG' },
            ],
            [
              { value: 'Math', bold: true },
              { value: 'Decimal.js' },
              { value: 'Precise monetary calculations (no float)' },
            ],
            [
              { value: 'Deploy Target', bold: true },
              { value: 'Cloud Run' },
              { value: 'Serverless container, scales to zero' },
            ],
          ],
        },
        {
          type: 'tags',
          items: [
            { label: 'Node.js 20', tone: 'navy' },
            { label: 'Express 4', tone: 'blue' },
            { label: 'EJS', tone: 'green' },
            { label: 'Prisma', tone: 'purple' },
            { label: 'PostgreSQL 15', tone: 'cyan' },
            { label: 'Puppeteer', tone: 'gold' },
            { label: 'bcrypt', tone: 'red' },
            { label: 'Decimal.js' },
            { label: 'Cloud Run' },
            { label: 'Cloud SQL' },
          ],
        },
        {
          type: 'prose',
          heading: 'Project Layout',
          body: 'invoicer/\n  server.js              — Express entry point\n  prisma/schema.prisma   — 9 models, migrations\n  src/routes/            — customers, suppliers, products, sales, purchases, payments, paymentsOut\n  src/services/gst.js    — GST calculation (shared sales + purchases)\n  src/services/pdf.js    — Puppeteer PDF generation\n  src/services/invoiceNo.js — Auto-numbering (FY-aware)\n  src/middleware/auth.js  — Master password session check\n  views/                 — EJS templates (layout, dashboard, CRUD forms)\n  views/invoice-pdf.ejs  — PDF-only template (no nav)\n  public/style.css       — Single CSS file, no build',
        },
      ],
    },
  ],
};
