import { connectLambda, getStore } from '@netlify/blobs';

const STORE_NAME = 'nbs-visitors-v1';
const KEY = 'visitor-stats';

export async function incrementVisitFromEvent(event) {
  connectLambda(event);
  const store = getStore(STORE_NAME);
  const prev = (await store.get(KEY, { type: 'json' })) ?? {};
  const totalVisits = Number(prev.totalVisits || 0) + 1;
  const updatedAt = new Date().toISOString();
  await store.setJSON(KEY, { totalVisits, updatedAt });
  return { totalVisits, updatedAt, storage: 'netlify-blobs' };
}

export async function getVisitorStatsFromEvent(event) {
  connectLambda(event);
  const store = getStore(STORE_NAME);
  const data = (await store.get(KEY, { type: 'json' })) ?? { totalVisits: 0, updatedAt: null };
  return {
    totalVisits: Number(data.totalVisits || 0),
    updatedAt: data.updatedAt ?? null,
    storage: 'netlify-blobs',
  };
}
