import React, { useEffect, useState } from 'react'
import { Booking } from './type';
import { getBooking, updateBooking } from '../context/service/movieService';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Loader from './loader';

const MyBooking: React.FC = () => {

  const [data, setData] = useState<Booking[]>([]);
  const [active, setActive] = useState<string>("upcoming")
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const booking = await getBooking();
        setData(booking)
      } catch (err) {
        console.error("Fetch Booking error: ", err);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [])

  const cancelTicket = async (id: string) => {
    try {
      await updateBooking(id, { isBooked: false });
      setData(prev => prev.map(item => item._id === id ? { ...item, isBooked: false } : item));
      window.location.reload();
    } catch (error) {
      console.error('Failed to cancel ticket:', error);
    }
  }

  const u_id = localStorage.getItem('user_id');

  const today: string = new Date().getDate().toString();
  const mon: number = new Date().getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month: string = monthNames[mon];

  const current: number = new Date().getHours();




  return (
    <>
      {loading && <Loader />}
      <Tabs>
        <TabList className="booking-tabs">
          <Tab className={`tab ${active === "upcoming" ? 'active' : ''}`} onClick={() => setActive("upcoming")}>Upcoming</Tab>
          <Tab className={`tab ${active === "Completed" ? 'active' : ''}`} onClick={() => setActive("Completed")}>Completed</Tab>
        </TabList>
        <TabPanel>
          <div className="booked-container">
            {data.map((b) => (
              b.isBooked === true && b._id && b.user_id === u_id ? (
                month <= b.date.split(' ')[2] && parseInt(today) <= parseInt(b.date.split(' ')[1]) ? (
                  <div key={b._id} className="booked-ticket">
                    <div>
                      <img src={b.poster} alt="poster" className='poster-img' />
                    </div>
                    <div className='flex gap-x-10 w-full flex-wrap'>
                      <div className='booking-detail'>
                        <h2 className='bold'>{b.title}</h2>
                        <p>{b.certified} / {b.language}</p>
                        <p>{b.theatre} / {b.place}</p>
                        <p>{b.date} / {b.time}</p>
                        <p>{b.screen}</p>
                        <p><span>Ticket : {b.seats.split(',').length}</span>, Seats : {b.seats}</p>
                        <h2 className='bold'>Rs. {b.price}</h2>
                      </div>
                      <div className="booking-cancel ">
                        <button
                          className={`cancel-ticket ${current >= parseInt(b.time.split(':')[0]) + 11 ? 'hidden ' : ''} `}
                          onClick={() => cancelTicket(b._id!)}
                        >
                          Cancel&nbsp;Ticket
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="booked-container">
            {data.map((b) => (
              b.isBooked === true && b._id && b.user_id === u_id ? (
                month >= b.date.split(' ')[2] ? (
                  today > b.date.split(' ')[1] ? (
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
                    </div>
                  ) : null
                ) : null
              ) : null
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </>
  )
}

export default MyBooking