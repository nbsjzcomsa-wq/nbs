import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initGA } from './utils/analytics';
import Landing from './pages/Landing';
import Admin from './pages/Admin';

export default function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
