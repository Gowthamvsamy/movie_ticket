import React from 'react'
import SearchNav from './Nav/SearchNav'
import Body from './Body/ShowMovies'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Details from '../Component/Details'
import Register from './Auth/Register'
import Login from './Auth/Login'
import ErrorPage from '../Component/ErrorPage'
import MyBooking from '../Component/MyBooking'
import Offers from '../Component/Offers'
import Seat from '../Component/Seat'
import TheatreList from '../Component/TheatreList'
import Ticket from '../Component/Ticket'
import Wallet from '../Component/Wallet'

function AppRoutes() {
  const location = useLocation();

  const path = location.pathname;

  // Hide the navbar only on the seat selection page, show on ticket page
  const shouldHideSearchNav = path.includes('/theatres/seat') && !path.endsWith('/ticket');

  return (
    <>
      {!shouldHideSearchNav && <SearchNav />}
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/details/:id/theatres" element={<TheatreList />} />
        <Route path="/details/:id/theatres/seat" element={<Seat />} />
        <Route path="/details/:id/theatres/seat/ticket" element={<Ticket />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/mybooking" element={<MyBooking />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

function Index() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  )
}

export default Index