import React from 'react'
import Index from './pages'
import ListProvider from './context/listProvider'


function App() {
  return (
    <>
      <ListProvider>
        <div className='main-body'>
          <Index />
        </div>
      </ListProvider>
    </>
  )
}

export default App