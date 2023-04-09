import React from 'react'
import Register from './register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function app() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Register/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
