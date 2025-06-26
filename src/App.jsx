import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import CoinPage from './pages/CoinPage';
import ComparePage from './pages/ComparePage';
import DashboardPage from './pages/DashboardPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Watchlist from './pages/WatchList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/coin/:coinId" element={<CoinPage />} />
          <Route path="/compare" element={<ComparePage />} />
           <Route path="/watchList" element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
