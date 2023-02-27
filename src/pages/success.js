import Header from '@/components/Header'
import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

const Success = () => {
    const router = useRouter();
    return (
        <div className='bg-gray-100 h-screen'>
            <Header />

            <main className='max-w-screen-lg mx-auto  flex  text-center justify-center'>
                <div className='flex flex-col p-10 bg-white my-5 items-center '>
                    <div className='flex items-center space-x-2 mb-5'>
                        <CheckCircleIcon className='text-green-500 h-10' />
                        <h1 className='text-3xl'>Your order has been confirmed</h1>
                    </div>
                    <p>
                        Thank you for shopping with us. We will send a confirmation to your email when your item gets shipped. If you would like to know the status of your order, please click the button below
                    </p>
                    <button onClick={() => router.push('/orders')} className='button mt-8'>Go to My Orders</button>
                </div>
            </main>
        </div>
    )
}

export default Success