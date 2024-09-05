import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout.jsx';
import { Home } from './pages/Home';
import { Sorteringsguide } from './pages/Sorteringsguide';
import { Genbrugsstationer } from './pages/Genbrugsstationer';
import { Artikler } from './pages/Artikler';
import { BestilContainer } from './pages/BestilContainer';
import { Login } from './components/Login.jsx';
import { Section } from './pages/Section'; // New SectionPage component for dynamic sections
import { StationerDetail } from './pages/StationerDetail'; // Import StationerDetail for detailed station view
import { ArtiklerDetail } from './pages/ArtiklerDetail'; // Import ArtiklerDetail for detailed article view
import { ThankYou } from './pages/ThankYou.jsx';
import { AuthProvider } from './providers/AuthProvider'; // Import AuthProvider
import { SupabaseProvider } from './providers/SupabaseProvider.jsx';

function App() {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Define a layout wrapper for consistent page structure */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/sorteringsguide" element={<Sorteringsguide />} />
              <Route path="/sorteringsguide/:id" element={<Section />} />
              <Route path="/genbrugsstationer" element={<Genbrugsstationer />} />
              <Route path="/genbrugsstationer/:id" element={<StationerDetail />} />
              <Route path="/artikler" element={<Artikler />} />
              <Route path="/artikler/:id" element={<ArtiklerDetail />} />
              <Route path="/bestilcontainer" element={<BestilContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </SupabaseProvider>
  );
}

export default App;
