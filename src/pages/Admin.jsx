import { useCallback, useEffect, useState } from 'react';

const TOKEN_KEY = 'admin_jwt';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState('');

  const loadAnalytics = useCallback(async (authToken) => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch('/api/analytics', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setToken('');
        setFetchError('انتهت الجلسة، سجّل الدخول مجدداً.');
        setData(null);
        return;
      }
      if (!res.ok) {
        setFetchError(json.error || `خطأ ${res.status}`);
        setData(json.fallback || null);
        return;
      }
      setData(json);
    } catch (e) {
      setFetchError(e.message || 'فشل الاتصال بالخادم');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
      loadAnalytics(token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  }, [token, loadAnalytics]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.token) {
        setLoginError(json.error || 'فشل تسجيل الدخول');
        return;
      }
      setToken(json.token);
      setPassword('');
    } catch (err) {
      setLoginError(err.message || 'خطأ في الشبكة');
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken('');
    setData(null);
    setFetchError('');
  }

  const cardStyle = {
    background: '#fff',
    borderRadius: 12,
    padding: '20px 24px',
    boxShadow: '0 8px 24px rgba(50,69,86,0.12)',
    border: '1px solid rgba(50,69,86,0.08)',
  };

  const labelStyle = { fontSize: 13, color: '#6b7c88', marginBottom: 8 };
  const valueStyle = { fontSize: 28, fontWeight: 700, color: '#324556', margin: 0 };

  return (
    <div
      lang="ar"
      dir="rtl"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #324556 0%, #1f2f3d 100%)',
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        padding: '32px 16px',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <header style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ color: '#fff', margin: 0, fontSize: 'clamp(1.35rem, 3vw, 1.75rem)' }}>
            لوحة الإحصائيات — GA4
          </h1>
          {token ? (
            <button
              type="button"
              onClick={logout}
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 8,
                padding: '10px 18px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              تسجيل الخروج
            </button>
          ) : null}
        </header>

        {!token ? (
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0, color: '#324556' }}>تسجيل الدخول</h2>
            <form onSubmit={handleLogin} style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
              <label style={{ display: 'grid', gap: 8 }}>
                <span style={labelStyle}>كلمة المرور</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  style={{
                    padding: '12px 14px',
                    borderRadius: 8,
                    border: '1px solid #cfd8dc',
                    fontSize: 16,
                  }}
                />
              </label>
              {loginError ? (
                <p style={{ color: '#c62828', margin: 0, fontSize: 14 }}>{loginError}</p>
              ) : null}
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#c89f67',
                  color: '#1a1a1a',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 20px',
                  fontWeight: 700,
                  cursor: loading ? 'wait' : 'pointer',
                }}
              >
                {loading ? 'جاري التحقق…' : 'دخول'}
              </button>
            </form>
          </div>
        ) : (
          <>
            {fetchError ? (
              <p style={{ color: '#ffcdd2', marginBottom: 16 }}>{fetchError}</p>
            ) : null}

            {loading && !data ? (
              <p style={{ color: '#e0e0e0' }}>جاري تحميل البيانات…</p>
            ) : null}

            {data ? (
              <>
                {data.source === 'demo' && data.message ? (
                  <div
                    style={{
                      ...cardStyle,
                      marginBottom: 20,
                      background: '#fff8e1',
                      borderColor: '#ffe082',
                    }}
                  >
                    <strong style={{ color: '#6d4c41' }}>وضع تجريبي</strong>
                    <p style={{ margin: '8px 0 0', color: '#5d4037', lineHeight: 1.6 }}>{data.message}</p>
                  </div>
                ) : null}

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 16,
                    marginBottom: 24,
                  }}
                >
                  {[
                    ['الجلسات', data.sessions],
                    ['المستخدمون', data.users],
                    ['مشاهدات الصفحات', data.pageViews],
                    ['مستخدمون جدد', data.newUsers],
                  ].map(([label, val]) => (
                    <div key={label} style={cardStyle}>
                      <div style={labelStyle}>{label}</div>
                      <p style={valueStyle}>{typeof val === 'number' ? val.toLocaleString('ar-SA') : val}</p>
                    </div>
                  ))}
                </div>

                <div style={cardStyle}>
                  <h3 style={{ marginTop: 0, color: '#324556' }}>أكثر الصفحات مشاهدةً</h3>
                  {data.topPages?.length ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ textAlign: 'right', borderBottom: '2px solid #eceff1' }}>
                          <th style={{ padding: '10px 8px' }}>المسار</th>
                          <th style={{ padding: '10px 8px', width: 120 }}>المشاهدات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.topPages.map((row, i) => (
                          <tr key={`${row.path}-${i}`} style={{ borderBottom: '1px solid #eceff1' }}>
                            <td style={{ padding: '10px 8px', wordBreak: 'break-all' }}>{row.path}</td>
                            <td style={{ padding: '10px 8px' }}>{row.views.toLocaleString('ar-SA')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p style={{ color: '#78909c', margin: 0 }}>لا توجد صفوف للصفحات في هذه الفترة.</p>
                  )}
                </div>

                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 20 }}>
                  المصدر: {data.source === 'ga4' ? 'Google Analytics Data API (حقيقي)' : 'تجريبي'} · Measurement ID:{' '}
                  {data.measurementId}
                </p>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
