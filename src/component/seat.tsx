// import
import React, { useContext, useEffect, useState } from 'react';
import ListContext from '../context/listContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LocationState } from './type';
import SeatSelect from './seatSelect';

function Seat() {
    // Movie list context
    const listMovie = useContext(ListContext);

    // Get the data from router path
    const { id } = useParams<{ id: string }>();

    // Declare the current movie id 
    const movieId = Number(id);

    // navigator
    const navigator = useNavigate();

    // Send the data via the router path.
    const location = useLocation();
    const { showtime, place, name, date } = (location.state || {}) as LocationState;

    // open the coupon apply popup
    const [open, setOpen] = useState<boolean>(false);
    const [paymentData, setPaymentData] = useState<{ price?: number; seats: string[] }>({
        price: undefined,
        seats: [],
    });
    const handleData = (price: number | undefined, seats: string[]) => {
        setPaymentData({ price, seats });
        setOpen(true);
    };

    // Compare the movie ID from the database to the current ID.
    const movie = listMovie?.find((m) => m.id === movieId);

    // close the coupon popup
    const handleClose = () => setOpen(false);

    // Handel the coupon and ticket price state
    const [couponCode, setCouponCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState<number | undefined>(undefined);

    // coupon discount 
    useEffect(() => {
        if (paymentData.price) {
            if (couponCode === 'FIRST') {
                setDiscountedPrice(paymentData.price - 50);
            } else {
                setDiscountedPrice(undefined);
            }
        }
    }, [couponCode, paymentData.price]);

    return (
        <>
            <div>
                <div className='seat-heading'>
                    <p>{movie?.title}</p>
                    <p>{name} / {place} / {date} / {showtime}</p>
                </div>
                <div className='seatlist-width'>
                    <SeatSelect onData={handleData} />
                </div>
            </div>

            {open && (
                <div className="pay-popup">
                    <div className="pay-bg">
                        <h2 className="payment">Payment Details</h2>
                        <p><strong>Price:</strong> ₹{discountedPrice ?? paymentData.price}</p>

                        {/* Coupon Input */}
                        <div className="my">
                            <label className="coupon-label">Coupon Code:</label>
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                                className="coupon-input"
                            />
                        </div>

                        <div className="pay-btn">
                            <button
                                className="pay"
                                onClick={() => {
                                    navigator(`/details/${movieId}/theatres/seat/ticket`, {
                                        state: {
                                            ...paymentData,
                                            name,
                                            place,
                                            date,
                                            showtime,
                                            couponCode,
                                            discountedPrice: discountedPrice ?? paymentData.price,
                                        },
                                    });
                                }}
                            >
                                Pay
                            </button>
                            <button
                                className="cancel"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default Seat;
