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
  const raw = process.env.GA_CREDENTIALS_JSON?.trim();
  if (raw) {
    try {
      JSON.parse(raw);
    } catch {
      console.error('[GA] GA_CREDENTIALS_JSON is not valid JSON');
      return null;
    }
    const path = join(tmpdir(), `ga-sa-${process.pid}.json`);
    writeFileSync(path, raw, 'utf8');
    resolvedCredentialsPath = path;
    process.env.GOOGLE_APPLICATION_CREDENTIALS = path;
    return path;
  }
  return null;
}

/** للتحقق السريع من الإعداد دون كتابة ملف الاعتماد */
export function gaConfigurationHints() {
  const id = String(process.env.GA4_PROPERTY_ID || '').trim();
  const hasPropertyId = Boolean(normalizePropertyId(id));
  const rawJson = process.env.GA_CREDENTIALS_JSON?.trim();
  let credentialsJsonValid = false;
  let credentialsJsonPresent = Boolean(rawJson);
  if (rawJson) {
    try {
      JSON.parse(rawJson);
      credentialsJsonValid = true;
    } catch {
      credentialsJsonValid = false;
    }
  }
  const pathEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const hasKeyFile = Boolean(pathEnv && existsSync(pathEnv));
  const hasCredentials = credentialsJsonValid || hasKeyFile;
  return {
    hasPropertyId,
    hasCredentials,
    credentialsJsonPresent,
    credentialsJsonValid,
    hasKeyFile,
  };
}

function metricValuesFromOverviewRow(report) {
  const row = report.rows?.[0];
  const totalsRow = report.totals?.[0];
  const mv = row?.metricValues?.length ? row.metricValues : totalsRow?.metricValues;
  return mv?.length ? mv : [];
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

  const reportBase = {
    property,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  };

  const [overview] = await client.runReport({
    ...reportBase,
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'screenPageViews' },
      { name: 'newUsers' },
    ],
  });

  const [topPages] = await client.runReport({
    ...reportBase,
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    limit: 10,
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
  });

  const metricVals = metricValuesFromOverviewRow(overview);
  const pickMetric = (i) => Number(metricVals[i]?.value || 0);

  const topPagesRows =
    topPages.rows?.map((row) => ({
      path: row.dimensionValues?.[0]?.value || '',
      views: Number(row.metricValues?.[0]?.value || 0),
    })) || [];

  const payload = {
    source: 'ga4',
    measurementId: 'G-DN6WBGCPJX',
    propertyId: GA4_PROPERTY_ID,
    dateRange: { startDate: '30daysAgo', endDate: 'today' },
    sessions: pickMetric(0),
    users: pickMetric(1),
    pageViews: pickMetric(2),
    newUsers: pickMetric(3),
    topPages: topPagesRows,
    configuration: gaConfigurationHints(),
  };

  const looksEmpty =
    payload.sessions === 0 &&
    payload.users === 0 &&
    payload.pageViews === 0 &&
    payload.newUsers === 0;
  if (looksEmpty) {
    payload.note =
      'القيم صفر من واجهة Google: إمّا لا توجد زيارات في آخر 30 يومًا في هذه الخاصية، أو تحقق من أن Measurement ID في الموقع يطابق هذه الخاصية.';
  }

  return payload;
}

export function getDemoPayload() {
  const hints = gaConfigurationHints();
  let message =
    'لم يُضبط GA4_PROPERTY_ID أو اعتمادات Google (حساب الخدمة). أضف المتغيرات في Netlify أو .env المحلي.';

  if (hints.credentialsJsonPresent && !hints.credentialsJsonValid) {
    message =
      'المتغير GA_CREDENTIALS_JSON موجود لكنه ليس JSON صالحًا (تحقق من الأقواس والاقتباس عند اللصق في Netlify).';
  } else if (hints.hasPropertyId && !hints.hasCredentials) {
    message =
      'تم ضبط GA4_PROPERTY_ID، لكن لا توجد اعتمادات Google: أضف GA_CREDENTIALS_JSON (محتوى ملف JSON لحساب الخدمة بالكامل) في Netlify، أو GOOGLE_APPLICATION_CREDENTIALS محليًا، وأضف البريد client_email في مستخدمي الخاصية في GA4 بدور Viewer.';
  } else if (!hints.hasPropertyId && hints.hasCredentials) {
    message = 'يوجد ملف/JSON اعتماد لكن لم يُضبط GA4_PROPERTY_ID (رقم الخاصية من Property settings).';
  } else if (!hints.hasPropertyId && !hints.hasCredentials) {
    message =
      'أضف GA4_PROPERTY_ID و GA_CREDENTIALS_JSON معًا: المعرف وحده لا يكفي — واجهة Data API تحتاج حساب خدمة من Google Cloud.';
  }

  return {
    source: 'demo',
    configuration: hints,
    message,
    measurementId: 'G-DN6WBGCPJX',
    dateRange: { startDate: '30daysAgo', endDate: 'today' },
    sessions: 0,
    users: 0,
    pageViews: 0,
    newUsers: 0,
    topPages: [],
  };
}
