import React, { useContext } from 'react'
import ListContext from '../context/listContext';
import { useParams } from 'react-router-dom';

function TheatreList() {

    const listMovie = useContext(ListContext);
    const { id } = useParams();
    const movieId = Number(id);

    const movie = listMovie?.find((m) => m.id === movieId);

    const today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return (
        <div className='theatre-list'>
            {movie ? (
                <div className='theatre-heading-box'>
                    <h2 className='theatre-heading'>{`${movie.title} - (${movie.language})`}</h2>
                    <p>
                        <span>{movie.certified}</span>
                        {movie.genre?.map((g, index) => (
                            <span key={index}>{g}</span>
                        ))}
                    </p>
                </div>
            ) : (null)
            }
            <div className='date-list'>
                {date}
            </div>
        </div>
    )
}

export default TheatreList