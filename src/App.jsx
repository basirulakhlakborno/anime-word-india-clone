import React, { useEffect, useState } from 'react';
import TelegramModal from './components/TelegramModal';
// ...existing code...
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Category from './pages/Category/Category';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Details from './pages/Details/Details';
import Episode from './pages/Episode/Episode';
import NotFound from './pages/NotFound/NotFound';
import ServiceUnavailable from './pages/ServiceUnavailable/ServiceUnavailable';

function App() {
    const [showTelegram, setShowTelegram] = useState(true);

    useEffect(() => {
      setShowTelegram(true);
    }, []);

    const handleCloseTelegram = () => setShowTelegram(false);

  return (
    <HelmetProvider>
      <Router>
        <TelegramModal show={showTelegram} onClose={handleCloseTelegram} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Letter routes */}
          <Route path="/letter/:letter" element={<Category />} />
          <Route path="/letter/:letter/page/:page" element={<Category />} />
          {/* Genre routes */}
          <Route path="/category/genre/:genreName" element={<Category />} />
          <Route path="/category/genre/:genreName/page/:page" element={<Category />} />
          {/* Language routes */}
          <Route path="/category/language/:languageName" element={<Category />} />
          <Route path="/category/language/:languageName/page/:page" element={<Category />} />
          {/* Category type routes */}
          <Route path="/category/type/:categoryName" element={<Category />} />
          <Route path="/category/type/:categoryName/page/:page" element={<Category />} />
          {/* Network routes (nested) */}
          <Route path="/category/network/:networkName" element={<Category />} />
          <Route path="/category/network/:networkName/page/:page" element={<Category />} />
          {/* Franchise routes (nested) */}
          <Route path="/category/franchise/:franchiseName" element={<Category />} />
          <Route path="/category/franchise/:franchiseName/page/:page" element={<Category />} />
          {/* General category routes */}
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/category/:categoryName/page/:page" element={<Category />} />
          {/* Movies routes */}
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/" element={<Movies />} />
          <Route path="/movies/page/:page" element={<Movies />} />
          {/* Series routes */}
          <Route path="/series" element={<Series />} />
          <Route path="/series/" element={<Series />} />
          <Route path="/series/page/:page" element={<Series />} />
          {/* Details routes for both series and movies */}
          <Route path="/series/:id" element={<Details />} />
          <Route path="/movies/:id" element={<Details />} />
          {/* Episode route */}
          <Route path="/episode/:id" element={<Episode />} />
          {/* Error pages */}
          <Route path="/503" element={<ServiceUnavailable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
