import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import ListContext from '../context/listContext';
import { CrewKey, MovieData } from './type';
import { FaStar } from 'react-icons/fa';

function Details() {
    const { id } = useParams();

    const listMovie = useContext(ListContext)

    const movieId = Number(id);

    const movie = listMovie?.find((m): m is MovieData => m.id === movieId);

    const crewKeys: CrewKey[] = ['director', 'production', 'musician'];

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
                            <Link to={`/details/${movie.id}/theatres`}><button className='book-button'>Book Tickets</button></Link>
                        </div>
                    </div>
                    <div className='about'>
                        <h2 className='about-heading'>About the movie</h2>
                        <p>{movie.plot}</p>
                    </div>
                    <div className='cast'>
                        <h2 className='cast-heading'>Cast</h2>
                        <div className='cast-crew'>
                            {movie.actors?.map((list, index) => (
                                <div key={index}>
                                    <img src={list.image} alt="404" className='cast-crew-img' />
                                    <p>{list.name?.split(' ').join('\n')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='crew'>
                        <h2 className='crew-heading'>Crew</h2>
                        <div className='cast-crew'>
                            {crewKeys.map((role) =>
                                movie[role]?.map((person, index) => (
                                    <div key={`${role}-${index}`}>
                                        <img src={person.image} alt="404" className='cast-crew-img' />
                                        <p>{person.name?.split(' ').join('\n')}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>Movie not found.</p>
            )}
        </>
    );
}

export default Details;
