import CheckoutProduct from '@/components/CheckoutProduct'
import Header from '@/components/Header'
import { selectItems, selectTotal } from '@/store/basketSlice'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {

    const { data: session } = useSession()
    const items = useSelector(selectItems);
    const totalPrice = useSelector(selectTotal);

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items,
            email: session.user.email
        });

        // Redirect Customer to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) {
            alert(result.error.message)
        }

    }

    return (
        <div className='bg-gray-100'>
            <Header />

            <main className='lg:flex max-w-screen-2xl mx-auto '>

                {/* Left Side */}
                <div className='flex-grow m-5 shadow-sm space-y-5'>
                    <Image src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        alt=''
                    />

                    {/* Basket */}
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? 'Your Amazon Basket is Empty' : 'Shopping Basket'}
                        </h1>

                        {items.map((item, i) => (<CheckoutProduct
                            key={i}
                            id={item.id}
                            title={item.title}
                            rating={item.rating}
                            price={item.price}
                            description={item.description}
                            category={item.category}
                            image={item.image}
                            hasPrime={item.hasPrime}
                        />))}
                    </div>
                </div>

                {/* RIght Side */}
                {items.length > 0 && (
                    <div className='flex flex-col bg-white items-center p-10 m-5 shadow-sm space-y-5'>
                        <div className=' flex flex-col items-center'>
                            <h2 className='whitespace-nowrap'>Subtotal ({items.length} items):
                                <span className='font-bold ml-2'>
                                    {`$${totalPrice}`}
                                </span>
                            </h2>

                            {/* <button disabled={!session} className={`button mt-4 ${!session && 'from-gray-300 to-gray-500 border-gray-200 cursor-not-allowed'}`}>
                                {!session ? 'Sign in to Checkout' : 'Proceed to Checkout'}
                            </button> */}

                            <button role='link' onClick={createCheckoutSession} disabled={!session} className={`mt-2 ${!session ? 'not-allowed-button' : 'button'}`}>
                                {!session ? 'Sign in to Checkout' : 'Proceed to Checkout'}
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Checkout