import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Admin from './pages/Admin';

const SESSION_KEY = 'nbs_visit_ping_v1';

/** عدّ زائرًا واحدًا لكل جلسة متصفّح عند زيارة الصفحة الرئيسية */
function HomeVisitPing() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/') return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, '1');
    fetch('/api/visit', { method: 'POST', credentials: 'same-origin' }).catch(() => {});
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <HomeVisitPing />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
