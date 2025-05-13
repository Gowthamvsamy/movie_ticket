import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Booking } from './Type';
import { getBooking } from '../context/Service/MovieService';
import { toast } from 'react-toastify';
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
function Ticket() {

  // use state
  const [ticket, setTicket] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  // using get booking API to display the movie ticket
  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const bookings = await getBooking();
        setTicket(bookings || []);
      } catch (err) {
        toast.error("Error fetching ticket");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, []);

  // close the ticket
  const closeTicket = () => {
    navigator('/');
  };

  return (
    <div className='tickets'>
      {loading && <Loader />}
      <div className='ticket-box'>
        <div className='ticket-bg'>
          <button className='close-ticket' onClick={closeTicket}><IoClose size={25} /></button>
          {ticket.length > 0 ? (
            (() => {
              const lastTicket = ticket[ticket.length - 1];
              return (
                <div key={lastTicket._id}>
                  <div className='ticket-boxOne'>
                    <img src={lastTicket.poster} alt="Poster" className='ticket-poster' />
                    <div className='text-small'>
                      <p>{lastTicket.certified} {lastTicket.language}</p>
                      <h2>{lastTicket.title}</h2>
                      <p>{lastTicket.theatre} / {lastTicket.place}</p>
                      <p>{lastTicket.date} / {lastTicket.time}</p>
                      <h2>Rs.{lastTicket.price}</h2>
                    </div>
                  </div>

                  <div className='ticket-boxTwo'>
                    <span className="top-left"></span>
                    <span className="top-right"></span>
                    <span className="bottom-left"></span>
                    <span className="bottom-right"></span>
                    <div>
                      <div>
                        <p>Screen</p>
                        <h2>{lastTicket.screen}</h2>
                      </div>
                      <div>
                        <p>Seats</p>
                        <h2>{lastTicket.seats}</h2>
                      </div>
                    </div>
                  </div>

                  <div>
                    <QRCode
                      size={256}
                      className='qr-code'
                      value={"lastTicket._id"}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              );
            })()
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Ticket
