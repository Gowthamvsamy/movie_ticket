import React from 'react'

import SearchNav from './pages/nav/searchNav'
import MenuNav from './pages/nav/menuNav'
import Body from './pages/body/body'

function App() {
  return (
    <>
      <div className='main-body'>
        <SearchNav />
        <MenuNav />
        <Body />
      </div>
    </>
  )
}

export default App