import React, { useEffect, useState } from 'react'
import { Booking, MyComponentProps } from './type';
import { getBooking, updateBooking } from '../context/service/movieService';

function SideBar({ sideBar }: MyComponentProps) {

  // useState
  const [data, setData] = useState<Booking[]>([]);

  // Get the canceled ticket
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

  // get the user id from localstorage
  const u_id = localStorage.getItem('user_id') ?? undefined;

  // update the booking ticket
  const bookNow = async (id: string, d_Price: string | number) => {
    try {
      await updateBooking(id, { isBooked: true, user_id: u_id, discountedPrice: d_Price});
      setData(prev => prev.map(item => item._id === id ? { ...item, isBooked: true, user_id: u_id } : item));
      window.location.reload();
    } catch (err) {
      console.error('Failed to Book tickets', err);
    }
  }

  return (
    <div className='sidebar'>
      {data
        .filter((b) => {
          if (typeof b.date !== 'string') return false;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, date] = b.date.split(' ');
          const todayDate = new Date().getDate();
          const bookingDate = parseInt(date, 10);
          const cTime = new Date();
          const current = cTime.getHours();
          // filter the Ticket using user_id, date, time and isBooking 
          return todayDate === bookingDate && b.isBooked === false && b._id && u_id !== b.user_id  && current < (parseInt(b.time.slice(0, 2)) + 12);
        })
        .map((b) => {
          // 30% of discount price
          const d_Price = (Number(b.price) * 0.7).toFixed(2);

          return (
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
                  {typeof b.date === 'string' && (
                    <p className="sell-bold">
                      {(() => {
                        const [day, date, month] = b.date.split(' ');
                        return (
                          <>
                            <span>{day}</span>, <span>{date}</span> <span>{month}</span> / {b.time}
                          </>
                        );
                      })()}
                    </p>
                  )}
                  <p>Seats : {b.seats.split(',').join(', ')}</p>
                </div>
              </div>

              <div className='offer-cards offer-box'>
                <span className="side-top-left"></span>
                <span className="side-top-right"></span>
                <div>
                  <p className='gray'><del>Rs.{b.price}.00</del></p>
                  <p className='red'>Rs.{d_Price}</p>
                </div>
                <div>
                  <button className='book-now' onClick={() => bookNow(b._id!, d_Price)}>Book Now</button>
                </div>
              </div>
            </div>
          )})}
      <button onClick={() => sideBar(prev => !prev)} className='cancel-ticket'>Close</button>
    </div>

  )
}

export default SideBar