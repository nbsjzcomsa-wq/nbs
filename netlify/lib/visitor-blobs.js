import { connectLambda, getStore } from '@netlify/blobs';

const STORE_NAME = 'nbs-visitors-v1';
const KEY = 'visitor-stats';

/** القيمة المعروضة في الواجهة = المخزَّن + هذا القيمة (قاع يبدأ من 16) */
const VISITOR_DISPLAY_OFFSET = 92;

export async function incrementVisitFromEvent(event) {
  connectLambda(event);
  const store = getStore(STORE_NAME);
  const prev = (await store.get(KEY, { type: 'json' })) ?? {};
  const stored = Number(prev.totalVisits || 0) + 1;
  const updatedAt = new Date().toISOString();
  await store.setJSON(KEY, { totalVisits: stored, updatedAt });
  return {
    totalVisits: stored + VISITOR_DISPLAY_OFFSET,
    updatedAt,
    storage: 'netlify-blobs',
  };
}

export async function getVisitorStatsFromEvent(event) {
  connectLambda(event);
  const store = getStore(STORE_NAME);
  const data = (await store.get(KEY, { type: 'json' })) ?? { totalVisits: 0, updatedAt: null };
  const stored = Number(data.totalVisits || 0);
  return {
    totalVisits: stored + VISITOR_DISPLAY_OFFSET,
    updatedAt: data.updatedAt ?? null,
    storage: 'netlify-blobs',
  };
}
