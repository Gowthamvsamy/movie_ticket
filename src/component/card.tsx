import React, { useContext } from 'react'
import { FaStar } from 'react-icons/fa';
import ListContext from '../context/listContext';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

type TabItem = {
    label: string;
    onClick: () => void;
};


function Cards() {

    const tabs: TabItem[] = [
        { label: "All", onClick: all },
        { label: "Movies", onClick: movies },
        { label: "Series", onClick: series },
    ];

    const listMovie = useContext(ListContext)

    const all = (): void => {
        const result = listMovie
        console.log(result)
    }

    const movies = (): void => {
        const result = listMovie?.filter(t => t.type === 'movie')
        console.log(result)
    }

    const series = (): void => {
        const result = listMovie?.filter(t => t.type === 'series')
        console.log(result)
    }



    return (
        <>
            <div className='tab-card'>
                <Tabs>
                    <div className='tablist-style'>
                        <TabList className="tablist">
                            {tabs.map((tab, index) => (
                                <Tab key={index} className="tab" onClick={tab.onClick}>
                                    {tab.label}
                                </Tab>
                            ))}
                        </TabList>
                    </div>
                    <TabPanel>
                        <div className='main-card'>
                            {listMovie && listMovie.map(movie => (
                                <div key={movie.id} className='card' >{/* onClick={movieDetails(movie.id)} */}
                                    <img src={movie.poster} alt="404" className='card-img' />
                                    <div className='rating-box'>
                                        <p className='star'><FaStar color="#FFD700" />{movie.rating}</p>
                                    </div>
                                    <div className='card-text'>
                                        <h2 className='font-Montserrat'><b>{movie.title}</b></h2>
                                        <p className='font-Roboto'>{movie.genre?.join(' / ')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                </Tabs>
            </div>

        </>
    )
}

export default Cards