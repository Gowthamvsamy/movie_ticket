// import React, { useContext } from 'react'
import { GoSearch } from 'react-icons/go'
import logo from '../../assets/show-time.png'
import { useState } from 'react'
import SideBar from '../../component/sideBar'
import { FaRegBell } from 'react-icons/fa'
import { LuCircleUser } from 'react-icons/lu'
// import ListContext from '../../context/listContext'

function SearchNav() {

    const [sideBar, setSideBar] = useState<boolean>(true)

    const showSideBar = () => {
        setSideBar(prevMode => prevMode === true ? false : true);

    }

    // const listMovies = useContext(ListContext)

    // const all = () => {
    //     const result = listMovies?.filter(t => t.type === 'movie' || t.type === 'series' )
    //     console.log(result)
    // }

    // const movies = () => {
    //     const result = listMovies?.filter(t => t.type === 'movie')
    //     console.log(result)
    // }

    // const series = () => {
    //     const result = listMovies?.filter(t => t.type === 'series')
    //     console.log(result)
    // }
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
                    <button className='nav-button'>Login</button>
                </div>




                {/* <div>
                    <div>
                        <ul>
                            <li onClick={all}>All</li>
                            <li onClick={movies}>Movies</li>
                            <li onClick={series}>Series</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Offers</li>
                            <li>My Bookings</li>
                            <li>Notification</li>
                        </ul>
                    </div>
                </div> */}
            </div>
            {!sideBar && (
                <SideBar />
            )}
        </>
    )
}

export default SearchNav