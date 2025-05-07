// import
import React from 'react'
import { FiCopy } from 'react-icons/fi'
import { toast, ToastContainer } from 'react-toastify';
import { card } from './type';

function Offers() {

    // Coupon card details
    const cardData: card[] = [
        {
            img: "https://logowik.com/content/uploads/images/1st2784.jpg",
            title: "Save up to RS 50 on first booking",
            valid: "Valid till 30 May",
            coupon: "FIRST"
        },
        {
            img: "https://logowik.com/content/uploads/images/1st2784.jpg",
            title: "Save up to RS 50 on first booking",
            valid: "Valid till 30 May",
            coupon: "FIRST"
        }
    ]

    // Copy the coupon code
    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText("First");
            toast.success("Coupon code copied!")
        } catch {
            toast.error("Failed to copy coupon.")
        }
    }

    return (
        <>
            {/* toast */}
            <ToastContainer />
            <div className='offer-bg'>
                <h2 className='offer-heading'>OFFERS</h2>
                <div className='offer-cards'>
                    {cardData.map((card) => (
                        <div className='card-offer'>
                            <div>
                                <img src={card.img} alt="404" className='offer-img' />
                            </div>
                            <div>
                                <h2>{card.title}</h2>
                                <p>{card.valid}</p>
                                <div className='card-copy'>
                                    <p className='capy-text'>{card.coupon}</p>
                                    <FiCopy className='copy-icon' onClick={copyCode} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Offers