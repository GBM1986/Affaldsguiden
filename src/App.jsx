import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout.jsx';
import { Home } from './pages/Home';
import { Sorteringsguide } from './pages/Sorteringsguide'; // Add your Sorteringsguide component
import { Genbrugsstationer } from './pages/Genbrugsstationer'; // Add your Genbrugsstationer component
import { Artikler } from './pages/Artikler'; // Add your Artikler component
import { BestilContainer } from './pages/BestilContainer'; // Add your BestilContainer component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sorteringsguide" element={<Sorteringsguide />} />
          <Route path="genbrugsstationer" element={<Genbrugsstationer />} />
          <Route path="artikler" element={<Artikler />} />
          <Route path="bestilcontainer" element={<BestilContainer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
