import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ListContext from '../context/listContext';
import { MovieData } from './type';
import { FaStar } from 'react-icons/fa';

function Details() {
    const { id } = useParams();

    const listMovie = useContext(ListContext)

    const movieId = Number(id);

    const movie = listMovie?.find((m): m is MovieData => m.id === movieId);

    return (
        <>
            {movie ? (
                <>
                    <div className="cover-img" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.9), rgba(0,0,0,0.2)), url(${movie.cover_img})` }}>
                        <div>
                            <img src={movie.poster} alt="Poster-img" />
                        </div>
                        <div className='detail-content'>
                            <h2 className='title-text'>{movie.title}</h2>
                            <p className='detail-rating'><FaStar color="#FFD700" />{movie.rating}</p>
                            <p className='detail-language'>{movie.language?.join(' / ')}</p>
                            <div className='detail-list'>
                                <p>{movie.runtime}</p>
                                <p>{movie.genre?.join(' / ')}</p>
                                <p>{movie.certified}</p>
                                <p>{movie.year}</p>
                            </div>
                            <button className='book-button'>Book Tickets</button>
                        </div>
                    </div>
                    <div className='about'>
                        <h2 className='about-heading'>About the movie</h2>
                        <p>{movie.plot}</p>
                    </div>
                    <div className='cast'>
                        <h2 className='cast-heading'>Cast</h2>
                        <p>{movie.actors}</p>
                    </div>
                    <div className='crew'>
                        <h2 className='crew-heading'>Crew</h2>
                        <p>{movie.director}</p>
                        <p>{movie.production}</p>
                        <p>{movie.musician}</p>
                    </div>
                </>
            ) : (
                <p>Movie not found.</p>
            )}
        </>
    );
}

export default Details;
