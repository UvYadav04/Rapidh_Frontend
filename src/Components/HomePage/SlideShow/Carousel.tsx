import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../Images/Carousel/img1.jpeg'
import img2 from '../../../Images/Carousel/img2.jpeg'
import img3 from '../../../Images/Carousel/img3.jpeg'
import Image from 'next/image';

function SlideShow() {
    return (
        <Carousel className='lg:h-64 md:h-60 sm:h-56 h-52 w-[90%] mb-10 overflow-hidden  py-2' interval={5000} autoPlay={true} infiniteLoop={true} dynamicHeight={true} swipeable={true} showStatus={false} showIndicators={false} showArrows={false}>

            <Image className='lg:h-60 md:h-56 sm:h-52 h-48' alt='dummy' src={img1} />
            <Image className='lg:h-60 md:h-56 sm:h-52 h-48' alt='dummy' src={img2} />
            <Image className='lg:h-60 md:h-56 sm:h-52 h-48' alt='dummy' src={img3} />

        </Carousel>
    )
}

export default SlideShow
