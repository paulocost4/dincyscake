/* eslint-disable react/no-unescaped-entities */
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Dincy's Cake{}</title> 
        <script data-ad-client="ca-pub-1969421957779330" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
