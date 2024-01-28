import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import MisionVison from '../components/MisionVison'
import Navbar from '../components/Navbar'
import CalculoMetrica from '../modules/CalculoMetricas/view/CalculoMetrica'
import CalculosObtenidos from '../modules/CalculosObtenidos/view/CalculosObtenidos'
import Refactorizacion from '../modules/RefactorizacionCodigo/view/Refactorizacion'
const AppRouter = () => {
  return (
    <Router>
        <Routes>
        <Route path='/*' element={
            <>
            <Navbar/>
            <Routes>
            <Route path='/misionVision' element={<MisionVison/>} />
            <Route path='/calculoMetrica' element={<CalculoMetrica/>} />
            <Route path='/calculoObtenido' element={<CalculosObtenidos/>} />
            <Route path='/refactorizacion' element={<Refactorizacion/>} />
            </Routes>
            </>
        } />
        
        </Routes>
    </Router>
  )
}

export default AppRouter;