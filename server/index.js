import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { getVisitorStats, incrementVisitor } from './visitor-store.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.post('/api/admin/login', (req, res) => {
  const password = req.body?.password;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
    return res.json({ ok: true, token });
  }
  res.status(401).json({ ok: false, error: 'كلمة المرور غير صحيحة' });
});

/** زيادة العداد — استدعاء عام من الواجهة عند أول تحميل للجلسة */
app.post('/api/visit', (_req, res) => {
  try {
    const stats = incrementVisitor();
    res.json({ ok: true, ...stats });
  } catch (err) {
    console.error('[visit]', err);
    res.status(500).json({ error: 'فشل تحديث العداد', details: err.message });
  }
});

/** لوحة الإدارة — قراءة فقط */
app.get('/api/stats', authMiddleware, (_req, res) => {
  try {
    const stats = getVisitorStats();
    res.json({
      source: 'local-counter',
      ...stats,
    });
  } catch (err) {
    console.error('[stats]', err);
    res.status(502).json({ error: 'فشل قراءة الإحصاء', details: err.message });
  }
});

const server = app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
