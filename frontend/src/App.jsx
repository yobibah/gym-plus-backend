import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {

  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='*' element={<NotFound/>}/> 
   </Routes>
  )
}

export default App
