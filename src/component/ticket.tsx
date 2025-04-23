import React, { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LocationState } from './type';
import ListContext from '../context/listContext';
import QRCode from "react-qr-code";

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

    // Ticket cancelation and refund
    const cancelTicket = () => {
        let refund = 0;
    
        if (couponCode === 'FIRST' && typeof discountedPrice === 'number') {
            refund = calcRefund();
        } else if (couponCode === '' && typeof discountedPrice === 'number') {
            refund = discountedPrice / 2;
        }
    
        if (refund > 0) {
            alert(`${refund} is returned to your account`);
            localStorage.setItem('refund', refund.toString())
            navigator('/');
        } else {
            alert('No refund available.');
        }
    };
    
    

    return (
        <>
            <div className='tickets'>
                <div className='ticket-box'>
                    <div className='ticket-bg'>
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
                                <p>Screen</p>
                                <h2>Screen-1</h2>
                            </div>
                            <div>
                                <p>Seats</p>
                                <h2>{seats.join(', ')}</h2>
                            </div>
                            <div className='cancel-ticket' onClick={cancelTicket}>Cancel Ticket</div>
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