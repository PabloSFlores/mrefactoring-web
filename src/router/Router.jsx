import React from 'react'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import MisionVison from '../components/MisionVison'
import Navbar from '../components/Navbar'
const AppRouter = () => {
  return (
    <Router>
        <Routes>
        <Route path='/*' element={
            <>
            <Navbar/>
            <Routes>
            <Route path='/misionVision' element={<MisionVison/>} />
            </Routes>
            </>
        } />
        
        </Routes>
    </Router>
  )
}

export default AppRouter;