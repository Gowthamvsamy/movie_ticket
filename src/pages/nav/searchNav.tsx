/* eslint-disable @typescript-eslint/no-unused-vars */
// import
import { GoSearch } from 'react-icons/go'
import logo from '../../assets/show-time-white.png'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import SideBar from '../../component/sideBar'
import { FaRegBell } from 'react-icons/fa'
import { LuCircleUser } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import SearchContext from '../../context/searchContext'
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from '../../component/type'
import { getBooking } from '../../context/service/movieService'


const SearchNav = () => {

  // navigator
  const navigator = useNavigate();

  // State
  const [sideBar, setSideBar] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
  const [unbookedCount, setUnbookedCount] = useState<number>(0);

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
    setSearchValue(e.target.value.toLowerCase());
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
    localStorage.removeItem('token');
    navigator('/')
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

  // get user_id and the user name form the local storage
  const u_name = localStorage.getItem('u_name');
  const u_id = localStorage.getItem('user_id');

  // Get the booking details to filter out the count of canceled tickets.
  useEffect(() => {
    const getData = async () => {
      try {
        const booking = await getBooking();
        const todayDate = new Date().getDate();

        const unbookedToday = booking.filter((b) => {
          if (typeof b.date !== 'string') return false;
          const [_, date] = b.date.split(' ');
          const bookingDate = parseInt(date, 10);
          const cTime = new Date();
          const current = cTime.getHours();
          return b.isBooked === false && bookingDate === todayDate && u_id !== b.user_id && current < (parseInt(b.time.slice(0, 2)) + 12);
        }).length;

        setUnbookedCount(unbookedToday);
      } catch (err) {
        console.error("Fetch Booking error: ", err);
      }
    }
    getData();
  }, [])


  return (
    <>
      <nav className='first-nav'>
        {/* Logo */}
        <div className='nav-box'>
          <Link to="/">
            <img src={logo} alt="404" className='logo-img' />
          </Link>
        </div>

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
                  <span className='user-name'>{u_name ? u_name.charAt(0).toUpperCase() + u_name.slice(1) : 'Welcome'}</span>
                  {showDropDown && (
                    <div className='dropdown-menu' id='dropdown-menu'>
                      <ul>
                        <li><Link to="/mybooking">My Bookings</Link></li>
                        <li><Link to="/wallet">Wallet</Link></li>
                        <li onClick={logoutsession}>Logout</li>
                      </ul>
                    </div>
                  )}
                </button>
                {/* Show a notification for canceled tickets and their count.*/}
                <div className='notification-box'>
                  {unbookedCount > 0 && (
                    <p className="notification-count">{unbookedCount}</p>
                  )}
                  <FaRegBell className='nav-menu' onClick={showSideBar} />
                </div>
              </div>
            </>
          ) : null}
          <button className={`nav-button ${token ? 'hidden' : 'block'}`}><Link to="/login">Login</Link></button>
        </div>
      </nav>

      {/* Side Bar */}
      {!sideBar && (
        <SideBar sideBar={setSideBar} />
      )}
    </>
  )
}

export default SearchNav