import { addToBasket, removeFromBasket } from '@/store/basketSlice'
import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'

const CheckoutProduct = ({ id, title, price, rating, description, category, image, hasPrime }) => {

    const dispatch = useDispatch();

    const addItemsHandler = () => {
        const product = { id, title, price, rating, description, category, image, hasPrime }
        dispatch(addToBasket(product));
    }

    const removeItemsHandler = () => {
        dispatch(removeFromBasket({ id }));
    }

    return (
        <div className='grid grid-cols-5 items-center'>
            <Image src={image} height={200} width={200} style={{ objectFit: 'contain' }} alt='' />


            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className='h-5 text-yellow-500' />
                    ))}
                </div>
                <p className='text-xs mt-2 mb-2 line-clamp-3'>{description}</p>
                <div className=''>
                    {`$ ${price}`}
                </div>
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <Image className='w-12' src="https://links.papareact.com/fdw" alt="" height={15} width={50} />
                        <p className='text-xs text-gray-500'>FREE Next-Day Delivery</p>
                    </div>
                )}
            </div>

            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button onClick={addItemsHandler} className='button '>Add to Basket</button>
                <button onClick={removeItemsHandler} className='button '>Remove From Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct