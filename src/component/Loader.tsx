import React from 'react'
import loader from '../assets/show-time.png'

function Loader() {
    return (
        <div className='wallet-bg'>
            <div className='loader-img'>
                <p className='load'></p>
                <img src={loader} alt="404" className='loader' />
            </div>
        </div>
    )
}

export default Loader
