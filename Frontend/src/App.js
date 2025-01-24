// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import InventoryList from './pages/Inventory/InventoryList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<InventoryList />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;