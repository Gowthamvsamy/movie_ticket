import { GoSearch } from 'react-icons/go'
import logo from '../../assets/show-time.png'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import SideBar from '../../component/sideBar'
import { FaRegBell } from 'react-icons/fa'
import { LuCircleUser } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import SearchContext from '../../context/searchContext'
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from '../../component/type'


const SearchNav = () => {

    const [sideBar, setSideBar] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showDropDown, setShowDropDown] = useState<boolean>(false)

    const context = useContext(SearchContext)

    if (!context) throw new Error("SearchProvider")

    const { setSearchData } = context

    const showSideBar = () => {
        setSideBar(prevMode => prevMode === true ? false : true);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        setSearchData(searchValue);
    }, [searchValue]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            try {
                const decoded: JwtPayload = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const userProfile = () => {
        setShowDropDown((prevMode => prevMode === true ? false : true))
    }

    const logoutsession = () => {
        localStorage.removeItem('token')
    }

    console.log(token);
    
    return (
        <>
            <div className='first-nav'>
                <div className='nav-box'> <Link to="/">
                    <img src={logo} alt="404" className='logo-img' />
                </Link></div>
                <div className='search'>
                    <div className='search-box'>
                        <input
                            type="search"
                            name="search"
                            onChange={handleChange}
                            placeholder='Search for Movies, Series'
                        />
                        <GoSearch className='goSearch' />
                    </div>
                </div>
                <div className='right-nav'>
                    <p className='Offers'><Link to="/offers">Offers</Link></p>
                    {token ? (
                        <>
                            <button
                                onClick={(): void => userProfile()}
                            >
                                <LuCircleUser className='nav-menu' />
                                {showDropDown && (
                                    <div className='dropdown-menu'>
                                        <ul>
                                            <li>Profile</li>
                                            <li onClick={logoutsession}>Logout</li>
                                        </ul>
                                    </div>
                                )}
                            </button>
                            <FaRegBell className='nav-menu' onClick={showSideBar} />
                        </>
                    ) : null}
                    <button className='nav-button'><Link to="/login">Login</Link></button>
                </div>
            </div>
            {!sideBar && (
                <SideBar />
            )}
        </>
    )
}

export default SearchNav