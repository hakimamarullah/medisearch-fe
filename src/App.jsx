import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import SearchPage from './pages/SearchPage'
import DetailPage from './pages/DetailPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/search'
          element={localStorage.getItem('q') ?
            <SearchPage /> :
            <Navigate to={'/'} replace />} />
        <Route exact path='/detail/:doc_id' element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App