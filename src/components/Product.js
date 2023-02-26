import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux'
import { addToBasket } from '@/store/basketSlice'


const Product = ({ id, title, price, description, category, image }) => {

    const dispatch = useDispatch();

    const [rating, setRating] = useState(0)

    const [hasPrime, setHasPrime] = useState(0)

    const addItemsHandler = () => {
        const product = { id, title, price, description, category, image, rating, hasPrime };

        dispatch(addToBasket(product));
    }

    useEffect(() => {
        setRating(
            Math.floor(Math.random() * (6 - 3)) + 3
        );
        setHasPrime(Math.random() < 0.5);
    }, []);

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10 items-center text-center'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>

            <div className='h-52 w-52 relative'>
                <Image src={image} fill sizes='25vw' style={{ objectFit: 'contain' }} alt='' />
            </div>

            <h4 className='my-3'>{title}</h4>

            <div className='flex'>
                {Array(rating).fill().map((_, i) =>
                    (<StarIcon key={i} className='h-5 text-yellow-500' />)
                )}
            </div>

            <p className='text-xs mt-2 mb-2 line-clamp-2'>{description}</p>

            <div className='mb-5'>
                {`$ ${price}`}
            </div>

            {hasPrime && (
                <div className='flex items-center space-x-2 -mt5'>
                    <Image className='w-12' src="https://links.papareact.com/fdw" alt="" height={15} width={50} />
                    <p className='text-xs text-gray-500'>FREE Next-Day Delivery</p>
                </div>
            )}

            <button onClick={addItemsHandler} className='mt-auto button'>Add to Basket</button>
        </div>

    )
}

export default Product
