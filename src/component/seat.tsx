import React, { useContext } from 'react'
import ListContext from '../context/listContext';
import { useLocation, useParams } from 'react-router-dom';
import { LocationState } from './type';
import SeatSelect from './seatSelect';



function Seat() {

    const listMovie = useContext(ListContext);
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);

    const location = useLocation();
    const { showtime, place, name, date } = (location.state || {}) as LocationState;

    const movie = listMovie?.find((m) => m.id === movieId);

    return (
        <div>
            <div className='seat-heading'>
                <p>{movie?.title}</p>
                <p>{name} / {place} / {date} / {showtime}</p>
            </div>
            <div>
                <SeatSelect />
            </div>
        </div>
    )
}

export default Seat