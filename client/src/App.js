import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MyFlightsPage from './pages/MyFlightsPage.js';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-flights" element={<MyFlightsPage />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;