/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import light from '../styles/themes/light'
import {GlobalStyle} from '../styles/globalsStyles'
import {Helmet} from "react-helmet"
import AuthContext from '../src/context/index'
function MyApp( { Component, pageProps } ) {
  return (
    <div>
      <Helmet>
        <script data-ad-client='ca-pub-1969421957779330' async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' />
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1969421957779330"crossOrigin="anonymous"></script> */}
        <style>{`
          // Fonte Logo
          @import url('https://fonts.googleapis.com/css2?family=Style+Script&display=swap');
          // Fonte corpo do site para titulos
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200&display=swap');
          // Google serif => noto serif
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap');
        `}
        </style>
      </Helmet>
      <AuthContext>
        <ThemeProvider theme={light}>
          <GlobalStyle/>
            <Component {...pageProps} />
        </ThemeProvider>
      </AuthContext>
    </div>
  )
}

export default MyApp
