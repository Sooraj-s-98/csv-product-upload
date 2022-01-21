import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { userService } from '../services';
import dynamic from 'next/dynamic';
const CsvUpload = dynamic(() => import('../components/CsvUpload'), { ssr: false, loading: () => <div>loading</div> });
export default function Home() {



  return (
    <div className={styles.container}>
      <Head>
        <title>Mozilor</title>
        <meta name="description" content="mozilor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
        Csv Upload
        </h1>
          
        <p className={styles.description}>
          Get started by uploading{' '}
     
        </p>
         <CsvUpload />
      </main>


    </div>
  )
}
