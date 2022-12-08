import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import SearchPage from './pages/SearchPage'
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/search' element={<SearchPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App