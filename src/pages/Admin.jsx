import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TOKEN_KEY = 'admin_jwt';

/** فاصل استطلاع الإحصاء من الخادم (بالملّي ثانية) */
const STATS_POLL_INTERVAL_MS = 15000;

export default function Admin() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState('');

  const loadStats = useCallback(async (authToken, options = {}) => {
    const silent = options.silent === true;
    if (!silent) {
      setLoading(true);
    }
    setFetchError('');
    try {
      const res = await fetch('/api/stats', {
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
        if (!silent) setData(null);
        return;
      }
      setData(json);
    } catch (e) {
      setFetchError(e.message || 'فشل الاتصال بالخادم');
      if (!silent) setData(null);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!token) {
      sessionStorage.removeItem(TOKEN_KEY);
      return undefined;
    }

    sessionStorage.setItem(TOKEN_KEY, token);
    loadStats(token);

    const poll = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
      loadStats(token, { silent: true });
    };

    const intervalId = window.setInterval(poll, STATS_POLL_INTERVAL_MS);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        poll();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [token, loadStats]);
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

  const panelSurface = {
    background: '#ffffff',
    borderRadius: 12,
    padding: 'clamp(28px, 4vw, 44px)',
    boxShadow: '0 12px 48px rgba(50, 69, 86, 0.09)',
    border: '1px solid rgba(50, 69, 86, 0.06)',
    borderInlineStart: '4px solid var(--procounsel-base, #c7954a)',
    maxWidth: 560,
    margin: '0 auto',
  };

  return (
    <div className="page-wrapper">
      <header
        style={{
          backgroundColor: 'var(--procounsel-primary, #324556)',
          padding: '20px 0',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-auto">
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <Link to="/" style={{ display: 'inline-flex', flexShrink: 0 }}>
                  <img
                    src="/assets/images/نبراس-الجزيرة-للمحاماة-والاستشارات-القانونية.png"
                    alt="نبراس الجزيرة للمحاماة والاستشارات القانونية"
                    width={112}
                  />
                </Link>
                <div>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)', fontSize: 13 }}>لوحة الإدارة</p>
                  <h1
                    style={{
                      margin: 0,
                      color: '#fff',
                      fontFamily: 'var(--procounsel-heading-font, "Marcellus", serif)',
                      fontWeight: 400,
                      fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
                      lineHeight: 1.35,
                    }}
                  >
                    إحصاء زيارات الصفحة الرئيسية
                  </h1>
                </div>
              </div>
            </div>
            {token ? (
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm px-3 py-2"
                  onClick={logout}
                  style={{ borderRadius: 8 }}
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <section style={{ padding: 'clamp(56px, 8vw, 96px) 0', backgroundColor: 'var(--procounsel-gray2, #ededed)', minHeight: 'calc(100vh - 120px)' }}>
        <div className="container">
          {!token ? (
            <div style={panelSurface}>
              <div className="sec-title text-right" style={{ paddingBottom: 28 }}>
                <p className="sec-title__tagline" style={{ textTransform: 'none', letterSpacing: 0 }}>
                  الدخول الآمن
                </p>
                <h2 className="sec-title__title" style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.25 }}>
                  تسجيل الدخول
                </h2>
              </div>
              <form onSubmit={handleLogin} className="text-right" style={{ display: 'grid', gap: 18 }}>
                <label style={{ display: 'grid', gap: 8 }}>
                  <span style={{ fontSize: 15, color: 'var(--procounsel-text, #838790)' }}>كلمة المرور</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="form-control"
                    style={{
                      padding: '14px 16px',
                      borderRadius: 8,
                      border: '1px solid rgba(50,69,86,0.15)',
                      fontSize: 16,
                      background: '#fafafa',
                    }}
                  />
                </label>
                {loginError ? (
                  <p style={{ color: '#c62828', margin: 0, fontSize: 14 }}>{loginError}</p>
                ) : null}
                <div className="mt-2">
                  <button type="submit" disabled={loading} className="procounsel-btn" style={{ border: 'none', cursor: loading ? 'wait' : 'pointer' }}>
                    <i>{loading ? 'جاري التحقق…' : 'دخول'}</i>
                    <span>{loading ? 'جاري التحقق…' : 'دخول'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {fetchError ? (
                <p className="text-center" style={{ color: '#b71c1c', marginBottom: 24 }}>
                  {fetchError}
                </p>
              ) : null}

              {loading && !data ? (
                <p className="text-center" style={{ color: 'var(--procounsel-primary, #324556)' }}>جاري التحميل…</p>
              ) : null}

              {data ? (
                <div style={panelSurface}>
                  <div className="sec-title text-right" style={{ paddingBottom: 8 }}>
                    <p className="sec-title__tagline" style={{ textTransform: 'none', letterSpacing: 0 }}>
                      نظرة سريعة
                    </p>
                    <h2 className="sec-title__title" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', lineHeight: 1.3 }}>
                      إجمالي الزيارات
                    </h2>
                  </div>

                  <div
                    style={{
                      padding: '28px 24px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, rgba(50,69,86,0.04) 0%, rgba(199,149,74,0.06) 100%)',
                      border: '1px solid rgba(50, 69, 86, 0.07)',
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontFamily: 'var(--procounsel-heading-font, "Marcellus", serif)',
                        fontSize: 'clamp(48px, 10vw, 72px)',
                        lineHeight: 1,
                        fontWeight: 400,
                        color: 'var(--procounsel-primary, #324556)',
                      }}
                    >
                      {data.totalVisits?.toLocaleString('ar-SA') ?? '—'}
                    </p>
                  </div>

                  <p
                    dir="rtl"
                    style={{
                      margin: '24px 0 0',
                      fontSize: 15,
                      color: '#5a6570',
                      direction: 'rtl',
                      unicodeBidi: 'isolate',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: 10,
                      flexWrap: 'nowrap',
                      width: '100%',
                      textAlign: 'right',
                    }}
                  >
                    <span>
                      آخر تحديث:{' '}
                      {data.updatedAt
                        ? new Date(data.updatedAt).toLocaleString('ar-SA', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })
                        : '—'}
                    </span>
                    <span className="icon-clock" style={{ color: 'var(--procounsel-base, #c7954a)', fontSize: 18, flexShrink: 0 }} aria-hidden />
                  </p>

                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
