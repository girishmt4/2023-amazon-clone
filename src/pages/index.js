import Head from 'next/head'
import { Inter } from '@next/font/google'
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ products }) {

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">

        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        <ProductFeed products={products} />
        {/* <p>{products}</p> */}
      </main>
    </div>
  );
}


export async function getServerSideProps(context) {
  // const products = await fetch('https://fakestoreapi.com/products')
  //   .then(res => res.json())

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.X_RAPID_API_HOST
    }
  };

  let products = []

  await fetch('https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=men_all&concepts=H%26M%20MAN', options)
    .then(response => response.json())
    .then(data => {
      products = data['results']
    })
    .catch(err => console.error(err));

  return {
    props: {
      products
    }
  }
}