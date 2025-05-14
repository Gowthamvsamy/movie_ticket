import React from 'react'
import { Booking } from './Type'

export function BookingDetail({ b }: { b: Booking }) {
    return (
        <>
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
        </>
    )
}

export function BookingImg({b}: {b: Booking}) {
    return <div><img src={b.poster} alt="poster" className='poster-img' /></div>
}
