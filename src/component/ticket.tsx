import React, { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Booking, LocationState, MyTokenPayload } from './type';
import ListContext from '../context/listContext';
import QRCode from "react-qr-code";
import { booking } from '../context/service/movieService';
import { IoClose } from 'react-icons/io5';
import { jwtDecode } from 'jwt-decode';

function Ticket() {

    const location = useLocation();
    const navigator = useNavigate();
    const { place, name, date, seats, discountedPrice, showtime, couponCode } = (location.state || {}) as LocationState;

    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);

    const listMovie = useContext(ListContext);

    const movie = listMovie?.find((m) => m.id === movieId);

    // Cancelation 
    const calcRefund = () => {
        const canc = Number(discountedPrice) + 50;
        return canc / 2;
    };

    const token = localStorage.getItem('token')
    const decoded = jwtDecode<MyTokenPayload>(token!);
    localStorage.setItem('user_id', decoded.id);

    // Prepare data for booking
    const bookingData: Booking = {
        poster: movie?.poster || '',
        certified: movie?.certified || '',
        language: movie?.language?.[0] || '',
        title: movie?.title || '',
        theatre: name,
        place: place,
        date: date,
        time: showtime,
        price: discountedPrice ?? 0,
        screen: 'Screen-1',
        seats: seats.join(','),
        user_id: decoded.id,
    };

    // Ticket cancelation and refund
    const cancelTicket = async () => {
        let refund = 0;

        if (couponCode === 'FIRST' && typeof discountedPrice === 'number') {
            refund = calcRefund();
        } else if (couponCode === '' && typeof discountedPrice === 'number') {
            refund = discountedPrice / 2;
        }

        const updatedBookingData = {
            ...bookingData,
            isBooked: false,
        };

        if (refund > 0) {
            alert(`${refund} is returned to your account`);
            localStorage.setItem('refund', refund.toString());

            try {
                await booking(updatedBookingData);
            } catch (error) {
                console.error('Failed to cancellation:', error);
            }

            navigator('/');
        } else {
            alert('No refund available.');
        }
    };

    const closeTicket = async () => {

        const updatedBookingData = {
            ...bookingData,
            isBooked: true,
        };

        try {
            await booking(updatedBookingData);
        } catch (error) {
            console.error('Failed to close', error);
        }
        navigator('/');
    }


    return (
        <>
            <div className='tickets'>
                <div className='ticket-box'>
                    <div className='ticket-bg'>
                        <button className='close-ticket' onClick={closeTicket}><IoClose size={25} /></button>
                        {movie ? (
                            <div className='ticket-boxOne'>
                                <img src={movie.poster} alt="404" className='ticket-poster' />
                                <div className='text-small'>
                                    <p>{movie.certified} {movie.language?.[0]}</p>
                                    <h2>{movie.title}</h2>
                                    <p>{name} / {place}</p>
                                    <p>{date} / {showtime}</p>
                                    <p>Rs.{discountedPrice}</p>
                                </div>
                            </div>
                        ) : null}
                        <div className='ticket-boxTwo'>
                            {/* four circle in the ticket */}
                            <span className="top-left "></span>
                            <span className="top-right"></span>
                            <span className="bottom-left"></span>
                            <span className="bottom-right"></span>
                            <div>
                                <div>
                                    <p>Screen</p>
                                    <h2>Screen-1</h2>
                                </div>
                                <div>
                                    <p>Seats</p>
                                    <h2>{seats.join(', ')}</h2>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <button className='cancel-ticket' onClick={cancelTicket}>Cancel Ticket</button>
                            </div>
                        </div>
                        <div>
                            <QRCode
                                size={256}
                                className='qr-code'
                                value="value"
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ticket