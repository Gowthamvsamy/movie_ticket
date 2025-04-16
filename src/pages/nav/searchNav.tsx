import { GoSearch } from 'react-icons/go'
import logo from '../../assets/show-time.png'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import SideBar from '../../component/sideBar'
import { FaRegBell } from 'react-icons/fa'
import { LuCircleUser } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import SearchContext from '../../context/searchContext'

// type SearchData = { [key: string]: string }

const SearchNav = () => {

    const [sideBar, setSideBar] = useState<boolean>(true);
    // const [formData, setFormData] = useState<SearchData>({});
    const [searchValue, setSearchValue] = useState<string>('');


    const context = useContext(SearchContext)

    if (!context) {
        throw new Error("SearchProvider")
    }

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
      


    return (
        <>
            <div className='first-nav'>
                <div className='nav-box'>
                    <img src={logo} alt="404" className='logo-img' />
                </div>
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
                    <p className='Offers'>Offers</p>
                    <LuCircleUser className='nav-menu' />
                    <FaRegBell className='nav-menu' onClick={showSideBar} />
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