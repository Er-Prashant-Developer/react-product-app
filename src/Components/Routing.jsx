import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import UserDetails from './UserDetails'
import Create from './Create'
import Edit from './Edit'

function Routing() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/userDetails/:id" element={<UserDetails />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  )
}

export default Routing
