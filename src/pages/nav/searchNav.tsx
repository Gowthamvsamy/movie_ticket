import React from 'react'
import { GoSearch } from 'react-icons/go'
import logo from '../../assets/show-time.png'

function SearchNav() {
    return (
        <>
            <div className='first-nav'>
                <img src={logo} alt="404" className='logo-img' />
                <div className='search-box'>
                    <input
                        type="search"
                        name="search"
                    // value={search}
                    // onChange={}
                    />
                    <GoSearch  className='goSearch'/>
                </div>
            </div>
        </>
    )
}

export default SearchNav