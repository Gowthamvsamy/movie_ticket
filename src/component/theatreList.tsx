// import
import React, { useContext, useState } from 'react'
import ListContext from '../context/listContext';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { IoFastFoodOutline, IoLocationOutline, IoRestaurantOutline, IoTicketOutline } from 'react-icons/io5';
import { IoIosArrowBack, IoIosCar } from 'react-icons/io';
import { Facilities, MovieData, Theatres } from './type';
import theatresData from './theatre.json';

function TheatreList() {

  const navigator = useNavigate();

  const [selectedInfoIndex, setSelectedInfoIndex] = useState<number | null>(null);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  
  const { id } = useParams();

  const listMovie = useContext(ListContext);

  const movieId = Number(id);

  const movie = listMovie?.find((m): m is MovieData => m.id === movieId);

  // send a data via router path
  const showSeat = (time: string, place: string, name: string) => {
    if (movie) {
      navigator(`/details/${movie.id}/theatres/seat`,
        {
          state: {
            showtime: time,
            place: place,
            name: name,
            date: formattedDates[selectedDateIndex]
          }
        })
    }
  }

  const navigateBack = () => {
    if (movie) { navigator(`/details/${movie.id}`) }
  }

  // Days and Months converter
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formattedDates: string[] = [];
  const showDate: number[] = [];

  // show current date to next six dates
  for (let i = 0; i < 6; i++) {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + i);

    const day = nextDate.getDay();
    const date = nextDate.getDate();
    const month = nextDate.getMonth();

    showDate.push(date)

    const formatted = `${dayNames[day]} ${date} ${monthNames[month]}`;
    formattedDates.push(formatted);
  }

  const theatres: Theatres[] = theatresData;

  // Theatre facilities
  const facilities: Facilities[] = [
    {
      icon: IoFastFoodOutline,
      name: "F&B"
    },
    {
      icon: IoTicketOutline,
      name: "M-Tickets"
    },
    {
      icon: IoIosCar,
      name: "Parking"
    },
    {
      icon: IoRestaurantOutline,
      name: "Food Court"
    }
  ]

  const currentTime = new Date().getHours();
  const currentDate = new Date().getDate();

  return (
    <div className='theatre-list'>

      {/* Selected movie title and language */}
      {movie ? (
        <div className='theatre-title'>
          <div className='theatre-back'>
            <IoIosArrowBack className='arrow-back' onClick={navigateBack} />
          </div>
          <div className='theatre-heading-box li-div'>
            <h2 className='theatre-heading'>{`${movie.title} - (${movie.language?.[0]})`}</h2>
            <p>
              <span>{movie.certified}</span>
              {movie.genre?.map((g, index) => (
                <span key={index}>{g}</span>
              ))}
            </p>
          </div>
        </div>
      ) : (null)
      }

      {/* Moveie date */}
      <div className='date-list li-div'>
        {formattedDates.map((day, index) => (
          <p
            key={index}
            className={selectedDateIndex === index ? 'selected-date' : ''}
            onClick={() => setSelectedDateIndex(index)}
          >
            {day}
          </p>
        ))}
      </div>

      {/* Theatre list and show time */}
      <div className='theatres'>
        <div className='theatres-box'>
          {theatres.map((th, index) => (
            <div className='theatres-ui li-div' key={index}>
              <div className='theatre-flex'>
                <p>{th.name}</p>
                <p> : {th.place}</p>
              </div>

              <div className='theatre-flex-2'>
                <div>
                  <p
                    className='theatre-flex info'
                    onClick={() => setSelectedInfoIndex(selectedInfoIndex === index ? null : index)}
                  >
                    <AiOutlineExclamationCircle />&nbsp;info
                  </p>
                </div>
                {selectedInfoIndex === index && (
                  <div className='info-box'>
                    <p className='close-icon' onClick={() => setSelectedInfoIndex(null)}>X</p>
                    <div className='theatre-location'>
                      <IoLocationOutline className='icon-size' />
                      <p className='theatre-address'>{th.address}</p>
                    </div>
                    <div className='theatre-facilities'>
                      <h2>Available Facilities</h2>
                      <div className='facilities-icon'>
                        {facilities.map((f, index) => {
                          const Icon = f.icon;
                          return (
                            <div key={index}>
                              <p><Icon size={25} /></p>
                              <p>{f.name}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                <div className='show-time-flex'>
                  {th.showtime?.map((s, index) => (
                    <div key={index}>
                      {/* Filter the showtimes using the current time to display only the upcoming shows*/}
                      {(s.trim() !== '' && (currentTime <= parseInt(s.split(':')[0]) + 10 || showDate[selectedDateIndex] !== currentDate) ) && (
                        <div
                          key={index}
                          className="show-time"
                          onClick={() => showSeat(s, th.place, th.name)}
                        >
                          {s}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TheatreList