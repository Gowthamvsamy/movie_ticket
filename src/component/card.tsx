/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import { FaStar } from 'react-icons/fa';
import ListContext from '../context/listContext';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

type TabItem = {
    label: string;
};

interface Movie {
    id: number,
    rating?: string,
    title?: string,
    genre?: string[],
    poster?: string,
    type?: 'movie' | 'series'
}

type MovieCardProps = {
    movie: Movie;
    onClick: () => void;
};

const Tabpanel: React.FC<MovieCardProps> = ({ movie, onClick  }) => {
    return (
        <div key={movie.id} className='card' onClick={onClick}>
            <img src={movie.poster} alt="404" className='card-img' />
            <div className='rating-box'>
                <p className='star'><FaStar color="#FFD700" />{movie.rating}</p>
            </div>
            <div className='card-text'>
                <h2 className='font-Montserrat'><b>{movie.title}</b></h2>
                <p className='font-Roboto'>{movie.genre?.join(' / ')}</p>
            </div>
        </div>
    )
}

function Cards({ setMovieData }: { setMovieData: (id: number) => void }) {

    const listMovie = useContext(ListContext)

    const tabs: TabItem[] = [
        { label: "All" },
        { label: "Movies" },
        { label: "Series" },
    ];

    const movieDetails = (id: number) => {
        setMovieData(id)
    }


    return (
        <>
            <div className='tab-card'>
                <Tabs>
                    <div className='tablist-style'>
                        <TabList className="tablist">
                            {tabs.map((tab, index) => (
                                <Tab key={index} className="tab">
                                    {tab.label}
                                </Tab>
                            ))}
                        </TabList>
                    </div>
                    <TabPanel>
                        <div className='main-card'>
                            {listMovie && listMovie.map((movie: any) => (
                                <Tabpanel key={movie.id} movie={movie} onClick={() => movieDetails(movie.id)} />
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='main-card'>
                            {listMovie && listMovie?.filter((movie): movie is Movie & { type: 'movie' } => movie.type === 'movie').map((movie) => (
                                <Tabpanel key={movie.id} movie={movie} onClick={() => movieDetails(movie.id)} />
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='main-card'>
                            {listMovie && listMovie?.filter((movie): movie is Movie & { type: 'series' } => movie.type === 'series').map((movie) => (
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