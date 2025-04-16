import React from 'react'
import Index from './pages'
import ListProvider from './context/listProvider'
import SearchProvider from './context/searchProvider'


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