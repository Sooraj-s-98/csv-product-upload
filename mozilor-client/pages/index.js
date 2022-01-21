import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { userService } from '../services';
export default function Home() {

  const [products, setProducts]=useState([]);

  useEffect(() => {
   let response= userService.getProductlist();
   console.log("response", response);
  },[])
console.log("userService", userService)

  return (
    <div className={styles.container}>
      <Head>
        <title>Mozilor</title>
        <meta name="description" content="mozilor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
        Csv Parser!
        </h1>

        <p className={styles.description}>
          Get started by uploading{' '}
     
        </p>

        <div className={styles.grid}>
          {products.map(product =>
                    <div  className={styles.card}>
                    <h2>{product.product_name} &rarr;</h2>
                    <p>Find in-depth information about Next.js features and API.</p>
                  </div>
            )}

        </div>
      </main>


    </div>
  )
}
