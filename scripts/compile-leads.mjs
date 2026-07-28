import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTREACH_DIR = 'C:\\cpio_db\\outreach\\investor-outreach';
const LEADS_DIR = path.join(OUTREACH_DIR, 'leads');
const PIPELINE_DIR = path.join(OUTREACH_DIR, 'pipeline');
const OUTPUT_FILE = path.join(__dirname, '../src/data/investors.json');

function cleanText(str) {
  if (!str) return '';
  return str.replace(/[\uFFFD\u0080-\u009F]/g, '').trim();
}

function normalizeType(raw) {
  const t = (raw || '').toLowerCase();
  if (t.includes('venture capital') || t.includes('vc')) return 'VC / Fund';
  if (t.includes('family office')) return 'Individual Investor';
  if (t.includes('angel')) return 'Angel Investor';
  if (t.includes('incubator') || t.includes('accelerator')) return 'Incubator & Accelerator';
  return 'Angel Investor';
}

function extractTags(focus, cryptoTag, aiTag, fintechTag) {
  const tags = [];
  const focusLower = (focus || '').toLowerCase();
  if (focusLower.includes('ai') || focusLower.includes('ml') || aiTag === 'Y') tags.push('AI / ML');
  if (focusLower.includes('fintech') || focusLower.includes('finance') || fintechTag === 'Y') tags.push('Fintech');
  if (focusLower.includes('crypto') || focusLower.includes('web3') || focusLower.includes('blockchain') || cryptoTag === 'Y') tags.push('Web3 / Crypto');
  if (focusLower.includes('saas') || focusLower.includes('b2b') || focusLower.includes('enterprise')) tags.push('SaaS');
  if (focusLower.includes('deeptech') || focusLower.includes('deep tech') || focusLower.includes('hardware') || focusLower.includes('spacetech')) tags.push('Deep Tech');
  if (focusLower.includes('health') || focusLower.includes('biotech')) tags.push('Health Tech');
  if (focusLower.includes('cleantech') || focusLower.includes('climate') || focusLower.includes('energy')) tags.push('CleanTech');
  if (focusLower.includes('gaming')) tags.push('Gaming');
  if (focusLower.includes('devtools') || focusLower.includes('developer')) tags.push('DevTools');
  if (focusLower.includes('consumer') || focusLower.includes('d2c') || focusLower.includes('ecommerce')) tags.push('Consumer');
  if (focusLower.includes('fintech') || focusLower.includes('lending') || focusLower.includes('payments')) tags.push('Fintech');
  if (tags.length === 0 && focus) {
    const parts = focus.split(',').map(s => s.trim()).filter(Boolean);
    tags.push(...parts.slice(0, 3));
  }
  if (tags.length === 0) tags.push('Early Stage / Seed');
  return Array.from(new Set(tags)).slice(0, 6);
}

function normalizeLinkedin(url) {
  if (!url) return '';
  const match = url.match(/linkedin\.com\/in\/([^/?]+)/);
  return match ? match[1].toLowerCase().replace(/[^a-z0-9-]/g, '') : '';
}

function compileLeads() {
  const records = [];
  const seenByEmail = new Map();
  const seenByLinkedin = new Map();
  const seenByNameNoContact = new Set();

  // --- PRIMARY: Canonical investors dataset (9,649 records) ---
  const canonicalPath = path.join(PIPELINE_DIR, 'canonical-investors.json');
  if (fs.existsSync(canonicalPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));
      data.forEach((item, idx) => {
        let name = cleanText(item.name);
        const isInstitutional = !name;
        if (!name) name = cleanText(item.firm) || 'Unknown Fund';
        // For institutional records, use firm as the display name

        const email = cleanText(item.email || '').toLowerCase();
        const linkedinHandle = normalizeLinkedin(item.linkedin);

        // Dedup by email
        if (email) {
          if (seenByEmail.has(email)) return;
        }
        // Dedup by LinkedIn
        if (linkedinHandle) {
          if (seenByLinkedin.has(linkedinHandle)) return;
        }
        // Dedup by name only when neither email nor linkedin available
        const nameKey = name.toLowerCase();
        if (!email && !linkedinHandle) {
          if (seenByNameNoContact.has(nameKey)) return;
        }

        const tags = extractTags(item.focus, item.tag_crypto, item.tag_ai, item.tag_fintech);

        let role = isInstitutional ? 'VC Fund' : (cleanText(item.role_title) || normalizeType(item.type));
        let firm = isInstitutional ? name : (cleanText(item.firm) || 'Independent');
        let location = cleanText(item.location) || (item.focus ? 'Global' : 'India / Global');
        let type = isInstitutional ? 'VC / Fund' : normalizeType(item.type);

        records.push({
          id: `inv-${records.length + 1}`,
          name,
          firm,
          role,
          location,
          type,
          score: item.tag_preseed_seed === 'Y' ? 20 : 10,
          linkedin: cleanText(item.linkedin || ''),
          email,
          website: cleanText(item.website || ''),
          tags,
          stage: cleanText(item.stage || ''),
          cheque: cleanText(item.cheque || ''),
          description: `${name}${firm !== name ? ` — ${firm}` : ''} | ${item.stage || 'Multi-Stage'} | ${item.cheque || ''}`.trim()
        });

        if (email) seenByEmail.set(email, records.length);
        if (linkedinHandle) seenByLinkedin.set(linkedinHandle, records.length);
        if (!email && !linkedinHandle) seenByNameNoContact.add(nameKey);
      });
      console.log(`  canonical-investors.json: ${data.length} loaded, ${records.length} unique kept`);
    } catch (e) {
      console.warn('Error reading canonical-investors.json:', e.message);
    }
  } else {
    console.warn('canonical-investors.json not found at', canonicalPath);
  }

  // --- SUPPLEMENT: LinkedIn Queue (Angel/Individual investors not in canonical) ---
  const linkedinQueuePath = path.join(LEADS_DIR, 'linkedin-connect-queue.json');
  if (fs.existsSync(linkedinQueuePath)) {
    try {
      const linkedinQueue = JSON.parse(fs.readFileSync(linkedinQueuePath, 'utf8'));
      let added = 0;
      linkedinQueue.forEach(item => {
        const cleanedName = cleanText(item.name);
        if (!cleanedName) return;

        const linkedinHandle = normalizeLinkedin(item.linkedin);
        if (linkedinHandle && seenByLinkedin.has(linkedinHandle)) return;

        const nameKey = cleanedName.toLowerCase();
        const hasContact = item.email || linkedinHandle;
        if (!hasContact && seenByNameNoContact.has(nameKey)) return;

        const typeRaw = (item.type || '').toLowerCase();
        let formattedType = 'Angel Investor';
        if (typeRaw.includes('individual')) formattedType = 'Individual Investor';
        else if (typeRaw.includes('vc') || typeRaw.includes('fund')) formattedType = 'VC / Fund';
        else if (typeRaw.includes('incubator') || typeRaw.includes('accelerator')) formattedType = 'Incubator & Accelerator';

        const roleText = cleanText(item.role);
        const tags = [];
        if (roleText.toLowerCase().includes('ai') || roleText.toLowerCase().includes('ml')) tags.push('AI / ML');
        if (roleText.toLowerCase().includes('fintech') || roleText.toLowerCase().includes('finance')) tags.push('Fintech');
        if (roleText.toLowerCase().includes('crypto') || roleText.toLowerCase().includes('web3') || roleText.toLowerCase().includes('blockchain')) tags.push('Web3 / Crypto');
        if (roleText.toLowerCase().includes('saas') || roleText.toLowerCase().includes('b2b')) tags.push('SaaS');
        if (roleText.toLowerCase().includes('deeptech') || roleText.toLowerCase().includes('hardware')) tags.push('Deep Tech');
        if (tags.length === 0) tags.push('Early Stage / Seed');

        records.push({
          id: `inv-${records.length + 1}`,
          name: cleanedName,
          firm: cleanText(item.firm) || 'Angel / Independent',
          role: roleText || 'Angel Investor',
          location: cleanText(item.location) || 'Global',
          type: formattedType,
          score: item.score || 5,
          linkedin: item.linkedin || '',
          email: '',
          website: item.linkedin || '',
          tags,
          description: roleText ? `${cleanedName} - ${roleText}` : `${cleanedName} - Angel Investor`
        });

        if (linkedinHandle) seenByLinkedin.set(linkedinHandle, records.length);
        if (!hasContact) seenByNameNoContact.add(nameKey);
        added++;
      });
      console.log(`  linkedin-connect-queue.json: ${linkedinQueue.length} loaded, ${added} unique new`);
    } catch (e) {
      console.warn('Error reading linkedin-connect-queue.json:', e.message);
    }
  }

  // --- SUPPLEMENT: Incubator leads ---
  const incubatorPath = path.join(LEADS_DIR, 'incubators-raw-scrape.json');
  if (fs.existsSync(incubatorPath)) {
    try {
      const incubators = JSON.parse(fs.readFileSync(incubatorPath, 'utf8'));
      let added = 0;
      incubators.forEach(item => {
        const cleanedName = cleanText(item.name);
        if (!cleanedName) return;

        const email = cleanText(item.primary_email || (item.all_emails && item.all_emails[0]) || '').toLowerCase();
        const linkedinHandle = normalizeLinkedin((item.top_urls || []).find(u => u.includes('linkedin.com')) || '');

        if (email && seenByEmail.has(email)) return;
        if (linkedinHandle && seenByLinkedin.has(linkedinHandle)) return;

        const nameKey = cleanedName.toLowerCase();
        if (!email && !linkedinHandle && seenByNameNoContact.has(nameKey)) return;

        const tags = (item.first_tag || '').split(/\+|\||,/).map(t => t.trim()).filter(t => t && !t.includes('More'));
        const topUrl = Array.isArray(item.top_urls) && item.top_urls.length > 0 ? item.top_urls[0] : '';

        records.push({
          id: `inv-${records.length + 1}`,
          name: cleanedName,
          firm: cleanedName,
          role: 'Incubator / Innovation Hub',
          location: cleanText(item.location) || 'India / Global',
          type: 'Incubator & Accelerator',
          score: item.score || 10,
          linkedin: linkedinHandle ? `https://linkedin.com/in/${linkedinHandle}` : '',
          email,
          website: topUrl,
          tags: Array.from(new Set(tags)).slice(0, 6),
          description: cleanText(item.description || '')
        });

        if (email) seenByEmail.set(email, records.length);
        if (linkedinHandle) seenByLinkedin.set(linkedinHandle, records.length);
        if (!email && !linkedinHandle) seenByNameNoContact.add(nameKey);
        added++;
      });
      console.log(`  incubators-raw-scrape.json: ${incubators.length} loaded, ${added} unique new`);
    } catch (e) {
      console.warn('Error reading incubators-raw-scrape.json:', e.message);
    }
  }

  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(records, null, 2), 'utf8');
  console.log(`\nTotal: ${records.length} unique investor records compiled → ${OUTPUT_FILE}`);
}

compileLeads();