import React from 'react'
import SearchNav from './nav/searchNav'
import Body from './body/body'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Details from '../component/Details'
import Register from './auth/register'
import Login from './auth/login'

function Index() {  
  
  return (
    <>
      <Router>
        <SearchNav />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default Index