import React, { useEffect, useState } from 'react'
import { Booking, WalletData } from './Type';
import { getBooking, getUserWallet, updateBooking, updateWallet } from '../context/Service/MovieService';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { toast, ToastContainer } from 'react-toastify';
import Loader from './Loader';

const MyBooking: React.FC = () => {

  // useState
  const [data, setData] = useState<Booking[]>([]);
  const [active, setActive] = useState<string>("upcoming")
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<WalletData | null>(null);

  // get Booking
  useEffect(() => {
    const getData = async () => {
      // set loader 
      setLoading(true);
      try {
        const booking = await getBooking();
        setData(booking)
      } catch (err) {
        console.error("Fetch Booking error: ", err);
      } finally {
        // close loader
        setLoading(false);
      }
    }
    getData();
  }, [])

  // get user_id from token
  const user_id = localStorage.getItem('user_id');

  // Get wallet data for a particular user ID
  useEffect(() => {
    const getBalance = async (user_id: string) => {
      try {
        const wallet = await getUserWallet(user_id);
        setBalance(wallet)
      } catch (err) {
        console.error("Fetch wallet error: ", err);
      }
    }
    if (user_id) {
      getBalance(user_id);
    }
  }, [])

  // cancel Ticket
  const cancelTicket = async (id: string, d_Price: string | number) => {
    try {
      await updateBooking(id, { isBooked: false, refund: d_Price });
      setData(prev => prev.map(item => item._id === id ? { ...item, isBooked: false } : item));

      // refunded amount
      toast.success("Ticket cancelled");
      toast.success(`₹${d_Price} refunded`);

      setTimeout(() => {
        window.location.reload();
      }, 1000)
    } catch (error) {
      console.error('Failed to cancel ticket:', error);
      toast.error("Failed to cancel ticket");
    }

    // new wallet balance(add the old balance and new refund amount)
    const newBalance = (balance?.balance ?? 0) + Number(d_Price)
    const w_id = balance?._id

    // update the wallet amount
    try {
      await updateWallet(w_id!, { balance: newBalance });
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    } catch (error) {
      console.error('Failed to add refund:', error);
    }
  }

  // get the date, month and hours
  const today: string = new Date().getDate().toString();
  const mon: number = new Date().getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month: string = monthNames[mon];

  const current: number = new Date().getHours();

  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <Tabs>
        <TabList className="booking-tabs">
          <Tab className={`tab ${active === "upcoming" ? 'active' : ''}`} onClick={() => setActive("upcoming")}>Upcoming</Tab>
          <Tab className={`tab ${active === "Completed" ? 'active' : ''}`} onClick={() => setActive("Completed")}>Completed</Tab>
        </TabList>
        <TabPanel>
          <div className="booked-container">
            {data.map((b) => {
              // Refund the value using the discounted price or the actual price
              const d_Price = (Number(b.discountedPrice && Number(b.discountedPrice) > 0 ? b.discountedPrice : b.price) * 0.5).toFixed(2);

              return (
                b.isBooked === true && b._id && user_id === b.user_id ? (
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
                          {/* Display the discounted price or actual price  */}
                          <h2 className='bold'>Rs. {b.discountedPrice && Number(b.discountedPrice) > 0 ? b.discountedPrice : b.price}</h2>
                        </div>
                        <div className="booking-cancel ">
                          <button
                            className={`cancel-ticket ${b.time.split(' ')[1] === 'PM' ? `${current >= parseInt(b.time.split(':')[0]) + 11 && parseInt(today) >= parseInt(b.date.split(' ')[1]) ? 'hidden ' : ''}` : `${current >= parseInt(b.time.split(':')[0]) && parseInt(today) >= parseInt(b.date.split(' ')[1]) ? 'hidden ' : ''}`}  `}
                            onClick={() => cancelTicket(b._id!, d_Price)}
                          >
                            Cancel&nbsp;Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null
                ) : null
              )
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="booked-container">
            {data.map((b) => (
              b.isBooked === true && b._id && user_id === b.user_id ? (
                month >= b.date.split(' ')[2] && parseInt(today) >= parseInt(b.date.split(' ')[1]) ? (
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
                        {/* Display the discounted price or actual price  */}
                        <h2 className='bold'>Rs. {b.discountedPrice && Number(b.discountedPrice) > 0 ? b.discountedPrice : b.price}</h2>
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