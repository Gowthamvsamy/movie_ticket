import React, { useEffect, useState } from 'react'
import { Booking } from './type';
import { getBooking, updateBooking } from '../context/service/movieService';

const SideBar: React.FC = () => {

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

  const u_id = localStorage.getItem('user_id') ?? undefined;  

  const bookNow = async (id: string) => {
    try {
      await updateBooking(id, {isBooked: true, user_id: u_id });
      setData(prev => prev.map(item => item._id === id ? { ...item, isBooked: true, user_id: u_id } : item));
    } catch (err) {
      console.error('Failed to Book tickets', err);
      
    }
  }



  return (
    <div className='sidebar'>
      {data.map((b) => (
        b.isBooked === false && b._id ? (
          <div key={b._id} className='sell-box'>
            <div className='offer-cards mb-3'>
              <div>
                <img src={b.poster} alt="404" className='sell-img' />
              </div>
              <div className='movie-box'>
                <p>{b.title}</p>
                <p>{b.certified} / {b.language}</p>
                <p>{b.theatre}</p>
                <p>{b.place}</p>
                <p className='sell-bold'>{b.date} / {b.time}</p>
                <p>Seats : {b.seats.split(',').join(', ')}</p>
              </div>
            </div>
            
            <div className='offer-cards offer-box'>
            <span className="top-left "></span>
            <span className="top-right"></span>
              <div>
                <p className='gray'><del>Rs.{b.price}.00</del></p>
                <p className='red'>Rs.{(Number(b.price) * 0.7).toFixed(2)}</p>
              </div>
              <div>
                <button className='book-now' onClick={() => bookNow(b._id!)}>Book Now</button>
              </div>
            </div>
          </div>
        ) : null
      ))}
    </div>
  )
}

export default SideBar