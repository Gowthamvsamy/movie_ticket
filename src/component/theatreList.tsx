import React, { useContext, useState } from 'react'
import ListContext from '../context/listContext';
import { useParams } from 'react-router-dom';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { IoFastFoodOutline, IoLocationOutline, IoRestaurantOutline, IoTicketOutline } from 'react-icons/io5';
import { IoIosCar } from 'react-icons/io';

interface theatres {
  name: string,
  place: string,
  showtime: string[]
}

function TheatreList() {

  const [selectedInfoIndex, setSelectedInfoIndex] = useState<number | null>(null);
  const listMovie = useContext(ListContext);
  const { id } = useParams();
  const movieId = Number(id);

  const movie = listMovie?.find((m) => m.id === movieId);

  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formattedDates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + i);

    const day = nextDate.getDay();
    const date = nextDate.getDate();
    const month = nextDate.getMonth();

    const formatted = `${dayNames[day]} ${date} ${monthNames[month]}`;
    formattedDates.push(formatted);
  }

  const theatres: theatres[] = [
    {
      name: "Mayajaal Multiplex",
      place: "ECR, CHennai",
      showtime: ["4:10", "7:00", "8:30", "10:00"]
    },
    {
      name: "Miraj Cinemas",
      place: "Sekaran Mall, CHennai",
      showtime: ["4:10", "7:00", "8:30"]
    },
    {
      name: "Rohini Silver Screens",
      place: "Koyambedu",
      showtime: ["4:10", "7:00"]
    },
  ]

  return (
    <div className='theatre-list'>
      {movie ? (
        <div className='theatre-heading-box li-div'>
          <h2 className='theatre-heading'>{`${movie.title} - (${movie.language})`}</h2>
          <p>
            <span>{movie.certified}</span>
            {movie.genre?.map((g, index) => (
              <span key={index}>{g}</span>
            ))}
          </p>
        </div>
      ) : (null)
      }
      <div className='date-list li-div'>
        {formattedDates.map((day, index) => (
          <p key={index}>{day}</p>
        ))}
      </div>
      <div className='theatres'>
        <div className='theatres-box'>
          {theatres.map((th, index) => (
            <div className='theatres-ui li-div' key={index}>
              <div className='theatre-flex'>
                <p>{th.name}</p>
                <p> : {th.place}</p>
              </div>

              <div className='theatre-flex-2'>
                <p
                  className='theatre-flex info'
                  onClick={() => setSelectedInfoIndex(selectedInfoIndex === index ? null : index)}
                >
                  <AiOutlineExclamationCircle />&nbsp;info
                </p>
                {selectedInfoIndex === index && (
                  <div className='info-box'>
                    <p className='close-icon' onClick={() => setSelectedInfoIndex(null)}>X</p>
                    <div>
                      <p><IoLocationOutline /><span>No. 34/1, East Coast Road, Kanathur, Near Toll Plaza, Chennai, Tamil Nadu 603112, India</span></p>
                    </div>
                    <div>
                      <p>Available Facilities</p>
                      <div>
                        <IoFastFoodOutline />
                        <IoTicketOutline />
                        <IoIosCar />
                        <IoRestaurantOutline />
                      </div>
                    </div>
                  </div>
                )}
                {th.showtime?.map((s, index) => (
                  <span key={index} className='show-time'>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TheatreList