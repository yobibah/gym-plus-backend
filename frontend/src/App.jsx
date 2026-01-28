import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/auth/Auth.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import NotFound from './pages/NotFound.jsx'
// import Form from './pages/Form.jsx'
import InfosLogin from './pages/form/InfosLogin.jsx'
import ChangePassword from './pages/auth/ChangePassword.jsx'
import InfoSalle from './pages/form/InfoSalle.jsx'
// import Paiement from './pages/form/Paiement.jsx'
// import SuccessPaiement from './pages/form/SuccessPaiement.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import DashboardStandard from './dashboard/standard/DashboardStandard.jsx'
import PaiementOtp from './pages/form/PaiementOtp.jsx'
import PaiementProcess from './pages/form/PaiementProcess.jsx'
// import pageOtp from './pages/form/p.jsx'
// import PaieOtp from './pages/form/p.jsx'
import Statut from './pages/form/Statut.jsx'

function App() {

  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/auth' element={<Auth/>}/> 
    <Route path='/reset-password' element={<ResetPassword/>}/>
    <Route path='/change-password' element={<ChangePassword/>}/>
    <Route path='/form-subscribe' element={<InfosLogin/>}/> 
    <Route path='/infos-salle' element={<InfoSalle/>}/> 
    {/* <Route path='/paiement' element={<Paiement/>}/>  */}
    <Route path='/paiement-process' element={<PaiementProcess/>}/> 
    <Route path='/paiement-otp' element={<PaiementOtp/>}/> 
    <Route path='/statut' element={<Statut/>}/> 
    {/* <Route path='/confirmation' element={<SuccessPaiement/>}/>  */}
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/dashboard-standard' element={<DashboardStandard/>}/> 
    <Route path='*' element={<NotFound/>}/> 
   </Routes>
  )
}

export default App
