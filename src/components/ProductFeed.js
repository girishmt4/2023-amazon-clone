import Image from 'next/image'
import React from 'react'
import Product from './Product'
import BannerImage from '../../public/static/images/1110572_smb_gw_desktop_1500x300_lavolio_1x_uk._CB484123630_.jpg'

const ProductFeed = ({ products }) => {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto '>

            {products.slice(0, 4).map(({ code: id, name: title, price, name: description, categoryName: category, images }) => (
                <Product key={id}
                    id={id}
                    title={title}
                    price={price.value}
                    description={description}
                    category={category}
                    image={images[0].baseUrl}
                />
            ))}


            <Image src={BannerImage} className='md:col-span-full mx-auto p-5' alt="" />


            <div className='md:col-span-2'>
                {products.slice(4, 5).map(({ code: id, name: title, price, name: description, categoryName: category, images }) => (
                    <Product key={id}
                        id={id}
                        title={title}
                        price={price.value}
                        description={description}
                        category={category}
                        image={images[0].baseUrl}
                    />
                ))}
            </div>

            {products.slice(5, products.length).map(({ code: id, name: title, price, name: description, categoryName: category, images }) => (
                <Product key={id}
                    id={id}
                    title={title}
                    price={price.value}
                    description={description}
                    category={category}
                    image={images[0].baseUrl}
                />
            ))}
        </div>
    )
}

export default ProductFeed