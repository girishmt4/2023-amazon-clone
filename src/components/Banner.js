import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image';

const Banner = () => {
    return (
        <div className='relative'>
            <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' />
            <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={5000}>
                {/* <div className='relative h-96 w-full max-w-screen-2xl '>
                    <Image src="https://links.papareact.com/gi1" alt="" fill  className='object-contain'/>
                </div>
                <div className='relative h-96 w-full max-w-screen-2xl '>
                    <Image src="https://links.papareact.com/6ff" alt="" fill  className='object-contain'/>
                </div>
                <div className='relative h-96 w-full max-w-screen-2xl '>
                    <Image src="https://links.papareact.com/7ma" alt="" fill className='object-contain'/>
                </div> */}

                <div>
                    <Image loading='lazy' width={1500} height={600} src="https://links.papareact.com/gi1" alt="" />
                </div>
                <div>
                    <Image loading='lazy' width={1500} height={600} src="https://links.papareact.com/6ff" alt="" />
                </div>
                <div>
                    <Image loading='lazy' width={1500} height={600} src="https://links.papareact.com/7ma" alt="" />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner