import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import CoinPage from './pages/CoinPage'
import ComparePage from './pages/ComparePage'
import WatchListPage from './pages/WatchListPage'
import DashboardPage from './pages/DashboardPage'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/coin/:coinId" element={<CoinPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/watchlist" element={<WatchListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
