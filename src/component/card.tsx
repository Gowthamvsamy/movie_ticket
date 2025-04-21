/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import ListContext from '../context/listContext';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import SearchContext from '../context/searchContext';
import { Movie, MovieCardProps, TabItem } from './type';

const Tabpanel: React.FC<MovieCardProps> = ({ movie, onClick }) => {
    return (
        <div key={movie.id} className='card' onClick={onClick}>
            <img src={movie.poster} alt="404" className='card-img' />
            <div className='rating-box'>
                <p className='star'><FaStar color="#FFD700" />{movie.rating}</p>
            </div>
            <div className='card-text'>
                <p className='font-Roboto'>{movie.genre?.join(' / ')}</p>
                <h2 className='font-Montserrat'><b>{movie.title}</b></h2>
            </div>
        </div>
    )
}

function Cards({ setMovieData }: { setMovieData: (id: number) => void }) {

    const listMovie = useContext(ListContext)

    const context = useContext(SearchContext);

    if (!context) throw new Error("SearchProvider")

    const { searchData } = context;

    const filteredData = listMovie?.filter((mov) => mov?.title?.toLowerCase().includes(searchData || ''));

    const tabs: TabItem[] = [
        { label: "All" },
        { label: "Movies" },
        { label: "Series" },
    ];

    const movieDetails = (id: number) => {
        setMovieData(id)
    }

    const [active, setActive] = useState<string>("All")

    return (
        <>
            <div className='tab-card'>
                <Tabs>
                    <div className='tablist-style'>
                        <TabList className="tablist">
                            {tabs.map((tab, index) => (
                                <Tab key={index} onClick={() => setActive(tab.label)} className={`tab ${active === tab.label ? 'active' : ''}`}>
                                    {tab.label}
                                </Tab>
                            ))}
                        </TabList>
                    </div>
                    <TabPanel>
                        <div className='main-card'>
                            {filteredData && filteredData.map((movie: any) => (
                                <Tabpanel key={movie.id} movie={movie} onClick={() => movieDetails(movie.id)} />
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='main-card'>
                            {(filteredData as Movie[]).filter((movie): movie is Movie & { type: "movie" } => movie.type === 'movie').map((movie) => (
                                <Tabpanel key={movie.id} movie={movie} onClick={() => movieDetails(movie.id)} />
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='main-card'>
                            {(filteredData as Movie[]).filter((movie): movie is Movie & { type: "series" } => movie.type === 'series').map((movie) => (
                                <Tabpanel key={movie.id} movie={movie} onClick={() => movieDetails(movie.id)} />
                            ))}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>

        </>
    )
}

export default Cards