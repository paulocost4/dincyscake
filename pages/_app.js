/* eslint-disable react/no-unescaped-entities */
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Dincy's cake{}</title> 
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
