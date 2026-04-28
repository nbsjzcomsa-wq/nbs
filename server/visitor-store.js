import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'visitor-stats.json');

/** القيمة المعروضة في الواجهة = المخزَّن + هذا القيمة (قاع يبدأ من 16) */
const VISITOR_DISPLAY_OFFSET = 55;

function ensureFile() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!existsSync(DATA_FILE)) {
    writeFileSync(DATA_FILE, JSON.stringify({ totalVisits: 0, updatedAt: null }, null, 2), 'utf8');
  }
}

export function getVisitorStats() {
  ensureFile();
  const raw = readFileSync(DATA_FILE, 'utf8');
  const parsed = JSON.parse(raw);
  const stored = Number(parsed.totalVisits || 0);
  return {
    totalVisits: stored + VISITOR_DISPLAY_OFFSET,
    updatedAt: parsed.updatedAt ?? null,
    storage: 'local-json',
  };
}

export function incrementVisitor() {
  ensureFile();
  const cur = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  const stored = Number(cur.totalVisits || 0) + 1;
  const updatedAt = new Date().toISOString();
  writeFileSync(DATA_FILE, JSON.stringify({ totalVisits: stored, updatedAt }, null, 2), 'utf8');
  return {
    totalVisits: stored + VISITOR_DISPLAY_OFFSET,
    updatedAt,
    storage: 'local-json',
  };
}
