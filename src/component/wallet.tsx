import React from 'react'

function Wallet() {
    const price = localStorage.getItem('refund')
  return (
    <>
        <div className='form-bg'>
            <h2>Total Wallet Balance &#x20B9; {price}</h2>
        </div>
    </>
  )
}

export default Wallet