import React from 'react'
import SearchNav from './nav/searchNav'
import Body from './body/body'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Details from '../component/Details'
import Register from './auth/register'

function Index() {
  return (
    <>
      <Router>
        <SearchNav />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default Index