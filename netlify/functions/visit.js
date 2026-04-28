import { incrementVisitFromEvent } from '../lib/visitor-blobs.js';

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
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' });
  }

  try {
    const stats = await incrementVisitFromEvent(event);
    return json(200, { ok: true, ...stats });
  } catch (err) {
    console.error('[visit]', err);
    return json(500, { error: 'فشل تحديث العداد', details: err.message });
  }
};
