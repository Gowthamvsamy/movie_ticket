import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Booking } from './type';
import { getBooking, updateBooking } from '../context/service/movieService';
import { toast } from 'react-toastify';
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';

function Ticket() {

  const [ticket, setTicket] = useState<Booking[]>([]);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const bookings = await getBooking();
        setTicket(bookings || []);
      } catch (err) {
        toast.error("Error fetching ticket");
        console.error(err);
      }
    };
    fetchTicket();
  }, []);

  const closeTicket = () => {
    navigator('/');
  };

  const cancelTicket = async (id: string) => {

    const ticketToCancel = ticket.find(t => t._id === id);
    if (!ticketToCancel) return;

    let refund = 0;

    // Example condition; adjust based on your coupon logic
    const price = ticketToCancel.price ? parseFloat(ticketToCancel.price) : 0;

    if (price > 0) {
      refund = price / 2;
    }

    try {
      await updateBooking(id, { isBooked: false });
      toast.success("Ticket cancelled");
      toast.success(`₹${refund} refunded`);
      navigator('/');
    } catch (error) {
      console.error('Cancellation failed:', error);
      toast.error("Cancellation failed");
    }
  };

  return (
    <div className='tickets'>
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
                    <div className='flex flex-col'>
                      <button className='cancel-ticket' onClick={() => cancelTicket(lastTicket._id!)}>Cancel Ticket</button>
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
          ) : (
            <p>Loading ticket...</p>
          )}


        </div>
      </div>
    </div>
  );

}

export default Ticket