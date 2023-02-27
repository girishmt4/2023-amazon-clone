import React from 'react'
import moment from 'moment'
import Image from 'next/image'

const Order = ({ id, amount, amountShipping, items, timestamp, images }) => {
    return (
        <div className='relative border rounded-md'>
            <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 p-5 bg-gray-100 text-sm text-gray-600'>
                <div className='w-1/5'>
                    <p className='font-bold text-xs'>Order Placed</p>
                    <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
                </div>
                <div className='w-2/5'>
                    <p className='text-xs font-bold'>TOTAL</p>
                    <p>{`$ ${amount} - Next Day Delivery $ ${amountShipping}`}</p>
                </div>
                <div className='w-2/5'>
                    <p className='text-xs whitespace-nowrap sm:text-xl text-gray-500'>{items.length} items</p>
                    <p className=' truncate text-xs whitespace-nowrap'>
                        ORDER # {id}
                    </p>
                </div>

            </div>

            <div className='p-5'>
                <div className='flex space-x-5 overflow-x-auto'>
                    {images.map((image, i) => (
                        <div key={i} className='h-40 w-28 relative border rounded-md'>
                            <Image src={image} fill sizes='25vw' style={{ objectFit: 'cover' }} alt='' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order