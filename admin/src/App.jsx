import {Route,Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Gerant from './pages/Gerant';
import Paiement from './pages/Paiement';
import Membres from './pages/Membres';
import Salles from './pages/Salles';
import Layout from './components/layout';
export default function App() {
  return (
   <Routes>
    <Route element={<Layout/>}>


     <Route path='/' element={<Dashboard/>} />
      <Route path='/paiement' element={<Paiement/>} />
       <Route path='/gerant' element={<Gerant/>} />
        <Route path='/membre' element={<Membres/>} />
          <Route path='/salle' element={<Salles/>} />
              </Route>
   </Routes>
  );
}