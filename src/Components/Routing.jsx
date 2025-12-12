import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import UserDetails from './UserDetails'
import Create from './Create'
import Edit from './Edit'

function Routing() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path='/create' element={<Create/>}></Route>
        <Route path="/UserDetails/:id" element={<UserDetails/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        </Routes>
    </div>
  )
}

export default Routing