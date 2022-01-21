import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { userService } from '../services';
export default function Home() {

  const [products, setProducts]=useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));

      if(user){
        listProduct();
      }
    
}, [user]);
const listProduct=async ()=>{
  let response=await userService.getProductlist();
    setProducts(response.data.data);
}
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
                    <p>{product.description}</p>
                  </div>
            )}

        </div>
      </main>


    </div>
  )
}
