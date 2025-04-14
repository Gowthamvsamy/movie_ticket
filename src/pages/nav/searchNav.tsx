// import React, { useContext } from 'react'
import { GoSearch } from 'react-icons/go'
import logo from '../../assets/show-time.png'
import { useState } from 'react'
import SideBar from '../../component/sideBar'
import { FaRegBell } from 'react-icons/fa'
import { LuCircleUser } from 'react-icons/lu'
import { Link } from 'react-router-dom'

function SearchNav() {

    const [sideBar, setSideBar] = useState<boolean>(true)

    const showSideBar = () => {
        setSideBar(prevMode => prevMode === true ? false : true);

    }

    return (
        <>
            <div className='first-nav'>
                <div className='nav-box'>
                    <img src={logo} alt="404" className='logo-img' />
                    <div className='search-box'>
                        <input
                            type="search"
                            name="search"
                        // value={search}
                        // onChange={}
                        />
                        <GoSearch className='goSearch' />
                    </div>
                </div>
                <div className='right-nav'>
                    <p className='Offers'>Offers</p>
                    <LuCircleUser className='nav-menu'/>
                    <FaRegBell className='nav-menu' onClick={showSideBar} />
                    <button className='nav-button'><Link to="/register">Login</Link></button>
                </div>

            </div>
            {!sideBar && (
                <SideBar />
            )}
        </>
    )
}

export default SearchNav