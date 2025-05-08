// import
import React, { useContext, useEffect, useState } from 'react';
import ListContext from '../context/listContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Booking, LocationState, MyTokenPayload } from './type';
import { IoIosArrowBack } from 'react-icons/io';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { booking } from '../context/service/movieService';
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

  const navigateBack = () => { navigator(`/details/${movieId}/theatres`) }

  return (
    <>
      <div>
        <div className='seat-heading'>
          <div className='theatre-back'>
            <IoIosArrowBack className='arrow-back' onClick={navigateBack} />
          </div>
          <div>
            <p>{movie?.title}</p>
            <p>{name} / {place} / {date} / {showtime}</p>
          </div>
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
            <p><strong>Title:</strong> {movie?.title}</p>
            <p>{name}</p>
            <p>{date} / {showtime}</p>
            <p><strong>Seats:</strong> {paymentData.seats.join(', ')}</p>

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
                onClick={async () => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    toast.error("User not authenticated");
                    return;
                  }

                  try {
                    const decoded = jwtDecode<MyTokenPayload>(token);
                    localStorage.setItem('user_id', decoded.id);

                    const bookingData: Booking = {
                      poster: movie?.poster || '',
                      certified: movie?.certified || '',
                      language: movie?.language?.[0] || '',
                      title: movie?.title || '',
                      theatre: name,
                      place: place,
                      date: date,
                      time: showtime,
                      price: (discountedPrice ?? paymentData.price ?? 0).toString(),
                      screen: 'Screen-1',
                      seats: paymentData.seats.join(','),
                      user_id: decoded.id,
                      isBooked: true,
                      discountedPrice: '',
                      refund: ''
                    };

                    // Booking the ticket 
                    await booking(bookingData);
                    toast.success("Ticket booked successfully!");
                    navigator(`/details/${movieId}/theatres/seat/ticket`)
                      
                  } catch (error) {
                    console.error("Booking failed:", error);
                    toast.error("Booking failed. Please try again.");
                  }
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
