import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

function jsonResponse(statusCode, body) {
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
    return jsonResponse(405, { error: 'Method Not Allowed' });
  }

  let parsed = {};
  try {
    parsed = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, { ok: false, error: 'طلب غير صالح' });
  }

  const password = parsed.password;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
    return jsonResponse(200, { ok: true, token });
  }

  return jsonResponse(401, { ok: false, error: 'كلمة المرور غير صحيحة' });
};
