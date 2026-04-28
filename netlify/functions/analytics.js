import jwt from 'jsonwebtoken';
import { fetchGa4LiveData, getDemoPayload } from '../../server/analytics-core.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

function jsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...extraHeaders,
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
    return jsonResponse(405, { error: 'Method Not Allowed' });
  }

  if (!auth?.startsWith('Bearer ')) {
    return jsonResponse(401, { error: 'Unauthorized' });
  }

  try {
    jwt.verify(auth.slice(7), JWT_SECRET);
  } catch {
    return jsonResponse(401, { error: 'Invalid or expired token' });
  }

  try {
    const live = await fetchGa4LiveData();
    if (live) {
      return jsonResponse(200, live);
    }
    return jsonResponse(200, getDemoPayload());
  } catch (err) {
    console.error('[analytics]', err.message);
    return jsonResponse(502, {
      error: 'فشل جلب بيانات Analytics',
      details: err.message,
      fallback: getDemoPayload(),
    });
  }
};
