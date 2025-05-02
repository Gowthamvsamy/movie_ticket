import React from 'react'
import loder from '../assets/show-time.png'

function Loder() {
    return (
        <div className='wallet-bg'>
            <div className='loader-img'>
                <img src={loder} alt="404" className='loader' />
            </div>
        </div>
    )
}

export default Loder