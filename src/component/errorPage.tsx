import React from 'react'
import error from '../assets/output-onlinegiftools.gif'

function ErrorPage() {
    return (
        <div className='error-div'>
            <img src={error} alt="404" className='error-img' />
        </div>
    )
}

export default ErrorPage