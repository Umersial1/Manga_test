
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MangaDetail from './pages/MangaDetail';
import Reader from './pages/Reader';
import ListingPage from './pages/ListingPage';

// Scroll to top on route change helper
const ScrollToTop = () => {
  const { pathname } = window.location;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manga/:id" element={<MangaDetail />} />
            <Route path="/manga/:id/chapter/:chapterId" element={<Reader />} />
            <Route path="/listing/:category" element={<ListingPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
