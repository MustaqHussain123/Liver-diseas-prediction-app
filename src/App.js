import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signeup from './Signeup/Signeup'
import Home from './Home/Home'
import Admin from './Admin/Admin'
import Delete from './Delete/Delete'
import Edit from './Edit/Edit'
import Patient from './Patient/Patient'
import Doctor from './Doctor/Doctor'
import Prediction from './Prediction/Prediction'
import Result from './Result/Result'
import Technician from './Technician/Technician'
import Booking from './Booking/Booking'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
     <Route path='/' element={< Home/>} />
      <Route path='/signup' element={< Signeup/>} />
      <Route path='/admin' element={< Admin/>} />
      <Route path='/delete/:id' element={< Delete/>} />
      <Route path='/update/:id' element={< Edit/>} />
      <Route path='/patient' element={< Patient/>} />
      <Route path='/doctor' element={< Doctor/>} />
      <Route path='/prediction' element={< Prediction/>} />
      <Route path='/result' element={< Result/>} />
      <Route path='/techmician' element={< Technician/>} />
      <Route path='/booking' element={< Booking/>} />
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App

