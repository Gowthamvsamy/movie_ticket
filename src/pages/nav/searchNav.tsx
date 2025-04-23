// import
import { GoSearch } from 'react-icons/go'
import logo from '../../assets/show-time.png'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import SideBar from '../../component/sideBar'
import { FaRegBell } from 'react-icons/fa'
import { LuCircleUser } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import SearchContext from '../../context/searchContext'
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from '../../component/type'
import Wallet from '../../component/wallet'


const SearchNav = () => {

    // State
    const [sideBar, setSideBar] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showDropDown, setShowDropDown] = useState<boolean>(false)

    const navigator = useNavigate();

    // Search context
    const context = useContext(SearchContext)
    if (!context) throw new Error("SearchProvider")
    const { setSearchData } = context

    // useRef to handel the dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);

    // show sidebar
    const showSideBar = () => {
        setSideBar(prevMode => prevMode === true ? false : true);
    }

    // listen the search value
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        setSearchData(searchValue);
    }, [searchValue]);

    const token = localStorage.getItem('token');

    // Verify the token and log out the user if the token has expired.
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

    // open dropdown
    const userProfile = () => {
        setShowDropDown((prevMode => prevMode === true ? false : true))
    }

    // logout the user
    const logoutsession = () => {
        localStorage.removeItem('token')
    }

    // Use a mouse event to close the user dropdown when clicking outside of it.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropDown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const Wallet = () => {
        navigator('/wallet');
    }


    return (
        <>
            <nav className='first-nav'>
                {/* Logo */}
                <div className='nav-box'> <Link to="/">
                    <img src={logo} alt="404" className='logo-img' />
                </Link></div>

                {/* Search input */}
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

                {/* Offers */}
                <div className='right-nav'>
                    <p className='Offers'><Link to="/offers">Offers</Link></p>
                    {token ? (
                        <>
                            <div ref={dropdownRef} className='profile-menu'>
                                <button
                                    onClick={(): void => userProfile()}
                                >
                                    <LuCircleUser className='nav-menu' />
                                    {showDropDown && (
                                        <div className='dropdown-menu' id='dropdown-menu'>
                                            <ul>
                                                <li>My Bookings</li>
                                                <li onClick={Wallet}>Wallet</li>
                                                <li onClick={logoutsession}>Logout</li>
                                            </ul>
                                        </div>
                                    )}
                                </button>
                                <FaRegBell className='nav-menu' onClick={showSideBar} />
                            </div>
                        </>
                    ) : null}
                    <button className='nav-button'><Link to="/login">Login</Link></button>
                </div>
            </nav>

            {/* Side Bar */}
            {!sideBar && (
                <SideBar />
            )}
        </>
    )
}

export default SearchNav