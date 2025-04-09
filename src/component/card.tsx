import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';

function Cards() {

    interface MovieData {
        id: number,
        title?: string,
        year?: string,
        genre?: string[],
        rating?: string,
        director?: string,
        actors?: string[],
        plot?: string,
        poster?: string,
        cover_img?: string,
        runtime?: string,
        awards?: string,
        language?: string[],
        boxoffice?: string,
        production?: string[],
        certified?: string,

    }

    const [showMovie, setShowMovie] = useState<MovieData[] | null>(null);

    async function getData() {
        try {
            const response = await fetch('https://run.mocky.io/v3/f5935baf-764f-4bde-8fc8-59fe0f5c10aa');
            const movieCardData = await response.json();
            setShowMovie(movieCardData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const movieDetails = () => {
        
    }
    


    return (
        <>
            <div className='main-card'>
                {showMovie && showMovie.map(movie => (
                    <div key={movie.id} className='card' onClick={movieDetails(movie.id)}>
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
        </>
    )
}

export default Cards