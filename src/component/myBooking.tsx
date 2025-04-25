import React, { useEffect, useState } from 'react'
import { Booking } from './type';
import { getBooking, updateBooking } from '../context/service/movieService';

const MyBooking: React.FC = () => {

  const [data, setData] = useState<Booking[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const booking = await getBooking();
        setData(booking)
      } catch (err) {
        console.error("Fetch Booking error: ", err);
      }
    }
    getData();
  }, [])

  const cancelTicket = async (id: string) => {
    try {
      await updateBooking(id, { isBooked: false });
      setData(prev => prev.map(item => item._id === id ? { ...item, isBooked: false } : item));
    } catch (error) {
      console.error('Failed to cancel ticket:', error);
    }
  }

  const u_id = localStorage.getItem('user_id');




  return (
    <div className="booked-container">
      {data.map((b) => (
        b.isBooked === true && b._id && b.user_id === u_id ? (
          <div key={b._id} className="booked-ticket">
            <div>
              <img src={b.poster} alt="poster" className='poster-img' />
            </div>
            <div className='booking-detail'>
              <h2 className='bold'>{b.title}</h2>
              <p>{b.certified} / {b.language}</p>
              <p>{b.theatre} / {b.place}</p>
              <p>{b.date} / {b.time}</p>
              <p>{b.screen}</p>
              <p><span>Ticket : {b.seats.split(',').length}</span>, Seats : {b.seats}</p>
              <h2 className='bold'>Rs. {b.price}</h2>
            </div>
            <div className='booking-cancel'>
              <button className='cancel-ticket' onClick={() => cancelTicket(b._id!)} >Cancel&nbsp;Ticket</button>
            </div>
          </div>
        ) : null
      ))}
    </div>
  )
}

export default MyBooking