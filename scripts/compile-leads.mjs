import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEADS_DIR = 'C:\\cpio_db\\outreach\\investor-outreach\\leads';
const OUTPUT_FILE = path.join(__dirname, '../src/data/investors.json');

function cleanText(str) {
  if (!str) return '';
  return str.replace(/[\uFFFD\u0080-\u009F]/g, '').trim();
}

function compileLeads() {
  const records = [];
  const seenNames = new Set();

  // 1. Load Incubators & Email verified leads
  const emailLeadsPath = path.join(LEADS_DIR, 'investors-emails.json');
  const shortlistPath = path.join(LEADS_DIR, 'investors-shortlist.json');

  let shortlistMap = {};
  if (fs.existsSync(shortlistPath)) {
    try {
      const shortlistData = JSON.parse(fs.readFileSync(shortlistPath, 'utf8'));
      shortlistData.forEach(item => {
        if (item.name) {
          shortlistMap[item.name.toLowerCase().trim()] = item;
        }
      });
    } catch (e) {
      console.warn('Error reading shortlist JSON:', e);
    }
  }

  if (fs.existsSync(emailLeadsPath)) {
    try {
      const emailLeads = JSON.parse(fs.readFileSync(emailLeadsPath, 'utf8'));
      emailLeads.forEach(item => {
        const cleanedName = cleanText(item.name);
        if (!cleanedName || seenNames.has(cleanedName.toLowerCase())) return;

        const shortlistMatch = shortlistMap[cleanedName.toLowerCase()] || {};
        const tagsRaw = item.first_tag || shortlistMatch.first_tag || '';
        const tagsArr = (shortlistMatch.matched_keywords || [])
          .concat(tagsRaw.split(/\+|\||,/).map(t => t.trim()))
          .filter(t => t && !t.includes('More'));

        const topUrl = Array.isArray(item.top_urls) && item.top_urls.length > 0 ? item.top_urls[0] : '';

        records.push({
          id: `org-${records.length + 1}`,
          name: cleanedName,
          firm: cleanedName,
          role: 'Incubator / Innovation Hub',
          location: cleanText(item.location) || 'India / Global',
          type: 'Incubator & Accelerator',
          score: item.score || 10,
          linkedin: (item.top_urls || []).find(u => u.includes('linkedin.com')) || '',
          email: item.primary_email || (item.all_emails && item.all_emails[0]) || '',
          website: topUrl,
          tags: Array.from(new Set(tagsArr)).slice(0, 6),
          description: cleanText(shortlistMatch.description || item.description || '')
        });

        seenNames.add(cleanedName.toLowerCase());
      });
    } catch (e) {
      console.warn('Error reading investors-emails.json:', e);
    }
  }

  // 2. Load LinkedIn Angel & Individual Investor leads
  const linkedinQueuePath = path.join(LEADS_DIR, 'linkedin-connect-queue.json');
  if (fs.existsSync(linkedinQueuePath)) {
    try {
      const linkedinQueue = JSON.parse(fs.readFileSync(linkedinQueuePath, 'utf8'));
      linkedinQueue.forEach(item => {
        const cleanedName = cleanText(item.name);
        if (!cleanedName || seenNames.has(cleanedName.toLowerCase())) return;

        let formattedType = 'Angel Investor';
        const typeRaw = (item.type || '').toLowerCase();
        if (typeRaw.includes('individual')) {
          formattedType = 'Individual Investor';
        } else if (typeRaw.includes('vc') || typeRaw.includes('fund')) {
          formattedType = 'VC / Fund';
        } else if (typeRaw.includes('incubator') || typeRaw.includes('accelerator')) {
          formattedType = 'Incubator & Accelerator';
        }

        const roleText = cleanText(item.role);
        const firmText = cleanText(item.firm);
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
          firm: firmText || 'Angel / Independent',
          role: roleText || 'Angel Investor',
          location: cleanText(item.location) || 'Global',
          type: formattedType,
          score: item.score || 5,
          linkedin: item.linkedin || '',
          email: '',
          website: item.linkedin || '',
          tags: tags,
          description: roleText ? `${cleanedName} - ${roleText}` : `${cleanedName} - Angel Investor`
        });

        seenNames.add(cleanedName.toLowerCase());
      });
    } catch (e) {
      console.warn('Error reading linkedin-connect-queue.json:', e);
    }
  }

  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(records, null, 2), 'utf8');
  console.log(`Successfully compiled ${records.length} investor records into ${OUTPUT_FILE}`);
}

compileLeads();
