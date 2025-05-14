import React, { useEffect, useState } from 'react'
import { getBooking } from '../context/Service/MovieService';
import { Booking } from './Type';
import Loader from './Loader';
import { BookingDetail, BookingImg } from './BookingDetail';

function CancelledBooking() {

  // useState
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Booking[]>([]);

  // Get Booking
  useEffect(() => {
    const getData = async () => {
      // Set loader
      setLoading(true);
      try {
        const booking = await getBooking();
        setData(booking)
      } catch (err) {
        console.error("Fetch Booking error: ", err)
      } finally {
        // close loader
        setLoading(false);
      }
    }
    getData();
  }, [])

  // get user_id from token
  const user_id = localStorage.getItem('user_id');

  return (
    <>
      {loading && <Loader />}
      <div className="booked-container top">
        {data.map((b) => {
          return (
            b.isBooked === false && user_id === b.user_id ? (
              <div key={b._id} className="booked-ticket">
                  <BookingImg b={b} />
                <div className='flex gap-x-10 w-full flex-wrap'>
                  <BookingDetail b={b} />
                </div>
              </div>
            ) : null
          )
        })}
      </div>
    </>
  )
}

export default CancelledBooking