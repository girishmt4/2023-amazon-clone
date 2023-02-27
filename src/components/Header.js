import Image from 'next/image'
import React from 'react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectItems } from '@/store/basketSlice'

const Header = () => {
    const { data: session } = useSession()

    const router = useRouter();

    const items = useSelector(selectItems);

    return (
        <header className=''>
            {/* Top Navbar */}
            <div className='bg-amazon_blue flex justify-center'>

                <div className='max-w-screen-2xl flex items-center p-1 flex-grow py-2'>

                    {/* Logo*/}
                    <div onClick={() => router.push('/')} className='mt-2 mx-2 flex items-center flex-grow sm:flex-grow-0'>
                        <Image src={'/static/images/amazon_PNG11.png'}

                            width={90}
                            height={36}
                            className='cursor-pointer'
                            style={{ objectFit: 'contain' }}
                            alt=''
                        />
                        {/* <Image className='object-contain w-36 h-10' width={144} height={40} src="https://links.papareact.com/f90" alt="" /> */}
                    </div>

                    {/* Search */}
                    <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                        <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' type="text" />
                        <MagnifyingGlassIcon className='h-12 p-4' />
                    </div>

                    {/* Right Icons */}
                    <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                        <div onClick={!session ? signIn : signOut} className='link'>
                            <p>
                                {session ? `Hello ${session.user.name}` : `Sign in`}
                            </p>
                            <p className='font-extrabold md:text-sm'>Account & Lists</p>
                        </div>
                        {session && (<div onClick={() => session && router.push('/orders')} className='link'>
                            <p>Returns</p>
                            <p className='font-extrabold md:text-sm'>& Orders</p>
                        </div>)}
                        <div onClick={() => router.push('/checkout')} className='relative link flex items-center'>
                            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>{items.length}</span>
                            <ShoppingCartIcon className='h-10' />
                            <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navbar */}
            <div className='bg-amazon_blue-light flex justify-center'>

                <div className='flex items-center space-x-3 p-3 pl-6 text-white text-sm'>
                    <p className='link flex items-center'>
                        <Bars3Icon className='h-6 mr-1' />
                        All
                    </p>
                    <p className='link'>Prime Video</p>
                    <p className='link'>Amazon Business</p>
                    <p className='link'>Todays Deals</p>
                    <p className='link hidden lg:inline-flex'>Electronics</p>
                    <p className='link hidden lg:inline-flex'>Food & Grocery</p>
                    <p className='link hidden lg:inline-flex'>Prime</p>
                    <p className='link hidden lg:inline-flex'>Buy Again</p>
                    <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
                    <p className='link hidden lg:inline-flex'>Health & Personal Care</p>

                </div>
            </div>
        </header>
    )
}

export default Header