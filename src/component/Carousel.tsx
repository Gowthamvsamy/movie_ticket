// import
import React, { useEffect } from 'react';
import two from '../assets/poster-2.jpg'
import three from '../assets/poster-3.jpg'
import four from '../assets/poster-4.jpg'
import five from '../assets/poster-5.jpg'
import six from '../assets/poster-6.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Carousel() {

    const poster: string[] = [two, three, four, five, six]

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = two; // preload the first image
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
        >
            {poster.map((post, index) => {
                return (
                    <SwiperSlide key={index}>
                        <img src={post} alt="Carousel" />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default Carousel
