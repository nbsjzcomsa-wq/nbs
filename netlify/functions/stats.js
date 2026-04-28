import jwt from 'jsonwebtoken';
import { getVisitorStatsFromEvent } from '../lib/visitor-blobs.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  };
}

export const handler = async (event) => {
  const auth =
    event.headers?.authorization ||
    event.headers?.Authorization ||
    event.multiValueHeaders?.authorization?.[0];

  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method Not Allowed' });
  }

  if (!auth?.startsWith('Bearer ')) {
    return json(401, { error: 'Unauthorized' });
  }

  try {
    jwt.verify(auth.slice(7), JWT_SECRET);
  } catch {
    return json(401, { error: 'Invalid or expired token' });
  }

  try {
    const stats = await getVisitorStatsFromEvent(event);
    return json(200, {
      source: 'local-counter',
      ...stats,
    });
  } catch (err) {
    console.error('[stats]', err);
    return json(502, { error: 'فشل قراءة الإحصاء', details: err.message });
  }
};
