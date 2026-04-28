import { writeFileSync, existsSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export function normalizePropertyId(raw) {
  const s = String(raw || '').trim();
  if (!s) return '';
  return s.startsWith('properties/') ? s : `properties/${s}`;
}

let resolvedCredentialsPath = null;

export function ensureGaCredentialsFile() {
  if (resolvedCredentialsPath && existsSync(resolvedCredentialsPath)) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = resolvedCredentialsPath;
    return resolvedCredentialsPath;
  }
  const pathEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (pathEnv && existsSync(pathEnv)) {
    resolvedCredentialsPath = pathEnv;
    return pathEnv;
  }
  const json = process.env.GA_CREDENTIALS_JSON;
  if (json) {
    const path = join(tmpdir(), `ga-sa-${process.pid}.json`);
    writeFileSync(path, json, 'utf8');
    resolvedCredentialsPath = path;
    process.env.GOOGLE_APPLICATION_CREDENTIALS = path;
    return path;
  }
  return null;
}

export function cleanupCredentialsTempFile() {
  const p = resolvedCredentialsPath;
  const tmp =
    p &&
    p.includes(tmpdir()) &&
    p.startsWith(join(tmpdir(), 'ga-sa-'));
  if (tmp && existsSync(p)) {
    try {
      unlinkSync(p);
    } catch {
      /* ignore */
    }
  }
  resolvedCredentialsPath = null;
}

export async function fetchGa4LiveData() {
  const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || '';
  const property = normalizePropertyId(GA4_PROPERTY_ID);
  const credPath = ensureGaCredentialsFile();
  if (!property || !credPath) {
    return null;
  }

  process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath;

  const client = new BetaAnalyticsDataClient();

  const [overview] = await client.runReport({
    property,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'screenPageViews' },
      { name: 'newUsers' },
    ],
  });

  const [topPages] = await client.runReport({
    property,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    limit: 10,
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
  });

  const totals = overview.rows?.[0]?.metricValues || [];
  const pickMetric = (i) => Number(totals[i]?.value || 0);

  const topPagesRows =
    topPages.rows?.map((row) => ({
      path: row.dimensionValues?.[0]?.value || '',
      views: Number(row.metricValues?.[0]?.value || 0),
    })) || [];

  return {
    source: 'ga4',
    measurementId: 'G-DN6WBGCPJX',
    propertyId: GA4_PROPERTY_ID,
    dateRange: { startDate: '30daysAgo', endDate: 'today' },
    sessions: pickMetric(0),
    users: pickMetric(1),
    pageViews: pickMetric(2),
    newUsers: pickMetric(3),
    topPages: topPagesRows,
  };
}

export function getDemoPayload() {
  return {
    source: 'demo',
    message:
      'لم يُضبط GA4_PROPERTY_ID أو اعتمادات Google. أضف المتغيرات البيئية (مثلاً في Netlify أو الخادم المحلي).',
    measurementId: 'G-DN6WBGCPJX',
    dateRange: { startDate: '30daysAgo', endDate: 'today' },
    sessions: 0,
    users: 0,
    pageViews: 0,
    newUsers: 0,
    topPages: [],
  };
}
