import React from 'react'
import Index from './pages'
import ListProvider from './context/ListProvider'
import SearchProvider from './context/SearchProvider'

function App() {
  return (
    <>
      <ListProvider>
        <SearchProvider>
          <div className='main-body'>
            <Index />
          </div>
        </SearchProvider>
      </ListProvider>
    </>
  )
}

export default App